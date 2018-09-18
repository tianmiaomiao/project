<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="''">
                    <md-list-item
                        title="InputItem"
                    >
                    </md-list-item>
                    <md-list-item
                        title="InputItem"
                    >
                    </md-list-item>
                </md-field>
                <md-field :title="''">
                    <md-list-item
                        title="InputItem"
                        @click="toPage('#/inputItem')"
                        isArror
                    >
                    </md-list-item>
                    <md-list-item
                        title="InputItem"
                        isArror
                    >
                    </md-list-item>
                </md-field>
                <md-field :title="''">
                    <md-list-item
                        title="InputItem"
                        desc="输入框"
                        isArror
                    >
                    </md-list-item>
                </md-field>
                <md-field :title="''">
                    <md-list-item
                        title="InputItem"
                        isArror
                    >
                        <span slot="left" class="bank-logo"><img src="./image/bank-small.png" style="width: .48rem;height: .48rem" alt=""></span>
                        <span slot="right">查看更多</span>
                    </md-list-item>
                </md-field>
                <md-field :title="''">
                    <md-list-item
                        title="InputItem"
                        desc="输入框"
                        isArror
                    >
                        <span slot="left"><img src="./image/bank.png" style="width: .84rem;height: .84rem" alt=""></span>
                        <span slot="right">查看更多</span>
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
    import Icons from '../../js/components/modules/icon/index.vue'

    export default {
        name: 'demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [ListItem.name]: ListItem,
            [Icons.name]: Icons,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
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
        .bank-logo{
            display: inline-block;
            img{
                display: block;
            }
        }
    }
</style>
