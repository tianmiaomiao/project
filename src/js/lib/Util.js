/**
 * Created by tianmiao on 2017/8/30.
 */

!function (exports) {
    "use strict";
    var Util = exports.Util || (exports.Util = {});

    Util.debug = process.env.NODE_ENV == "development";

    Util.log = function (str) {
        if(!str) return false;
        if (Util.debug) return console.log(str);
    };

    Util.setScale = function (scale) {
        const viewPort = document.querySelector('meta[name=viewport]')

        if (!viewPort) {
            return
        }
        const viewPortContent = viewPort.getAttribute('content')
        const viewPortContentParts = viewPortContent.split(',')

        let newViewPortContent = ''

        for (let i = 0, len = viewPortContentParts.length; i < len; i++) {
            const attr = viewPortContentParts[i]
            if ((attr.indexOf('initial-scale') >= 0) || (attr.indexOf('maximum-scale') >= 0) || (attr.indexOf('minimum-scale') >= 0)) {
                continue
            } else {
                newViewPortContent += `${attr},`
            }
        }
        newViewPortContent += `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no, minimal-ui`;
        viewPort.setAttribute('content', newViewPortContent)
    };

    //设置cookie
    Util.setCookie = function (cname, cvalue, exdays) {
        if(!cname) return;
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };
    //获取cookie
    Util.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };
    //清除cookie
    Util.clearCookie = function (name) {
        Util.setCookie(name, "", -1);
    };

    //动态加载外部js
    Util.loadJS = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.callback = typeof callback != "undefined" ? callback : new Function();
        script[document.all ? "onreadystatechange" : "onload"] = function () {
            if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                return;
            }
            this.callback(this);
            this.callback = null;
            this[document.all ? "onreadystatechange" : "onload"] = null;
            this.parentNode.removeChild(this);
        };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    Util.trimValue = function(value) {
        value = typeof value === 'undefined' ? '' : value
        const reg = new RegExp(' ', 'g')
        value = value.toString().replace(reg, '')
        return value
    }

    Util.formatBankNumber = function (str) {
        if(!str) return "";
        str = str.replace(/ /g, '');
        var ns = [], sp = '', s = str.split(''), i = 0, l = s.length, j;

        for (; i < l; i++) {
            j = i + 1;
            sp = j % 4 === 0 ? sp = ' ' : sp = '';
            ns.push(s[i].replace(/[^0-9]/ig, "") + sp);
        }
        return ns.join('').replace(/ $/, '');
    };
    Util.formatPhoneNumber = function (str) {
        if(!str) return "";
        str = str.replace(/ /g, '');
        var ns = [], sp = '', s = str.split(''), i = 0, l = s.length, j;

        for (; i < l; i++) {
            j = i + 1;
            sp = j === 3 || j === 7 ? sp = ' ' : sp = '';
            ns.push(s[i].replace(/[^0-9]/ig, "") + sp);
        }
        return ns.join('').replace(/ $/, '');
    };
    //手机号加密
    Util.encryptPhoneNumber = function (str) {
        if(!str) return;
        var _str = "" + str.replace(/\s/g, "");
        return [_str.substr(0, 3), "****", _str.substr(-4)].join(" ");
    }
    //银行卡号加密
    Util.encryptBankNumber = function (str) {
        if(!str) return;
        var _str = "" + str.replace(/\s/g, "");
        return [_str.substr(0, 4), "****","****", _str.substr(-4)].join(" ");
    }

    //金额格式化
    Util.formatMoney = function (number, places, symbol, thousand, decimal) {
        /**
         * number   {String|Number} 金额
         * places   {String} 小数位数
         * symbol   {String} 符号  如 $1000 默认空
         * thousand {String} 千位符号 默认 ','
         * decimal  {String} 小数点符号 默认 '.'
         */
        if(!number) return "";
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        let negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = i.length > 3 ? i.length % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };

    //获取url参数
    Util.getQueryString = function (name) {
        if(!name) return;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = encodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    //是否手机号
    Util.isPhoneNumber = function (n) {
        if(!n) return false;
        return /^1[\d]{10}$/.test(n);
    };
    //是否为中文名字
    Util.isCnName = function(str){
        if(!str) return false;
        return /^[\u4e00-\u9fa5 ]{2,8}$/.test(str);
    };
    //6位数字密码
    Util.isPassWord = function (pass) {
        var pass = pass.toString();
        // 连续数字
        var str = pass.replace(/\d/g, function($0, pos){  //+
            return parseInt($0) - pos;
        });
        var pour = pass.replace(/\d/g, function($0, pos){  //-
            return parseInt($0) + pos;
        });

        if(!/^\d{6}$/.test(pass)){
            return {
                status : false,
                tip : '请输入6位数字密码'
            };
        }
        if (/^(\d)\1+$/.test(pass)){
            return {
                status : false,
                tip : '支付密码不能为重复数字'
            };
        }
        if(/^(\d)\1+$/.test(str) || /^(\d)\1+$/.test(pour)){
            return {
                status : false,
                tip : '支付密码不能为连续数字'
            };
        }
        return {
            status : true,
            tip : ''
        }
    };

    //是否银行卡号
    Util.isBankNumber = function (str) {
        if(!str) return;
        var res = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/;
        var val = str.toString().replace(/\s+/g, "");

        return res.test(val)
    };

    //银行卡号格式化
    Util.formatBankNumber = function (str) {
        if(!str) return;
        str = str.replace(/ /g, '');
        var ns = [], sp = '', s = str.split(''), i = 0, l = s.length, j;

        for (; i < l; i++) {
            j = i + 1;
            sp = j % 4 === 0 ? sp = ' ' : sp = '';
            ns.push(s[i].replace(/[^0-9]/ig, "") + sp);
        }
        return ns.join('').replace(/ $/, '');
    };

    //获取后4位
    Util.getBankLastNumber = function (bankNumber) {
        if(!bankNumber) return;
        return (bankNumber + "").substr(-4);
    };

    //隐藏中间数字
    Util.hideMiddleNumber = function (str) {
        if(!str) return;
        var _str = "" + str.replace(/\s/g, "");
        return [_str.substr(0, 4), "****", "****", _str.substr(-4)].join(" ");
    };

    //获取纯数字去除空格
    Util.getNumTrim = function (num) {
        if(!num) return;
        return num.replace(/[^0-9]/ig, "");
    };

    // 是否身份证号
    Util.isIdNumber = function (sId) {
        //return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(sId);

        var iSum = 0;
        var info = "";
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        if (!/^\d{17}(\d|x)$/i.test(sId))return false;
        sId = sId.replace(/x$/i, "a");
        if (aCity[parseInt(sId.substr(0, 2))] == null)return false;
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))return false;
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 != 1)return false;
        return true;
    };

    //格式化日期
    Util.initDate = function (date, fmt) {
        // var myDate = new Date() ; initDate(myDate,"yyyy-MM-dd")
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    Util.timeDiff = function(time1,time2){
        if(arguments.length === 1){
            time2 = time1;
            time1 = 0;
        }
        if(typeof time1 === 'string'){
            time1 = Util.strToTime(time1);
        }
        if(typeof time2 === 'string'){
            time2 = Util.strToTime(time2);
        }
        var diff = (time2 - time1) / 1000,
            dd = parseInt(diff / 60 / 60 / 24 , 10),
            hh = parseInt(diff / 60 / 60 , 10),
            mm = parseInt(diff / 60 % 60,10),
            ss = parseInt(diff % 60,10);
        return diff >= 0 ? {
            dd:Util.preFull(dd),
            hh:Util.preFull(hh),
            mm:Util.preFull(mm),
            ss:Util.preFull(ss)
        } : false;
    };
    Util.strToTime = function(str){
        return Util.strToDate(str).getTime();
    };
    Util.strToDate = function(str){
        str = Util.makeString(str);
        var date = new Date(str.replace(/-/g,'/'));
        if((/Invalid/i).test(date)){
            date = new Date(null);
        }
        return date;
    };

    Util.getTime = Date.now || function () {
        return new Date().getTime();
    };

    Util.makeString = function (obj) {
        if(obj == null){
            return '';
        }
        return '' + obj;
    };

    Util.preFull = function (str, len, pre) {
        str += "";
        len = len || 2;
        pre = pre || "0";
        var start = str.length;
        for (; start < len; start++) {
            str = pre + str;
        }
        return str;
    };

    //version
    Util.Version = function () {
        "use strict";
        function Version(v) {

            Object.defineProperty(this, 'val', {
                value: v.toString(),
                enumerable: true
            });

            /**
             * 判断是否大于某个版本
             * @method gt
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否大于
             * @instance
             * @memberof Version
             */
            this.gt = function (v) {
                return Version.compare(this, v) > 0;
            };

            /**
             * 判断是否大于等于某个版本
             * @method gte
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否大于等于
             * @instance
             * @memberof Version
             */
            this.gte = function (v) {
                return Version.compare(this, v) >= 0;
            };

            /**
             * 判断是否小于某个版本
             * @method lt
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否小于
             * @instance
             * @memberof Version
             */
            this.lt = function (v) {
                return Version.compare(this, v) < 0;
            };

            /**
             * 判断是否小于等于某个版本
             * @method lte
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否小于等于
             * @instance
             * @memberof Version
             */
            this.lte = function (v) {
                return Version.compare(this, v) <= 0;
            };

            /**
             * 判断是否等于某个版本
             * @method eq
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否等于
             * @instance
             * @memberof Version
             */
            this.eq = function (v) {
                return Version.compare(this, v) === 0;
            };
        }

        /**
         * 返回当前版本字符串
         * @method toString
         * @return {String} 当前版本字符串
         * @instance
         * @memberof Version
         */
        Version.prototype.toString = function () {
            return this.val;
        };

        /**
         * 返回当前版本
         * @method valueOf
         * @return {Boolean} 当前版本
         * @instance
         * @memberof Version
         */
        Version.prototype.valueOf = function () {
            var v = this.val.split('.');
            var r = [];
            for (var i = 0; i < v.length; i++) {
                var n = parseInt(v[i], 10);
                if (isNaN(n)) {
                    n = 0;
                }
                var s = n.toString();
                if (s.length < 5) {
                    s = Array(6 - s.length).join('0') + s;
                }
                r.push(s);
                if (r.length === 1) {
                    r.push('.');
                }
            }
            return parseFloat(r.join(''));
        };

        /**
         * 返回当前版本字符串
         * @method compare
         * @param {String} v1 - 需要比较的版本1
         * @param {String} v2 - 需要比较的版本2
         * @return {Number} 0表示相等，-1表示小于，1表示大于
         * @memberof Version
         */
        Version.compare = function (v1, v2) {
            v1 = v1.toString().split('.');
            v2 = v2.toString().split('.');

            for (var i = 0; i < v1.length || i < v2.length; i++) {
                var n1 = parseInt(v1[i], 10), n2 = parseInt(v2[i], 10);

                if (window.isNaN(n1)) {
                    n1 = 0;
                }
                if (window.isNaN(n2)) {
                    n2 = 0;
                }
                if (n1 < n2) {
                    return -1;
                }
                else if (n1 > n2) {
                    return 1;
                }
            }
            return 0;
        };


        /**
         * 解析和操作版本号
         * @method version
         * @param {string} v - 需要解析的版本号
         * @return {Version} Verson实例
         * @memberof lib
         */
        return function (v) {
            return new Version(v);
        }
    }();

    //sinaApp

    Util.sinaApp = function () {
        var ua = window.navigator.userAgent,
            matched,
            name,
            platform,
            version;

        var sinaApp = false;

        if (!!ua.match(/lcs_/)) {
            name = 'Licaishi';
            matched = ua.match(/lcs_(\w+)_([\d\.]+)/i);
            platform = matched[1] === 'iOS' ? 'IOS' : (matched[1] === 'android' ? 'android' : 'unknown');
            version = matched[2];

            sinaApp = {
                appname: name,
                platform: platform,
                isAndroid: platform === 'android',
                isIOS: platform === 'IOS',
                isLicaishi: true,
                version: version
            }
        } else if (!!ua.match(/jr_/)) {
            name = 'Licaishi';
            matched = ua.match(/jr_(\w+)_([\d\.]+)/i);
            platform = matched[1] === 'iOS' ? 'IOS' : (matched[1] === 'android' ? 'android' : 'unknown');
            version = matched[2];

            sinaApp = {
                appname: name,
                platform: platform,
                isAndroid: platform === 'android',
                isIOS: platform === 'IOS',
                isLicaishi: true,
                version: version
            }
        }

        if (Util.Version && sinaApp) {
            sinaApp.version = Util.Version(sinaApp.version);
        }

        return sinaApp;
    }();

    //thirdApp

    Util.thirdApp = function () {
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        var thirdApp = false;

        if (!!ua.match(/Weibo/i)) {
            thirdApp = {
                appname: 'Weibo',
                isWeibo: true
            }
        } else if (!!ua.match(/MicroMessenger/i)) {
            thirdApp = {
                appname: 'Weixin',
                isWeixin: true,
                isWeiChat: true //兼容旧版
            }
        } else if ((matched = ua.match(/\s+QQ\/([\d\.]+)/)) && !!matched) {
            thirdApp = {
                appname: 'QQ',
                isQQ: true,
                version: Util.Version ? Util.Version(matched[1]) : matched[1]
            }
        } else if (!!ua.match(/sinafinance/)) {
            thirdApp = {
                appname: 'finance',
                isFinance: true
            }
        } else if (!!ua.match(/sinanews/)) {
            thirdApp = {
                appname: 'sinanews',
                isSinaNews: true
            }
        }

        return thirdApp;
    }();

    //Browser

    Util.browser = function () {
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        /**
         * @instance browser
         * @memberof lib
         * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
         * @property {lib.Version} version - 浏览器版本号
         * @property {Boolean} isUC - 是否是UC浏览器
         * @property {Boolean} isQQ - 是否是QQ浏览器
         * @property {Boolean} isIE - 是否是IE浏览器
         * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
         * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
         * @property {Boolean} isChrome - 是否是Chrome浏览器
         * @property {Boolean} isAndroid - 是否是Android的原生浏览器
         * @property {Boolean} isSafari - 是否是Safari浏览器
         * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
         */
        var browser = {
            name: "unknown",
            version: "0.0.0"
        };

        if ((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
            browser = {
                name: 'UC',
                isUC: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
            browser = {
                name: 'QQ',
                isQQ: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/Firefox|FxiOS\/([\d\.]+)/))) {
            browser = {
                name: 'Firefox',
                isFirefox: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

            browser = {
                version: matched[1]
            };

            if (ua.match(/IEMobile/)) {
                browser.name = 'IEMobile';
                browser.isIEMobile = true;
            } else {
                browser.name = 'IE';
                browser.isIE = true;
            }

            if (ua.match(/Android|iPhone/)) {
                browser.isIELikeWebkit = true;
            }
        } else if ((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
            browser = {
                name: 'Chrome',
                isChrome: true,
                version: matched[1]
            };

            if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
                browser.name = 'Chrome Webview';
                browser.isWebview = true;
            }
        } else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
            browser = {
                name: 'Android',
                isAndroid: true,
                version: matched[1]
            }
        } else if (ua.match(/iPhone|iPad|iPod/)) {
            if (ua.match(/Safari/)) {
                matched = ua.match(/Version\/([\d\.]+)/);
                browser = {
                    name: 'Safari',
                    isSafari: true,
                    version: matched && matched[1]
                }
            } else {
                matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
                browser = {
                    name: 'iOS Webview',
                    isWebview: true,
                    version: matched && matched[1].replace(/\_/, '.')
                }
            }
        }

        if (Util.Version) {
            browser.version = Util.Version(browser.version || '0.0.0');
        }

        return browser;

    }();
    //OS
    Util.os = function () {
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        var os = {
            name: "unknown",
            version: "0.0.0"
        };
        /**
         * @instance os
         * @memberof lib
         * @property {String} name - 操作系统名称，比如Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown等
         * @property {lib.Version} version - 操作系统版本号
         * @property {Boolean} isWindowsPhone - 是否是Windows Phone
         * @property {Boolean} isIPhone - 是否是iPhone/iTouch
         * @property {Boolean} isIPad - 是否是iPad
         * @property {Boolean} isIOS - 是否是iOS
         * @property {Boolean} isAndroid - 是否是Android手机
         * @property {Boolean} isAndroidPad - 是否是Android平板
         */


        if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
            os = {
                name: 'Windows Phone',
                isWindowsPhone: true,
                version: matched[1]
            }
        } else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
            os = {
                version: matched[1]
            };

            if (!!ua.match(/Mobile\s+Safari/)) {
                os.name = 'Android';
                os.isAndroid = true;
            } else {
                os.name = 'AndroidPad';
                os.isAndroidPad = true;
            }
        } else if ((matched = ua.match(/(iPhone|iPad|iPod)/))) {
            var name = matched[1];

            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

            os = {
                name: name,
                isIphone: (name === 'iPhone' || name === 'iPod'),
                isIpad: name === 'iPad',
                isIOS: true,
                version: matched[1].split('_').join('.')
            }
        }

        if (Util.Version) {
            os.version = Util.Version(os.version);
        }

        return os;

    }();
    //URL

    Util.URL = function () {

        var PROTOCAL = [
            'http', 'https', 'sinalicaishi', 'licaishi', 'sinalicaishiadmin', 'licaishiadmin'
        ];

        /**
         * 解析和操作url
         * @class HttpURL
         * @param {string} url - 需要解析和操作的url
         */
        function HttpURL(url) {
            var params = {};

            /**
             * 查询串键值对
             * @prop {Object} params
             * @memberof HttpURL
             * @instance
             */
            Object.defineProperty(this, 'params', {
                set: function (v) {
                    if (typeof v === 'object') {
                        for (var p in params) {
                            delete params[p];
                        }
                        for (var p in v) {
                            params[p] = v[p];
                        }
                    }
                },
                get: function () {
                    return params;
                },
                enumerable: true
            });

            Object.defineProperty(this, 'search', {
                set: function (v) {
                    if (typeof v === 'string') {
                        if (v.indexOf('?') === 0) {
                            v = v.substr(1);
                        }
                        var search = v.split('&');
                        for (var p in params) {
                            delete params[p];
                        }
                        for (var i = 0; i < search.length; i++) {
                            var pair = search[i].split('=');
                            if (pair[0]) {
                                try {
                                    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                                } catch (e) {
                                    params[pair[0]] = pair[1] || '';
                                }
                            }
                        }
                    }
                },
                get: function () {
                    var search = [];
                    for (var p in params) {
                        if (params[p]) {
                            try {
                                search.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
                            } catch (e) {
                                search.push(p + '=' + params[p]);
                            }
                        } else {
                            try {
                                search.push(encodeURIComponent(p));
                            } catch (e) {
                                search.push(p);
                            }
                        }
                    }
                    if (search.length) {
                        return '?' + search.join('&');
                    } else {
                        return '';
                    }

                },
                enumerable: true
            });

            var hash;
            Object.defineProperty(this, 'hash', {
                set: function (v) {
                    if (v && v.indexOf('#') < 0) {
                        v = '#' + v;
                    }
                    hash = v || '';
                },
                get: function () {
                    return hash;
                },
                enumerable: true
            });

            this.set = function (v) {
                v = v || '';
                var matchArr;
                if ((matchArr = v.match(new RegExp('^([a-z0-9-]+\:)?' +    //protocol
                        '[/]{2}' +                            //slash x 2
                        '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
                        '([^:/?#]+)' +                        //hostname
                        '(?:[:]([0-9]+))?' +                  //port
                        '([/][^?#;]*)?' +                     //pathname
                        '(?:[?]([^?#]*))?' +                  //search
                        '(#[^#]*)?$'                          //hash
                        , 'i')))) {
                    /**
                     * 协议头
                     * @member {String} protocol
                     * @memberof HttpURL
                     * @instance
                     */
                    this.protocol = matchArr[1] || location.protocol;
                    /**
                     * 用户名
                     * @member {String} username
                     * @memberof HttpURL
                     * @instance
                     */
                    this.username = matchArr[2] || '';
                    /**
                     * 密码
                     * @member {String} password
                     * @memberof HttpURL
                     * @instance
                     */
                    this.password = matchArr[3] || '';
                    /**
                     * 主机名
                     * @member {String} hostname
                     * @memberof HttpURL
                     * @instance
                     */
                    /**
                     * 主机名
                     * @member {String} host
                     * @memberof HttpURL
                     * @instance
                     */
                    this.hostname = this.host = matchArr[4];
                    /**
                     * 端口
                     * @member {String} port
                     * @memberof HttpURL
                     * @instance
                     */
                    this.port = matchArr[5] || '';
                    /**
                     * 路径
                     * @member {String} pathname
                     * @memberof HttpURL
                     * @instance
                     */
                    this.pathname = matchArr[6] || '/';
                    /**
                     * 查询串
                     * @member {String} search
                     * @memberof HttpURL
                     * @instance
                     */
                    this.search = matchArr[7] || '';
                    /**
                     * 锚点串
                     * @member {String} hash
                     * @memberof HttpURL
                     * @instance
                     */
                    this.hash = matchArr[8] || '';
                    /**
                     * 地址源
                     * @member {String} origin
                     * @memberof HttpURL
                     * @instance
                     */
                    this.origin = this.protocol + '//' + this.hostname;
                } else {
                    throw new Error('Wrong uri scheme.');
                }
            };

            /**
             * 查询串键值对
             * @method toString
             * @return {String} 完整URL地址
             * @memberof HttpURL
             * @instance
             */
            this.toString = function () {
                var string = this.protocol + '//';
                if (this.username) {
                    string += this.username;
                    if (this.password) {
                        string += ':' + this.password;
                    }
                    string += '@';
                }
                string += this.host;
                if (this.port && this.port !== '80') {
                    string += ':' + this.port;
                }
                if (this.pathname) {
                    string += this.pathname;
                }
                if (this.search) {
                    string += this.search;
                }
                if (this.hash) {
                    string += this.hash;
                }
                return string;
            };

            if (url) {
                this.set(url.toString());
            }
        }

        /**
         * @namespace lib
         */

        /**
         * 解析和操作url
         * @method httpurl
         * @param {string} url - 需要解析和操作的url
         * @return {HttpURL} HttpURL实例
         * @memberof lib
         */
        return function (url) {
            return new HttpURL(url);
        };
    }();

    //callApp
    Util.callApp = function () {
        "use strict";
        var doc = document,
            location = window.location,
            isLicaishi = Util.sinaApp && Util.sinaApp.isLicaishi,
            defaultUri = 'sinajr://com.sina.licaishi/open',
            os = Util.os,
            browser = Util.browser,
            ua = window.navigator.userAgent,
            packageMap = {
                sinaLicaishi: 'com.sina.licaishi',
                sinaLicaishiAdminIOS: 'com.sina.planner-IOS',
                sinaLicaishiAdminAndroid: 'com.sina.licaishiadmin'
            };
        var iframe;
        var defaultParams = {
            from: 'h5',
            href: location.href
        };

        function appendParams(params, extreParam) {
            for (var key in extreParam) {
                if (extreParam.hasOwnProperty(key)) {
                    params[key] = extreParam[key];
                }
            }
            return params
        }

        function buildUrl(options) {
            var url = Util.URL(options.url || defaultUri);
            var params = JSON.parse(url.params.params || "{}");
            params = appendParams(params, options.params);
            try {
                params = encodeURIComponent(JSON.stringify(params));
            } catch (e) {
                params = JSON.stringify(params);
            }
            url.params = {
                params: params
            }
            return url
        }

        function callInIframe(url) {
            if (!iframe) {
                iframe = doc.createElement('iframe');
                iframe.id = 'callapp_iframe_' + Date.now();
                iframe.frameborder = 0;
                iframe.style.cssText = "display: none;border:0;width:0;height:0;";
                doc.body.appendChild(iframe);
            }

            iframe.src = url;
        }

        function setLocation(url, options) {
            if (options.replace !== false && (isLicaishi || options.replace === true)) {
                location.replace(url);
            } else {
                location.href = url;
            }
        }

        function useAnchorLink(url, options) {
            var a = document.createElement('a');
            a.setAttribute('href', url);
            a.style.display = 'none';
            document.body.appendChild(a);

            var e = document.createEvent('HTMLEvents');
            e.initEvent('click', false, false);
            a.dispatchEvent(e);
        }

        function goPage(options) {
            options = options || {};
            if (typeof options.params === 'undefined') {
                options.params = appendParams({}, defaultParams);
            } else {
                options.params = appendParams(options.params, defaultParams);
            }

            var url = buildUrl(options);
            var isOriginalChrome = os.isAndroid && browser.isChrome && !browser.isWebview;
            var fixUgly = os.isAndroid && !!ua.match(/samsung/i) && os.version.gte('4.3') && os.version.lt('4.5');
            var ios9SafariFix = os.isIphone && os.version.gte('9.0') && browser.isSafari;

            if (ios9SafariFix) {
                setTimeout(function () {
                    useAnchorLink(url.toString(), options);
                }, 100);
            } else if (isLicaishi || fixUgly || isOriginalChrome || os.isIOS) {
                setTimeout(function () {
                    setLocation(url.toString(), options);
                    // useAnchorLink(url.toString(), options);
                }, 100);
            } else {
                callInIframe(url.toString());
            }
        }

        function download(url, options) {
            if (typeof url != 'string' && !options) {
                options = url;
                url = undefined;
            }
            options = options || {};
            if (!url) {
                url = "http://jr.sina.cn/public/sina_finance_api/web/index.php/site/client-jump";
            }
            url = Util.URL(url);

            url.params.from = 'h5';
            url.params.href = location.href;

            if (options.params) {
                appendParams(url.params, options.params);
            }
            if (!url.params.type) {
                url.params.type = [os.name, os.version].join("_");
            }
            if (!url.params.ch) {
                url.params.ch = 'lib_sdk_call_app_auto_jump';
            }

            url = url.toString();

            setLocation(url, options);
        }

        return {
            goPage: goPage,
            download: download
        }
    }();
}(window);
