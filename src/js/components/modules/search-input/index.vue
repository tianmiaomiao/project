<template>
    <div class="md-search-item">
        <div class="md-search-container"
             :class="[
                OS.isIOS ? 'is-ios' : '',
                OS.isAndroid ? 'is-android' : '',
                isShowClear && !isInputEmpty ? 'isShowClear' : '',
                theme,
                align
             ]"
        >
            <div class="md-search-center">
                <template v-if="isFakeKeyboard">
                    <div class="md-search-fake"
                         :class="{
                              'focus': isFocus,
                              'disabled': disabled,
                              'readonly': readonly
                          }"
                         @click="onFakeInputClick"
                    >
                        <span v-text="inputValue"></span>
                        <div class="md-search-placeholder" v-show="!inputValue && placeholder" v-text="placeholder"></div>
                    </div>
                </template>
                <template v-else>
                    <input class="md-search-control"
                           v-model="inputValue"
                           :name="name"
                           :placeholder="placeholder"
                           :disabled="disabled"
                           :readonly="readonly"
                           autocomplete="off"
                           @click="inputClick"
                           @focus="inputFocus"
                           @blur="inputBlur"
                           @keyup="onKeyup"
                           @keydown="onKeydown"
                    >
                </template>
            </div>
            <div class="md-search-name" v-if="isShowName">
                {{codeName}}
            </div>
            <!--清除input-->
            <div class="md-search-clear"
                 v-if="isShowClear"
                 v-show="!isInputEmpty"
                 @click="clearInputVal"
            >
                <md-icon :name="'md-icon-clear'"></md-icon>
            </div>
        </div>

        <md-trade-keyboard
            v-show="isFakeKeyboard"
            ref="search-keyboard"
            type="normal"
            :okText="okText"
            @enter = "onSearchKeyBoardEnter"
            @delete = "onSearchKeyBoardDelete"
            @changeKeyboard = "onKeyboardChange"
            @confirm = "onConfirm"
            @cancel="onCancel"

        ></md-trade-keyboard>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    import TradeKeyboard from '../trade-keyboard/index.vue'
    export default {
        name: 'md-search-item',
        components: {
            [TradeKeyboard.name] : TradeKeyboard,
            [Icons.name] : Icons
        },
        data(){
            return {
                inputValue : '',
                isFocus : false,
                OS : Util.os,
                inputSearchKeyboard: '',
                isFakeKeyboard : true
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
            value: {
                type: String,
                default: '',
            },
            maxlength: {
                type: [String, Number],
                default: '6',
            },
            codeName: {
                type: String,
                default: '',
            },
            theme: {
                type: String,
                default: 'normal', //normal red blue
            },
            placeholder: {
                type: String,
                default: '',
            },
            okText: {
                type: String,
                default: '确定',
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
                this.inputValue = this.subValue(Util.trimValue(val));
            },
            inputValue (val) {
                this.$emit('input',val);
            },
            isFocus(val) {
                if (!this.isFakeKeyboard) {
                    return
                }
                if (val) {
                    this.inputSearchKeyboard.show();
                    this.$emit('focus', this.name)
                } else {
                    this.inputSearchKeyboard.hide();
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
            },
            isShowName(){
                return this.inputValue && !this.isFocus && this.codeName && this.align === 'left'
            }
        },
        mounted(){
            this.inputValue = this.value;
            this.isFakeKeyboard && this.initSearchKeyBoard();
        },
        methods: {
            clearInputVal(){
                this.inputValue = '';
                this.inputFocus();
            },
            inputClick(){
                if(!this.isFakeKeyboard){
                    this.isFakeKeyboard = true;
                    this.$nextTick(()=>{
                        this.inputFocus();
                    })
                }
            },
            inputFocus(){
                this.isFocus = true;
                this.focus();
            },
            inputBlur(){
                this.isFocus = false;
                this.blur();
            },
            subValue(val) {
                const len = this.maxlength
                if (len !== '') {
                    return val.substring(0, len)
                } else {
                    return val
                }
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
                    this.$el.querySelector('.md-search-control').focus()
                }
            },
            blur() {
                if (this.isFakeKeyboard) {
                    this.blurFakeInput()
                } else {
                    this.$el.querySelector('.md-search-control').blur()
                }
            },
            initSearchKeyBoard() {
                const TradeKeyboard = this.$refs['search-keyboard']
                this.inputSearchKeyboard = TradeKeyboard
                document.body.appendChild(TradeKeyboard.$el)
            },
            onSearchKeyBoardEnter(val){
                this.inputValue = this.inputValue + val;
            },
            onSearchKeyBoardDelete(){
                const inputValue = this.inputValue;
                if (inputValue === '') {
                    return
                }
                this.inputValue = inputValue.substring(0, inputValue.length - 1)
            },
            onKeyboardChange (){
                this.blur();
                this.isFakeKeyboard = false;

                this.$nextTick(()=>{
                    this.inputFocus();
                })
            },
            onConfirm(){
                this.$emit('confirm', this.name, this.inputValue)
            },
            onCancel(){
                this.isFakeKeyboard = true;
                this.blur();
            }
        }
    }
</script>

<style lang="scss">
    .md-search-item{
        position: relative;
    }
    .md-search-container{
        position: relative;
        height: .72rem;
        background-color: #fff;
        border : .02rem solid #fff;
        border-radius: .04rem;
        overflow: hidden;
        @include dis_flex;
        @include align-items;

        &.red{
            border-radius: 0;
            border-color: #FF3E3E;
        }
        &.blue{
            border-radius: 0;
            border-color: #4576FF;
        }

        &.center{
            &.isShowClear{
                padding-left: .58rem;
            }
            .md-search-fake,
            .md-search-control{
                text-align: center;
            }
        }
        &.left{
            .md-search-fake,
            .md-search-control{
                text-align: left;
            }
        }
        &.right{
            .md-search-fake,
            .md-search-control{
                text-align: right;
            }
        }
        .md-search-name{
            padding-right: .2rem;
            font-size: .3rem;
        }
        .md-search-center{
            position: relative;
            height: .7rem;
            @include boxflex(1);
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-flex-direction: column;
        }
        .md-search-placeholder{
            position: absolute;
            left: 0;
            right: 0;
            top:0;
            pointer-events: none;
            line-height: .68rem;
            color: $color-gray-light;
            font-size: $font-input-normal;
            padding: 0 .2rem;
        }
        .md-search-fake,
        .md-search-control{
            position: relative;
            padding: 0 .2rem;
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
        .md-search-control{
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
            .md-search-control{
                line-height: .4rem;
            }
        }
        .md-search-fake{
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

        &.is-ios .md-search-center .md-search-fake:after{
            border-right: solid .06rem #2C6CF5;
            margin-right: -.06rem;
            border-radius: 2px;
        }
        &.is-android .md-search-center .md-search-fake:after{
            border-right: solid .04rem $color-black;
            margin-right: -.04rem;
        }
        .md-search-clear{
            min-width: .58rem;
            padding-left: .1rem;

            .md-icon{
                width: .48rem;
                height: .48rem;
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
