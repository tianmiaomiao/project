---
title: 股票搜索 输入框
---

Input

### 引入

```javascript
import SearchItem from  '../../js/components/modules/search-input'

Vue.component(SearchItem.name, SearchItem)
```
### 代码演示
<!-- DEMO -->
```
<md-search-item
    v-model="searchValue"
    name="searchInput"
    align="center"
    placeholder="股票/代码"
    okText="确定"
    clearable
    @confirm="onConfirm"
></md-search-item>
```

### API
显示自定义提示

#### SearchItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|placeholder|表单占位符|String|-|-|
|maxlength|表单值最大长度|String|`6`|-|
|okText|键盘名称|String|`确定`|-|
|codeName|股票名称|String|-|-|
|align|表单文本对齐方式|String|`center`|`left`,`center`,`right`|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|clearable|表单是否使用清除控件|Boolean|`false`|-|

#### SearchItem Methods

##### focus()
表单获得焦点

##### blur()
表单失去焦点

#### SearchItem Events

##### @confirm(name, value)
表单值确认事件， 仅使用模拟键盘或组件在`form`元素内时有效