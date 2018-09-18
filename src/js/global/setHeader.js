/**
 * Created by tianmiao on 2018/2/24.
 */

(()=>{
    var isIphone = Util.os.isIOS;
    var xSize = window.screen.height == 812 && window.screen.width == 375;
    var xRatio = window.devicePixelRatio == 3;
    var isWeibo = Util.thirdApp.isWeibo;
    var isWeixin = Util.thirdApp.isWeixin;
    var isFinance = Util.thirdApp.isFinance;
    var isJr = Util.sinaApp.isLicaishi;
    var isIphoneX = isIphone && xSize && xRatio;
    var hideHeader = isWeibo || isWeixin || isJr || isFinance;
    var setIosX = isWeibo || isWeixin || isJr;

    window.showHeader = true;
    window.showFooter = true;

    if(isIphoneX && setIosX){
        document.body.className = 'iosX isClient';
        window.showHeader = false;
    }else if(hideHeader){
        document.body.className = 'isClient';
        window.showHeader = false;
    }

    if(isFinance){
        window.showFooter = false;
    }
})();