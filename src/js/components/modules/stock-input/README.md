---
title: 股票交易 输入框
---

Input

### 引入

```javascript
import StockItem from  '../../js/components/modules/stock-input'

Vue.component(StockItem.name, StockItem)
```
### 代码演示
<!-- DEMO -->
```
<md-search-item
    v-model="priceValue"
    name="priceValue"
    align="center"
    type = "cost"
    okText="买入"
    theme="red"
    placeholder="委托价格"
    :scale="'0.01'"
    :maxValue="'800'"
    @confirm="onConfirm"
    @cancel="onCancel"
></md-search-item>
```

### API
显示自定义提示

#### StockItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|type|表单类型|String|`cost`|`cost 价格输入框`,`share 份额输入框`|
|theme|表单主题|String|`red`|`red 红色边框`,`blue 蓝色边框`|
|scale|加减基数|String、Number|-|-|
|maxValue|最大仓位|String、Number|`100`|`share份额输入框必传`|
|placeholder|表单占位符|String|-|-|
|okText|键盘名称|String|`确定`|-|
|align|表单文本对齐方式|String|`center`|`left`,`center`,`right`|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|

#### StockItem Methods

##### focus()
表单获得焦点

##### blur()
表单失去焦点

#### StockItem Events

##### @confirm(name, value)
表单值确认事件， 仅使用模拟键盘或组件在`form`元素内时有效

##### @cancel()
表单取消事件， 仅使用模拟键盘或组件在`form`元素内时有效