// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

// 引用API文件
import api from './utils/api.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

// 引入mockjs
require('./mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//添加了额一个常用的时间整理过滤器 getYMD
Vue.filter('getYMD', function(input) {
  return input.split(' ')[0];
})
