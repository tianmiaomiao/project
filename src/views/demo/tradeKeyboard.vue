<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container" style="background-color: #f9f9f9">
                <div style="background-color: rgba(0,0,0,.6);padding:.3rem .26rem;">
                    <md-search-item
                        v-model="searchValue"
                        name="searchInput"
                        align="center"
                        placeholder="股票/代码"
                        okText="确定"
                        clearable
                        codeName="股票代码"
                        is-fake-keyboard
                        @confirm="onConfirm"
                    ></md-search-item>
                </div>
                <div style="padding:.1rem .26rem">
                    <md-search-item
                        v-model="searchValue2"
                        name="searchInput2"
                        align="left"
                        placeholder="股票/代码"
                        okText="确定"
                        theme="red"
                        codeName="股票名称"
                        is-fake-keyboard
                        @confirm="onConfirm"
                    ></md-search-item>
                </div>
                <div style="padding:.1rem .26rem">
                    <md-stock-item
                        v-model="priceValue"
                        name="priceValue"
                        align="center"
                        type = "cost"
                        okText="完成"
                        theme="red"
                        placeholder="委托价格"
                        :scale="'0.01'"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                    ></md-stock-item>
                </div>
                <div style="padding:.1rem .26rem">
                    <md-stock-item
                        v-model="numValue"
                        name="numValue"
                        align="center"
                        type = "share"
                        okText="买入"
                        theme="blue"
                        placeholder="委托数量"
                        :maxValue="'800'"
                        :scale="'100'"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                    ></md-stock-item>
                </div>
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
    import Button from  '../../js/components/modules/button/index.vue'
    import TradeKeyboard from '../../js/components/modules/trade-keyboard/'
    import SearchItem from '../../js/components/modules/search-input'
    import StockItem from '../../js/components/modules/stock-input'

    export default {
        name: 'demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [Button.name]: Button,
            [TradeKeyboard.name]: TradeKeyboard,
            [SearchItem.name]: SearchItem,
            [StockItem.name]: StockItem,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                isShowPopup :false,
                showKeyboard1 : false,
                showKeyboard2 : false,
                showKeyboard3 : false,
                inputValue : '',
                maxValue : '800',
                readonly : true,
                searchValue : '',
                searchValue2 : '',
                priceValue : '19.52',
                numValue : '200'
            }
        },
        watch:{
            searchValue(val){
                console.log(val)
            }
        },
        computed: {
        },
        methods: {
            onCancel (){
                console.log(111,this.inputValue)
            },
            onConfirm (name,val){
                console.log(222,val)
            },
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    .page-main{

        .md-button{
            margin: .2rem .2rem 0;
        }
    }
</style>
