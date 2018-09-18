1. 通头组件配置项
```
headerData: {
    name: '保险',    //标题
    backBtn: true,  //是否显示返回按钮
    noBorder: true, //是否有下边框 
    homeBtn: true,  //是否显示返回home
}
```
2. 组件内的使用方式

```
<v-header :opts="headerData"></v-header>
```