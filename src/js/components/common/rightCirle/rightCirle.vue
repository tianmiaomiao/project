<template>
    <div>
        <div class="circle-wrap">
            <div class="circle-animate" v-show="showCircle">
                <div class="right-bg"></div>
            </div>
        </div>
        <input type="button" value="显示" @click="show">
        <input type="button" value="隐藏" @click="hidebtn">
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        data () {
            return {
                showCircle: false
            }
        },
        methods: {
            show: function () {
                this.showCircle = true
            },
            hidebtn: function () {
                this.showCircle = false
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .circle-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1rem;
        border: 1px solid red;
    }

    @keyframes circleFull {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes rightShow {
        0% {
            width: 0;
        }
        100% {
            width: .96rem;
        }
    }

    .circle-animate {
        width: .96rem;
        height: .96rem;
        background: #ef4352;
        border-radius: 1rem;
        animation: circleFull .6s ease-in-out;
        animation-fill-mode: forwards
    }

    .right-bg {
        width: 0;
        height: .96rem;
        background: url("./rightbg.png") no-repeat;
        background-size: cover;
        animation: rightShow .8s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: .4s;
    }
</style>
