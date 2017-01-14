/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
let oss = {
  dev: {
    'accessKeyId':'',
    'secretAccessKey':'',
    'endpoint':'http://oss-cn-.aliyuncs.com',
    'Bucket':'myuntest-',
    'link':''
  },
  pro: null
}

module.exports = process.env.NODE_ENV === 'debug' ? oss.dev:oss.pro;
