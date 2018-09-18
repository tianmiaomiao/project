<template>
    <div class="page-view page-bg">
        <v-header :opts="headerData"></v-header>
        <div class="page-error">
            <div class="error-bg"></div>
            <div class="error-404">404</div>
            <div class="error-des">出错了，请点击按钮重新加载</div>
            <div class="error-operate">
                <div @click = "reLoad">重新加载</div>
                <div @click = "backHome">返回首页</div>
            </div>
        </div>
    </div>
</template>

<script>
    import VHeader from  '../../js/components/layout/header/header.vue'
    export default {
        name: '',
        components: {
            VHeader,
        },
        data () {
            return {
                headerData: {
                    name: "理财",
                    backBtn: true,
                    noBorder: true
                }
            }
        },
        methods : {
            backHome : function () {
                this.$router.push(
                    {
                        path : '/'
                    }
                )
            },
            reLoad : function () {
                this.$router.push(
                    {
                        path : '/'
                    }
                )
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .page-view{
        height: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        padding-top: .9rem;
        line-height: 1.1;
    }
    .page-bg{
        background: #f9f9f9;
    }
    .page-error{
        padding-top: 2.2rem;
        .error-bg{
            height: 2rem;
            background: url("./error.png") no-repeat center;
            background-size: 2rem;
        }
        .error-404{
            color: #b0b0b0;
            font-size: .8rem;
            text-align: center;
            margin: .2rem 0;
        }
        .error-des{
            color: #b0b0b0;
            font-size: .32rem;
            text-align: center;
        }
        .error-operate{
            display: flex;
            justify-content: space-between;
            padding: 0 1.7rem;
            margin-top: 1.3rem;
            color: #5193ff;
            font-size: .32rem;
            font-weight: bold;
        }
    }
</style>
