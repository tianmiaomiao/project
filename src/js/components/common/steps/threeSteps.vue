<template>
    <div class="steps-wrap">
        <div class="real-steps">
            <!--步骤条-->
            <div :class="[step==1?'real-steps-one':step==2?'real-steps-two':'real-steps-three']" ></div>
            <!--对应步骤描述-->
            <div class="des">
                <div v-for="item in opts">{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VSteps',
        components: {},
        props:{
            step: {
                type: Number,
                default: 1
            },
            opts:{
                type: Array,
            }
        },
        data () {
            return {}
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .steps-wrap{
        height: 2.16rem;
        .real-steps{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            -webkit-flex-direction: column;
            -webkit-justify-content: space-between;
            align-items: center;
            .real-steps-one,.real-steps-two,.real-steps-three{
                width: 6.42rem;
                height: .58rem;
                margin: .5rem 0 .3rem;
            }
            .real-steps-one{
                background: url("step1.png") no-repeat;
                background-size: 100% 100%;
            }
            .real-steps-two{
                background: url("step2.png") no-repeat;
                background-size: 100% 100%;
            }
            .real-steps-three{
                background: url("step3.png") no-repeat;
                background-size: 100% 100%;
            }
            .des{
                width: 7rem;
                height: .5rem;
                display: flex;
                justify-content: space-between;
                -webkit-justify-content: space-between;
                font-size: .3rem;
                color: #333;
            }
        }
    }
</style>
