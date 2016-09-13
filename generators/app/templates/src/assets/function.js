/**
 * Created by qianqing on 16/9/9.
 */
define(function () {
  var address = {
    "p": [{
      "id": 13,
      "name": "浙江省"
    }
    ],
    "c": {
      "13": [{
        "id": 93,
        "name": "嘉兴市"
      }]
    },
    "a": {
      "93": [{
        "id": 1000,
        "name": "南湖区"
      },
        {
          "id": 1001,
          "name": "秀洲区"
        },
        {
          "id": 1002,
          "name": "嘉善县"
        },
        {
          "id": 1003,
          "name": "海盐县"
        },
        {
          "id": 1004,
          "name": "海宁市"
        },
        {
          "id": 1005,
          "name": "平湖市"
        },
        {
          "id": 1006,
          "name": "桐乡市"
        },
        {
          "id": 1007,
          "name": "其它区"
        }]
    }
  };

  var clone = function (obj, newObj) {
    if (!obj) {
      return null;
    }

    var  newObj = newObj || {};
    for (var i in obj) {
      if (obj[i] === null) {
        newObj[i] = {};
      } else if (typeof obj[i] === 'object') {
        newObj[i] = (obj[i].constructor === Array) ? [] : {};
        clone(obj[i], newObj[i]);
      } else {
        newObj[i] = obj[i];
      }
    }

    return newObj;
  };

  var getSearch = function () {
    var url = location.search; //获取url中"?"符后的字串
    var searchObj = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        searchObj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return searchObj;
  };

  var isWeiXin = function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') != -1;
  };

  // dateFormatFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // dateFormatFormat(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  var dateFormat = function (date, fmt) {
    var o = {
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
  };

  var isPositiveNum = function (s) {//是否为正整数
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s)
  };

  var checkMobile = function (s) {
    var re = /^1\d{10}$/;
    if (re.test(s)) {
      return true;
    } else {
      return false;
    }
  };

  var getPCD = function (provinceName, cityName, districtName) {
    if (!provinceName || !cityName || !districtName) {
      callback('Parameter error', null);
    }

    var i = 0;
    var pcd = {};
    var provinces = address['p'];
    for (i = 0; i < provinces.length; i++) {
      if (provinces[i].name.indexOf(provinceName) >= 0) {
        pcd.province = provinces[i];
        break;
      }
    }

    var cities = address['c'][pcd.province.id + ''];
    for (i = 0; i < cities.length; i++) {
      if (cities[i].name.indexOf(cityName) >= 0) {
        pcd.city = cities[i];
        break;
      }
    }

    var districts = address['a'][pcd.city.id + ''];
    for (i = 0; i < districts.length; i++) {
      if (districts[i].name.indexOf(districtName) >= 0) {
        pcd.district = districts[i];
        return pcd;
      }
    }

    return pcd;
  };

  var ajaxPost = function (url, data, cb) {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      timeout: 25000,
      success: function (data, status, xhr) {
        if (data.status) {
          cb(null, data.data);
        } else {
          cb(data.msg, null);
        }
      },
      error: function (xhr, errorType, error) {
        console.error(url + ' error: ' + errorType + '##' + error);
        cb('服务异常', null);
      }
    });
  };

  return {
    getSearch: getSearch,
    isWeiXin: isWeiXin,
    dateFormat: dateFormat,
    isPositiveNum: isPositiveNum,
    checkMobile: checkMobile,
    clone: clone,
    getPCD: getPCD,
    ajaxPost: ajaxPost
  }
});
