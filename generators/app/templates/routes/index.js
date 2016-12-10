/**
 * @author qianqing
 * @create by 16-5-23
 * @description
 */
var express = require('express');
var router = express.Router();
var logger = require('../logger');

router.get('/index', function (req, res, next) {
  logger.system.info('router index');
  logger.system.debug('router index');
  logger.system.warn('router index');
  logger.system.error('router index');
  logger.system.fatal('router index');
  res.render('index', {title: 'Vue'});
});


module.exports = router;
