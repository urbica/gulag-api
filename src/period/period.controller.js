const Router = require('koa-router');
const Period = require('./period.model');

const router = new Router();

router.get('/', async (ctx) => {
  const periods = await Period.getAll();
  ctx.body = periods;
});

router.get('/:periodId(\\d+)', async (ctx) => {
  const periodID = parseInt(ctx.params.periodId, 10);
  const period = await Period.get(periodID);

  ctx.assert(period, 404, `Could'n find period with 'id'=${periodID}`);
  ctx.body = period;
});

router.post('/', async (ctx) => {
  const attributes = ctx.request.body;
  const period = await Period.create(attributes);

  ctx.status = 201;
  ctx.body = period;
});

module.exports = router;
