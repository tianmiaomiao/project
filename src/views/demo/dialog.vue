<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="'调用方法一'">
                    <md-button type="primary" @click="showAlert">警告弹窗</md-button>
                    <md-button type="primary" @click="showDialog">确认弹窗</md-button>
                </md-field>
                <md-field :title="'调用方法二'">
                    <md-button type="primary" @click="alertDialog.open = true">警告弹窗</md-button>
                    <md-button type="primary"@click="confirmDialog.open = true">确认弹窗</md-button>
                    <md-dialog
                            title="窗口标题"
                            v-model="alertDialog.open"
                            :btns="alertDialog.btns"
                    >
                        人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
                    </md-dialog>

                    <md-dialog
                            title="窗口标题"
                            v-model="confirmDialog.open"
                            :btns="confirmDialog.btns"
                    >
                        围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。
                    </md-dialog>
                </md-field>
                <div style="height: 12rem"></div>
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
    import Toast from '../../js/components/modules/toast/index.js'
    import Dialog from '../../js/components/modules/dialog/index.js'

    export default {
        name: 'dialog-demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [ListItem.name]: ListItem,
            [Icons.name]: Icons,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                alertDialog: {
                    open: false,
                    btns: [
                        {
                            text: '知道了'
                        },
                    ],
                },
                confirmDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                        },
                        {
                            text: '确认操作',
                            handler: this.onConfirm,
                        },
                    ],
                },
            }
        },
        watch:{
        },
        computed: {
        },
        methods: {
            showDialog(){
                Dialog.confirm({
                    title: '确认',
                    content: '请确认是否进行操作',
                    confirmText: '确定',
                    onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
                })
            },
            showAlert(){
                Dialog.alert({
                    title: '警告',
                    content: '您正在进行非法操作',
                    cancelText: '取消',
                    confirmText: '确定',
                    onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
                })
            },
            onConfirm(){
                this.confirmDialog.open = false;
                console.log('[Dialog.confirm] confirm clicked')
            }
        },
        created(){
            console.log(this.$matomo)
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
