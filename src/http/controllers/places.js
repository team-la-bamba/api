import municipalities from '../../../data/municipalities';
import regions from '../../../data/regions';
import all from '../../../data/regions+municipalities.json';

module.exports = router => {
  router.get('/places', async (req, res) => {
    switch (req.query.type) {
      case 'regions':
        await res.json(regions);
        break;
      case 'all':
        await res.json(all);
        break;
      default:
        await res.json(municipalities);
        break;
    }
  });
};
