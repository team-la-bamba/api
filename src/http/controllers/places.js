import municipalities from '../../../data/municipalities';
import regions from '../../../data/regions';
import grouped from '../../../data/regions+municipalities.json';

module.exports = router => {
  router.get('/places', async (req, res) => {
    switch (req.query.type) {
      case 'regions':
        await res.json(regions);
        break;
      case 'grouped':
        await res.json(grouped);
        break;
      default:
        await res.json(municipalities);
        break;
    }
  });
};
