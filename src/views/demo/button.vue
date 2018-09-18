<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <div class="btn-group">
                    <md-button disabled @click="showAlert">按钮</md-button>
                    <md-button type="primary" disabled >按钮</md-button>
                    <md-button type="primary line" disabled >按钮</md-button>
                </div>
                <div class="btn-group">
                    <md-button type="primary" >默认按钮</md-button>
                    <md-button type="primary" size="large" >大按钮</md-button>
                    <md-button type="primary" size="small">小按钮</md-button>
                    <md-button type="primary line" size="small" >小按钮</md-button>
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
    import ListItem from  '../../js/components/modules/list-item/index.vue'
    import Icons from '../../js/components/modules/icon/index.vue'
    import Button from  '../../js/components/modules/button/index.vue'

    export default {
        name: 'demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [Button.name]: Button,
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
            showAlert(){
                alert(1)
            }
        },
        created(){
            console.log(this.$matomo)
        }
    }
</script>

<style lang="scss" scoped>
    .page-main{

        .btn-group{
            padding: .3rem .26rem;
            background-color: $bg-color-base;
            & + .btn-group{
                margin-top: .2rem;
            }
        }
    }
</style>
