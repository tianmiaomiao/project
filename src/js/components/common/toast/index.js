import Vue from 'vue'
import toast from './toast.vue'
var ToastConstructor = Vue.extend(toast);

let removeDom = event => {
    event.target.remove()
}
ToastConstructor.prototype.close = function () {
    this.visible = false
    this.$el.addEventListener('transitionend', removeDom)
}
const Toast = (options = {}) => {
    let instance = new ToastConstructor().$mount(document.createElement('div'))
    let duration = options.duration || 2000
    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.position || 'middle'
    document.body.appendChild(instance.$el)
    instance.visible = true
    Vue.nextTick(() => {
        instance.timer = setTimeout(function () {
            instance.close()
        }, duration)
    })
    return instance
}
export default Toast
