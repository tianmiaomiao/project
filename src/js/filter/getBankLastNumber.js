/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//获取银行卡尾号
Vue.filter("getBankLastNumber", function (bankNumber) {
    if(!bankNumber) return;
    return (bankNumber + "").substr(-4);
});