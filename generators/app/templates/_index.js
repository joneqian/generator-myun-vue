/**
 * Created by qianqing on 16/7/18.
 */
/**
 * @author qianqing
 * @create by 16-4-27
 * @description
 */
import Vue from 'vue';
import indexPage from './index-page'

function ajaxPost (url, data, cb) {
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
      console.log(url + ' error: ' + errorType + '##' + error);
      cb('服务异常', null)
    }
  })
}

var vm = new Vue({
  el: 'body',
  data: {
  },
  components: {
    indexPage
  },
  ready: function () {
    initPage()
  },
  events: {
  },
  watch: {

  },
  computed: {
  }
});

function initPage () {
  $(function () {

  });
}
