<template>
    <div class="bottom" :class="{'iosX':isIosX}" @click="fnClick">
        <span>新浪AI择智能策略</span>
    </div>
</template>

<script>
    export default {
        name: 'bottom',
        computed:{
          isIosX(){
              return /iphone/gi.test(window.navigator.userAgent) && (window.screen.height == 812 && window.screen.width == 375) && window.devicePixelRatio == 3;
          }
        },
        methods: {
            fnClick(){
                console.log('立即体验');
            }
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        overflow: hidden;
        z-index: 999;
        span{
            display: block;
            height: 1.2rem;
            text-indent:-999em;
            background-position: center center;
            background-repeat: no-repeat;
            background-size:cover;
            background-image: url("./adver.png");
        }
        &.iosX{
            padding-bottom: 0.8rem;
            &:after{
                height: 0.8rem;
                content: '';
                width: 100%;
                position: absolute;
                left:0;
                bottom:0;
                background:#fff;
            }
        }
    }
</style>
