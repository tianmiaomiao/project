<!-- dialog 弹窗组件 -->
```
一、 引入插件 import MessageBox from '../../components/common/dialog'

二、参数配置调用
    1、Alert
    MessageBox.alert({
        topic: '标题',               //标题
        title: "副标题",             //副标题
        message: '确定执行此操作?',   //提示文本
        textAlign : 'center'         //文字对齐方式  center right 默认：left
        okTxt : '知道了'              //确认按钮文本 默认 确定 
    })
    2、Confirm
    MessageBox.confirm({
        topic: '标题',               //标题
        title: "副标题",             //副标题
        message: '确定执行此操作?',   //提示文本
        textAlign : 'center',        //文字对齐方式  center right 默认：left,
        okTxt : '确定'               //确认按钮文本 默认 确定
        cancelTxt : '取消'           //取消按钮文本 默认 取消
        callback : function () {
          //回调函数
        }
    })
```
