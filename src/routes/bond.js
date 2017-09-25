const isProd = process.env.NODE_ENV === 'production';
const config = require('./routeConfig');
const Router = require('koa-router');
const router = new Router();
const handler = async (ctx, next) => {
  if (ctx.session.isNew) {
    ctx.redirect('/login' + ctx.search);
  } else {
    isProd && await ctx.render('index');
    next();
  }
};

router.get('/', (ctx) => {
  ctx.redirect((ctx.session.isNew ? '/login' : config.homeRoute) + ctx.search);
});

router.get('/login', async (ctx, next) => {
  if (ctx.session.isNew) {
    isProd && await ctx.render('index');
    next();
  }
});
router.get('/bond', handler);
router.get('/bond/:category', handler);

module.exports = router;
