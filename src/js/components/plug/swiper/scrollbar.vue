<template>
    <div class="scorllBar">
        <div class="swiper-container swiper-scrollBar">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in scrollList">
                    <slot :item="item"></slot>
                </div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</template>
<script>
    import swiper from 'swiper';
    import swipercss from 'swiper/dist/css/swiper.css';
    export default{
        name: 'scrollBar',
        props:{
            opts:{},
            scrollList:''
        },
        data(){
            return {
                myScroll : '',
            }
        },
        methods:{
            initScroll(){
                var self = this;
                self.myScroll = new Swiper('.swiper-scrollBar',{
                    scrollbar: '.swiper-scrollbar',
                    slidesPerView : 'auto',
                    scrollbarHide: true,
                    freeMode : true,
                    loop : false,
                    autoplay : false,
                    autoplayDisableOnInteraction : false,
                });
            }
        },
        created(){
            var vm = this;
            this.$nextTick(()=>{
                vm.initScroll()
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .scorllBar{
        .swiper-container {
            width: 100%;
            height: auto;
        }
        .swiper-wrapper{
            width: auto;
            height: auto;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            width: auto;
        }
        .swiper-scrollbar{
            display: none;
        }
    }
</style>
