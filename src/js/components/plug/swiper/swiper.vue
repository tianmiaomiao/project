<template>
    <div class="common-swiper">
        <div class="swiper-container" :class="parentSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in dataVal">
                    <span class="box"><img :src="item.imgSrc"/></span>
                </div>
            </div>
            <!--分页及按钮-->
            <div class="swiper-pagination" v-show="dataVal.length>1"></div>
            <!--<div class="swiper-button-next"><i class="fa fa-angle-right"></i></div>-->
            <!--<div class="swiper-button-prev"><i class="fa fa-angle-left"></i></div>-->
        </div>
    </div>
</template>
<script>
    //引入swiper
    import swiper from 'swiper';
    import swipercss from 'swiper/dist/css/swiper.css';
    export default{
        name: 'Swiper',
        props:{
            //swiper的配置项
            opts:{},
            parentSwiper : '',
            //swiper的数据
            dataVal:''
        },
        data(){
            return {
                mySwiper : ''
            }
        },
        methods:{
            initSwiper(){
                //挂在完成之后初始化swiper
                var self = this;
                if(self.dataVal.length < 2){
                    self.opts.loop = false;
                    self.opts.autoplay = false;
                }
                self.mySwiper = new Swiper('.'+self.parentSwiper, Object.assign(self.opts ,{
                    //解决开启loop模式，前后两张图点击事件失效问题  统一onClick 回调方式跳转
                    preventClicks : true,
                    autoplayDisableOnInteraction : false,
                    onClick:function (swiper) {
                        var item = self.dataVal[swiper.realIndex];
                        if(!item.href) return;
                        var url = self.setOrigin(item.href);
                        if(Util.thirdApp.isFinance && self.parentSwiper === 'indexSwiper'){
                            self.useAnchorLink(`sinafinance://type=20&subtype=7&pull=h5&url=${encodeURIComponent(url)}`)
                        }else {
                            window.location.href = url.toString();
                        }
                    },
                    onInit:function (swiper) {
                        if(swiper.slides.length < 2){
                            swiper.lockSwipeToNext();
                            swiper.lockSwipeToPrev();
                        }
                    }
                }));
            },
            setOrigin(url){
                var protocol = window.location.protocol;
                if(url.indexOf('//') == 0){
                    url = `${protocol}${url}`
                }
                return url;
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
        },
        created(){
            this.$nextTick(()=>{
                this.initSwiper()
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .common-swiper{
        .swiper-container {
            width: 100%;
            height: 2.02rem;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .box{
                display: block;
                width: 100%;
                height: 100%;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination{
            font-size: 0;
            bottom: .1rem;
        }
        .swiper-pagination-bullet{
            width: .12rem;
            height: .12rem;
            background: #fff;
            opacity: .7;
        }
        .swiper-pagination-bullet-active{
            background: #fff500 !important;
        }
    }
</style>
