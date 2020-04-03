module.exports = router => {
  router.get('/', async (req, res) => {
    res.json({
      ok: true
    });
  });
};
