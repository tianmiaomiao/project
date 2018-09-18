/**
 * Created by tianmiao on 2018/3/21.
 */
import Vue from 'vue'
import VueMatomo from 'vue-matomo'
import router from '../router'

Vue.use(VueMatomo, {
    // Configure your matomo server and site
    host: 'http://statictics.jr.sina.com.cn',
    siteId: 3,

    // Enables automatically registering pageviews on the router
    router: router,

    // Require consent before sending tracking information to matomo
    // Default: false
    requireConsent: false,

    // Whether to track the initial page view
    // Default: true
    trackInitialView: true
})