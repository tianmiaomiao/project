<!--竖向交易进度 steps-->
```
<v-step :opts="steps"></v-step>

methods:{
  emptyBtn (){
    console.log('按钮操作')
  }
}
created(){
  //交易进度数据由后端接口提供
  this.steps = {
    current : 0,
    list : [
      {
        name : "已委托",
        desc : "2017-08-08 17：00"
      },
      {
        name : "已受理",
        desc : "预计时间：2017-08-08 17：00"
      },
      {
        name : "已确认",
        desc : "预计时间：2017-08-08 17：00"
      }
    ]
  }
}

```
