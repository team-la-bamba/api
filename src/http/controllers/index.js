module.exports = router => {
  router.get('/', async (req, res) => {
    await res.json({
      ok: true
    });
  });
};
