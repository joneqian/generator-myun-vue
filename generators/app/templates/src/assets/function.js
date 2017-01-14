/**
 * Created by qianqing on 16/9/9.
 */
import axios from 'axios';

var fn = {
  dateFormat(date, fmt) {//时间格式化
    let o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  checkDevice() {//设备检查
    const ua = navigator.userAgent
    const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
    const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
    const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
    const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
    const isWechat = /micromessenger/i.test(ua)

    return {
      isAndroid,
      isIpad,
      isIpod,
      isIphone,
      isWechat
    }
  },
  checkMobile(phone) {//检查手机号
    let re = /^1\d{10}$/
    return re.test(phone);
  },
  getSearch() {
    let url = location.search; //获取url中"?"符后的字串
    let searchObj = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        searchObj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return searchObj;
  },
  isPositiveInteger(s) {//是否为正整数
    let re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s)
  },
  ajax(url, json, method = 'post', timeout = 25000) {
    var promise = new Promise((resolve, reject) => {
      if (!url || !json) {
        reject({status: 0, msg: `url or josn is null`});
      }

      let req = {
        url: url,
        method: method,
        data: json,
        timeout: timeout,
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
      };

      axios(req)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(`ajax error: ${url} ### ${error}`);
          if (error.message) {
            reject({status: 0, msg: error.message});
          } else {
            reject({status: 0, msg: 'ajax 异常' + url});
          }
        });
    });

    return promise;
  }
};

module.exports = fn;
