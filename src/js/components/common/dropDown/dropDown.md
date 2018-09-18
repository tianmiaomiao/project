<!-- dropDown 下拉组件 -->
```
一、 引入插件  import showDropDown from '../../components/common/dropDown'

二、参数配置调用
    1、点击事件绑定
    <div class="bar"  @click="showTypeList($event)">日涨跌</div>
    
    2、设置初始值
    data () {
      return {
        curItem:0, // 设置当前选中
      }
    }
    
    3、绑定处理函数
    showTypeList(e){
        // showDropDown(a, b, c)
        // a、  e.target 传人组件挂载容器
        // b、  {option} 参数
        // c、  由于组件是新建组件找不到父实例因此传入  this
        
        showDropDown(e.target,{
            typeData: {
                curItem : this.curItem, //当前选中
                offTop  : '100%',       //相对挂载容器 top 值（后期可优化为自动计算）
                list    : []
            },
            callback : function (key) {
                // 回调函数
                // key : 列表回传key值
            }
        },this)
    }
    
    4、注销组件
    showDropDown.hide(); // 注销已有实例
    
    
三、该组件可优化空间较大、后期处理


```
