<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="''">
                    <md-button @click="showPopup('top')">顶部弹出</md-button>
                    <md-popup
                        v-model="isShowPopup.top"
                        position="top"
                        :hasMask="false"
                    >
                        <div class="demo-info">Popup Top
                            <div class="demo-icon" @click="hidePopUp('top')">
                                <md-icon :name="'md-icon-clear'"></md-icon>
                            </div>
                        </div>
                    </md-popup>
                </md-field>
                <md-field :title="''">
                    <md-button @click="showPopup('bottom')" >底部弹出</md-button>
                    <md-popup
                        v-model="isShowPopup.bottom"
                        position="bottom"
                        :hasMask="true"
                    >
                        <div class="demo-info">Popup Bottom</div>
                    </md-popup>
                </md-field>
                <md-field :title="''">
                    <md-button @click="showPopup('center')" >居中弹出</md-button>
                    <md-popup
                        v-model="isShowPopup.center"
                        position="center"
                        :hasMask="true"
                    >
                        <div class="demo-info">Popup Center</div>
                    </md-popup>
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
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                isShowPopup :{}
            }
        },
        watch:{
        },
        computed: {
        },
        methods: {
            showPopup(name){
                this.$set(this.isShowPopup,name,true);
            },
            hidePopUp(name) {
                this.$set(this.isShowPopup, name, false)
            },
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    .page-main{
        background-color: $bg-color-base;
        .demo-info{
            position: relative;
            background-color: #e6e6e6;
            line-height: .8rem;
            height: .8rem;
            text-align: center;
            font-size: .34rem;
            color: #333;
            width: 100%;
            padding: 0 .3rem;
            .demo-icon{
                width: .48rem;
                height: .48rem;
                position: absolute;
                right: .2rem;
                top:.16rem;
            }
        }
    }
</style>
