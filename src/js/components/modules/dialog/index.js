/**
 * Created by tianmiao on 2018/6/1.
 */
import Vue from 'vue'
import Dialog from './dialog.vue'
const DialogConstructor = Vue.extend(Dialog)

const noop = function() {}

const generate = function({title = '',align = 'center', icon = '', content = '', closable = false, btns = []}) {
    const vm = new DialogConstructor({
        propsData: {
            value: false,
            title,
            icon,
            align,
            content,
            closable,
            btns,
        },
    }).$mount()

    vm.$on('input', val => {
        if (!val) {
            vm.value = false
        }
    })
    vm.$on('hide', () => {
        vm.$destroy()
    })

    return vm
}

Dialog.confirm = ({title = '',align = 'center', icon = '', content = '', cancelText = '取消', confirmText = '确定', onConfirm = noop}) => {
    const vm = generate({
        title,
        icon,
        align,
        content,
        btns: [
            {
                name:'cancel',
                text: cancelText,
                handler: () => vm.close(),
            },
            {
                name:'ok',
                text: confirmText,
                handler: () => {
                    if (onConfirm() !== false) {
                        vm.close()
                    }
                },
            },
        ],
    });

    vm.value = true;

    return vm
}

Dialog.alert = ({title = '',align = 'center', icon = '', content = '', confirmText = '确定', onConfirm = noop}) => {
    const vm = generate({
        title,
        icon,
        align,
        content,
        btns: [
            {
                name:'ok',
                text: confirmText,
                handler: () => {
                    if (onConfirm() !== false) {
                        vm.close()
                    }
                },
            },
        ],
    });

    vm.value = true;

    return vm
}

// Dialog.succeed = props => {
//     props.icon = 'circle-right'
//     return Dialog.confirm(props)
// }
//
// Dialog.failed = props => {
//     props.icon = 'circle-cross'
//     return Dialog.confirm(props)
// }

export default Dialog
