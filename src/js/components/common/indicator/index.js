/**
 * Created by tianmiao on 2017/7/25.
 */
import Vue from 'vue';
import IndicatorTheme from './indicator.vue'

var IndicatorConstructor = Vue.extend(IndicatorTheme);
var instance;

const open = (options) => {
    if (!instance) {
        instance = new IndicatorConstructor({
            el: document.createElement('div')
        });
    }
    if (instance.visible) return;

    var defaults = {
        text: '',
        size: '.8rem'
    };

    if (typeof options === 'string') {
        instance = Object.assign(instance, defaults, {text: options})
    } else {
        instance = Object.assign(instance, defaults, options)
    }

    instance.hideIndicator = close;

    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;

        // setTimeout(() => {
        //     if(instance){
        //         let clientWidth = instance.$el.children[0].clientWidth;
        //         let clientHeight = instance.$el.children[0].clientHeight;
        //
        //         instance.offLeft = -clientWidth / 2 + 'px';
        //         instance.offTop = -clientHeight / 2 + 'px';
        //     }
        // }, 20);
    });
};

const close = () => {
    if (instance) {
        instance.visible = false;
        instance.$destroy();
        instance.$el.remove();
        instance = null;
    }
};
const succeed = (msg) => {
    if (instance) {
        instance.succeed = true;
        instance.text = msg;
    }
};
const Indicator = {
    open: open,
    close: close,
    succeed: succeed
};

export default Indicator;
export {Indicator};
