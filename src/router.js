const Router = require('koa-router');

// routes
const periods = require('./period/period.controller');
const campRegions = require('./camp-region/camp-region.controller');

const router = new Router();

router.use('/periods', periods.routes(), periods.allowedMethods());
router.use('/camp-regions', campRegions.routes(), campRegions.allowedMethods());

module.exports = router;
