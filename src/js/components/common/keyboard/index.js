

import Vue   from 'vue';
import Keyboarder from './keyboard.vue';

var KeyboardConstructor = Vue.extend(Keyboarder);

var instance;
var isShow = false;
var dom;

const hide = () => {
    if(instance){
        instance.visible = false;
        isShow = false;

        setTimeout(() => {
            instance.rendered = false;
            instance.$destroy();
            instance.$el.remove();
            instance = null;
        }, 300);
    }
}
const close = () => {
    if(instance){
        isShow = false;
        instance.visible = false;
        instance.rendered = false;
        instance.$destroy();
        instance.$el.remove();
        instance = null;
    }
}
const clearValue = () =>{
    if(instance){
        instance.clearValue();
    }
}

var Keyboard = (options) => {
    instance = new KeyboardConstructor({
        el: document.createElement('div')
    });

    document.body.appendChild(instance.$el);

    for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
        }
    }

    instance.type = options.type || 'inputKeys';
    instance.hideMask = options.hideMask || false;

    if (instance.type == 'inputKeys' && instance.showPoint) {
        var key = instance.keys[instance.keys.length - 3];
        key.type = 'point';
        key.value = '.';
        instance.setPoint = '·';
        instance.keys[instance.keys.length - 3] = key;
    }else if(instance.type == 'inputKeys' && instance.showX){
        var key = instance.keys[instance.keys.length - 3];
        key.type = 'symbol';
        key.value = 'X';
        instance.keys[instance.keys.length - 3] = key;
    }else{
        var key = instance.keys[instance.keys.length - 3];
        key.type = 'point';
        key.value = '';
        instance.setPoint = '';
        instance.keys[instance.keys.length - 3] = key;
    }

    instance.hideKeyBoard = function () {
        if(instance.type != 'inputKeys'){
            instance.password = [];
        }
        hide()
    };

    //数字键盘接收已有数字
    if(!options.initVal){
        instance.inputVal = [];
    }else{
        instance.inputVal = options.initVal.toString().split('');
    }

    if(options.hidePassword){
        instance.hidePassword = true;
    }

    Vue.nextTick(() => {
        instance.visible = true;
        isShow = true;
        dom = options.dom;
    });
};
var showKeyboard = (options) => {
    if(dom && dom == options.dom && instance){
        return;
    };
    if(instance){
      close();
    }
    Keyboard(options)
};

showKeyboard.hide = hide;
showKeyboard.clearValue = clearValue;
window.addEventListener('popstate', function () {
    //触发浏览器历史记录时触发关闭事件
    showKeyboard.hide()
});
window.addEventListener('click',function(e) {
    //触点不同  并且已开启时除非关闭事件
    if(dom !== e.target && isShow){
        showKeyboard.hide()
    }
});


export default showKeyboard;
