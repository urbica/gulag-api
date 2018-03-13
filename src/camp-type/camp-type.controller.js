const Router = require('koa-router');
const CampType = require('./camp-type.model');

const router = new Router();

router.get('/', async (ctx) => {
  const campTypes = await CampType.getAll();
  ctx.body = campTypes;
});

module.exports = router;
