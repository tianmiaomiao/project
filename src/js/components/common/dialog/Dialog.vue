<template>
    <div v-if="rendered">
        <div class="dialog-mask" v-show="visible"></div>
        <transition name="zoom">
            <div class="confirm" :style="{top:offtop}" v-show="visible">
                <div class="confirm-content">
                    <!--<div class="topic" v-if="topic">{{topic}}</div>-->
                    <!--<div class="close" @click="hideDialog('cancel')"></div>-->
                    <div class="info" :class="textAlign">
                        <h2 v-if="title">{{title}}</h2>
                        <p class="msg" v-if="message" v-html="message"></p>
                        <div class="btn-content">
                            <div class="cell" v-if="showCancel">
                                <div class="dialog-btn btn-cancel" @click="hideDialog('cancel')">{{cancelTxt}}</div>
                            </div>
                            <div class="cell">
                                <div class="dialog-btn btn-ok" @click="hideDialog('confirm')">{{okTxt}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    var defaults = {
        rendered: false,
        visible: false,
        type: '',
        topic: '',
        title: '',
        message: '',
        offtop: '',
        textAlign: '',
        okTxt: '',
        cancelTxt: ''
    };

    export default {

        data() {
            return {
                ...defaults
            }
        },
        mounted(){

        },
        created() {
            this.rendered = true;
        },
        computed: {
            showCancel (){
                return this.type !== 'alert' ? true : false;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .dialog-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999999;
        background-color: rgba(0,0,0,.4);
        animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -moz-animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
        -webkit-animation:fadeIn .3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    .confirm {
        position: fixed;
        z-index: 10000000;
        width: 6rem;
        left: 50%;
        top: 50%;
        margin-left: -3rem;

        .confirm-content {
            position: relative;
            background-color: #fff;
            box-sizing: border-box;
            min-height: 100%;
            font-size: 0;
            border-radius: .12rem;
            overflow: hidden;
            /*padding-top: .4rem;*/

            .close {
                position: absolute;
                width: .3rem;
                height: .3rem;
                right: .3rem;
                top: .3rem;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-image: url("close.png");
            }

            .topic {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                line-height: .9rem;
                padding: 0 .32rem;
                font-size: .34rem;
                color: #333;
                border-bottom: 1px solid #c0c0c0;

                & ~ .info {
                    margin-top: .5rem;
                }
            }

            .info {
                padding: .14rem 0 0;

                &.center {
                    text-align: center;
                }
                &.right {
                    text-align: right;
                }
            }

            h2 {
                font-size: .34rem;
                line-height: .84rem;
                color: #333;
                font-weight: bold;
                text-align: center;
            }

            .msg {
                color: #333;
                font-size: .28rem;
                line-height: .48rem;
                min-height: .9rem;
                padding: 0 .5rem;
                word-break: break-all;
            }
            .btn-content {
                margin-top: .4rem;
                @include clearfix;
                .cell {
                    width: 50%;
                    float: left;
                    &:only-child {
                        width: 100%;
                        padding: 0;
                        border-left:0;
                    }
                }
                .dialog-btn {
                    display: block;
                    box-sizing: border-box;
                    line-height: .88rem;
                    font-size: .32rem;
                    text-align: center;
                    background-color: #fff;
                    position: relative;
                    &:before {
                        @include setTopLine(#d0d0d0);
                    }
                    &.btn-cancel {
                        color: #636363;
                        position: relative;
                        &:after {
                            @include setRightLine(#d0d0d0);
                        }
                    }
                    &.btn-ok {
                        color: #ef4353;
                    }
                }
            }
        }

        .confirm-close {
            display: none;
        }
    }

    .alert {
        @extend .confirm;

        .alert-content {
            @extend .confirm-content;
        }

        .alert-close {
            display: none;
        }
    }
</style>
