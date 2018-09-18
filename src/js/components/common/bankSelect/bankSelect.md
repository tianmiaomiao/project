<!-- BankSelect 选择银行卡 -->
```
一、 引入插件  import BankSelect from '../../components/common/bankSelect'

二、参数配置调用
    1、点击事件绑定
    <div class="bar"  @click="showTypeList()">日涨跌</div>
    
    2、设置初始值
    data () {
      return {
        curItem:0, // 设置当前选中
      }
    }
    
    3、绑定处理函数
    showTypeList(){
        var vm = this;
        BankSelect({
            typeData: {
                hidePlus : true,
                curItem : vm.curItem, //当前选中
                list    : [
                    {
                        bank_name : '备用金'
                    },
                    {
                        bank_name : '中国农业银行'
                    }
                ]
            },
            callback : function (key) {
                // 回调函数
                // key : 列表回传key值
                console.log(key)
            }
        })
    }
    
    4、注销组件
    BankSelect.hide(); // 注销已有实例
    

```
