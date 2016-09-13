/**
 * Created by qianqing on 16/9/9.
 */
import Vue from 'vue';
import app from './app.vue';

var vm = new Vue({
  el: 'body',
  data: {
  },
  components: {
    'app': app
  },
  ready: function () {
  }
});
