<template>
    <div class="page-view iosx-container">
        <div class="page-main" :class="{'show-footer' : showFooter}">
            <!--header-->
            <v-header :opts="headerData" :key="headerTitle"></v-header>
            <div class="page-container" v-if="visible">
                <!--基金排行财经客户端隐藏-->
                <!--<div class="fund-search" v-if="!isFinance">-->
                    <!--<div class="search-box">-->
                        <!--<i class="icon-search"></i>-->
                        <!--<input type="text" placeholder="请输入基金简称／首字母／代码">-->
                    <!--</div>-->
                    <!--<div class="search-btn">基金排行</div>-->
                <!--</div>-->

                <!--banner-->
                <v-swiper :opts="swiperOpts" :dataVal="bannerImgs" :parentSwiper="swiperParent"></v-swiper>

                <!--导航 财经客户端显示 其他隐藏-->
                <div class="module-navs" v-if="isFinance">
                    <div class="item" v-for="item in serverNav">
                        <a href="javascript:;" @click="toPage(item)">
                            <img :src="item.image" :alt="item.title">
                            <p>{{item.title}}</p>
                        </a>
                    </div>
                </div>

                <div class="module-recom" v-if="tacticsData.data">
                    <div class="title">{{tacticsData.title}}</div>
                    <div class="list">
                        <div class="item" v-for="item in tacticsData.data" @click="toDetails(item)">
                            <div class="cell">
                                <div class="num" :class="getNumber(item.earn)">{{item.earn|deletePercent}}<sub v-if="item.earn">%</sub></div>
                                <div class="lab">历史年化收益</div>
                            </div>
                            <div class="cell">
                                <div class="name">{{item.title}}</div>
                                <div class="lab">{{item.summary}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-theme" v-if="specialData.data" id="fundTheme">
                    <v-scroll :scrollList="specialData.data">
                        <template slot-scope="themeData">
                            <div class="theme-item" @click="toPage(themeData.item)">
                                <div class="box">
                                    <img :src=themeData.item.img alt="">
                                    <div class="info">
                                        <h2>{{themeData.item.title}}</h2>
                                        <p>{{themeData.item.desc}}</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-scroll>
                </div>

                <div class="module-recom" v-if="fofsData.data">
                    <div class="title" @click="toPage(fofsData)">{{fofsData.title}} <span class="more"><i class="icon-right"></i></span></div>
                    <div class="list">
                        <div class="item" v-for="item in fofsData.data" @click="toPage(item)">
                            <div class="cell">
                                <div class="num" :class="getNumber(item.earn)">{{item.earn|deletePercent}}<sub v-if="item.earn">%</sub></div>
                                <div class="lab">历史年化收益</div>
                            </div>
                            <div class="cell">
                                <div class="name">{{item.special_tag}}</div>
                                <div class="lab">{{item.title}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-recom" v-if="fundData.data">
                    <div class="title" @click="toFundList(fundData.url)">{{fundData.title}} <span class="more">查看基金排行<i class="icon-right"></i></span></div>
                    <div class="list">
                        <div class="item" v-for="item in fundData.data" @click="toFundDetail(item)">
                            <div class="box">
                                <div class="tag">{{item.target}}</div>
                            </div>
                            <div class="box">
                                <div class="name">{{item.fund_name}}</div>
                                <div class="lab">{{item.summary}}</div>
                            </div>
                            <div class="box">
                                <div class="num" :class="getNumber(item.income_rate)">{{item.income_rate|percentNumber}}<sub v-if="item.income_rate">%</sub></div>
                                <div class="lab">{{item.type_name}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-plan" v-if="invData.data">
                    <div class="title">{{invData.title}}</div>
                    <div class="plan-box">
                        <div class="item" v-for="(item,index) in invData.data" @click="toInvDetail(item.url)">
                            <div class="plan-img"><img :src="item.img" alt=""></div>
                            <h2>{{item.desc}}</h2>
                            <p>{{item.summary}}</p>
                        </div>
                    </div>
                </div>

                <div class="copy-module">
                    <p>中国证监会批准的新浪官方基金销售平台</p>
                    <p>基金销售资格证书编号：000000341</p>
                    <p>过往业绩不代表未来，市场有风险投资须谨慎</p>
                </div>
            </div>
            <v-footer></v-footer>
            <v-activity v-if="activityData.is_show == '1'" :activityData="activityData"></v-activity>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config'
    import Toast from '../../js/components/common/toast/index.js'
    import MessageBox from '../../js/components/common/dialog/index.js'
    import VHeader from  '../../js/components/layout/header/header.vue'
    import VFooter from  '../../js/components/layout/footer/footer.vue'
    import VSwiper from '../../js/components/plug/swiper/swiper.vue'
    import VActivity from '../../js/components/layout/activity/activity.vue'
    import VScroll from '../../js/components/plug/swiper/scrollbar.vue'

    export default {
        name: 'indexView',
        components: {
            VHeader,
            VFooter,
            VSwiper,
            VActivity,
            VScroll
        },
        data () {
            return {
                visible : false,
                headerData: {
                    backBtn: false
                },
                headerTitle : '',
                showFooter : true,
                openLoader : true,
                swiperParent : 'indexSwiper',
                swiperOpts:{
                    pagination: '.swiper-pagination',
                    slidesPerView: 1,
                    speed:500,
                    paginationClickable: true,
                    preventClicksPropagation : true,
                    loop: true,
                    autoplay: 3000,
                    observer:true,
                    observeParents:true,
                },
                isFinance : Util.thirdApp.isFinance,
                bannerImgs:[],
                serverNav : [],
                tacticsData : [],
                fofsData : [],
                invData : [],
                fundData : [],
                specialData : [],
                loaded: false,
                list: [],
                activityData : ''
            }
        },
        computed: {
        },
        methods: {
            getNumber(str){
                if(!!str) {
                    var val = str.toString().replace('%', "")*1;
                    if(val*1 < 0){
                        return 'green'
                    }else{
                        return 'red'
                    }
                }
            },
            useAnchorLink (url) {
                var a = document.createElement('a');
                a.setAttribute('href', url);
                a.style.display = 'none';
                document.body.appendChild(a);

                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('click', false, false);
                a.dispatchEvent(e);
            },
            callInIframe(url) {
                var iframe;
                if (!iframe) {
                    iframe = document.createElement('iframe');
                    iframe.id = 'callapp_iframe_' + Date.now();
                    iframe.frameborder = 0;
                    iframe.style.cssText = "display: none;border:0;width:0;height:0;";
                    document.body.appendChild(iframe);
                }

                iframe.src = url;
            },
            setOrigin(url){
                var protocol = window.location.protocol;
                if(url.indexOf('//') == 0){
                    url = `${protocol}${url}`
                }
                return url;
            },
            toDetails(item){
                if(!item.stg_id) return;
                var url = this.setOrigin(`${config.PAGE_PATH.TACTICS_DETAILS}?stgId=${item.stg_id}`);
                if(this.isFinance){
                    this.useAnchorLink(`sinafinance://type=20&subtype=7&pull=h5&url=${encodeURIComponent(url)}`)
                }else{
                    this.$router.push({
                        path: '/tacticsDetail',
                        query: {
                            stgId: item.stg_id
                        }
                    })
                }
            },
            toInvDetail(url){
                if(!url) return;
                url = this.setOrigin(url);
                if(this.isFinance){
                    //跳转财经webview 定投
                    this.useAnchorLink(`sinafinance://type=20&subtype=7&pull=h5&url=${encodeURIComponent(url)}`)
                }else{
                    window.location.href = url
                }
            },
            toFundDetail(item){
                if(!item.fund_code) return;
                if(this.isFinance){
                    //跳转财经基金详情页
                    this.useAnchorLink(`sinafinance://type=3&foundtype=&name=?vt=4&symbol=W.${item.fund_code}`)
                }else{
                    window.location.href = `//trade.xincai.com/wap/fundDetail?fundcode=${item.fund_code}`;
                }
            },
            toFundList(url){
                if(!url) return;
                url = this.setOrigin(url);
                if(this.isFinance){
                    //跳转财经基金行情
                    this.useAnchorLink(`sinafinance://type=23&subtype=7&tab=1`)
                }else{
                    window.location.href = url.toString();
                }
            },
            toPage(data){
                if(!data.url) return;
                var url = this.setOrigin(data.url);
                if(this.isFinance){
                    if(data.type*1 === 1){
                        //跳转财经基金行情
                        this.useAnchorLink(`sinafinance://type=23&subtype=7&tab=1`)
                    }else{
                        //跳转财经webview
                        this.useAnchorLink(`sinafinance://type=20&subtype=7&pull=h5&url=${encodeURIComponent(url)}`)
                    }
                }else{
                    window.location.href = url.toString();
                }
            },
            getIndexInfo(){
                var vm = this;
                vm.$http({
                    port : 'strategyIndex',
                    data :{
                        is_index : 1
                    },
                    openLoader:vm.openLoader
                }).then((res)=>{
                    if(res.code == 0){
                        var data = res.data;
                        var bannerList = data.banner.data;
                        vm.bannerImgs = [];
                        for (var key in bannerList){
                            vm.bannerImgs.push({
                                href : bannerList[key].url,
                                imgSrc : bannerList[key].img
                            })
                        }
                        vm.tacticsData = data.launch_startegy;
                        vm.fofsData = data.fofs;
                        vm.fundData = data.recommend_fund;
                        vm.specialData = data.special;
                        vm.invData = data.investment;
                        vm.serverNav = data.guidance;
                        //是否显示活动弹窗
                        vm.activityData = Object.assign({},data.activity);
                        vm.visible = true;
                        vm.openLoader = false;
                    }
                })
            }
        },
        created(){},
        activated(){
            this.$nextTick(() => {
                this.headerTitle = this.$route.meta.title;
                this.showFooter = window.showFooter;
                this.getIndexInfo();
            })
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $white_color    : #fff;
    $border_color   : #f2f2f2;
    $gray_color     : #bdbdbd;
    $black_clor     : #333;
    $red_color      : #ef4352;
    $green_color    : #10b524;

    @mixin iconBackground($url){
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url($url);
    }

    .page-container{
        background-color: #f2f2f2;
    }

    .fund-search{
        padding: .18rem .16rem .2rem;
        @include dis_flex;

        .search-box{
            position: relative;
            height: .54rem;
            background-color: $white_color;
            border-radius: .04rem;
            padding:0 .1rem 0 .6rem;
            @include boxflex(1);
            .icon-search{
                position: absolute;
                left: 0;
                top:0;
                width: .54rem;
                height: .54rem;
                background-color: $white_color;
                background-position: center center;
                background-size: .3rem .3rem;
                background-repeat: no-repeat;
                background-image: url("./image/icon-search.png");
            }
            input{
                width: 100%;
                height: .54rem;
                border: 0;
                background: none;
                font-size: .28rem;
                color: $black_clor;

                &:-moz-placeholder,
                &::-moz-placeholder,
                &::-webkit-input-placeholder{
                    color: $gray_color;
                }
            }
        }
        .search-btn{
            width: 1.44rem;
            height: .54rem;
            line-height: .54rem;
            text-align: center;
            color: $white_color;
            font-size: .28rem;
            border-radius: .04rem;
            margin-left: .12rem;
            background-color: $red_color;
        }
    }

    .module-navs{
        background-color: $white_color;
        @include dis_flex;

        .item{
            height: 1.6rem;
            padding-top: .26rem;
            text-align: center;
            @include boxflex(1);

            a{
                display: block;
            }

            img{
                display: block;
                width: .8rem;
                height: .8rem;
                margin: 0 auto;
            }
            i{
                display: block;
                width: .8rem;
                height: .8rem;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                margin: 0 auto;

                &.icon-money{
                    background-image: url("./image/icon-money.png");
                }
                &.icon-save{
                    background-image: url("./image/icon-save.png");
                }
                &.icon-fund{
                    background-image: url("./image/icon-fund.png");
                }
                &.icon-insurance{
                    background-image: url("./image/icon-insurance.png");
                }
            }
            p{
                font-size: .26rem;
                color: #666;
            }
        }
    }


    .module-recom{
        background-color: $white_color;
        margin-top: .2rem;
        .title{
            position: relative;
            font-size: .32rem;
            color: $black_clor;
            line-height: .46rem;
            padding: .3rem .26rem;
            font-weight: bold;
            @include setBottomLine();
            &:before{
                left: .26rem;
                right: .26rem;
            }

            .more{
                float: right;
                display: inline-block;
                vertical-align: middle;
                height: .4rem;
                color: $gray_color;
                font-size: .24rem;
                line-height: .4rem;
                font-weight: normal;

                .icon-right{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: .04rem;
                    width: .3rem;
                    height: .3rem;
                    margin-top: -3px;
                    @include iconBackground("./image/icon-right.png")
                }
            }
        }

        .list{
            padding: 0 .26rem;
            .item{
                position: relative;
                padding:.38rem 0 .36rem;
                @include dis_flex;
                @include setTopLine();

                &:first-child{
                    &:after{
                        display: none;
                    }
                }
                .cell{
                    position: relative;
                    &:first-child{
                        text-align: center;
                        width: 2.6rem;
                        @include setRightLine();
                    }
                    &:nth-child(2){
                        padding-left: .48rem;
                        max-width: 4.2rem;
                        @include boxflex(1);
                    }

                    .num{
                        font-size: .52rem;
                        line-height: 1;
                    }
                    sub{
                        display: inline-block;
                        font-size: .34rem;
                        vertical-align: top;
                        margin-top: .14rem;
                    }
                    .red{
                        color: $red_color;
                    }
                    .green{
                        color: $green_color;
                    }
                    .name{
                        font-size: .3rem;
                        height: .52rem;
                        line-height: .52rem;
                        color: $black_clor;
                        max-width: 10em;
                        @include text-overflow;
                    }
                    .lab{
                        font-size: .26rem;
                        margin-top: .18rem;
                        color: $gray_color;
                        @include text-overflow;
                    }
                }

                &:nth-child(2n){
                    .box{
                        .tag{
                            color: #EF4352;
                            border:1px solid #EF4352;
                        }
                    }
                }
                .box{
                    text-align: left;
                    &:first-child{
                        width: 1.2rem;
                    }
                    &:nth-child(2){
                        @include boxflex(1);
                    }
                    &:nth-child(3){
                        text-align: center;
                        width: 2.24rem;
                    }
                    .tag{
                        display: inline-block;
                        width: .9rem;
                        height: .9rem;
                        text-align: center;
                        line-height: .88rem;
                        border-radius: .45rem;
                        font-size: .22rem;
                        margin-top: .02rem;
                        color: #508CEE;
                        border:1px solid #508CEE;

                    }
                    .num{
                        font-size: .52rem;
                        line-height: 1;
                    }
                    sub{
                        display: inline-block;
                        font-size: .34rem;
                        vertical-align: top;
                        margin-top: .14rem;
                    }
                    .red{
                        color: $red_color;
                    }
                    .green{
                        color: $green_color;
                    }
                    .name{
                        font-size: .3rem;
                        height: .52rem;
                        line-height: .52rem;
                        color: $black_clor;
                        max-width: 10em;
                        @include text-overflow;
                    }
                    .lab{
                        font-size: .26rem;
                        margin-top: .18rem;
                        color: $gray_color;
                        @include text-overflow;
                    }
                }
            }
        }
    }
    .module-theme{
        margin-top: .2rem;
        padding:.3rem .1rem;
        background-color: $white_color;

        .theme-item{
            position: relative;
            overflow: hidden;
            padding: 0 .1rem;

            .box{
                position: relative;
                width: 3rem;
                height: 1.6rem;
                text-align: center;
                line-height: .3rem;
                color: $white_color;
            }

            img{
                width: 100%;
                height:100%;
            }

            .info{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding-top: .3rem;
                text-align: center;
                background-color: rgba(0,0,0,.3);

                h2{
                    font-weight: normal;
                    font-size: .28rem;
                    line-height: .48rem;
                    max-width: 80%;
                    margin: 0 auto;
                    @include text-overflow;
                }
                p{
                    font-size: .24rem;
                    line-height: .3rem;
                    max-width: 90%;
                    margin: .2rem auto 0;
                    @include text-overflow;
                }
            }
        }
    }

    .module-plan {
        background-color: $white_color;
        margin-top: .2rem;
        .title {
            position: relative;
            font-size: .32rem;
            color: $black_clor;
            line-height: .46rem;
            padding: .3rem .26rem;
            font-weight: bold;
            @include setBottomLine();

            .more {
                float: right;
                height: .3rem;
                margin-top: .08rem;
                color: $gray_color;
                font-size: .24rem;
                line-height: .3rem;

                .icon-right {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: .04rem;
                    width: .3rem;
                    height: .3rem;
                    @include iconBackground("./image/icon-right.png")
                }
            }
        }

        .plan-box{
            @include clearfix;
            .item{
                position: relative;
                width: 50%;
                float: left;
                padding: .3rem 1.2rem 0 .24rem;
                height: 1.62rem;
                &:first-child{
                    @include setRightLine();
                }

                .plan-img{
                    position: absolute;
                    right: .2rem;
                    top:50%;
                    margin-top: -.43rem;
                    width: .86rem;
                    height: .86rem;
                    img{
                        width: 100%;
                        height:100%;
                    }
                }

                h2{
                    font-weight: normal;
                    line-height: .5rem;
                    font-size: .3rem;
                    color: $black_clor;
                    @include text-overflow;
                }
                p{
                    margin-top: .18rem;
                    font-size: .24rem;
                    color: $gray_color;
                    @include text-overflow;
                }
            }
        }
    }

    .copy-module{
        line-height: .3rem;
        color: rgba(189,189,189,.7);
        font-size: .22rem;
        padding: .3rem 0;
        text-align: center;
    }

</style>
