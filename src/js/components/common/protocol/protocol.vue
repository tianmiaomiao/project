<template>
    <transition name="move">
        <div v-show="showFlag" class="protocol" ref="protocol">
            <div class="protocol-content">
                <div class="protocol-head"><span @click="hide"></span></div>
                <div class="content">
                    <component :is="currentView"></component>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import server from  './temp/serverAgree.vue'
    import help from  './temp/help.vue'
    import khxy from  './temp/khxy.vue'
    import qyxz from  './temp/qyxz.vue'

    export default {
        components: {
            server,
            help,
            khxy,
            qyxz
        },
        data() {
            return {
                type : '',
                currentView : help,
                showFlag: false,
            };
        },
        props:{
            helpData : {
                type : ''
            }
        },
        computed: {
            hasTop(){
                return window.showHeader ? true : false;
            }
        },
        methods: {
            show() {
                this.showFlag = true;
//                if(Util.browser.isUC){
//                    window.ucHideHeader = true
//                }else{
//                    window.ucHideHeader = false
//                }
            },
            hide() {
                this.showFlag = false;
            },
        },
        created(){
            this.currentView = this.helpData.type;
        }
    };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .protocol {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 10001;
        width: 100%;
        padding-top: 1rem;
        background: #fff;
        transition: all 0.22s linear;

        &.move-enter-active, &.move-leave-active {
            left: 0;
        }
        &.move-enter, &.move-leave-active {
            left: 100%;
        }
        .protocol-content {
            height: 100%;
            position: relative;
        }
        .protocol-head {
            position: absolute;
            width: 100%;
            height: 1rem;
            left: 0;
            top:-1rem;
            span{
                position: absolute;
                width: 1rem;
                height: 1rem;
                display: block;
                right: 0;
                top: 0;
                z-index: 100;
                background-image: url("./toolbar_stop.png");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 0.42rem auto;
            }
        }
        .content {
            width: 100%;
            padding: 0 0.2rem 1.2rem 0.3rem;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }

    }
</style>
