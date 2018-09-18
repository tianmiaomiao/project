<template>
    <div class="act-focus" :class="setType" v-if="!focusStatus && isWeibo" @click="setActive">
        <i class="icon-check"></i>关注“养基宝”
    </div>
</template>

<script>
    export default {
        name: 'wbFocus',
        components: {},
        props:{
            opts : ''
        },
        data () {
            return {
                isFocus : true, //是否勾选关注
                focusStatus : 0, //是否已关注
                isWeibo : Util.thirdApp.isWeibo,
                type : 'type1'
            }
        },
        computed : {
            setType (){
                var isActive = this.isFocus ? ' active ' : '';
                return this.type + isActive
            }
        },
        methods: {
            getStatus(){
                var vm = this;
                if(vm.isWeibo){
                    vm.$http({
                        port : 'verifyFriendships',
                        openLoader:false,
                        loginRuleOut : true
                    }).then((res)=>{
                        if(res.code == 0){
                            vm.focusStatus = res.data.status*1;
                        }
                    })
                }
            },
            setFocus(){
                var vm = this;
                if(vm.isWeibo && vm.isFocus && !vm.focusStatus){
                    vm.$http({
                        port : 'createFriendships',
                        openLoader:false,
                        closeIntercept : true
                    })
                }
            },
            setActive(){
                this.isFocus = !this.isFocus;
            }
        },
        created(){
            this.$nextTick(()=>{
                this.type = this.opts.type;
                this.isFocus = true;
                this.getStatus()
            })
        },
        activated(){
            this.$nextTick(()=>{
                this.type = this.opts.type;
                this.isFocus = true;
                this.getStatus()
            })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .act-focus{
        max-width: 6.5rem;
        font-size: .24rem;
        line-height: .28rem;
        margin: 0 auto;
        padding-bottom: .3rem;

        .icon-check{
            display: inline-block;
            vertical-align: top;
            width: .28rem;
            height: .28rem;
            margin: 0 .05rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        &.type1{
            text-align: center;
            color: #faec0c;
            padding-left: .5rem;
            .icon-check{
                background-image: url("./image/check.png");
            }
            &.active{
                .icon-check{
                    background-image: url("./image/check-active.png");
                }
            }
        }
        &.type2{
            color: #939393;
            .icon-check{
                background-image: url("image/checked.png");
            }
            &.active{
                .icon-check{
                    background-image: url("image/checked-active.png");
                }
            }
        }
    }
</style>
