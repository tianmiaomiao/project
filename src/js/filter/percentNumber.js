/**
 * Created by tianmiao on 2018/3/20.
 */
import Vue from 'vue';

//数字*100
Vue.filter('percentNumber', function (value) {
    return ((value*1000000)/10000).toFixed(2);
});