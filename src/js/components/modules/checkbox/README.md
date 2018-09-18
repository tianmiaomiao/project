---
title: checkBox - 复选框
---

### 引入

````
import CheckBox from  '../../js/components/modules/checkbox'
components: {
    [CheckBox.name]: CheckBox,
}
````
### 实例
````
<md-checkbox
    v-model="agreeFlag"
    title="我已阅读并同意"
>
    <span class="agree-link">《新浪金融个人信贷平台服务协议》</span>
    <span class="agree-link">《用户授权协议》</span>
</md-checkbox>
````
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
| title | check标题 | String | 我已阅读并同意 
| value | check选中状态 | Boolean  | false |  通过 v-model 改变状态