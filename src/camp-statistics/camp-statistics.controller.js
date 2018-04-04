const Router = require('koa-router');
const CampStatistics = require('./camp-statistics.model');

const router = new Router();

router.del('/:statId(\\d+)', async (ctx) => {
  const { campId } = ctx.request.body;
  const result = await CampStatistics.delete(ctx.params.statId);

  ctx.body = {
    campId,
    ...result
  };
});

module.exports = router;
