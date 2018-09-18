<template>
    <div class="indicator">
        <transition name="fade">
            <div class="indicator-wrapper" :class="{big : !!text}" v-show="visible">
                <div class="indicator-spin" :style="setSize()">

                    <transition name="fade">
                        <div class="spinner-img" v-if="!succeed"></div>
                    </transition>

                    <transition name="tickShow">
                        <div class="spinner-succeed" v-if="succeed">
                            <div class="tick show-tick" v-if="succeed"><i class="icon-tick" :style="setSize()"></i></div>
                        </div>
                    </transition>
                </div>
                <span class="indicator-text" v-if="text">{{text}}</span>
            </div>
        </transition>

        <transition name="fade">
            <div class="indicator-mask" v-show="visible"></div>
        </transition>
    </div>
</template>

<script>
    var defaults = {
        visible: false,
        text: '',
        size:'',
        offLeft : 0,
        offTop : 0,
        succeed : false
    };
    export default {
        data() {
            return {
              ...defaults
            };
        },
        created() {
            this.rendered = true;
        },
        methods: {
            setSize (){
                return {
                    'width' : this.size,
                    'height': this.size,
                }
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .indicator{
        .indicator-wrapper {
            position: fixed;
            left: 50%;
            top:50%;
            z-index: 9999;
            padding: .24rem;
            line-height: 0;
            border-radius: 3px;
            background: rgba(51, 51, 51, 0.94);
            color: white;
            box-sizing: border-box;
            text-align: center;
            transform: translate(-50%,-50%);
            -o-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            -moz-transform: translate(-50%,-50%);
            -webkit-transform: translate(-50%,-50%);

            .big{
                min-width: .8rem;
                min-height: .8rem;
            }
        }
        .indicator-text {
            display: block;
            color: #fff;
            text-align: center;
            margin-top: .14rem;
            font-size: .28rem;
            line-height: .4rem;
            min-width: 6em;
        }
        .indicator-spin{
            position: relative;
            display: block;
            margin:0 auto;
            width: .8rem;
            height: .8rem;
        }
        .indicator-mask {
            position: fixed;
            left: 0;
            top:0;
            z-index: 9998;
            width: 100%;
            height:100%;
            background: rgba(0, 0, 0, 0);
        }
    }
    .spinner-img{
        position: absolute;
        left: 0;
        top:0;
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("./loading.gif");
    }

    .spinner-succeed{
        position: absolute;
        left: 0;
        top:0;
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("./icon-succeed.png");


        .tick{
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden;

            .icon-tick{
                display: block;
                width: .8rem;
                height: .8rem;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                background-image: url("./icon-tick.png");
            }
        }
    }
    .tickShow-enter-active, .tickShow-leave-active {
        transition:opacity .3s;
        -moz-transition:opacity .3s;
        -webkit-transition:opacity .3s;
    }
    .tickShow-enter, .tickShow-leave-to {
        opacity: 0;
    }
    .tickShow-enter-active .show-tick,
    .tickShow-leave-active .show-tick{
        transition:width 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -moz-transition:width 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -webkit-transition:width 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    .tickShow-enter .show-tick,
    .tickShow-leave-to .show-tick{
        width: 0;
    }
</style>
