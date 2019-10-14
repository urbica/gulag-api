const Router = require('koa-router');
const CampRegion = require('./camp-region.model');

const router = new Router();

router.get('/', async (ctx) => {
  const campRegions = await CampRegion.getAll();

  ctx.body = campRegions;
});

router.put('/:regionId(\\d+)', async ctx => {
  const attributes = ctx.request.body;
  const { regionId } = ctx.params;
  const region = JSON.stringify(attributes);
  const id = parseInt(regionId, 10);

  const updatedRegion = await CampRegion.update(region, id);

  ctx.body = updatedRegion;
});

module.exports = router;
