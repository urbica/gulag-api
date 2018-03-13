const Router = require('koa-router');
const CampRegion = require('./camp-region.model');

const router = new Router();

router.get('/', async (ctx) => {
  const campRegions = await CampRegion.getAll();
  ctx.body = campRegions;
});

module.exports = router;
