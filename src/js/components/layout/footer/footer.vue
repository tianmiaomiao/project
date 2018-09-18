<template>
    <div class="page-footer com-footer" v-if="rendered">
        <ul>
            <li :class="{'active':isIndex}" @click="toIndex">
                <i class="foot-icon icon-nav1"></i>
                <span>首页</span>
            </li>
            <li :class="{'active':isTactics}" @click="toTactics">
                <i class="foot-icon icon-nav2"></i>
                <span>策略</span>
            </li>
            <li :class="{'active':isMy}" @click="toMy">
                <i class="foot-icon icon-nav3"></i>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        data () {
            return {
                rendered : false,
                isIndex : false,
                isTactics : false,
                isMy : false
            }
        },
        methods: {
            toIndex(){
                this.$router.push({path:'/index'})
            },
            toTactics(){
                this.$router.push({path:'/tacticsHome'})
            },
            toMy(){
                this.$router.push({path:'/mine'})
            }
        },
        created(){
            this.rendered = window.showFooter;
            this.isIndex = this.$route.path == '/index';
            this.isTactics = this.$route.path == '/tacticsHome';
            this.isMy = this.$route.path == '/mine';
        }
    }
</script>


<style lang="scss" rel="stylesheet/scss">

    .page-footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 -1px 2px rgba(234,234,234,.5);
        z-index: 999;
        ul{
            height: 1rem;
            @include dis_flex;
            li{
                text-align: center;
                color: #333;
                display: block;
                font-size: .2rem;
                padding-top: .04rem;
              
                &:first-child{
                    width: 2rem;
                }
                &:last-child{
                    width: 2rem;
                }
                &:nth-child(2){
                    @include boxflex(1)
                }
                span{
                    display: block;
                }
                .foot-icon{
                    display: block;
                    width: .6rem;
                    height: .6rem;
                    margin: 0 auto;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;

                    &.icon-nav1{
                        background-image: url("./nav_01.png");
                    }
                    &.icon-nav2{
                        background-image: url("./nav_02.png");
                    }
                    &.icon-nav3{
                        background-image: url("./nav_03.png");
                    }
                }
                &.active{
                    color: #f44e50 !important;
                    .foot-icon{
                        &.icon-nav1{
                            background-image: url("./nav_active01.png");
                        }
                        &.icon-nav2{
                            background-image: url("./nav_active02.png");
                        }
                        &.icon-nav3{
                            background-image: url("./nav_active03.png");
                        }
                    }
                }
            }
        }
    }
</style>
