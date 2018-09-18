<template>
    <div class="empty">
        <i class="icons" :class="icon"></i>
        <div class="desc" v-html="desc"></div>
        <div class="time" v-if="time" v-html="time"></div>
        <div class="empty-btn" v-if="btn" @click="goPage">{{btn}}</div>
    </div>
</template>

<script>
    export default {
        name: 'empty',
        data () {
            return {
                icon: '',
                desc: '',
                time: '',
                btn: ''
            }
        },
        props: {
            opts: ''
        },
        methods: {
            goPage: function () {
                this.$emit('eventBtn')
            }
        },
        created(){
            this.icon = this.opts.icon;
            this.desc = this.opts.desc;
            this.time = this.opts.time;
            this.btn = this.opts.btn;
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

    .empty {
        padding: .5rem 0;
        text-align: center;

        .icons {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            &.type1 {
                background-image: url("./empty-1.png");
            }
            &.type2 {
                background-image: url("./empty-2.png");
            }
            &.type3 {
                background-image: url("./empty-3.png");
            }
            &.type4 {
                background-image: url("./empty-4.png");
            }
        }
        .desc {
            font-size: .32rem;
            line-height: .7rem;
            color: #333;
        }
        .time{
            line-height: 1;
            color: #939393;
            font-size: .24rem;
        }
        .empty-btn {
            display: inline-block;
            width: 2.4rem;
            height: .68rem;
            background-color: #ef4352;
            color: #fff;
            font-size: .28rem;
            text-align: center;
            border-radius: 2px;
            line-height: .68rem;
        }
    }

</style>
