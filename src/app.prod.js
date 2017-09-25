const config = require('./app.config');
const Koa = require('koa');
const app = new Koa();

// middleware static asset
app.use(require('koa-static-cache')(config.static.root, config.static.options));

// middleware template engine
app.use(require('koa-view')(config.view.root));

// middleware body parser
app.use(require('koa-bodyparser')());

// middleware session
app.keys = ['SUMSCOPE Co., Ltd'];
app.use(require('koa-session')(config.session, app));

// middleware router
const routerList = require('./routes/index');
routerList.forEach(r => {
  app.use(r.routes()).use(r.allowedMethods());
});

// start server
app.listen(config.port, () => {
  console.log(`open http://127.0.0.1:${config.port}`)
});
