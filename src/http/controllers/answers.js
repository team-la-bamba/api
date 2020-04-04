import fs from 'fs';
import mongoose from 'mongoose';
import slugify from 'slugify';

const internalSlugify = (s) => {
  s = s.replace(/[*+~.()'"!:@_]/g, '-');
  return slugify(s, {
    lower: true,
  });
};

const Answer = mongoose.model('Answer');

module.exports = (router) => {
  router.get('/answers', async (req, res) => {
    const query = {};
    const lang = req.query.lang ? req.query.lang : 'sv';

    if (req.query.place) {
      query['place'] = {
        $regex: new RegExp('^' + req.query.place.toLowerCase(), 'i'),
      };
    }

    if (req.query.from && req.query.to) {
      query['created_at'] = {
        $gte: Date.parse(req.query.from),
        $lte: Date.parse(req.query.to),
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

    const result = await (
      await Answer.find(query).populate('question').lean()
    ).filter((doc) => {
      return doc.question.lang === lang;
    });

    const preoutput = {};

    result.forEach((doc) => {
      if (typeof preoutput[doc.place] === 'undefined') {
        preoutput[doc.place] = {};
      }

      if (typeof preoutput[doc.place][doc.question._id] === 'undefined') {
        preoutput[doc.place][doc.question._id] = Object.assign(
          {},
          doc.question
        );
      }

      if (!preoutput[doc.place][doc.question._id].total) {
        preoutput[doc.place][doc.question._id].total = 0;
      }

      preoutput[doc.place][doc.question._id].answers = [
        ...preoutput[doc.place][doc.question._id].answers,
      ];

      preoutput[doc.place][doc.question._id].answers.forEach((answer, i) => {
        preoutput[doc.place][doc.question._id].answers[i] = Object.assign(
          {},
          preoutput[doc.place][doc.question._id].answers[i]
        );

        if (!preoutput[doc.place][doc.question._id].answers[i].count) {
          preoutput[doc.place][doc.question._id].answers[i].count = 0;
        }

        if (answer._id.toString() === doc.answer.toString()) {
          preoutput[doc.place][doc.question._id].answers[i].count += 1;
          preoutput[doc.place][doc.question._id].total += 1;
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

    await res.json(output);
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

    const slug = internalSlugify(body[0].place);

    [slug, 'standard'].forEach((name) => {
      const file = __dirname + `/responses/${slug}.json`;
      if (fs.existsSync(file)) {
        response = require(file);
      }
    });

    await res.json(response);
  });
};
