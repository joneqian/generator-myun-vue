/**
 * Created by qianqing on 2016/12/9.
 */
var log4js = require('log4js');

log4js.configure({
  appenders: [
    {type: 'console'},
    {
      type: 'file',
      filename: __dirname + '/logs/log',
      maxLogSize: 20480,
      alwaysIncludePattern: false,
      backups: 10,
      category: ['frontEnd', 'backEnd']
    }
  ],
  replaceConsole: false
});

var environment = process.env.NODE_ENV || 'production';

if (environment === 'production') {
  log4js.getLogger('frontEnd').setLevel('INFO');
  log4js.getLogger('backEnd').setLevel('INFO');
} else {
  log4js.getLogger('frontEnd').setLevel('DEBUG');
  log4js.getLogger('backEnd').setLevel('DEBUG');
}

module.exports.frontEnd = log4js.getLogger('frontEnd');
module.exports.backEnd = log4js.getLogger('backEnd');
