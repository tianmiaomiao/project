/**
 * Created by tianmiao on 2017/8/28.
 */

import Vue from 'vue'
import dropMenu from './dropMenu.vue'

var DropConstructor = Vue.extend(dropMenu);

var instance;

const closeDropDown = () => {
    instance.visible = false;

    setTimeout(() => {
        instance.rendered = false;
        instance.$destroy();
        instance.$el.remove();
        instance = null;
    }, 300);
};

const DropDown = (event,option,parent) => {
    if (!instance) {
        instance = new DropConstructor({
            el: document.createElement('div')
        });

        event.appendChild(instance.$el);

        Object.assign(instance,option);

        instance.maskHide = function () {
            closeDropDown()
        };
        instance.selectItem = function (key) {
            let isCallBack = instance.callback && typeof instance.callback === 'function';

            instance.typeData.curItem = parent.curItem = key || 0;

            if(isCallBack){

                instance.callback(key);
            }
            closeDropDown()
        };

        Vue.nextTick(() => {
            instance.visible = true;
        });
    }
};

DropDown.hide = (()=>{
    if(instance){
        closeDropDown()
    }
});

window.addEventListener('popstate', function () {
    DropDown.hide();
});
export default DropDown;
export { DropDown }
