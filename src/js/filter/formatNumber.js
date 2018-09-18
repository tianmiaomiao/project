/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//金额格式化小数点后两位
Vue.filter('formatNumber', function (value) {
    return isNaN(Number(value)) ? 0 : Number(value).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
});