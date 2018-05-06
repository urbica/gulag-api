const Router = require('koa-router');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/', async ctx => {
  const { email, password } = ctx.request.body;

  const hash = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64');

  if (hash !== process.env.API_PASSWORD) {
    ctx.throw(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { user: email, date: new Date() },
    process.env.API_SECRET
  );

  ctx.body = { token };
});

module.exports = router;
