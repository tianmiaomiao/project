<template>
    <div class="header" v-if="rendered">
        <div class="header-row"  v-wechat-title="$route.meta.title" img-set="./static/favicon.ico">
            <span class="btn-back" v-if="opts.backBtn" @click="backTo">返回</span>
            {{$route.meta.title}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderBack',
        components: {},
        props:{
            opts:''
        },
        data () {
            return {
                rendered : true
            }
        },
        methods: {
            backTo(){
//                通过路由返回上一页
                if(this.opts.backNum){
                    this.$router.go(this.opts.backNum)
                }else{
                    this.$router.go(-1)
                }
            }
        },
        created(){
            this.rendered = window.showHeader;
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .header{
        position: absolute;
        top:0;
        width: 100%;
        color: #666;
        background: #fafafa;
    }
    .header-row{
        position: relative;
        height: .9rem;
        text-align: center;
        line-height: .9rem;
        font-size: .34rem;
        color: #333;
        &:before {
             @include setBottomLine(#D0D0D0);
        }
        .btn-back{
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            min-width: .9rem;
            height: .9rem;
            font-size: .32rem;
            padding-left: .54rem;
            background: url("./backbg.png") no-repeat;
            background-size: .32rem .6rem;
            background-position: .2rem center;
        }
        .tag{
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            height: .9rem;
            color: #333;
            font-size: .3rem;
            padding: 0 .2rem;
        }
        .back-home{
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: .9rem;
            height: .9rem;
            background: url("homebg.png") no-repeat;
            background-size: .37rem .37rem;
            background-position: .3rem center;
        }
    }
</style>
