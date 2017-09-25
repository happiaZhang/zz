const ONE_MINUTE = 1 * 60 * 1000;
const Agent = require('agentkeepalive');
const keepAliveAgent = new Agent({
  keepAlive: true,
  timeout: ONE_MINUTE
});

module.exports = {
  homeRoute: '/bond',
  fetchConfig: {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    agent: keepAliveAgent
  },
  iam: {
    clientId: 'e693517d071248b6946ebcddc3f62d7f',
    secret: 'd40640d1-8134-4232-b20a-d9728bd89640',
    host: 'http://identity-iam.dev.sumscope.com/'
  },
  webbond: {
    clientId: 'a34285bc126b474584f067aadd84e485',
    clientSecret: '1f431708-8eaf-4af6-a101-bc71fdf5caf4',
    host: 'http://172.16.66.173:8380/webbond/api/v1/'
  },
  market: {
    host: 'http://172.16.66.173:8280/webbond/api/v1/'
  },
  cdh: {
    host: 'http://172.16.66.173/cdh/webbond_api/webbond/'
  },
  permission: {
    host: 'http://172.16.66.173:8180/webbond/getuserpermission'
  }
};
