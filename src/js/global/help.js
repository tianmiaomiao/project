/**
 * Created by tianmiao on 2018/3/21.
 */

import config from '../config'
import MessageBox from '../components/modules/dialog'
import http from '../lib/Net'
!function (exports) {
    "use strict";
    var Help = exports.Help || (exports.Help = {});

    Help.serverTel = function () {
        return MessageBox.confirm({
            title: '新浪基金客服电话',
            content: '<span style="font-size: .36rem;line-height: .9rem">${config.FUND_TEL.SERVER_TEL}</span>',
            confirmText: '拨打电话',
            cancelText: '取消',
            onConfirm: function () {
                window.location.href = 'tel:' + config.FUND_TEL.SERVER_TEL;
            }
        })
    };

}(window);