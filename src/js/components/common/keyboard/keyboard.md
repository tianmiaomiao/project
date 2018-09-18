<!-- keyboard 组件 -->
```
一、 引入插件 import Keyboard from '../../components/common/keyboard'

二、参数配置调用
    1、数字键盘不带小数点
    KeyBoard({
        type: 'inputKey',   // 默认 inputKey
        initVal : vm.price, // 已填入数值  如果不传 第二次唤起键盘 内容会重置
        showPoint : false,  // 是否可以输入小数  默认 false（不可输入小数点）  
        hideMask : true,    //隐藏蒙板
        onFullVal : function (val) {  // 回调函数
            console.log(val)
            vm.price = val
        }
    })
    
    2、数字键盘带小数点
    KeyBoard({
        type: 'inputKey',   // 默认 inputKey
        initVal : vm.price, // 已填入数值 input输入必填 否则第二次弹出 内容异常
        showPoint : true,   // 是否可以输入小数  默认 false（不可输入小数点）
        onFullVal : function (val) {  // 回调函数
            console.log(val)
            vm.price = val
        }
    })
    
    3、密码键盘带密码框
    KeyBoard({
        type: 'passwordKey',    // 默认 inputKey
        onFullPassword: function (password,showError) {
            //手机验证前先检测交易密码是否正确
            console.log(password)

            //错误提示回调
            showError && showError('密码错误')
        }
    })
    
    4、密码键盘不带密码框
    KeyBoard({
        type: 'passwordKey',    // 默认 inputKey
        hidePassword : true,    // 隐藏密码框  默认隐藏
        onFullPassword: function (password,showError) {
            //手机验证前先检测交易密码是否正确
            console.log(password)

            //错误提示回调
            showError && showError('密码错误')
        }
    })
    
    5、身份证输入带字母X
    KeyBoard({
        type: 'inputKey',   // 默认 inputKey
        initVal : vm.idCard, // 已填入数值 input输入必填 否则第二次弹出 内容异常
        showX : true,   // 是否可以输入X  默认 false（不可输入X）
        onFullVal : function (val) {  // 回调函数
            console.log(val)
            vm.idCard = val
        }
    })
    
```
