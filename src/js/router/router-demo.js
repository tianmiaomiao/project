/**
 * Created by tianmiao on 2018/5/31.
 */
import Vue                  from 'vue'
import Router               from 'vue-router'

const VDemo             = r => require.ensure([], () => r(require( '../../views/demo/demo.vue')), 'demo');                       //公告
const VInputItem        = r => require.ensure([], () => r(require( '../../views/demo/input-item.vue')), 'input-item');                       //公告
const VListItem         = r => require.ensure([], () => r(require( '../../views/demo/list-item.vue')), 'list-item');                       //公告
const VButton           = r => require.ensure([], () => r(require( '../../views/demo/button.vue')), 'button');                       //公告
const VPopup            = r => require.ensure([], () => r(require( '../../views/demo/popup.vue')), 'popup');
const VToast            = r => require.ensure([], () => r(require( '../../views/demo/toast.vue')), 'toast');
const VDialog           = r => require.ensure([], () => r(require( '../../views/demo/dialog.vue')), 'dialog');
const VPicker           = r => require.ensure([], () => r(require( '../../views/demo/picker.vue')), 'picker');
const VPickerDate       = r => require.ensure([], () => r(require( '../../views/demo/pickerdate.vue')), 'pickerdate');
const VTradeKeyboard    = r => require.ensure([], () => r(require( '../../views/demo/tradeKeyboard.vue')), 'tradeKeyboard');

const routes = {
    routes: [
        {
            path: '/demo',
            component: VDemo,
            name: 'VDemo',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/inputItem',
            component: VInputItem,
            name: 'VInputItem',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/listItem',
            component: VListItem,
            name: 'VListItem',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/button',
            component: VButton,
            name: 'VButton',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/popup',
            component: VPopup,
            name: 'VPopup',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/toast',
            component: VToast,
            name: 'VToast',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/dialog',
            component: VDialog,
            name: 'VDialog',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/picker',
            component: VPicker,
            name: 'VPicker',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/pickerDate',
            component: VPickerDate,
            name: 'VPickerDate',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        },
        {
            path: '/tradeKeyboard',
            component: VTradeKeyboard,
            name: 'VTradeKeyboard',
            meta: {
                keepAlive : true,
                title : "新浪基金",
            }
        }
    ]
};
export default routes;