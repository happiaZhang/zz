const querystring = require('querystring');
const config = require('./routeConfig');
const Router = require('koa-router');
const router = new Router();
const fetch = require('node-fetch');
const checkToken = require('./checkToken');

router.all(
  /^\/api\/market\/(.*)(?:\/|$)/i,
  async (ctx) => {
    let path = ctx.params[0];
    const fetchConfig = Object.assign({}, config.fetchConfig);
    if (ctx.method === 'POST') path += '?' + querystring.stringify(ctx.request.body);
    fetchConfig.method = 'get';
    const isOk = await checkToken(ctx);
    if (!isOk) {
      ctx.body = {
        success: false,
        errMessage: 'your token is expired. please login again.'
      };
      return;
    }
    try {
      const res = await fetch(config.market.host + path, fetchConfig);
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
