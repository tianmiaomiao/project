<!-- axios 接口组件封装 -->
```
一、 全局引入插件 (main.js 已引入)
       import http from './api/index' 
       Vue.prototype.$http = http;

二、参数配置调用
    this.$http({
        port : 'getRecommendProducts',      // 接口port 或 接口绝对路径
        method: 'get',                      // 请求方式 默认 get
        data : {
            type : '1'                      // 其他参数
        },
        loginRuleOut : true,                //是否关闭接口登录拦截 
        closeIntercept : false,             //是否关闭拦截器 默认开启false
        openLoader:true                     // 是否开启loading 默认关闭
        error : function(){                 // 接口异常时处理一些按钮状态等
            vm.status = false
        }
    }).then((res)=>{
        console.log(res)                    // 返回请求结果
    })
    
三、备注
    如需要多线程请求 可以用 Promise.all() 或其他方法实现；
    index.js  暂时只配置了接口路径前缀
```
