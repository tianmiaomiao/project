<template>
    <transition name="fade">
        <div v-show="visible" :class="position" class="toast">
            <div class="message">{{message}}</div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                visible: false, /*对toast的显示和隐藏*/
                message: '', /*消息文字*/
                position: ''    /*toast位置 top、middle、bottom*/
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .toast {
        position: fixed;
        left: 0;
        text-align: center;
        z-index: 9999;
        width: 100%;

        &.middle {
            top: 50%;
            transform: translateY(-50%);
            -o-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
        }
        &.top {
            top: 5%;
        }
        &.bottom {
            bottom: 5%;
        }
        .message {
            display: inline-block;
            color: #fff;
            border-radius: 3px;
            background: rgba(0, 0, 0, 0.7);
            overflow: hidden;
            word-wrap: break-word;
            padding: 0.2rem;
            font-size: 0.28rem;
            font-style: normal;
            max-width: 80%;
            line-height: 1.2;
        }
    }
</style>

