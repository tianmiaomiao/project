/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//银行卡格式化
Vue.filter("formatBankNumber", function (str) {
    return Util.formatBankNumber(str)
});