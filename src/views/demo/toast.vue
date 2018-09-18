<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="'纯文字'">
                    <md-button type="primary" @click="showToastInfo" >纯文字</md-button>
                </md-field>
                <md-field :title="'Loading'">
                    <md-button type="primary" @click="showToastLoading" >加载中</md-button>
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
    import Toast from '../../js/components/modules/toast/index.js'

    export default {
        name: 'toast-demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [ListItem.name]: ListItem,
            [Icons.name]: Icons,
            [Button.name]: Button,
            [Popup.name]: Popup,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                }
            }
        },
        watch:{
        },
        computed: {
        },
        methods: {
            showToastInfo(){
                Toast.info('一段文字')
            },
            showToastLoading(){
                Toast.loading('一段文字')
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
