const Router = require('koa-router');
const CampActivity = require('./camp-activity.model');

const router = new Router();

router.get('/', async (ctx) => {
  const campActivities = await CampActivity.getAll();
  ctx.body = campActivities;
});

router.post('/', async (ctx) => {
  const attributes = ctx.request.body;
  const activity = JSON.stringify(attributes);

  const campActivity = await CampActivity.create(activity);

  ctx.body = campActivity;
});


module.exports = router;
