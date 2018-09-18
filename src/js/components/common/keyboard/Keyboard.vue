<template>
    <div v-if="rendered" @click.stop>
        <transition name="fade">
            <!--<div class="keyboard-mask" v-show="visible && !hideMask" @click="keyBoardHide()"></div>-->
        </transition>
        <transition name="slideInUp">
            <div class="keyboard-wrap" v-show="visible" v-scrollPos>
                <div v-if="type === 'passwordKey' && !hidePassword" class="password-wrap">
                    <div class="set-pwd">
                        <p class="title">输入交易密码 </p>
                        <div class="close" @click="keyBoardHide()"><i class="icon-close"></i></div>
                        <div class="pwd-wrap">
                            <label v-html="passLabel"></label>
                        </div>
                        <p class="hpr fs-s">
                            <span class="error-msg" v-if="errorMsg">{{errorMsg}}</span>
                            <span class="link" @click="toFindPassword()">忘记密码？</span>
                        </p>
                    </div>
                </div>
                <div v-else class="password-wrap">
                    <div class="set-topic">
                        <!--<p class="topic">专属键盘</p>-->
                        <div class="complete" @click="keyBoardHide()">完成</div>
                    </div>
                </div>
                <div class="keyboard-grids">
                    <div v-for="keyItem in keys" class="grid keyboard-grids-line" :class="setDisabled(keyItem)" @click="tapKeyItem($event,keyItem)">
                        <p class="grid_label" v-if="keyItem.type === 'number'">{{ keyItem.value }}</p>
                        <p class="grid_label" v-if="keyItem.type === 'symbol'">{{ keyItem.value }}</p>
                        <p class="grid_label" v-if="keyItem.type === 'backspace'">
                            <i class="icon-backspace"></i>
                        </p>
                        <p class="grid_label" v-if="keyItem.type === 'point'">{{ setPoint }}</p>
                        <div class="grid-bg"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    import config from '../../../config';

    var PAGE_PATH = config.PAGE_PATH;

    var defaults = {

        keys: [{
            type: 'number',
            value: '1'
        }, {
            type: 'number',
            value: '2'
        }, {
            type: 'number',
            value: '3'
        }, {
            type: 'number',
            value: '4'
        }, {
            type: 'number',
            value: '5'
        }, {
            type: 'number',
            value: '6'
        }, {
            type: 'number',
            value: '7'
        }, {
            type: 'number',
            value: '8'
        }, {
            type: 'number',
            value: '9'
        }, {
            type: 'point',
            value: '.'
        },{
            type: 'number',
            value: '0'
        }, {
            type: 'backspace',
            value: '-1'
        }],
        type : 'inputKeys',
        setPoint : '·',
        hidePassword : false,
        inputVal: [],
        password: [],
        oldScrHeight : 0,
        isHover : false,

        visible: false,
        rendered: false,
        errorMsg: '',
        setTimer : null,

        findPasswordPageUrl: PAGE_PATH.FIND_PASSWORD,

        onKeyTap: function () {},

        onFullPassword: function (password) {},

        onFullVal: function (value) {}
    };

    export default {

        data() {
            return {
                ...defaults
            }
        },
        created() {
            this.rendered = true;
            this.clearValue();
        },
        directives: {
            scrollPos: {
                bind: function (el, binding, vnode) {
                    const scrollContro = function () {
                        this.init();
                    };
                    scrollContro.prototype = {
                        init(){
                            const self = this;
                            setTimeout(()=>{
                                if(!vnode.context.dom) return;
                                self.createFill().then(()=>{
                                    self.setScroll();
                                });
                            },50)
                        },
                        createFill(){
                            return new Promise((resolve,reject)=>{
                                var container   = document.getElementsByClassName('page-container')[0];
                                var keyDom      = document.createElement("div");
                                var keyHeight   = el.clientHeight;
                                var scrTop      = container.scrollTop;
                                keyDom.id = 'fillDom';
                                keyDom.style.height = keyHeight + 'px';
                                container.appendChild(keyDom);
                                container.scrollTop = scrTop;

                                resolve();
                            })
                        },
                        getOffTop(obj){
                            var top = obj.offsetTop;
                            while (obj = obj.offsetParent) {
                                top += obj.offsetTop;
                            }
                            return top;
                        },
                        setScroll(){
                            var container   = document.getElementsByClassName('page-container')[0];
                            var header      = document.getElementsByClassName('header')[0] ;
                            var curBtn      = vnode.context.dom;
                            var pageHeight  = container.clientHeight;
                            var scrTop      = container.scrollTop;
                            var offTop      = curBtn ? this.getOffTop(curBtn) : 0;
                            var keyHeight   = el.clientHeight;
                            var keyTop      = scrTop + pageHeight - keyHeight - 60;

                            vnode.context.oldScrHeight = scrTop;

                            if(offTop > keyTop ){
                                var newScrTop = offTop - keyTop  + scrTop;
                                container.scrollTop = newScrTop;
                            }
                        }

                    };
                    new scrollContro();
                },
                unbind: function (el, binding, vnode) {
                    var container   = document.getElementsByClassName('page-container')[0];
                    var fillDom = document.getElementById('fillDom');

                    container.scrollTop = vnode.context.oldScrHeight;
                    if(fillDom){
                        container.removeChild(fillDom);
                    }
                }
            }
        },
        computed: {
            passLabel: function () {
                var password = this.password;
                var len      = password.length;
                var i        = 0;
                var node     = '';
                var val;

                for (; i < (len < 6 ? 6 : len); ++i) {
                    val = password[i];

                    if (val) {
                        node += '<span class="on">&nbsp;</span>';
                    } else {
                        node += '<span>&nbsp;</span>';
                    }
                }

                return node;
            },
            getopacity:function () {
                if(this.type == 'inputKeys'){
                    return {
                        'opacity' : 0
                    }
                }
            }
        },

        methods: {
            toFindPassword: function () {
                this.hideKeyBoard();
                window.location.href = this.findPasswordPageUrl.toString();
            },
            setDisabled : function (item) {
                if(item.type == 'point' && !this.setPoint){
                    return item.type + ' disabled'
                }else{
                    return item.type
                }
            },
            clearValue: function () {
                this.password = [];
                this.showError = false;
            },
            onShowError:function (msg) {
                if(!!msg){
                    this.errorMsg = msg;
                }
            },
            keyBoardHide:function () {
                this.hideKeyBoard();
            },
            getNumberVal : function (arr) {
                var val = arr.join('');
                var sub = val.indexOf('.');

                if(sub == 0){
                    return [];
                }else if(arr[sub + 1] == '.'){
                    return val.substring(0,sub+1).split('');
                }else if(sub > 0 && arr.length > sub + 3){
                    return val.substring(0,sub + 3).split('');
                }else{
                    var re = /([0-9]+\.\[0-9]{2})*/;
                    return val.replace(re,"$1").split('')
                }
            },
            setHideHover(el){
                var removeHoverTimer = null;

                el.target.classList.add("hover");
                removeHoverTimer = setTimeout(()=>{
                    el.target.classList.remove("hover");
                    removeHoverTimer && clearTimeout(removeHoverTimer);
                },100)
            },
            tapKeyItem: function (el,keyItem) {
                if(!keyItem.value || keyItem.value == '&nbsp;') return false;
                var vm = this;

                vm.setHideHover(el);

                //带密码的输入框
                if (vm.type === 'passwordKey') {
                    switch (keyItem.type) {

                        case 'number':
                            if (vm.password.length < 6 && !!keyItem.value) {
                                vm.password.push(keyItem.value);
                            }
                            break;

                        case 'backspace':
                            vm.password.pop();
                            break;
                    }

                    if (vm.password.length === 6) {
                        vm.onFullPassword(vm.password.join(''),vm.onShowError);
                    }
                    if(vm.hidePassword){
                        vm.onFullPassword(vm.password.join(''));
                    }
                }
                if(vm.type === 'inputKeys'){
                    switch (keyItem.type) {

                        case 'symbol':
                        case 'point':
                        case 'number':
                            if(!!keyItem.value){
                                vm.inputVal.push(keyItem.value);
                            }
                            break;

                        case 'backspace':
                            vm.inputVal.pop();
                            break;
                    }
                    vm.inputVal = this.getNumberVal(vm.inputVal);
                    vm.onFullVal(vm.inputVal.join(''));
                }

                if (keyItem.type === 'hide') {
                    this.hideKeyBoard();
                } else {
                    this.onKeyTap(keyItem)
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .keyboard-mask{
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0);
    }
    .keyboard-wrap {
        bottom: 0;
        left: 0;
        right: 0;
        color: #353639;
        position: fixed;
        z-index: 1000;
        min-height: 2.1rem;
        background: #fff;

        &:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #f2f2f2;
            color: #e6e6e6;
        }

        .icon-keyboard{
            display: inline-block;
            vertical-align: top;
            width: .96rem;
            height: .52rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("./image/keyboard.png");
        }
        .icon-backspace{
            display: inline-block;
            width: .52rem;
            height: .36rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("./image/backspace.png");
        }
        .icon-close{
            display: block;
            width: .34rem;
            height: .34rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("./image/close.png");
        }

        .top-tba {
            height: .8rem;
            text-align: center;

            .icon-keyboard {
                margin-top: 8px;
            }
        }

        .keyboard-grids-line{
            &:before {
                content: " ";
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                bottom: 0;
                border-right: 1px solid #f2f2f2;
                color: #e6e6e6;
            }
            &:after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                border-bottom: 1px solid #f2f2f2;
                color: #e6e6e6;
            }
        }
        .keyboard-grids{
            position: relative;
            overflow: hidden;
            &:before{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                height: 1px;
                border-top: 1px solid #f2f2f2;
                color: #e6e6e6;
            }
            &:after{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width: 1px;
                bottom: 0;
                border-left: 1px solid #f2f2f2;
                color: #e6e6e6;
            }

            .grid{
                position: relative;
                float: left;
                padding: .14rem;
                width: 33.33333333%;
                box-sizing: border-box;
                -webkit-tap-highlight-color: rgba(0,0,0,.1);

                .grid-bg{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    background-color: #000;
                    opacity: 0;
                }
                &.hover{
                    .grid-bg{
                        opacity: .1;
                    }
                }

                &.disabled{
                    pointer-events: none;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                }

                .grid_label{
                    display: block;
                    text-align: center;
                    color: #000;
                    font-size: .48rem;
                    height: 1.6em;
                    line-height: 1.6;
                    pointer-events: none;
                }
            }
        }

        .password-wrap{
            .hpr {
                width: 6rem;
                margin: .3rem auto;
                text-align: right;
            }

            .set-topic{
                height: .8rem;
            }
            .topic{
                position: relative;
                font-size: .32rem;
                color: #333;
                padding: .2rem;
                line-height: .4rem;
            }

            .complete{
                position: absolute;
                right: .2rem;
                top: 0;
                font-size: .28rem;
                line-height: .8rem;
                color: #507DAF;
            }

            .title{
                position: relative;
                font-size: .32rem;
                color: #333;
                padding: .35rem 0;
                line-height: .4rem;
                text-align: center;
                border-bottom: 1px solid #e6e6e6;
            }
            .close{
                position: absolute;
                right: 0;
                top:0;
                padding:.38rem .36rem;
                width: 1.1rem;
                height: 1.1rem;
                line-height: 0;
            }
            .pwd-wrap{
                width: 6.6rem;
                height: 1rem;
                margin: 0 auto;
                box-sizing: border-box;
                label{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    font-size: 0;
                    line-height: 0;
                    span{
                        width: 16.6666%;
                        height: .94rem;
                        display: inline-block;
                        color: #333;
                        font-size: 1.4rem;
                        line-height: .9rem;
                        text-align: center;
                        box-sizing: border-box;
                        position: relative;

                        &:after{
                            content: "";
                            display: block;
                            width: 80%;
                            height: 2px;
                            background-color: #ccc;
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            margin-left: -.43rem;
                        }
                        &.on:before{
                          content: "";
                          display: block;
                          width: .2rem;
                          height: .2rem;
                          border-radius: .2rem;
                          background-color: #000;
                          position: absolute;
                          left: 50%;
                          top:50%;
                          margin-top: -.1rem;
                          margin-left: -.1rem;
                        }

                        &.on:after{
                            background-color: #5193FF;
                        }
                    }
                }
            }
            .hpr{
                width: 6.6rem;
                margin: 15px auto;
                text-align: right;
                font-size: .28rem;

                .link{
                    color: #507DAF;
                }
                .error-msg{
                    float: left;
                    padding-left: .12rem;
                    color: #DB5558;
                }
            }
        }
    }
    .slideInUp-enter-active, .slideInUp-leave-active {
        transition: transform .3s;
        -moz-transition: transform .3s;
        -webkit-transition: transform .3s;
    }
    .slideInUp-enter, .slideInUp-leave-to {
        transform: translate3d(0,100%,0);
        -moz-transform: translate3d(0,100%,0);
        -webkit-transform: translate3d(0,100%,0);
    }
</style>
