const Router = require('koa-router');
const Camp = require('./camp.model');

const router = new Router();

router.post('/', async (ctx) => {
  const attributes = ctx.request.body;
  const camp = await Camp.create(attributes);

  ctx.body = camp;
});

router.get('/', async (ctx) => {
  const camps = await Camp.getAll();

  ctx.body = camps[0].json_agg;
});

module.exports = router;
