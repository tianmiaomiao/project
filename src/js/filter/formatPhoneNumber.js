/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//隐藏手机号中间数字
Vue.filter('formatPhoneNumber', function (str) {
    return Util.formatPhoneNumber(str)
});