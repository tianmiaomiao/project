---
title: Button 按钮
---

按钮

### 引入

```javascript
import Button from  '../../js/components/modules/button/index.vue'

Vue.component(Button.name, Button)
```
### 代码演示
<!-- DEMO -->
```
<md-button type="primary" size="large" >大按钮</md-button>
```

### API
显示自定义提示

| 属性 | 说明 | 类型 | 默认值 | 可用值 | 备注 |
| ---- | ---- | ---- |------|------|------|
| type | 按钮样式 | String | - | primary | 请根据项目ui定义不同按钮样式 |
| size | 按钮大小 | String | 默认为空既正常大小 | large 、 small | 请根据项目需求定义不同大小样式 |
| disabled | 按钮禁用属性 | Boolean | false | - |
