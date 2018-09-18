<template>
    <div class="notice-board" @click="toNotice">
        <i class="icon-horn"></i>
        <span>{{noticeData.title}}</span>
        <i class="icon-right"></i>
    </div>
</template>

<script>
    export default {
        name: 'noticeBoard',
        data () {
            return {
                noticeId : 0
            }
        },
        props: {
            noticeData: ''
        },
        methods: {
            toNotice(){
                this.$router.push({
                    path : '/notice',
                    query : {
                        noticeId : this.noticeId
                    }
                })
            }
        },
        created(){
            this.noticeId = this.noticeData.noticeId
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .notice-board{
        position: relative;
        display: block;
        height: .8rem;
        padding : .2rem .8rem;
        background-color: #FFF9ED;
        span{
            display: block;
            color: #C09744;
            font-size: .28rem;
            line-height: .4rem;
            @include text-overflow;
        }

        i{
            position: absolute;
            display: block;
            top: .2rem;
            height: .4rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;

            &.icon-horn{
                left: .26rem;
                width: .4rem;
                background-image: url("./horn.png");
            }
            &.icon-right{
                right: .26rem;
                width: .2rem;
                background-image: url("./icon-right.png");
            }
        }

    }

</style>
