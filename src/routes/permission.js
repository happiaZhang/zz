const config = require('./routeConfig');
const Router = require('koa-router');
const router = new Router();
const fetch = require('node-fetch');
const checkToken = require('./checkToken');

router.post(
  /^\/api\/permission/i,
  async (ctx) => {
    let isOk = true;
    const fetchConfig = Object.assign({}, config.fetchConfig);
    const payload = ctx.request.body;
    const firstLogin = payload.firstLogin;
    fetchConfig.body = JSON.stringify(payload);
    if (!firstLogin) isOk = await checkToken(ctx);
    if (!isOk) {
      ctx.body = {
        success: false,
        errMessage: 'your token is expired. please login again.'
      };
      return;
    }
    try {
      const res = await fetch(config.permission.host, fetchConfig);
      const result = await res.json();
      if (result.code) {
        ctx.body = {
          success: false,
          errMessage: result.message
        };
      } else {
        if (firstLogin) {
          ctx.session.userName = payload.userName;
          ctx.session.passWord = payload.passWord;
          ctx.session.encrypted = payload.encrypted;
          ctx.session.token = payload.token;
          ctx.session.save();
        }
        ctx.body = {
          success: true,
          content: result.result
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        errMessage: err.message
      };
    }
  }
);

module.exports = router;
