/**
 * Created by tianmiao on 2018/2/23.
 */
import Vue from 'vue';

//隐藏中间数字
Vue.filter('hideMiddleNum', function (str) {
    if(!str) return;
    const _str = "" + str.replace(/\s/g, "");
    return [_str.substr(0, 4), "****", "****", _str.substr(-4)].join(" ");
});