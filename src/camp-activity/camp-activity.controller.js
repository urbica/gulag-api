const Router = require('koa-router');
const CampActivity = require('./camp-activity.model');

const router = new Router();

router.get('/', async (ctx) => {
  const campActivities = await CampActivity.getAll();
  ctx.body = campActivities;
});

module.exports = router;
