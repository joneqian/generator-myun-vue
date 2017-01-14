/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
var axios = require('axios');
var logger = require('../logger').api;

let api = {
  base: {
    dev: 'http://127.0.0.1:9094/api/v1/',
    pro: 'http://127.0.0.1:9094/api/v1/'
  },
  module: {
    Customer: {
      login: 'Customers/login'
    }
  }
};

let baseURL = process.env.NODE_ENV === 'debug' ? api.base.dev : api.base.pro;
if (!baseURL) {
  throw new Error('please config base url');
}

module.exports = function (module, operation, json, token = '', timeout = 15000) {
  var promise = new Promise((resolve, reject) => {
    if (!json) {
      reject({status: 0, msg: `post data is null`});
    }
    if (!module || !operation) {
      reject({status: 0, msg: `Can't get api, please enter module and operation`});
    }

    if (!api.module[module] || !api.module[module][operation]) {
      reject({status: 0, msg: `Can't get api, please confirm module and operation`});
    };

    let url = api.module[module][operation];
    let req = {
      url:  url,
      baseURL: baseURL,
      method: "post",
      data: json,
      timeout: timeout,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Access-Token': token}
    };
    axios(req)
      .then((response) => {
        if (response.data.repData) {
          resolve(response.data.repData);
        } else {
          logger.error(`api get data error: ${url} ### ${response.data}`);
          reject({status: 0, msg: `api 异常: ${url}`});
        }
      })
      .catch((error) => {
        logger.error(`axios error: ${url} ### ${error.message}`);
        if (error.message) {
          reject({status: 0, msg: error.message});
        } else {
          reject({status: 0, msg: 'axios 异常' + url});
        }
      });
  });

  return promise;
}
