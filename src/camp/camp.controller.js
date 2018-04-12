const Router = require('koa-router');
const Camp = require('./camp.model');
const CampLocation = require('../camp-location/camp-location.model');
const Photo = require('../photo/photo.model');

const router = new Router();

router.post('/', async ctx => {
  const attributes = ctx.request.body;
  const camp = await Camp.create(attributes);

  ctx.body = camp;
});

router.get('/', async ctx => {
  const camps = await Camp.getAll();

  ctx.body = camps;
});

router.put('/:campId(\\d+)', async ctx => {
  const attributes = ctx.request.body;
  const { campId } = ctx.params;

  const updatedCamp = await Camp.update(attributes, campId);
  const updatedLocations = await Promise.all(
    attributes.locations.map(async location => {
      if (location.id === undefined) {
        const newLocation = await CampLocation.create(location, campId);
        return newLocation;
      }
      const updatedLocation = await CampLocation.update(location);
      return updatedLocation;
    })
  );
  const updatedPhotos = await Photo.updateAll(attributes.photos);

  ctx.body = {
    ...updatedCamp,
    locations: updatedLocations,
    photos: updatedPhotos
  };
});

router.del('/:campId(\\d+)', async ctx => {
  try {
    await Camp.delete(ctx.params.campId);
    ctx.status = 204;
  } catch (error) {
    ctx.status = 404;
  }
});

module.exports = router;
