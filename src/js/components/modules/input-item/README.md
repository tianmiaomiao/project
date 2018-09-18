---
title: Input 输入框
---

Input

### 引入

```javascript
import InputItem from  '../../js/components/modules/input-item'

Vue.component(InputItem.name, InputItem)
```
### 代码演示
<!-- DEMO -->
```
<md-input-item
    title="姓名"
    placeholder="请输入您的真实姓名"
    name="realName"
    v-model="realName"
    :maxlength="5"
    clearable
    is-fake-keyboard
    is-format-value
>
    <md-icon :name="'md-icon-phone'" slot="left"></md-icon>
    <md-icon :name="'md-icon-tip'" slot="right"></md-icon>
</md-input-item>
```

### API
显示自定义提示

#### InputItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|type|表单类型，特殊类型自带文本格式化|String|`text`|`text`,`bankCard`,`phone`,`number`,<br/>`money`,`password`|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|title|表单左侧标题|String|-|可以传入`HtmlFragment`，也可直接使用`slot left`代替|
|placeholder|表单占位符|String|-|-|
|maxlength|表单最大字符数|String/Number|-|`phone`类型固定为11|
|size|表单尺寸|String|`normal`|`large`,`normal`|
|align|表单文本对齐方式|String|`left`|`left`,`center`,`right`|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|notBoard|是否隐藏边框|Boolean|`false`|-|
|is-format-value|表单文本是否根据类型自动格式化|Boolean|`type`为`bankCard`,`phone`, `money`默认为`true`，否则为`false`|-|
|clearable|表单是否使用清除控件|Boolean|`false`|-|
|is-fake-keyboard|是否开启模拟键盘|Boolean|`false`|-|

#### InputItem Slots

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

#### InputItem Methods

##### focus()
表单获得焦点

##### blur()
表单失去焦点

#### InputItem Events

##### @focus(name)
表单获得焦点事件

##### @blur(name)
表单失去焦点事件

##### @confirm(name, value)
表单值确认事件， 仅使用模拟键盘或组件在`form`元素内时有效