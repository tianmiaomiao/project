/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//金额格式化小数点后两位
Vue.filter('setClass', function (value) {
    if(typeof value == 'undefined' || value == '--'){
        value = '0'
    }
    value = value + '';
    if(value.indexOf('%') > -1){
        value = value.replace("%","");
    }
    if(value.indexOf(',') > -1){
        value = value.replace(",","");
    }

    return value*1 > 0 ? 'red' :  value*1 < 0 ? 'green' : '';
});