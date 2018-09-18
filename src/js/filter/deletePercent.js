/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//去除百分号
Vue.filter("deletePercent", function (str) {
    if(!str) return '0.00';
    var val = str.replace('%', "")*1;
    return val.toFixed(2);
});
