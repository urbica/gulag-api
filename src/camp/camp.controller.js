const Router = require('koa-router');
const Camp = require('./camp.model');
// const CampLocation = require('../camp-location/camp-location.model');

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

  // const updatedLocations = [];
  // attributes.locations.forEach(async (location) => {
  //   if (location.id === undefined) {
  //     const updatedLocation = await CampLocation.create(location, campId);
  //     console.log(updatedLocation);
  // updatedLocations.push(updatedLocation);
  // } else {
  // const updatedLocation = await CampLocation.update(location, campId);
  // updatedLocations.push(updatedLocation);
  //   }
  // });

  // console.log(updatedLocations);
  ctx.body = {
    ...updatedCamp,
    locations: attributes.locations
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
