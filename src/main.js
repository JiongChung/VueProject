// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import VueResource from 'vue-resource';
import axios from 'axios';
Vue.use(VueResource);
Vue.prototype.Axios = axios;

// https://www.npmjs.com/package/axios

// import VueRx from 'vue-rx'
// Vue.use(VueRx);

import '../static/fonts/iconfont.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueI18n  from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
      'zh': require('@/assets/languages/zh.json'),
      'en': require('@/assets/languages/en.json'),
      'tw': require('@/assets/languages/tw.json')
    }
});



Vue.use(ElementUI, {
    i18n: (key,value) => i18n.t(key,value)
});

import common from './store/index';
Vue.prototype.commonService = common;

let apiService = '//api.bi.ceo/api/services/app/';
Vue.prototype.apiService = apiService;

Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('__accessToken');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
