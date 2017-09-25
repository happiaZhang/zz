const config = require('./routeConfig');
const Router = require('koa-router');
const router = new Router();
const fetch = require('node-fetch');
const checkToken = require('./checkToken');

router.all(
  /^\/api\/webbond\/(.*)(?:\/|$)/i,
  async (ctx) => {
    const path = ctx.params[0];
    const fetchConfig = Object.assign({}, config.fetchConfig);
    fetchConfig.method = ctx.method;
    fetchConfig.body = JSON.stringify(ctx.request.body);
    const isOk = await checkToken(ctx);
    if (!isOk) {
      ctx.body = {
        success: false,
        errMessage: 'your token is expired. please login again.'
      };
      return;
    }
    try {
      const res = await fetch(config.webbond.host + path, fetchConfig);
      const result = await res.json();
      if (result.meta.errNum) {
        ctx.body = {
          success: false,
          errMessage: result.meta.errMsg
        };
      } else {
        ctx.body = {
          success: true,
          content: result.data
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
