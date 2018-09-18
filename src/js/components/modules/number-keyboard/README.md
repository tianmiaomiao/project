---
title: NumberKeyboard 数字键盘
---

一般用于密码，验证码输入等场景，inputItem组件内已内置键盘组件

### 引入

```javascript
import Keyboard from  '../../js/components/modules/number-keyboard'

Vue.component(Keyboard.name, Keyboard)
```

### 代码演示
<!-- DEMO -->

### API

#### NumberKeyboard Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|v-model|键盘是否展示|Boolean|`false`|-|
|type|键盘类型|String|`normal`|`number、 idCard` normal 默认不带小数点 number 类型带小数点  idCard 类型带X|
|hasMask|是否显示蒙板|Boolean|`false`|-|
|maskClosable|点击蒙板是否关闭|Boolean|`false`|-|
|is-show-title|是否显示键盘head|Boolean|`false`|-|
|ok-text|键盘确认键文案|String|`确认`|-|
|cancel-text|键盘取消键文案|String|`取消`|-|

#### NumberKeyboard Methods

##### show()
展示键盘

##### hide()
隐藏键盘

#### NumberKeyboard Events

##### @enter(val)
数字键点击事件

属性 | 说明 | 类型
----|-----|------
val     | 数字 | Number

##### @delete()
回退键点击事件

##### @confirm()
确认键点击事件
