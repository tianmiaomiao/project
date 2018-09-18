<template>
    <div class="md-stock-item">
        <div class="md-stock-container"
             :class="[
                OS.isIOS ? 'is-ios' : '',
                OS.isAndroid ? 'is-android' : '',
                align,
                theme
             ]"
        >
            <div class="md-stock-tool border-right" @click="onKeyboardValue(2)">
                <i class="tool-icon minus-red" v-if="theme === 'red'"></i>
                <i class="tool-icon minus-blue" v-if="theme === 'blue'"></i>
            </div>
            <div class="md-stock-center">
                <template v-if="isFakeKeyboard">
                    <div class="md-stock-fake"
                         :class="{
                              'focus': isFocus,
                              'disabled': disabled,
                              'readonly': readonly
                          }"
                         @click="onFakeInputClick"
                    >
                        <span v-text="inputValue"></span>
                        <div class="md-stock-placeholder" v-show="!inputValue && placeholder" v-text="placeholder"></div>
                    </div>
                </template>
                <template v-else>
                    <input class="md-stock-control"
                           v-model="inputValue"
                           :name="name"
                           :placeholder="placeholder"
                           :disabled="disabled"
                           :readonly="readonly"
                           autocomplete="off"
                           @focus="inputFocus"
                           @blur="inputBlur"
                           @keyup="onKeyup"
                           @keydown="onKeydown"
                    >
                </template>
            </div>
            <div class="md-stock-tool border-left" @click="onKeyboardValue(1)">
                <i class="tool-icon plus-red" v-if="theme === 'red'"></i>
                <i class="tool-icon plus-blue" v-if="theme === 'blue'"></i>
            </div>
        </div>

        <md-trade-keyboard
            v-if="isFakeKeyboard"
            ref="trade-keyboard"
            :type="type"
            :okText="okText"
            :scale= "scale"
            :maxValue="maxValue"
            @enter = "onKeyBoardEnter"
            @delete = "onKeyBoardDelete"
            @filler = "onKeyboardFiller"
            @changeValue = "onKeyboardValue"
            @confirm = "onConfirm"
            @cancel="onCancel"
        ></md-trade-keyboard>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    import TradeKeyboard from '../trade-keyboard/index.vue'
    export default {
        name: 'md-stock-item',
        components: {
            [TradeKeyboard.name] : TradeKeyboard,
            [Icons.name] : Icons
        },
        data(){
            return {
                inputValue : '',
                isFocus : false,
                OS : Util.os,
                inputTradeKeyboard: ''
            }
        },
        props: {
            name: {
                type: String,
                default: '',
            },
            align: {
                // left, center, right
                type: String,
                default: 'center',
            },
            theme: {
                // blue, red
                type: String,
                default: 'red',
            },
            type: {
                // share, cost
                type: String,
                default: 'cost',
            },
            scale: {
                type: [String,Number],
                default: '',
            },
            maxValue: {
                type: [String,Number],
                default: 100,
            },
            value: {
                type: [String,Number],
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            okText: {
                type: String,
                default: '完成',
            },
            isFakeKeyboard: {
                type: Boolean,
                default: true,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            clearable: {
                type: Boolean,
                default: false,
            }
        },
        watch : {
            value(val){
                this.inputValue = val
            },
            inputValue (val) {
                this.$emit('input',val);
            },
            isFocus(val) {
                if (!this.isFakeKeyboard) {
                    return
                }
                if (val) {
                    this.inputTradeKeyboard.show();
                    this.$emit('focus', this.name)
                } else {
                    this.inputTradeKeyboard.hide();
                    this.$emit('blur', this.name)
                }
            },
        },
        computed: {
            isInputEmpty(){
                return !this.inputValue;
            },
            isShowClear(){
                return this.clearable && !this.disabled && !this.readonly && this.isFocus
            }
        },
        created(){
        },
        mounted(){
            this.inputValue = this.value;
            this.isFakeKeyboard && this.initTradeKeyBoard();
        },
        methods: {
            clearInputVal(){
                this.inputValue = '';
                this.inputFocus();
            },
            inputFocus(){
                this.isFocus = true;
                this.focus();
            },
            inputBlur(){
                this.isFocus = false;
                this.blur();
            },
            onKeyup(event) {
                this.$emit('keyup', this.name, event)
                if (+event.keyCode === 13 || +event.keyCode === 108) {
                    this.$emit('confirm', this.name, this.inputValue)
                }
            },
            onKeydown(event) {
                this.$emit('keydown', this.name, event)
            },
            focusFakeInput() {
                this.isFocus = true;

                this.$nextTick(() => {
                    this.addBlurListener()
                })
            },
            blurFakeInput() {
                this.isFocus = false;
                this.removeBlurListener()
            },
            addBlurListener() {
                document.addEventListener('click', this.blurFakeInput, false)
            },
            removeBlurListener() {
                document.removeEventListener('click', this.blurFakeInput, false)
            },
            onFakeInputClick(event) {
                if (this.disabled || this.readonly) {
                    return
                }

                this.blurFakeInput();

                if (!this.isFocus) {
                    this.focusFakeInput(event)
                }
            },
            focus() {
                if (this.isFakeKeyboard) {
                    this.onFakeInputClick()
                } else {
                    this.$el.querySelector('.md-stock-control').focus()
                }
            },
            blur() {
                if (this.isFakeKeyboard) {
                    this.blurFakeInput()
                } else {
                    this.$el.querySelector('.md-stock-control').blur()
                }
            },
            initTradeKeyBoard() {
                const TradeKeyboard = this.$refs['trade-keyboard']
                this.inputTradeKeyboard = TradeKeyboard
                document.body.appendChild(TradeKeyboard.$el)
            },
            onKeyBoardEnter(val){
                if(this.inputValue === 0){
                    this.inputValue = ''
                }
                var num = '' + this.inputValue + val;
                var re = /([0-9]+.[0-9]{2})[0-9]*/;
                this.inputValue = num.replace(re,"$1");
            },
            onKeyBoardDelete(){
                const inputValue = this.inputValue;
                if (inputValue === '') {
                    return
                }
                this.inputValue = inputValue.substring(0, inputValue.length - 1)
            },
            onKeyboardFiller (val){
                this.inputValue = val;
            },
            onKeyboardValue (type,num){
                var val = num || this.scale;
                var re = /([0-9]+.[0-9]{2})[0-9]*/;
                if(type == 1){
                    var num = (this.inputValue*100 + val*100)/100;
                    this.inputValue = num.toString().replace(re,"$1");
                }else{
                    var num = (this.inputValue*100 - val*100)/100;
                    this.inputValue = num.toString().replace(re,"$1");
                    if(this.inputValue <= 0){
                        this.inputValue = ''
                    }
                }
            },
            onConfirm(){
                this.$emit('confirm', this.name, this.inputValue)
            },
            onCancel(){
                this.blur();
                this.$emit('cancel')
            }
        }
    }
</script>

<style lang="scss">
    .md-stock-item{
        position: relative;
    }
    .md-stock-container{
        position: relative;
        height: .72rem;
        background-color: #fff;
        border:.02rem solid #FF3E3E;
        @include dis_flex;
        @include align-items;

        &.blue{
            border:.02rem solid #4576FF;

            .md-stock-tool {
                &.border-right {
                    border-right: .02rem solid #4576FF;
                }
                &.border-left {
                    border-left: .02rem solid #4576FF;
                }
            }
            &.is-ios .md-stock-center .md-stock-fake:after{
                border-right: solid .06rem #4576FF;
            }
        }

        &.center{
            .md-stock-fake,
            .md-stock-control{
                text-align: center;
            }
        }
        &.left{
            .md-stock-fake,
            .md-stock-control{
                text-align: left;
            }
        }
        &.right{
            .md-stock-fake,
            .md-stock-control{
                text-align: right;
            }
        }
        .md-stock-center{
            position: relative;
            height: .7rem;
            @include boxflex(1);
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-flex-direction: column;
        }
        .md-stock-placeholder{
            position: absolute;
            left: 0;
            right: 0;
            top:0;
            pointer-events: none;
            line-height: .68rem;
            color: $color-gray-light;
            font-size: $font-input-normal;
        }
        .md-stock-fake,
        .md-stock-control{
            padding:0;
            width: 100%;
            height: .7rem;
            color: $color-black;
            font-size: $font-input-normal;
            font-weight: 400;
            border: none;
            background: transparent;
            outline: none;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            -webkit-appearance: none;
            appearance: none;
        }
        .md-stock-control{
            position: relative;
            line-height: $font-input-normal;
            @include setPlaceholder();

            &:focus{
                color: $color-black;
            }
            &:disabled,
            &[disabled],
            &[readonly]{
                color: #939393;
            }
        }
        &.is-ios{
            .md-stock-control{
                line-height: .4rem;
            }
        }
        .md-stock-fake{
            line-height: .68rem;
            &.disabled,
            &.readonly{
                color: #939393;
            }

            &:after{
                position: relative;
                z-index: 2;
                display: none;
                content: "";
                height: $font-input-normal;
                border-right: solid 1px $color-black;
                margin-right: -1px;
                animation: keyboard-cursor infinite 1s step-start;
            }
            &.focus:after{
                display: inline
            }
        }

        &.is-ios .md-stock-center .md-stock-fake:after{
            border-right: solid .06rem #FF3E3E;
            margin-right: -.06rem;
            border-radius: 2px;
        }
        &.is-android .md-stock-center .md-stock-fake:after{
            border-right: solid .04rem $color-black;
            margin-right: -.04rem;
        }

        .md-stock-tool{
            min-width: .7rem;
            padding-top: .17rem;
            height: 100%;
            text-align: center;

            &.border-right{
                border-right: .02rem solid #FF3E3E;
            }
            &.border-left{
                border-left: .02rem solid #FF3E3E;
            }

            .tool-icon{
                display: inline-block;
                width: .3rem;
                height: .3rem;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;

                &.plus-red{
                    background-image: url("./images/plus-red.png");
                }
                &.plus-blue{
                    background-image: url("./images/plus-blue.png");
                }
                &.minus-red{
                    background-image: url("./images/minus-red.png");
                }
                &.minus-blue{
                    background-image: url("./images/minus-blue.png");
                }
            }
        }

        @keyframes keyboard-cursor{
            0% {
                opacity :1
            }
            50% {
                opacity :0
            }
            100% {
                opacity :1
            }
        }
        @-webkit-keyframes keyboard-cursor{
            0% {
                opacity :1
            }
            50% {
                opacity :0
            }
            100% {
                opacity :1
            }
        }
    }
</style>
