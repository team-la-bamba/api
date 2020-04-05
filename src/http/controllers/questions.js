import mongoose from 'mongoose';
import { check, validate } from './lib/validation';
import logger from '../../lib/logger';

const Question = mongoose.model('Question');

module.exports = router => {
  router.get('/questions', async (req, res) => {
    const questions = await Question.find();

    await res.json(questions);
  });

  router.post('/questions', validate([
    check('answers').exists().isArray(),
  ]), async (req, res) => {
    if (typeof req.body.type === 'string' && (req.body.type !== 'radio' && req.body.type !== 'checkbox')) {
      await logger.error(`User tried to insert data of type ${req.body.type} as an answer.`);
      throw new Error('Only radio or checkbox type is allowed');
    }

    req.body.answers = req.body.answers.map(answer => {
      return {
        text: answer.text,
        weight: answer.weight || 5,
      };
    });

    const question = await Question.create(req.body);
    await logger.info(`Created a new question. ID: ${question.id}`);

    await res.json({
      success: true,
      id: question.id
    });
  });
};
