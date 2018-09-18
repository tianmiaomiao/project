<!-- vuex 状态管理 -->
```
使用方法
1、设置初始值
state.js 增加属性及默认值
const state = {
    realData : '',
    userData : '',
};

2、组件内获取属性
realData = this.$store.getters.realData;（推荐）
或
realData = this.$store.state.realData;

3.更新属性值
this.$store.dispatch 调用 actions方法；
方法名称为  `SET_${大写key}`
如：更新realData 属性   方法名为 SET_REALDATA

this.$store.dispatch('SET_REALDATA',value)（推荐）
或
this.$store.state.realData = [1,2]
    

```
