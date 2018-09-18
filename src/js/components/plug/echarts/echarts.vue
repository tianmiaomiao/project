<template>
    <div class="echarts" v-creatEchart>
        <div id="echartsBox"></div>
        <div class="echart-time" v-if="!showTimer">
            <span v-for="(item,index) in xAxis" v-if="index == 0 || index == xAxis.length-1">{{item}}</span>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default{
        name:'ECharts',
        data() {
            return {
                showTimer : false,
                xAxis : '',
            };
        },
        props: {
            opts: {
                type : Object
            }
        },
        directives: {
            creatEchart: {
                inserted: function (el, binding, vnode) {
                    setTimeout(()=>{
                        var myChart;
                        var EWidth = el.clientWidth;
                        var EHeight = el.clientHeight;
                        var EBox = document.getElementById('echartsBox');

                        EBox.style.width = EWidth + 'px';
                        EBox.style.height = EHeight + 'px';

                        myChart = echarts.init(EBox);
                        myChart.setOption(vnode.context.opts);
                    },50);
                }
            }
        },
        created (){
            this.showTimer = this.opts.xAxis.axisLabel.show;
            this.xAxis = this.opts.xAxis.data;
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .echarts{
        position: relative;
        width: 100%;
        height: 100%;

        .echart-time{
            position: absolute;
            bottom: 0;
            left: 5%;
            right: 5%;
            font-size: .24rem;
            color: #999;
            @include dis_flex;
            @include justify()
        }
        .gainsNode{
            padding: .05rem .1rem;
            font-size: 12px;
            min-width: 2.4rem;
            .num{
                position: relative;
                padding-left: 10px;
                .lab{
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 6px;
                    height: 6px;
                    margin-top: -3px;
                    border-radius: 3px;
                }
                .red{
                    color: #ef4352;
                }
                .green{
                    color: #10b524;
                }
            }
        }
    }
</style>