import places from '../../../data/places';
import regions from '../../../data/regions';

module.exports = router => {
  router.get('/places', async (req, res) => {
    if (req.query.type === 'region') {
      await res.json(regions);
    } else {
      await res.json(places);
    }
  });
};
