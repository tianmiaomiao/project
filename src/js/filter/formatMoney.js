/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//金额格式化不带小数点
Vue.filter("formatMoney", function (number, places, symbol, thousand, decimal) {
    /**
     * number   {String|Number} 金额
     * places   {String} 小数位数
     * symbol   {String} 符号  如 $1000 默认空
     * thousand {String} 千位符号 默认 ','
     * decimal  {String} 小数点符号 默认 '.'
     */
    return Util.formatMoney(number, places, symbol, thousand, decimal)
});