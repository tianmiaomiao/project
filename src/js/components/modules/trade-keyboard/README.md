---
title: TradeKeyboard 交易键盘
---

一般用于股票交易、搜索选股等场景，inputItem组件内已内置键盘组件

### 引入

```javascript
import TradeKeyboard from  '../../js/components/modules/trade-keyboard'

Vue.component(TradeKeyboard.name, TradeKeyboard)
```

### 代码演示
<!-- DEMO -->

### API

#### TradeKeyboard Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|v-model|键盘是否展示|Boolean|`false`|-|
|type|键盘类型|String|`normal`|`normal share cost` type不同样式不同|
|ok-text|键盘确认键文案|String|`确定`|-|
|scale|金额加减基数|String/Number|-|-|
|maxValue|仓位最大值|String/Number|-|仅`type = share `时生效|
|hasMask|是否显示蒙板|Boolean|`false`|-|
|maskClosable|点击蒙板是否关闭|Boolean|`false`|-|

#### TradeKeyboard Methods

##### show()
展示键盘

##### hide()
隐藏键盘

#### TradeKeyboard Events

##### @enter(val)
数字键点击事件

属性 | 说明 | 类型
----|-----|------
val     | 数字 | Number

##### @delete()
回退键点击事件

##### @confirm()
确认键点击事件

##### @filler(val)
仓位选择点击事件

属性 | 说明 | 类型
----|-----|------
val     | 数字 | Number

##### @changeKeyboard()
搜索选股键盘 ABC按钮点击事件 默认只处理关闭   `type = normal` 时可用

##### @changeValue(type,val)
加减按钮事件 `type = share/cost` 时可用

属性 | 说明 | 类型
----|-----|------
type    |  `1 : 数值累加  2：数值递减` | Number
val     | 加减按钮基数 | Number
