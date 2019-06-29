const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ip = require('ip');
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const port = 8888;
const chalk = require('chalk');
const divider = chalk.gray('\n-----------------------------------');
let timer = null;
// let progress = require('./internals/helpers/progress.js');
const instance = webpackDevMiddleware(compiler, {
  logLevel: 'warn',
  stats: {
    colors: true,
    modules: false
  },
  publicPath: config.output.publicPath,
  lazy: false
});
instance.waitUntilValid(() => {
  //实例验证通过
  clearInterval(timer);

  console.log(`
        ${chalk.bold('测试地址:')}${divider}
        本地地址: ${chalk.magenta(`http://localhost:${port}`)}
         LAN地址: ${chalk.magenta(`http://${ip.address()}:${port}`) +
           ''}${divider}
        ${chalk.blue(`按 ${chalk.italic('CTRL-C')} 关闭服务器`)}
    `);
});

app.use(instance);
app.use(webpackHotMiddleware(compiler)); //热刷新

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('服务启动中...');
  console.log('\n');
  // timer = progress('服务启动中',3);
});
