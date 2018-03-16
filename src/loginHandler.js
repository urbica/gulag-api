const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  if (ctx.url === '/login' && ctx.method === 'POST') {
    const { email, password } = ctx.request.body;

    if (email === process.env.API_EMAIL && password === process.env.API_PASSWORD) {
      const token = jwt.sign({ user: email, date: new Date() }, process.env.API_SECRET);
      ctx.body = {
        token: `sk.${token}`
      };
    } else {
      ctx.throw(401, 'Unathorized');
    }
  } else {
    await next();
  }
};
