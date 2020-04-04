import {version} from '../../../package';
module.exports = router => {
  router.get('/', async (req, res) => {
    await res.json({
      ok: true,
      version: version
    });
  });
};
