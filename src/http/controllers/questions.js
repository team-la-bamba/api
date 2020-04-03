module.exports = router => {
  router.post('/questions', async (req, res) => {
    res.json({
      ok: true
    });
  });
};
