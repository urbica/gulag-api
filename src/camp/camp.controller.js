const Router = require('koa-router');
const Camp = require('./camp.model');
const CampLocation = require('../camp-location/camp-location.model');

const router = new Router();

router.post('/', async (ctx) => {
  const attributes = ctx.request.body;
  const camp = await Camp.create(attributes);

  ctx.body = camp;
});

router.get('/', async (ctx) => {
  const camps = await Camp.getAll();

  ctx.body = camps;
});

router.put('/:campId(\\d+)', async (ctx) => {
  const attributes = ctx.request.body;
  const { campId } = ctx.params;
  const updatedCamp = await Camp.update(attributes, campId);
  const updatedLocations = await CampLocation.update(attributes.locations);

  ctx.body = {
    ...updatedCamp,
    locations: updatedLocations
  };
});

router.del('/:campId(\\d+)', async (ctx) => {
  try {
    await Camp.delete(ctx.params.campId);
    ctx.status = 204;
  } catch (error) {
    ctx.status = 404;
  }
});

module.exports = router;
