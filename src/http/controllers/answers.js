import mongoose from 'mongoose';
import { check, validate } from './lib/validation';

const Answer = mongoose.model('Answer');

module.exports = router => {
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
