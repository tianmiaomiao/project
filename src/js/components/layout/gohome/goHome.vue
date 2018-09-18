<template>
    <div class="goHome">
        <a :href="homePath">
            <i class="icon-home"></i>
            <span>首页</span>
        </a>
    </div>
</template>
<script>
    import config from '../../../config';
    export default {
        name: 'goHome',
        data(){
            return {
                homePath : config.PAGE_PATH.HOME_PATH
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .goHome{
        position: fixed;
        left: .26rem;
        bottom: 2rem;
        width: 1rem;
        height: 1rem;
        color: #fff;
        background-color: rgba(94,94,94,.6);
        border-radius: .5rem;
        overflow: hidden;

        a{
            display: block;
            height: 100%;
            padding-top: .12rem;

            .icon-home{
                display: block;
                width: .38rem;
                height: .38rem;
                margin:0 auto;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url("./home.png");
            }
            span{
                display: block;
                text-align: center;
                color: #fff;
                margin-top: .06rem;
                font-size: .26rem;
                line-height: .26rem;
            }
        }
    }
</style>
