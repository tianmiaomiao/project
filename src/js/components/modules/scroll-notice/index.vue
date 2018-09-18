<template>
    <div class="md-scroll-notice">
        <div class="scroll-notice-inner" ref="scrollWrap">
            <ul
                ref = "scrollContainer"
                :style="{
                    'width' : listData.length * 100 + '%',
                    'margin-left' : offLeft
                }"
                :class="{animate : animate}"
            >
                <li v-for='item in listData'
                    :style="{
                        'width' : 100 / listData.length + '%',
                    }"
                >{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'md-scroll-notice',
        components: {},
        data(){
            return {
                animate:false,
                spend : 100,
                timer : 2000,
                offLeft : 0,
                curItem : 0,
            }
        },
        props: {
            listData : {
                type : Array,
                default: [],
            }
        },
        computed: {},
        mounted(){

            this.scroll();
        },
        methods: {
            scroll(){
                let vm = this;
                let first = vm.listData[0];
                vm.listData.push(first);

                let scrollContainer =  vm.$refs.scrollContainer;
                let ContainerWidth = scrollContainer.clientWidth;
                let length = vm.listData.length;
                let ItemWidth = ContainerWidth/length;
                let scrollTimer;

                vm.spend = ItemWidth/100;
                vm.timer = vm.spend*20;

                scrollTimer && clearInterval(scrollTimer);
                scrollTimer = setInterval(()=>{
                    if(vm.offLeft <= -(ItemWidth*length-1)){
                        vm.offLeft = 0;
                        scrollContainer.style.marginLeft = 0;
                        vm.animate = false;
                    }else{
                        vm.offLeft-=vm.spend;
                        vm.animate = true;
                        scrollContainer.style.marginLeft = vm.offLeft + 'px';
                    }
                },vm.timer);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-scroll-notice{
        width: 100%;
        position: relative;
        display: block;
        height: .8rem;
        padding: .2rem .8rem;
        background-color: #FFF9ED;

        .scroll-notice-inner{
            width: 100%;
            height: 100%;
            line-height: .4rem;
            overflow: hidden;

            ul{
                width: 100%;
                height: 100%;
                @include clearfix;

                &.animate{
                    /*transition: all .4s linear;*/
                    /*-moz--transition: all .4s linear;*/
                    /*-webkit-transition: all .4s linear;*/
                }
            }

            li{
                width: 100%;
                float: left;
            }
        }
        .anim{
            transition: all 0.5s;
        }
        #con1 li{
            list-style: none;
            line-height: .4rem;
        }
    }
</style>
