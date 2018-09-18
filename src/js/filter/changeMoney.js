/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//金额格式化不带小数点
Vue.filter("changeMoney", function (money) {
    if(!money) return;
    return money > 10000 ? `${money / 10000}万` : money;
});