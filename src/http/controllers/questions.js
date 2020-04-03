import mongoose from 'mongoose';

const Question = mongoose.model('Question');

module.exports = router => {
  router.get('/questions', async (req, res) => {
    const questions = await Question.find({
        lang: req.query.lang ? req.query.lang : 'sv',
    });

    res.json(questions);
  });

  router.post('/questions', async (req, res) => {
    res.json({
      ok: true
    });
  });
};
