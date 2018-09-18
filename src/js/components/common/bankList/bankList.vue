<template>
    <div class="bank-box">
        <transition name="fade">
            <div class="mask" @click="onClickingMask" v-show="visible"></div>
        </transition>
        <transition appear mode="out-in" name="slideInUp">
            <div class="bank bank-list" v-show="visible">
                <h2 class="bank_tit">{{title}}<span class="close" @click="onClickingMask"></span></h2>
                <div class="bank_content">
                     <ul ref="bank_list" class="bank_list">
                        <li v-for="bankItem in bankListData" @click="onClickBank(bankItem)">
                            <div class="sub_title" v-if="bankItem.showTitle">{{subTitle}}</div>
                            <div class="bank_item">
                                <span class="bank_hot" v-if="bankItem.hot">推荐</span>
                                <span class="bank_icon"><img :src="bankItem.bank_img"/></span>
                                <div class="bank_cont">
                                    <h3 class="name">{{bankItem.bankname}}</h3>
                                    <div class="desc">单笔限额<span>{{bankItem.bank_once_quota}}</span>，日限额<span>{{bankItem.bank_day_quota}}</span></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'bankList',
        data(){
            return {
                title:'请选择发卡银行',
                subTitle : '以下银行单笔、单日限额较低',
                visible : false
            }
        },
        props:{
            bankListData : '',
            showBank :'',
        },
        methods: {
            onClickBank(bank){
                this.$emit('chooseBank',bank);
                this.onClickingMask();
            },
            onClickingMask(){
                this.$emit('closeFn');
            },
        },

        created(){
            this.$nextTick(() => {
                this.visible = true;
            })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .bank-box{
        .mask{
            position: fixed;
            z-index: 1000;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background-color: rgba(0,0,0,.4)
        }
        .bank {
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 5000;
            width: 100%;
            background-color: #FFFFFF;
        }
        .bank_tit{
            text-align: center;
            font-size: 0.32rem;
            padding:  0.35rem 0 0.3rem 0;
            position: relative;
            font-weight: bold;
            &:before {
                @include setBottomLine();
            }
            .close{
                width: 0.42rem;
                height: 0.42rem;
                position: absolute;
                top: 0.28rem;
                right: 0.3rem;
                background: url("./toolbar_stop.png") no-repeat center 0;
                background-size: 0.42rem auto;
            }
        }
        .sub_title{
            font-size: .3rem;
            color: #333;
            line-height: .74rem;
            text-align: center;
            border-top: .2rem solid #f2f2f2;
            position: relative;
            &:before {
                @include setBottomLine();
            }
        }
        .bank_content{
            max-height: 7rem;
            overflow: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        .bank_list{
            height: 100%;
        }
        li{
            &:last-child{
                .bank_item:before {
                    display: none;
                }
            }
        }
        .bank_item{
            padding: 0.24rem 0;
            margin: 0 0.3rem;
            line-height: 1;
            @include dis_flex();
            position: relative;
            &:before {
                @include setBottomLine();
            }
        }
        .bank_hot{
            position: absolute;
            right: 0;
            top:50%;
            display: inline-block;
            line-height: .36rem;
            margin-top: -.14rem;
            min-width: .64rem;
            font-size: .24rem;
            text-align: center;
            color: #ef4352;
            border:1px solid #ef4352;
        }
        .bank_icon{
           @include boxflex(0);
           flex: 0 0 0.94rem;
           img{
               display: block;
               width: 100%;
               height: 100%;
               border: none;
           }
        }
        .bank_cont{
            @include boxflex(1);
            margin-left: 0.3rem;
            .name{
                font-size: 0.32rem;
                margin: 0.14rem 0 ;
            }
            .desc{
                font-size: 0.3rem;
                color: #bdbdbd;
                span{ color: #EF4352; padding: 0 2px;}
            }
        }
    }
</style>
