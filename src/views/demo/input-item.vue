<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="''">
                    <md-input-item
                        title="姓名"
                        placeholder="请输入您的真实姓名"
                        name="realName"
                        align="center"
                        v-model="realName"
                        :maxlength="5"
                        clearable
                    ></md-input-item>
                    <md-input-item
                        title="手机号码"
                        placeholder="请输入正确的手机号码"
                        type="phone"
                        name="phoneNumber"
                        v-model="phoneNumber"
                        :maxlength="5"
                    ></md-input-item>
                    <md-input-item
                        title="清空按钮"
                        placeholder="点击叉号可清空"
                        name="clear"
                        v-model="clear"
                        clearable
                    ></md-input-item>
                </md-field>
                <md-field :title="''">
                    <md-input-item
                        ref="mdInput"
                        placeholder="左右插槽"
                    >
                        <md-icon :name="'md-icon-phone'" slot="left"></md-icon>
                        <md-icon :name="'md-icon-tip'" slot="right"></md-icon>
                    </md-input-item>
                    <md-input-item
                        placeholder="左右插槽"
                        clearable
                    >
                        <md-icon :name="'md-icon-phone'" slot="left"></md-icon>
                        <md-icon :name="'md-icon-tip'" slot="right"></md-icon>
                    </md-input-item>
                    <md-input-item
                        placeholder="数字键盘-phone"
                        type="phone"
                        name="number"
                        is-fake-keyboard
                        is-format-value
                        clearable
                        @confirm="onConfirm"
                    >
                        <md-icon :name="'md-icon-phone'" slot="left"></md-icon>
                        <md-icon :name="'md-icon-tip'" slot="right"></md-icon>
                    </md-input-item>
                    <md-input-item
                        placeholder="idCard"
                        type="idCard"
                        name="number"
                        clearable
                    >
                        <md-icon :name="'md-icon-phone'" slot="left"></md-icon>
                        <md-icon :name="'md-icon-tip'" slot="right"></md-icon>
                    </md-input-item>
                </md-field>
                <md-field :title="''">
                    <md-input-item
                        placeholder="数字键盘-money"
                        type="money"
                        name="number"
                        size="large"
                        is-format-value
                        clearable
                    >
                        <div class="md-money-symbol" slot="left">￥</div>
                    </md-input-item>
                    <md-input-item
                        type="money"
                        name="money"
                        placeholder="最低买入金额1000元"
                        clearable
                    >
                        <div class="md-money-symbol" slot="left">￥</div>
                    </md-input-item>
                </md-field>
                <md-field :title="''">
                    <md-input-item
                        title="交易密码"
                        type="password"
                        name="password"
                        eyeopen
                        clearable
                        placeholder="交易密码"
                    >
                    </md-input-item>
                </md-field>
            </div>
            <!--<v-footer></v-footer>-->
        </div>
    </div>
</template>
<script>
    import VHeader from  '../../js/components/layout/header/header.vue'
    import VFooter from  '../../js/components/layout/footer/footer.vue'
    import Field from  '../../js/components/modules/field/index.vue'
    import InputItem from  '../../js/components/modules/input-item/index.vue'
    import Icons from '../../js/components/modules/icon/index.vue'

    export default {
        name: 'demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [Icons.name]: Icons,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                realName : '阿飞测试',
                phoneNumber : '15801549839',
                clear : '清空',
                money : '',
                password : '',
                number : ''

            }
        },
        watch:{
            realName(){
                console.log(this.realName)
            },
            number(){
//                console.log(this.number)
            }
        },
        computed: {
        },
        methods: {
            upDataValue(name,val){
                this.$set(this,[name],val)
            },
            onConfirm(){
                console.log(1)
            }
        },
        created(){
            this.$nextTick(()=>{
//                console.log(this.$refs.mdInput.inputValue)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .page-main{
        background-color: $bg-color-base;
        .md-box{
            position: relative;
            width: 2rem;
            height: 2rem;
            margin: .2rem;
            @include setAllLine();
        }

        .md-field{
            padding: 0 .24rem;
        }
    }
</style>
