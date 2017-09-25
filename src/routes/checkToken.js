const querystring = require('querystring');
const config = require('./routeConfig');
const fetch = require('node-fetch');
const authorization = (() => {
  return 'Basic ' + Buffer.from(config.iam.clientId + ':' + config.iam.secret).toString('base64');
})();
const fetchConfig = Object.assign({}, config.fetchConfig);
fetchConfig.headers.Authorization = authorization;

const checkToken = async (ctx) => {
  let isOk = false;
  const qs = querystring.stringify({
    'access_token': ctx.session.token,
    'token_client_id': config.webbond.clientId,
    'token_username': ctx.session.userName
  });
  try {
    const res = await fetch(config.iam.host + '/oauth/check_token?' + qs, fetchConfig);
    const result = await res.json();
    if (result.result) {
      isOk = true;
    } else {
      isOk = await relogin(ctx);
    }
  } catch (err) {
    console.log('check token is failed. ' + err.message);
  }
  return isOk;
};

const relogin = async (ctx) => {
  let isOk = false;
  fetchConfig.body = JSON.stringify({
    userName: ctx.session.userName,
    passWord: ctx.session.passWord,
    encrypted: ctx.session.encrypted
  });
  try {
    const res = await fetch(config.cdh.host + 'logon', fetchConfig);
    const result = await res.json();
    if (result.code) {
      ctx.session = null;
      ctx.redirect('/login' + ctx.search);
    } else {
      ctx.session.token = result.result.token;
      isOk = true;
    }
  } catch (err) {
    console.log('automatic logon is failed. ' + err.message);
  }
  return isOk;
};

module.exports = checkToken;
