<template>
    <div>
        <transition name="fade">
            <div class="mask" v-show="visible"></div>
        </transition>
        <transition appear mode="out-in" name="slideInUp">
            <div class="bankSelect bank-list" v-show="visible">
                <div class="title">{{title}} <span class="close" @click="closeBankSelect()"></span></div>
                <div class="selectList">
                    <div class="item"
                         v-for="(item,index) in typeData.list"
                         :class="{'active' : typeData.curItem == index ,'disabled':item.ishide}"
                         @click="selectItem(item,index)">
                        <div class="box">
                            <span class="bank-logo" v-if="item.payment_type == 'SAVING_POT'"><img :src="item.img_s" alt=""></span>
                            <span class="bank-logo" v-else><img :src="item.bank_img_s" alt=""></span>
                            <h2>{{item.bank_name}}</h2>
                            <p v-if="item.payment_type == 'SAVING_POT'">可用余额{{item.available_balance|formatNumber}}元,支持大额申购</p>
                            <p v-if="item.tips && item.payment_type == 'BANK_CARD' && !item.ishide">单笔限额{{item.bank_once_quota|changeMoney}}元 {{item.tips}}</p>
                            <p v-if="item.tips && item.payment_type == 'BANK_CARD' && item.ishide">{{item.tips}}</p>
                            <p v-if="!item.tips && item.payment_type == 'BANK_CARD'">单笔限额{{item.bank_once_quota|changeMoney}}元</p>
                            <i class="icon"></i>
                        </div>
                        <span class="bank-active" v-if="item.is_update" @click="toActiveBank">去激活 <i class="icon-right"></i></span>
                    </div>
                    <div class="addBank" @click="toAddCard(item)" v-if="!typeData.hidePlus">添加银行卡</div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    import config from '../../../config'
    var defaults = {
        visible: false,
        title : '',
        typeData: ''
    };
    export default {
        data() {
            return {
                ...defaults
            };
        },
        created() {
            this.$nextTick(() => {
                this.rendered = true;
                this.title = this.typeData.title || '选择支付方式';
                this.typeData.curItem = this.typeData.curItem || 0;
            })
        },
        methods: {
            toAddCard () {
                window.location.href = config.PAGE_PATH.ADD_BANKCARD
            },
            toActiveBank(data){

            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        background: rgba(0, 0, 0, .4);
    }

    .bankSelect {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        background-color: #fff;

        .title{
            position: relative;
            height: 1.14rem;
            line-height: 1.14rem;
            text-align: center;
            font-size: .32rem;
            color: #333;
            font-weight: bold;
            &:before{
                @include setTopLine();
            }
            &:after{
                @include setBottomLine();
            }

            .close{
                display: block;
                position: absolute;
                right: .36rem;
                top:.36rem;
                width: .42rem;
                height: .42rem;
                background-size: .34rem .34rem;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url("./close.png");
            }
        }

        .selectList{
            padding: 0 .26rem;
            max-height: 8rem;
            overflow: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        .item {
            position: relative;
            height: 1.6rem;
            color: #a0a0a0;
            padding-top: .33rem;
            padding-left: 1.48rem;
            font-size: .28rem;
            text-align: left;

            &:before{
                @include setBottomLine();
            }

            &.active {
                .icon {
                    opacity: 1;
                }
            }
            &.disabled {
                .box{
                    opacity: .6;
                }
            }

            .bank-logo{
                display: block;
                width: .94rem;
                height: .94rem;
                position: absolute;
                top: .3rem;
                left: .26rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            h2{
                font-size: .32rem;
                line-height: .44rem;
                color: #333;
            }
            p{
                font-size: .26rem;
                color: #bdbdbd;
                line-height: .3rem;
                margin-top: .14rem;
            }
            .icon {
                position: absolute;
                right:0;
                top:50%;
                margin-top: -.31rem;
                width: .62rem;
                height: .62rem;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background-image: url("./tick.png");
                opacity: 0;
                -webkit-transition: opacity .3s;
                -moz-transition: opacity .3s;
                transition: opacity .3s;
            }

            .bank-active{
                position: absolute;
                right: 0;
                top:50%;
                margin-top: -.15rem;
                color: #ef4352;
                font-size: .28rem;
                line-height: .3rem;

                .icon-right{
                    margin-left: .1rem;
                    display: inline-block;
                    vertical-align: top;
                    width: .18rem;
                    height: .3rem;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    background-image: url("./right_red.png");
                }
            }
        }
    }
    .addBank{
        position: relative;
        height: 1.6rem;
        padding:.4rem .4rem .4rem 1.3rem;
        line-height: .8rem;
        color: #808080;
        font-size: .32rem;
        background-size: .8rem .8rem;
        background-repeat: no-repeat;
        background-image: url("./plus.png");
        background-position: .4rem center;

    }
</style>
