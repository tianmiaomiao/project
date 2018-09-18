/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//去除空格
Vue.filter("getNumTrim", function (num) {
    if(!num) return;
    return num.replace(/[^0-9]/ig, "");
});
