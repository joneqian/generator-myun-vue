/**
 * @author qianqing
 * @create by 16-5-23
 * @description
 */
var express = require('express');
var router = express.Router();

router.get('/index', function (req, res, next) {
  res.render('index', {title: 'Vue'});
});


module.exports = router;
