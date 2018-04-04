const Router = require('koa-router');

// routes
const periods = require('./period/period.controller');
const campRegions = require('./camp-region/camp-region.controller');
const campActivities = require('./camp-activity/camp-activity.controller');
const campTypes = require('./camp-type/camp-type.controller');
const camps = require('./camp/camp.controller');
const campStatistics = require('./camp-statistics/camp-statistics.controller');
const campLocation = require('./camp-location/camp-location.controller');

const router = new Router();

router.use('/periods', periods.routes(), periods.allowedMethods());
router.use('/camp-regions', campRegions.routes(), campRegions.allowedMethods());
router.use('/camp-activities', campActivities.routes(), campActivities.allowedMethods());
router.use('/camp-types', campTypes.routes(), campTypes.allowedMethods());
router.use('/camps', camps.routes(), camps.allowedMethods());
router.use('/camp-statistics', campStatistics.routes(), campStatistics.allowedMethods());
router.use('/camp-location', campLocation.routes(), campLocation.allowedMethods());

module.exports = router;
