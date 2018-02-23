const Router = require('koa-router');
const periods = require('./period/period.controller');

const router = new Router();

router.use('/periods', periods.routes(), periods.allowedMethods());

module.exports = router;
