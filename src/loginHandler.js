const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', async ctx => {
  const { email, password } = ctx.request.body;

  if (password !== process.env.API_PASSWORD) {
    ctx.throw(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { user: email, date: new Date() },
    process.env.API_SECRET
  );

  ctx.body = { token };
});

module.exports = router;
