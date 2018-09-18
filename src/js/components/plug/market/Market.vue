<template>
  <div class="chartWrap" v-if="rendered"><div ref="marketChart"></div></div>
</template>


<script>
    //  const KKE = require("http://finance.sina.com.cn/sinafinancesdk/js/sf_sdk.js");

    export default {
        name: 'market',
        data () {
            return {
                dom: this.$refs.marketChart,
//                图标依赖symbol生成
                symbol : this.marketOption.symbol
            }
        },
        props: {
            marketOption: ""
        },
        computed:{

        },
        created:function () {
            this.rendered = true;
        },
        mounted:function () {
            const url = "//finance.sina.com.cn/sinafinancesdk/js/sf_sdk.js";
            this.createScript(url,this.initData)
        },
        methods:{
            createScript : function (url,callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.callback = typeof callback != "undefined" ? callback : new Function();
                script[document.all ? "onreadystatechange" : "onload"] = function () {
                    if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                        return;
                    }
                    this.callback(this);
                    this.callback = null;
                    this[document.all ? "onreadystatechange" : "onload"] = null;
                    this.parentNode.removeChild(this);
                };
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            initData : function () {
                let symbol = this.symbol;
                let dom = this.$refs.marketChart;
                let redRaise = "0";
                let isFund = true;
                let hasRedRaise = typeof redRaise !== 'undefined';
                let chartColor = ['#ff484a', '#61ca59'];

                if (hasRedRaise) {
                    var theme = {
                        //k candle:
                        K_RISE: chartColor[redRaise], //k线蜡烛 涨
                        K_FALL: chartColor[1 - redRaise], //k线蜡烛 跌

                        //tick图:
                        K_MS_RISE: chartColor[redRaise],
                        K_MS_FALL: chartColor[1 - redRaise],

                        //t(scales) related:
                        T_RISE: chartColor[redRaise], //分时 涨（刻度使用）
                        T_FALL: chartColor[1 - redRaise] //分时 跌（刻度）
                    };
                }
                var param = {
                    wrap: {
                        dom: dom // 目标dom元素,默认根据父元素宽高设定宽高
                    },
                    chart: {
                        symbol: symbol,  // 股票代码
                        kInitParam: {
                            theme: theme
                        },
                        tInitParam: {
                            theme: theme
                        },
                        netWorthInitParam: {
                            theme: theme,
                            dim : {
                                posX:30
                            },
                            dual:{
                                theme:{
                                    K_CL:'#ffc574'
                                }
                            }
                        },
                        repayInitParam: {
                            theme: theme,
                            dim : {
                                posX:40
                            }
                        },
                        predictInitParam: {
                            theme: theme
                        },
                        isFund: !!isFund
                    },
                    info: hasRedRaise
                        ?
                        {
                            upColor: chartColor[redRaise],
                            downColor: chartColor[1 - redRaise]
                        }
                        : {}
                };

                this.merge(theme, {
                    BG: '#000', //背景色（行情图本身透明，此设定用于指示当前背景色，如微博截图分享的图片底色等）。
                    T_P: '#f14d4c', //分时图价格线颜色
                    T_AVG: '#f8b551', //分时图价格均线颜色
                    T_PREV: '#9b9b9b', //分时图昨收线颜色

                    //k candle:
                    K_N: '#999', //k线平

                    //tick图:
                    K_MS_N: '#000000',
                    //t(scales) related:
                    T_N: '#999', //分时 平

                    K_EXT: '#999', //k线极值文字颜色
                    T_T: '#999', //副图指标名称颜色
                    K_P: '#999', //k线刻度、副图指标刻度颜色
                    V_SD: '#333', //背景成交量颜色
                    M_ARR: ['#fff', '#BCD4F9'], //mountain样式渐变色，参数类型：数组。等比例从此数组指定的第一个颜色开始过渡到最后一个。如果数组中只有一个颜色，则使用此单一颜色完成填充。

                    TIME_S: '#333', //时间刻度文字颜色
                    TIME_L: '#f3f6f9', //时间线颜色
                    GRID: '#f3f6f9', //横向背景线颜色

                    IVH_LINE: '#999', //十字交互线颜色
                    P_TC: '#333', //交互价格标签文字颜色
                    P_BG: '#fff', //交互价格标签背景颜色
                    T_TC: '#333', //交互时间标签文字颜色
                    T_BG: '#fff', //交互时间标签背景颜色 #3e3d44

                    REMARK_T: '#fff', //k线复权标记文字颜色
                    REMARK_BG: 'rgb(62, 61, 68)',
                    K_PCT: '#999', //k线背景百分比刻度文字颜色
                    BTN_ARR: ['#2e2d32', '#999'], //提示层中按钮色指定，顺序：[背景色,文字色]
                    TIP_ARR: ['#2f2d32', '#999', null, true, '40%'], //提示层颜色，顺序：[背景色,文字色]
                    LOGO: '#ccc',  //水印色

                    K_CL:'#f14d4c'
                }, true);
                this.merge(param, {
                    wrap: {
                        style: {
                            backgroundColor: '#fff'
                        }
                    },
                    tech: {
                        boxStyle: {
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        itemNormalStyle: {
                            color: '#666'
                        }
                    },
                    tab: {
                        style: {
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        navStyle: {
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        navItemStyle: {
                            color: '#666',
                            fontSize:'16px',
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        navItemActiveStyle: {
                            color:'#f8b551',
                            backgroundColor: '#fff',
                            borderBottom:'3px solid #f8b551'
                        },
                        subNavItemStyle: {
                            color: '#666',
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        subNavItemActiveStyle: {
                            color: '#ff484a',
                            backgroundColor: 'rgb(255, 255, 255)'
                        }
                    },
                    info: {
                        simpleStyle: {
                            color: '#666',
                            backgroundColor: '#fff'
                        },
                        completeStyle: {
                            color: '#666',
                            backgroundColor: 'rgb(255, 255, 255)'
                        },
                        nameStyle: {
                            color: '#666'
                        },
                        levelColor: 'white'
                    }
                }, true);

                this.draw(param);
            },
            draw : function (param) {
                KKE.api('plugins.sinaAppTKChart.get', param, function (chart_) {
//          window.chart = chart_;
                    chart_.setDirection('vertical');

                    window.addEventListener('resize', function () {
                        chart_.resize();
                    });

//          try {
//            SUDA.uaTrack('chart_detail', 'appchart');
//          } catch (e) {}
                });
            },
            isClass : function (obj_) {
                var toString = Object.prototype.toString;
                if (obj_ === null) return "Null";
                if (obj_ === undefined) return "Undefined";
                return toString.call(obj_).slice(8, -1);
            },
            merge : function (to_, from_, overwrite_) {
                if (!from_) return to_;
                if (!to_) to_ = {};

                for (var _prop in from_) {
                    if (from_.hasOwnProperty(_prop)) {
                        if (this.isClass(from_[_prop]) === 'Object') { // 如果是对象，递归
                            !to_[_prop] && (to_[_prop] = {});
                            this.merge(to_[_prop], from_[_prop], overwrite_);
                        } else if (overwrite_ || !(_prop in to_)) { // 不是对象
                            to_[_prop] = from_[_prop];
                        }
                    }
                }
                return to_;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .chartWrap{
    width: 100%;
    height: 350px;
    padding:.2rem 0;
    background-color: #fff;
  }
</style>
