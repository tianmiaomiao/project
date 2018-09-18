---
title: Popup 弹出层
---

由其他控件触发，屏幕滑出或弹出一块自定义内容区域

### 引入

```javascript
import Popup from  '../../js/components/modules/popup'

Vue.component(Popup.name, Popup)
```

### 代码演示
<!-- DEMO -->
```
<md-popup
    v-model="isShowPopup"
    position="top"
    :hasMask="false"
>
    <div class="demo-info">Popup Top
        <div class="demo-icon" @click="hidePopUp">
            <md-icon :name="'md-icon-clear'"></md-icon>
        </div>
    </div>
</md-popup>
```
### API
#### Popup Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|v-model|弹出层是否可见|Boolean|`false`|-|
|has-mask|是否有蒙层|Boolean|`true`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|
|position|弹出层位置|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|弹出层过度动画|String|`fade, slide-up/down/left/right`|-|
|prevent-scroll|是否禁止滚动穿透|Boolean|`false`|-|

#### PopupTitleBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|is-show-title|是否带hade|Boolean|`false`|-|
|title|键盘head标题|String|-|-|
|ok-text|确定按钮文案|String|`确定`|-|
|cancel-text|取消按钮文案|String|`取消`|-|


#### PopupTitleBar Events

##### @confirm()
确认选择事件

##### @cancel()
取消选择事件
