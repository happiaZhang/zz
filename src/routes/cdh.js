const config = require('./routeConfig');
const Router = require('koa-router');
const router = new Router();
const fetch = require('node-fetch');
const checkToken = require('./checkToken');

router.post(
  /^\/api\/cdh\/(.*)(?:\/|$)/i,
  async (ctx) => {
    let isOk = true;
    const path = ctx.params[0];
    const isLogin = path === 'logon';
    const fetchConfig = Object.assign({}, config.fetchConfig);
    fetchConfig.body = JSON.stringify(ctx.request.body);
    if (!isLogin) isOk = await checkToken(ctx);
    if (!isOk) {
      ctx.body = {
        success: false,
        errMessage: 'your token is expired. please login again.'
      };
      return;
    }
    try {
      const res = await fetch(config.cdh.host + path, fetchConfig);
      const result = await res.json();
      if (result.code) {
        ctx.body = {
          success: false,
          errMessage: isLogin ? '用户名或密码不正确' : result.message
        };
      } else {
        ctx.body = {
          success: true,
          content: result.result
        };
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errMessage: err.message
      };
    }
  }
);

module.exports = router;
