const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const router = require('./router');

const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
