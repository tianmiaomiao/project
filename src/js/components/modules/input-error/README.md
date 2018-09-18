---
title: Input Error 错误提示
---

InputError

### 引入

```javascript
import InputError from  '../../js/components/modules/input-error'

Vue.component(InputError.name, InputError)
```
### 代码演示
<!-- DEMO -->
```
<md-input-error v-model="errorMsg"></md-input-error>
```

### API
显示自定义提示

#### InputError Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|value|错误信息|String|-|-|
