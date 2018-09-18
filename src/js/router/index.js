import Vue                  from 'vue'
import Router               from 'vue-router'
import RouterDemo           from './router-demo'
import http                 from '../lib/Net'
import config               from '../config'

const VIndex            = r => require.ensure([], () => r(require( '../../views/index/index.vue')), 'index');

Vue.use(Router);
const routes = {
    // 不用历史记录模式
    // mode : 'history',
    routes: [
        {path: '/', redirect: '/index'},
        {path: '*', redirect: '/index'},
        {
            path: '/index',
            component: VIndex,
            name: 'VIndex',
            meta: {
                keepAlive : true,
                title : "新浪基金",
                loginCheckState : false,
                openCheckState : false,
                phoneCheckState : false

            }
        }
    ]
};

if(DEBUG){
    //本地环境push demo路由
    for (var key in RouterDemo.routes){
        routes.routes.push(RouterDemo.routes[key])
    }
}
const VueRouter = new Router(routes);


// VueRouter.beforeEach((to, from, next) => {
// VueRouter.beforeEach((to, from, next) => {
//     // loginCheckState // 需要登录页面拦截状态
//     // phoneCheckState // 需要绑定手机号页面拦截状态
//     // openCheckState  // 需要开户页面拦截状态
//
//     if(to.meta.loginCheckState || to.meta.phoneCheckState || to.meta.openCheckState){
//         http({
//             port : 'userStatus',
//             openLoader : false,
//         }).then((res)=>{
//             if(res.code == 0){
//                 if(to.meta.loginCheckState && res.data.is_login == '0'){
//                     config.goToLogin();
//                     return;
//                 }
//                 if(to.meta.phoneCheckState && res.data.is_bind_phone == 0){
//                     next({ path: '/openAccount' });
//                     return;
//                 }
//                 if(to.meta.openCheckState && (res.data.is_bind_phone == '0' || res.data.is_certification == '0' || res.data.is_bind_card == '0')){
//                     next({ path: '/openAccount' });
//                     return;
//                 }
//                 if(to.path == '/openAccount' && res.data.is_bind_phone == '1' && res.data.is_certification == '1' && res.data.is_bind_card == '1'){
//                     next({ path: '/index' });
//                     return;
//                 }
//                 next();
//             }else if(res.code == -1001 && to.meta.loginCheckState){
//                 if(to.meta.loginCheckState){
//                     config.goToLogin();
//                     return;
//                 }
//                 next();
//             }
//         })
//     }else{
//         next()
//     }
// });

export default VueRouter;