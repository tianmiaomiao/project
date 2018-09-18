/**
 * Created by tianmiao on 2017/7/21.
 */

import Vue from 'vue'
import Dialog from './Dialog.vue'

var DialogConstructor = Vue.extend(Dialog);

var instance;

const closeMessageBox = () => {
    if(instance){
        instance.visible = false;

        setTimeout(() => {
            instance.rendered = false;
            instance.$destroy();
            instance.$el.remove();
            instance = null;
        }, 300);
    }
};

const MessageBox = (option) => {

    if (!instance) {
        instance = new DialogConstructor({
            el: document.createElement('div')
        });

        document.body.appendChild(instance.$el);

        Object.assign(instance, option);

        instance.hideDialog = function (action) {
            let isCallBack = instance.callback && typeof instance.callback === 'function';
            let isCancel = instance.cancel && typeof instance.cancel === 'function';
            if (action == 'cancel' && isCancel) {

                instance.cancel();
            }
            if (action == 'confirm' && isCallBack) {

                instance.callback();
            }
            closeMessageBox()
        };

        Vue.nextTick(() => {
            instance.visible = true;
            setTimeout(() => {

                let clientHeight = document.documentElement.clientHeight;
                let dialogHeight = instance.$el.children[1].clientHeight;

                instance.offtop = (clientHeight - dialogHeight) / 2 + 'px';
            }, 10);
        });
    }
};

var defaults = {
    okTxt: '确定',
    cancelTxt : '取消'
};

MessageBox.alert = function (option) {
    const {topic, title, okTxt, message, textAlign} = Object.assign({}, defaults, option);
    return MessageBox({
        type: 'alert',
        topic,
        title,
        okTxt,
        message,
        textAlign
    })
};
MessageBox.confirm = function (option) {
    const {topic, title, okTxt, cancelTxt, message, textAlign, cancel, callback} = Object.assign({}, defaults, option);
    return MessageBox({
        type: 'confirm',
        topic,
        title,
        okTxt,
        cancelTxt,
        message,
        textAlign,
        cancel,
        callback
    })
};

window.addEventListener('popstate', function () {
    if(instance){
        closeMessageBox()
    }
});
export default MessageBox;
export {MessageBox};
