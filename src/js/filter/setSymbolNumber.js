/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//金额格式化小数点后两位
Vue.filter('setSymbolNumber', function (value) {
    return value > 0 ? `+${value}%` : `${value}%`;
});