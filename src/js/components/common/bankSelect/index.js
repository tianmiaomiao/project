/**
 * Created by tianmiao on 2018/3/6.
 */

import Vue from 'vue'
import bankSelect from './bankSelect.vue'

var BankSelectConstructor = Vue.extend(bankSelect);

var instance;

const closeSelect = () => {
    instance.visible = false;

    setTimeout(() => {
        instance.rendered = false;
        instance.$destroy();
        instance.$el.remove();
        instance = null;
    }, 300);
};

const BankSelect = (option) => {
    if (!instance) {
        instance = new BankSelectConstructor({
            el: document.createElement('div')
        });

        document.body.appendChild(instance.$el);

        Object.assign(instance,option);

        instance.closeBankSelect = function () {
            closeSelect()
        };
        instance.selectItem = function (item,key) {
            if(item.ishide) return;
            let isCallBack = instance.callback && typeof instance.callback === 'function';

            instance.typeData.curItem = key || 0;

            if(isCallBack){

                instance.callback(key);
            }
            closeSelect()
        };

        Vue.nextTick(() => {
            instance.visible = true;
        });
    }
};

BankSelect.hide = (()=>{
    if(instance){
        closeSelect()
    }
});
window.addEventListener('popstate', function () {
    BankSelect.hide()
});
export default BankSelect;
export { BankSelect }
