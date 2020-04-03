import places from '../../../data/places';

module.exports = router => {
  router.get('/places', async (req, res) => {
    await res.json(places);
  });
};
