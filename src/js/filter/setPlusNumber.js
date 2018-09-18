/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//数字加正号 返回保留两位小数 数值
Vue.filter('setPlusNumber', function (value) {
    if(/%/.test(value)){
        value = value.replace("%","");
    }
    if(/,/.test(value)){
        value = value.replace(",","");
    }
    var val = isNaN(Number(value)) ? '0.00' : Number(value).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    return value > 0 ? `+${val}` : `${val}`;
});