/**
 * Created by qianqing on 2016/12/9.
 */
var log4js = require('log4js');

log4js.configure({
  'appenders': [
    {
      'category': 'access',
      'type': 'dateFile',
      'filename': __dirname + '/logs/access.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'system',
      'type': 'dateFile',
      'filename': __dirname + '/logs/system.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'error',
      'type': 'dateFile',
      'filename': __dirname + '/logs/error.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'type': 'console'
    }]
});

var environment = process.env.NODE_ENV || 'production';

if (environment === 'production') {
  log4js.getLogger('access').setLevel('INFO');
  log4js.getLogger('system').setLevel('INFO');
  log4js.getLogger('error').setLevel('INFO');
} else {
  log4js.getLogger('access').setLevel('DEBUG');
  log4js.getLogger('system').setLevel('DEBUG');
  log4js.getLogger('error').setLevel('DEBUG');
}

module.exports = {
  access: log4js.getLogger('access'),
  system: log4js.getLogger('system'),
  error: log4js.getLogger('error'),
  express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO, format:':remote-addr :method :url :status'}),
};
