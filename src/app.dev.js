const config = require('./app.config');
const Koa = require('koa');
const app = new Koa();

// middleware webpack
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const middleware = require('koa-webpack-middleware');
const devMiddleware = middleware.devMiddleware(compiler, {
  noInfo: false,
  publicPath: '/',
  index: false,
  stats: {
    colors: true
  }
});
app.use(devMiddleware);
app.use(middleware.hotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

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

// middleware history
const history = require('koa-connect-history-api-fallback');
app.use(history({
  rewrites: [
    {from: /^\/(.*)(?:\/|$)/i, to: '/view/index.html'}
  ]
}));
app.use(devMiddleware);

// start server
app.listen(config.port, () => {
  console.log(`open http://127.0.0.1:${config.port}`)
});
