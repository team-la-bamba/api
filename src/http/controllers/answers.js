import mongoose from 'mongoose';
import { check, validate } from './lib/validation';

const Answer = mongoose.model('Answer');

module.exports = router => {
  router.get('/answers', async(req, res) => {
    const query = {};

    if (req.query.place) {
      query['place'] = req.query.place;
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

    const result = await Answer.find(query).populate('questions');

    await res.json({
      data: result
    });
  });

  router.post('/answers', validate([
    check('answer_id').exists().isString(),
    check('question_id').exists().isString(),
    check('place').exists().isString(),
  ]), async (req, res) => {
    await Answer.create(req.body);
    await res.json({
      success: true,
    });
  });
};
