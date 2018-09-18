<!--列表为空-->
```
<v-empty :opts="emptyData" @eventBtn="emptyBtn"></v-empty>

methods:{
  emptyBtn (){
    console.log('按钮操作')
  }
}
created(){
  this.emptyData = {
    icon:'type2', //type1 type2 type3
    desc : '当前持仓为空，快买只基金涨涨财气~',
    btn : '前往购买' //
  }
}

```
