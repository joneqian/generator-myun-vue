/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
var oss = require('./oss.conf');
var wx = require('./wx.conf');
var api = require('./api.conf');
var config = {
  oss, wx, api
};

module.exports = config;
