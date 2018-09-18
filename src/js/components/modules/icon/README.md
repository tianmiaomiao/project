---
title: Icon 图标
---

Icon

### 引入

```
javascript
import Icon from  '../../js/components/modules/icon/index.vue'

Vue.component(Icon.name, Icon)
```
### 代码演示
<!-- DEMO -->
```
<md-icon :name="'md-icon-phone'"></md-icon>
```

### API
显示自定义提示

#### Icon Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|name|图标名称|String|-|-|
|size|图标大小|String\Object|-|`{width:.3rem,height:.3rem}`|
