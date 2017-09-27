/**
 * Created by happia.zhang on 2017/9/27.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const fstream = require('fstream');
const tar = require('tar');

const dependencies = {
  'agentkeepalive': '^3.3.0',
  'better-npm-run': '^0.0.15',
  'ioredis': '^3.1.4',
  'koa': '^2.3.0',
  'koa-bodyparser': '^4.2.0',
  'koa-router': '^7.2.1',
  'koa-session': '^5.5.0',
  'koa-static': '^4.0.1',
  'koa-static-cache': '^5.1.1',
  'koa-view': '^2.1.0',
  'node-fetch': '^1.7.1'
};

const content = fs.readFileSync(path.resolve(__dirname, '../package.json'));
const packageJson = JSON.parse(content);
delete packageJson.devDependencies;
delete packageJson.repository;
packageJson.dependencies = dependencies;
packageJson.scripts = {
  start: 'better-npm-run start'
};
packageJson.betterScripts = {
  start: {
    command: 'node dist/app.prod.js',
    env: {
      'NODE_ENV': 'production'
    }
  }
};
fs.writeFileSync(path.resolve(__dirname, '../build/bond-details/package.json'), JSON.stringify(packageJson, null, 2));

// zip
fstream.Reader({'path': path.resolve(__dirname, '../build/bond-details/'), 'type': 'Directory'})
  .pipe(tar.Pack())
  .pipe(zlib.Gzip())
  .pipe(fstream.Writer({'path': path.resolve(__dirname, '../build/bond-details-' + packageJson.version + '.tar.gz')}));
