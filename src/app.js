const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const koajwt = require('koa-jwt');

require('dotenv').config();

const router = require('./router');

const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(koajwt({ secret: process.env.API_SECRET })
    .unless({ path: '/login', method: 'GET' }))
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
