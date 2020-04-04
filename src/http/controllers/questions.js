import mongoose from 'mongoose';
import { check, validate } from './lib/validation';

const Question = mongoose.model('Question');

module.exports = router => {
  router.get('/questions', async (req, res) => {
    const questions = await Question.find({
        lang: req.query.lang ? req.query.lang : 'sv',
    });

    await res.json(questions);
  });

  router.post('/questions', validate([
    check('text').exists().isString(),
    check('answers').exists().isArray(),
  ]), async (req, res) => {
    if (typeof req.body.type === 'string' && (req.body.type !== 'radio' && req.body.type !== 'checkbox')) {
      throw new Error('Only radio or checkbox type is allowed');
    }

    req.body.answers = req.body.answers.map(answer => {
      return {
        text: answer.text,
        weight: answer.weight || 5,
      };
    });

    await Question.create(req.body);
    await res.json({
      success: true,
    });
  });
};
