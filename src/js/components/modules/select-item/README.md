---
title: Select Item 选择器展示组件
---

Input

### 引入

```javascript
import SelectItem from  '../../js/components/modules/select-item'

Vue.component(SelectItem.name, SelectItem)
```
### 代码演示
<!-- DEMO -->
```
<md-select-item
    v-model="bankName"
    title="发卡银行"
    type = "text"
    placeholder="请选择发卡银行"
    placeholder = "请选择发卡银行"
    is-encrypt
    readonly
    is-select
    disabled
    @click="choose"
></md-select-item>
```

### API
显示自定义提示

#### SelectItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|表单值|String|-|-|
|title|表单左侧标题|String|-|可以传入`HtmlFragment`，也可直接使用`slot left`代替|
|type|表单类型，特殊类型自带文本加密|String|`text`|`text`,`bankCard`,`phone`|
|placeholder|表单占位符|String|-|-|
|is-select|是否显示下拉箭头|Boolean|`false`|-|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|is-encrypt|表单文本是否根据类型自动加密显示|Boolean|`type`为`bankCard`,`phone`默认为`true`，否则为`false`|-|

#### SelectItem Slots

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

