/**
 * Created by tianmiao on 2017/8/21.
 * 接口通用组件
 */
import axios from 'axios'
import Toast from '../components/modules/toast'
import Indicator from '../components/common/indicator/index'
import qs from 'qs'
import config from '../config'

const Net = ((option) => {
    if (!option.port) return;
    Object.assign(option,{ baseUrl : config.PORT_URI });

    let RES = {
        method: option.method || "GET",
        url: option.port,
        baseURL : option.baseUrl,
        transformRequest:[function(data){
            //请求发送前序列化数据 该选项只针对 'put/post/patch'生效
            return qs.stringify(data);
        }],
        closeIntercept : option.closeIntercept || false,
        withCredentials : true,
        loginRuleOut    : option.loginRuleOut || false,
        // timeout: 5000,
    };
    //参数增加随机数 防止读取缓存数据
    option.data = Object.assign({}, option.data,{_ : Date.now()});

    if (RES.method.toUpperCase() == 'POST') {
        Object.assign(RES, {data: option.data});
    } else {
        Object.assign(RES, {params: option.data});
    }

    if(option.openLoader){
        Indicator.open();
    }
    if(!RES.closeIntercept) {
        // 添加请求拦截器
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (err) {
            // 对请求错误做些什么
            option.error && option.error();
            return Promise.reject("请求失败，请检查您的网络！");
        });

        // 添加响应拦截器
        axios.interceptors.response.use(function (res) {
            if (res && res.status === 200) {
                //统一处理需要登录接口跳转登录页面
                if(res.data.code == -1001 && !RES.loginRuleOut){
                    // config.goToLogin();
                }
            }

            // 对响应数据做点什么
            return res;
        }, function (err) {
            // 对响应错误做点什么
            option.error && option.error();
            return Promise.reject("请求超时，请重试！");
        });
    }
    return new Promise((resolve, reject) => {
        return axios(RES).then((res) => {
            if(option.openLoader){
                Indicator.close();
            }
            resolve(res.data);
        }).catch(function (error) {
            Indicator.close();
            //错误提示
            //针对部分接口关闭拦截错误提示
            if(!RES.closeIntercept){
                Toast.info(error);
            }
        });
    })
});

export default Net;
