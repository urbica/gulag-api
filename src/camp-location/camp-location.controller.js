const Router = require('koa-router');
const CampLocation = require('./camp-location.model');

const router = new Router();

router.del('/:locationId(\\d+)', async (ctx) => {
  const result = await CampLocation.delete(ctx.params.locationId);

  ctx.body = result;
});

module.exports = router;
