/**
 * Created by tianmiao on 2018/4/02.
 */
"use strict";
import config from '../config'
import http from '../lib/Net'
(()=>{
    var shareConfig = {};
    var shareData = Object.assign({},config.WX_SHARE.defaultItem,{
        imgUrl : 'http://n.sinaimg.cn/finance/72ef19b4/20180409/JiJin.png'
    });
    var apiflag = false;
    http({
        port : 'getLightAppParams',
        method: "post",
        data : {
            url : window.location.href
        },
        loginRuleOut : true,
        openLoader : false,
        closeIntercept : true
    }).then((res)=>{
        if(res.code == 0){
            shareConfig = res.data;
            setShare(res.data)
        }else{
            apiflag = true;
        }
    });

    function setShare(data) {
        WeiboJS.init({
            appkey: data.appkey,
            timestamp: data.timestamp,
            noncestr: data.noncestr,
            signature: data.signature,
            scope: [
                'getNetworkType',
                'networkTypeChanged',
                'getBrowserInfo',
                'checkAvailability',
                'setBrowserTitle',
                'openMenu',
                'setMenuItems',
                'menuItemSelected',
                'setSharingContent',
                'openImage',
                'scanQRCode',
                'pickImage',
                'getLocation',
                'pickContact',
                'apiFromTheFuture'
            ]
        }, function(ret) {
            window.isInit = true;
            if (ret.code == 200) {
                WeiboJS.invoke("setMenuItems", {
                    menus: ["shareToWeibo", "shareToWeixin", "follow"],
                    title: shareData.title,
                    icon: shareData.imgUrl,
                    content: encodeURIComponent(shareData.title + shareData.desc + window.location.href),
                },
                function(e) {
                });

                WeiboJS.invoke("setSharingContent", {
                    title: shareData.desc,
                    icon : shareData.imgUrl,
                    desc : shareData.title,
                }, function(params){
                });
            }
        });
    }

    window.wbShareInit = function (option) {
        var item = option.curItem || 'defaultItem';
        shareData = config.WX_SHARE[item];
        try {
            setShare(shareConfig)
        }catch (e){}
    }
})();