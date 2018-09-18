<template>
    <div class="activity-modal">
        <div class="act-mask" v-show="rendered"></div>
        <transition name="zoom">
            <div class="act-pic" ref="actPic" :style="{'margin-top' : offTop}" v-show="rendered">
                <div class="box">
                    <div class="act-img" :style="setBackground(activityData.image)"></div>
                    <wbFocus :opts="{ type : 'type1' }" ref="focusWb"></wbFocus>
                    <div class="act-btn" :style="setBackground(activityData.submit_image)" @click="toPage"></div>
                </div>
                <div class="close" @click="hideModal"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import wbFocus from './wbFocus.vue'
    export default {
        name: 'activityModal',
        components: {
            wbFocus
        },
        props:{
            activityData:''
        },
        data () {
            return {
                rendered : false,
                offTop : 0
            }
        },
        computed: {
        },
        methods: {
            hideModal(){
                this.rendered = false;
            },
            setBackground(url){
                return 'background-image:url('+ url +')'
            },
            toPage (){
                var vm = this;
                //调用关注组件关注方法
                vm.$refs.focusWb.setFocus();

                //跳转活动页
                var url = vm.setOrigin(vm.activityData.url);
                if(!url) return;

                if(Util.thirdApp.isFinance){
                    //跳转财经webview
                    vm.useAnchorLink(`sinafinance://type=20&subtype=7&pull=h5&url=${encodeURIComponent(url)}`)
                }else if(Util.thirdApp.isWeibo){
                    setTimeout(()=>{
                        window.location.href = url
                    },1e3)
                }else{
                    window.location.href = url
                }
            },
            useAnchorLink (url) {
                var a = document.createElement('a');
                a.setAttribute('href', url);
                a.style.display = 'none';
                document.body.appendChild(a);

                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('click', false, false);
                a.dispatchEvent(e);
            },
            setOrigin(url){
                var protocol = window.location.protocol;
                if(url.indexOf('//') == 0){
                    url = `${protocol}${url}`
                }
                return url;
            },
            init(){
                var vm = this;
                if(vm.activityData && typeof vm.activityData == 'object'){
                    vm.rendered = true;

                    setTimeout(()=>{
                        vm.offTop = -vm.$refs.actPic.clientHeight / 2 + 'px';
                    },20);
                }
            }
        },
        created(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        activated(){
            this.$nextTick(()=>{
                this.init()
            })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .act-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999999;
        background-color: rgba(0,0,0,.4);
        animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -moz-animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -webkit-animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    .act-pic {
        position: fixed;
        z-index: 10000000;
        width: 6.98rem;
        left: 50%;
        top: 40%;
        margin-left: -3.49rem;
        .box{
            width: 6.98rem;
            height: 7.8rem;
        }
        .act-img{
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center top;
        }

        .act-focus{
            position: absolute;
            left: 0;
            width: 100%;
            text-align: center;
            top: 4.8rem;
            color: #faec0c;
            font-size: .24rem;
            line-height: .28rem;

            .icon-check{
                display: inline-block;
                vertical-align: top;
                width: .28rem;
                height: .28rem;
                margin: 0 .05rem;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url("./image/check.png");
            }
            
            &.active{
                .icon-check{
                    background-image: url("./image/check-active.png");
                }
            }
        }

        .act-btn{
            position: absolute;
            left: 50%;
            top: 5.3rem;
            width: 4.4rem;
            height: 1.1rem;
            margin-left: -2.2rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .close{
            display: block;
            margin: 0 auto;
            width: .6rem;
            height: .6rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("./image/close.png");
        }
    }
</style>
