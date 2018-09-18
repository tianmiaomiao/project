/**
 * Created by tianmiao on 2017/8/21.
 */
const PAGE_PATH_PREFIX = '//fund.sina.com.cn/fund/wap/fundIndex.html';

const config = {
    //接口的请求地址
    PORT_URI:  '//fund.sina.com.cn/fund/api/',

    FUND_TEL : {
        SERVER_TEL : '010-62675369',
        ONLINE_SERVER : 'sinaweibo://messagelist?uid=2813700891'
    },

    //页面路径
    LOAC_URL : {
        //jr 首页
        JR_HOME         : '//jr.sina.cn/openPage/fundIndex',
        //赢小浪
        WIN_SINA        : '//weibo.com/p/1008084a74ebee77435cfb306b86875ee36e7f',
        //交易记录
        TRADE_HISTORY   : '//trade.xincai.com/wap/historytrade',
        //定投记录
        VALU_MANAGE     : '//trade.xincai.com/wap/valuManage',
        //备用金
        CASH_BOX        : '//fund.sina.com.cn/fund/wap/index.html',
        //私房宝
        WALLET_URL      : '//trade.xincai.com/wap/wallet',
        //养基宝
        FOFS_URL        : '//fund.sina.com.cn/zuhe/web/myFofs',
    },
    PAGE_PATH : {
        PAGE_PATH_PREFIX    : PAGE_PATH_PREFIX,
        HOME_PATH           : PAGE_PATH_PREFIX + '#/index',
    },
    goToLogin :  function(url){
        if(!url){
            url = window.location.href;
        }
        if(Util.thirdApp.isWeixin){
            window.location.href = '//trade.xincai.com/wap/wxCallback?lr=4&out_url='+encodeURIComponent(url)
        }else{
            window.location.href = 'https://passport.weibo.cn/signin/login?entry=paysign&r='+encodeURIComponent(url)
        }
    },
    VERIFY_ERROR : {
        PHONE       : '请输入正确的手机号码',
        PHONE_BANK  : '请输入正确的银行卡预留手机号',
        PHONE_CODE  : '请输入正确的手机验证码',
        BANK_NUM    : '请输入正确的银行卡号',
        BANK_CORE   : '请选择发卡银行',
        PASSWORD    : '请输入6位纯数字密码',
        PASSWORD_CONFIRM : '两次输入的密码不一致',
        ID_CARD     : '请输入正确的身份证号码',
        REAL_NAME   : '请输入您的真实姓名',
        CONT_NULL   : '请将信息填写完整',
        EMAIL       : '邮箱输入有误',
    }
};

export default config