/**
 * Created by tianmiao on 2018/4/02.
 */
"use strict";
import conf from '../config'
import http from '../lib/Net'
(()=>{
    var wxConfig = {
        debug    : DEBUG,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    },

    //分享的数据
    shareData= {

        //朋友圈数据
        timeline: {},

        //分享给朋友
        appMessage: {}
    },
    wxApi = '//licaishi.sina.com.cn/weixin/publicPlatform/WxJsApiConfig';
    const wxShare = function (option) {
        var self = this;

        self.init(option);
        wx.ready(function () {
            self.readyCallback()
        });
    };
    wxShare.prototype = {
        init : function (_config) {
            var self = this;
            _config = _config || {};

            var config = _config.wxConfig,
                data   = _config.shareData,
                curItem = _config.curItem || 'defaultItem';

            wxConfig = Object.assign({}, wxConfig, config);

            var _shData = Object.assign({}, conf.WX_SHARE[curItem],{
                link : window.location.href,
                imgUrl: 'http://n.sinaimg.cn/finance/72ef19b4/20180409/JiJin.png'
            });

            if (!data) {
                shareData = {
                    timeline: _shData.timeline || _shData,
                    appMessage: _shData.appMessage || _shData
                };
            } else {

                shareData.timeline = shareData.timeline || _shData.timeline || _shData;
                shareData.appMessage = shareData.appMessage || _shData.appMessage || _shData;
            }

            //分享到朋友圈标题+描述
            shareData.timeline.title = shareData.timeline.title + shareData.timeline.desc;

            self.getWXConfig();
        },
        getWXConfig : function () {
            var self = this;
            http({
                port : wxApi,
                baseURL : '',
                data : {
                    url : window.location.href
                },
                openLoader : false,
                closeIntercept : true
            }).then((json)=>{
                json = typeof json === 'string' ? eval('(' + json + ')') : json;

                if(json && json.code == 0){
                    var conf = json.data || [];
                    if(Array.isArray(conf) && conf.length == 0){
                        self.doConf(new Error('empty!'));
                    }else{
                        self.doConf(null,conf);
                    }
                }else{
                    self.doConf(new Error(json.msg));
                }
            });
        },
        doConf : function(err, config){
            var self = this;
            if(err){
                setTimeout(function(){
                    self.getWXConfig();
                },1000);
                return false;
            }

            self.setConf(Object.assign({}, wxConfig, config));
        },
        setConf :function (config){
            wx.config(config);
        },
        readyCallback :function () {
            wx.onMenuShareTimeline(shareData.timeline);
            wx.onMenuShareAppMessage(shareData.appMessage);
        }
    };

    window.wxShareInit = function (option) {
        setTimeout(()=>{
            new wxShare(option)
        },10)
    }
})();