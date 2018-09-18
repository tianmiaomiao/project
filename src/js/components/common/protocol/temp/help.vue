<template>
    <div class="answer-box">
        <h2>常见问题</h2>
        <div class="ques">
            <p>Q:</p><span>买入时银行卡单笔限额不够怎么办？</span>
        </div>
        <div class="ques answer">
            <p>A:</p><span>首次绑定银行卡时，尽量选择单笔限额高的银行卡；如果银行卡限额不够，建议先把资金存到备用金，购买时，选择用备用金支付即可。</span>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .answer-box {
        color: #939393;
        font-size: 0.3rem;
        h2 {
            text-align: center;
            font-size: 0.34rem;
            padding-bottom: 0.32rem;
            color: #333;
        }
        .ques {
            margin-top: .15rem;
            font-size: .30rem;
            color: #333333;
            font-weight: bold;
            @include clearfix;
            p {
                float: left;
                width: .68rem;
                display: inline-block;
            }
            span {
                float: left;
                display: inline-block;
                width: 6.3rem;
            }
        }
        .answer {
            font-weight: normal;
            font-size: .28rem;
            color: #939393;
            line-height: .5rem;
            margin-top: .2rem;
        }
    }
</style>
