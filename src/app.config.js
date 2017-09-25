const path = require('path');
const RedisStore = require('./RedisStore');
const appName = 'bondDetail';
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const PUBLIC = path.resolve(__dirname, '../public');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  name: appName,
  port: 3000,
  static: {
    root: PUBLIC,
    options: {
      maxAge: ONE_MONTH
    }
  },
  view: {
    root: path.resolve(__dirname, '../public/view')
  },
  session: {
    key: appName + ':sess',
    maxAge: ONE_MONTH,
    rolling: true,
    store: isProd ? new RedisStore([{
      host: '192.168.1.111',
      port: 16379
    }]) : new RedisStore()
  }
};
