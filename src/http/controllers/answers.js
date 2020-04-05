import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import slugify from 'slugify';
import groupedPlaces from '../../../data/regions+municipalities.json';
import tinytime from 'tinytime';
import logger from '../../lib/logger';

const dateFormat = tinytime('{YYYY}-{Mo}-{DD}', {
  padMonth: true,
  padDays: true,
});

const internalSlugify = (s, lower = true) => {
  s = s.replace(/[*+~.()'"!:@_]/g, '-');
  return slugify(s, {
    lower: lower,
  });
};

const Answer = mongoose.model('Answer');

const getQuery = (req) => {
  const query = {};

  if (req.query.place) {
    query['place'] = {
      $regex: new RegExp('^' + req.query.place.toLowerCase(), 'i'),
    };
  } else if (req.query.region) {
    // find municipalities for region.
    const region = groupedPlaces
      .filter((row) => {
        return row.region.toLowerCase() === req.query.region.toLowerCase();
      })
      .pop();

    query['place'] = {
      $in: region.municipalities,
    };
  }

  if (req.query.from && req.query.to) {
    const to = new Date(Date.parse(req.query.to));
    to.setHours(23, 59, 59);
    query['created_at'] = {
      $gte: Date.parse(req.query.from),
      $lte: to,
    };
  } else if (req.query.from) {
    query['created_at'] = {
      $gte: Date.parse(req.query.from),
    };
  } else {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);

    query['created_at'] = {
      $gte: date,
    };
  }

  if (req.query.question) {
    query['question'] = req.query.question;
  }

  return query;
};

module.exports = (router) => {
  router.get('/timeseries', async (req, res) => {
    const query = getQuery(req);
    const lang = req.query.lang ? req.query.lang : 'sv';
    const result = await (
      await Answer.find(query).populate('question').lean()
    ).filter((doc) => {
      if (!doc.question) {
        return false;
      }

      return doc.question.lang && doc.question.lang === lang;
    });

    let output = {};

    result.forEach((doc) => {
      const date = dateFormat.render(doc.created_at);

      if (typeof output[date] === 'undefined') {
        output[date] = 0;
      }

      output[date] += 1;
    });

    for (let key in output) {
      output[key] = {
        date: key,
        total: output[key],
      };
    }

    await res.json(Object.values(output));
  });

  router.get('/answers', async (req, res) => {
    const query = getQuery(req);
    const lang = req.query.lang ? req.query.lang : 'sv';
    const result = (await Answer.find(query).populate('question').lean())
      .filter((doc) => {
        if (!doc.question) {
          return false;
        }
        if (!doc.answer) {
          return false;
        }
        return doc.question.lang && doc.question.lang === lang;
      }
    );

    await logger.debug('Found %d answers: %j', result.length, result);

    const preoutput = {};

    result.forEach((doc) => {
      if (typeof preoutput[doc.place] === 'undefined') {
        preoutput[doc.place] = {};
      }

      if (typeof preoutput[doc.place][doc.question._id] === 'undefined') {
        preoutput[doc.place][doc.question._id] = Object.assign(
          {},
          {},
          doc.question
        );
      }

      preoutput[doc.place][doc.question._id].answers = [
        ...preoutput[doc.place][doc.question._id].answers,
      ];

      doc.question.answers.forEach((answer, i) => {
        if (
          typeof preoutput[doc.place][doc.question._id].answers[i].count ===
          'undefined'
        ) {
          preoutput[doc.place][doc.question._id].answers[i] = {
            _id: answer._id,
            text: answer.text,
            count: 0,
          };
        }

        if (answer._id.toString() === doc.answer.toString()) {
          preoutput[doc.place][doc.question._id].answers[i].count += 1;
        }
      });
    });

    for (const place in preoutput) {
      preoutput[place] = Object.values(preoutput[place]);
    }

    const output = [];

    for (const place in preoutput) {
      const docs = preoutput[place];
      const row = {
        place: place,
        questions: docs,
      };
      output.push(row);
    }

    output.sort((a, b) => {
      if (a.place < b.place) return -1;
      if (a.place > b.place) return 1;
      return 0;
    });

    const groupedByQuestions = {};

    output.forEach((answer) => {
      answer.questions.forEach((question) => {
        if (typeof groupedByQuestions[question._id] === 'undefined') {
          groupedByQuestions[question._id] = {
            question: {
              ...question,
              total: 0,
            },
            places: [],
          };
        }

        if (!question.answers) {
          return;
        }

        const row = {
          place: answer.place,
          answers: question.answers,
          total: 0,
        };

        question.answers.forEach((a) => {
          groupedByQuestions[question._id].question.total += a.count;
          row.total += a.count;
        });

        groupedByQuestions[question._id].places.push(row);
      });
    });

    await logger.debug('Response: %j', groupedByQuestions);

    await res.json(Object.values(groupedByQuestions));
  });

  router.post('/answers', async (req, res) => {
    let body = [];

    if (Array.isArray(req.body)) {
      body = req.body;
    } else {
      body = [req.body];
    }

    if (!body.length || !body[0].place) {
      throw new Error('No answer submitted');
    }

    let response = {
      success: true,
    };

    await Answer.insertMany(body);

    try {
      response = JSON.parse(
        await fs.promises.readFile(
          path.resolve(`data/responses/${internalSlugify(body[0].place)}.json`)
        )
      );
    } catch {
      try {
        // find region for municipality
        const regionRow = groupedPlaces.filter((row) => {
          return row.municipalities.indexOf(body[0].place) !== -1;
        });

        if (regionRow.length) {
          const region = regionRow.pop().region;
          // Strange slug on 1177.se for some regions.
          let regionSlug = region;
          switch (region) {
            case 'Stockholms län':
              regionSlug = 'Stockholm';
              break;
            case 'Örebro län':
              regionSlug = 'Orebrolan';
              break;
            default:
              break;
          }

          response = {
            text: 'Tack för att du deltog!',
            links: [
              {
                text: `Läs mer om coronaviruset i Region ${region} på 1177.se`,
                link: `https://www.1177.se/${internalSlugify(
                  regionSlug,
                  false
                )}/corona/`,
              },
            ],
          };
        } else {
          response = JSON.parse(
            await fs.promises.readFile(
              path.resolve('data/responses/standard.json')
            )
          );
        }
      } catch {
        // Do nothing.
      }
    }

    await res.json(response);
  });
};
