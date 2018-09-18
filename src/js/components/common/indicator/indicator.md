<!-- indicator 组件 -->
```
一、 引入插件 import Indicator from '../../components/common/indicator'

二、参数配置调用
    1、open
    Indicator.open({
        text: '加载中', // 文字可选 默认空
        size:'.8rem' //默认 .8rem
    });
    
    使用默认样式可只传 text:string 或者 空
    Indicator.open('加载中');
    Indicator.open();
    
    2、close
    Indicator.close()
    
    3、succeed
    Indicator.succeed('设置成功')
```
