// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './js/router'
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import store from './js/vuex'
import localStore from 'store'
import Util from './js/lib/Util'
import http from './js/lib/Net'
import './js/filter'
import './js/global'
import './js/global/matomo.js'

Vue.use(VueLazyload);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
});
Vue.prototype.$http = http;

Vue.config.productionTip = false;

window.bus = new Vue();

// window.replaceHistoryState('http://test.jr.sina.com.cn/index.html#/demo?k=1','新浪金融');

Vue.use(require('vue-wechat-title'));

//vue原型下引入本地存储
Vue.prototype.$localStore = localStore;

//处理部分input因FastClick组件导致点击失效问题
// FastClick.prototype.onTouchEnd = function(event) {
//     if (event.target.nodeName == 'INPUT') {
//         return false;
//     }
// };
FastClick.attach(document.body);
new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: {App}
});