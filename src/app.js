const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

const loginHandler = require('./loginHandler');
const router = require('./router');

const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(loginHandler)
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
