---
title: ListItem 列表模块
---

ListItem

### 引入

```javascript
import ListItem from  '../../js/components/modules/list-item'

Vue.component(ListItem.name, ListItem)
```
### 代码演示
<!-- DEMO -->
```
<md-list-item
    title="标题"
    desc="描述"
    isArror
    @click="toPage"
>
    <span slot="left"><img src="./image/bank.png"></span>
    <span slot="right">查看更多</span>
</md-list-item>
```

### API
显示自定义提示

#### ListItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|title|列表左侧标题|String|-|-|
|desc|列表描述|String|-|-|
|is-arror|是否显示箭头|Boolean|`false`|-|

#### InputItem Slots

#### left
左侧插槽，一般用于放置图标、logo等

#### right
右侧插槽，一般用于查看更多文案等