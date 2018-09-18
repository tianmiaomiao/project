<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="''">
                    <md-list-item
                        title="InputItem - 输入框"
                        @click="toPage('#/inputItem')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="ListItem - 列表"
                        @click="toPage('#/listItem')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="Button - 标准按钮"
                        @click="toPage('#/button')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="Popup - 弹层"
                        @click="toPage('#/popup')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="Toast - 轻提示"
                        @click="toPage('#/toast')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="Dialog - 模态窗"
                        @click="toPage('#/dialog')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="Picker - 选择器"
                        @click="toPage('#/picker')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="PickerDate - 时间选择器"
                        @click="toPage('#/pickerDate')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="TradeKeyboard - 股票交易及搜索键盘"
                        @click="toPage('#/tradeKeyboard')"
                        isArror
                    >
                    </md-list-item>
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
    import ListItem from  '../../js/components/modules/list-item/index.vue'
    import Button from  '../../js/components/modules/button/index.vue'
    import Icons from '../../js/components/modules/icon/index.vue'
    import Popup from '../../js/components/modules/popup/index.vue'
    import Keyboard from '../../js/components/modules/number-keyboard/index.vue'

    export default {
        name: 'demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [ListItem.name]: ListItem,
            [Icons.name]: Icons,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Keyboard.name]: Keyboard,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                isShowPopup :false,
                showKeyboard : false,
                inputValue : '',
            }
        },
        watch:{
        },
        computed: {
        },
        methods: {
            toPage(path){
                window.location.href = path
            }
        },
        created(){
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
    }
</style>
