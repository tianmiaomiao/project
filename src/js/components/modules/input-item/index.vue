<template>
    <div class="md-input-item">
        <div class="md-input-container"
             :class="[
                OS.isIOS ? 'is-ios' : '',
                OS.isAndroid ? 'is-android' : '',
                isCode ? 'is-code' : '',
                notBoard ? 'not-board' : '',
                size == 'large' ? 'md-large-size' : '',
                align
             ]"
        >
            <!--左侧插槽-->
            <div class="md-ipnut-extra" v-if="$slots.left">
                <slot name="left"></slot>
            </div>
            <!--左侧title-->
            <div class="md-ipnut-title" v-if="title">{{title}}</div>
            <!--input-->
            <div class="md-ipnut-center">
                <template v-if="isFakeKeyboard">
                    <div class="md-input-fake"
                         :class="{
                              'focus': isFocus,
                              'disabled': disabled,
                              'readonly': readonly
                          }"
                         @click="onFakeInputClick"
                    >
                        <span v-text="inputValue"></span>
                        <div class="md-input-placeholder" v-show="!inputValue && placeholder" v-text="placeholder"></div>
                    </div>
                </template>
                <template v-else>
                    <input class="md-input-control"
                       v-model="inputValue"
                       :type="inputType"
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
            <!--清除input-->
            <div class="md-input-clear"
                 v-if="isShowClear"
                 v-show="!isInputEmpty"
                 @click="clearInputVal"
            >
                <md-icon :name="'md-icon-clear'"></md-icon>
            </div>
            <!--右侧图标插槽-->
            <div class="md-input-tool" v-if="$slots.right" v-show="!isShowClear || isInputEmpty">
                <slot name="right"></slot>
            </div>
            <!--密码显示隐藏-->
            <div class="md-input-tool" v-if="eyeopen && type === 'password'" @click="showPassword()">
                <md-icon :name="'md-icon-eye'" slot="eye" v-if="inputType == 'password'"></md-icon>
                <md-icon :name="'md-icon-eye-opne'" slot="eye" v-else></md-icon>
            </div>
            <!--特殊按钮-->
            <div class="md-input-button" v-if="$slots.button">
                <slot name="button"></slot>
            </div>
        </div>
        <md-keyboard
            v-if="isFakeKeyboard"
            ref="number-keyboard"
            :type="keyBoardType"
            @enter="onNumberKeyBoardEnter"
            @delete="onNumberKeyBoardDelete"
            @confirm="onConfirm"
            @cancel="onCancel"
        ></md-keyboard>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    import Keyboard from '../number-keyboard/index.vue'

    export default {
        name: 'md-input-item',
        components: {
            [Keyboard.name] : Keyboard,
            [Icons.name] : Icons
        },
        data(){
            return {
                inputValue : '',
                inputType : '',
                isFocus : false,
                OS : Util.os,
                inputNumberKeyboard: '',
            }
        },
        props : {
            type: {
                // text, bankCard, password, phone, number,money,idCard
                type: String,
                default: 'text',
            },
            name: {
                type: String,
                default: '',
            },
            size: {
                type: String,
                default: '',
            },
            align: {
                // left, center, right
                type: String,
                default: 'left',
            },
            notBoard : {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            value: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            maxlength: {
                type: [String, Number],
                default: '',
            },
            isCode: {
                type: Boolean,
                default: false,
            },
            isFormatValue: {
                type: Boolean,
                default: false,
            },
            isFakeKeyboard: {
                type: Boolean,
                default: false,
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
            },
            eyeopen: {
                type: Boolean,
                default: false,
            },
        },
        watch : {
            value(val){
                this.inputValue = this.setFormatValue(val).value;
            },
            inputValue (val) {
                this.$emit('input',this.setFormatValue(val).realValue);
                this.inputValue = this.setFormatValue(val).value;
            },
            isFocus(val) {
                if (!this.isFakeKeyboard) {
                    return
                }
                if (val) {
                    this.inputNumberKeyboard.show();
                    this.$emit('focus', this.name)
                } else {
                    this.inputNumberKeyboard.hide();
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
            keyBoardType(){
                // 设置键盘type
                if(this.type == 'idCard'){
                    return 'idCard'
                }else if(this.type == 'number'){
                    return 'number'
                }else{
                    return 'text'
                }
            },
            inputMaxLength() {
                //设置长度
                if (this.type === 'phone') {
                    return 11
                }else if (this.type === 'bankCard') {
                    return 19
                }else if (this.type === 'idCard') {
                    return 18
                } else {
                    return this.maxlength
                }
            }
        },
        mounted(){
            this.setInputType();
            this.inputValue = this.setFormatValue(this.value).value;
            this.isFakeKeyboard && this.initNumberKeyBoard();
        },
        methods: {
            clearInputVal(){
                this.inputValue = '';
                this.inputFocus();
            },
            showPassword(){
                this.focus();
                if(this.inputType == "password"){
                    this.inputType = "text"
                }else{
                    this.inputType = "password"
                }
            },
            setInputType() {
                //设置input type
                this.inputType = 'text';
                if (this.type === 'bankCard' || this.type === 'phone') {
                    this.inputType = 'tel'
                } else if (this.type === 'password') {
                    this.inputType = 'password'
                }
            },
            setFormatValue(value){
                let val = value ? this.subValue(this.trimValue(value)) : '';
                let data = {
                    value : val,
                    realValue : val
                };
                if(this.isFormatValue && val){
                    if (this.type === 'bankCard') {
                        data.value =  Util.formatBankNumber(val)
                    }else if(this.type === 'phone'){
                        data.value = Util.formatPhoneNumber(val)
                    }else if(this.type === 'money'){
                        data.value = Util.formatMoney(val,0)
                    }
                }
                return data;
            },
            trimValue(val) {
                val = typeof val === 'undefined' ? '' : val;
                const reg = new RegExp('\\s|,', 'g');
                val = val.toString().replace(reg, '');
                return val
            },
            subValue(val) {
                const len = this.inputMaxLength;
                if (len !== '') {
                    return val.substring(0, len)
                } else {
                    return val
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
                    this.$el.querySelector('.md-input-control').focus()
                }
            },
            blur() {
                if (this.isFakeKeyboard) {
                    this.blurFakeInput()
                } else {
                    this.$el.querySelector('.md-input-control').blur()
                }
            },
            initNumberKeyBoard() {
                const keyborad = this.$refs['number-keyboard']
                this.inputNumberKeyboard = keyborad
                document.body.appendChild(keyborad.$el)
            },
            onNumberKeyBoardEnter(val){
                this.inputValue = this.inputValue + val;
            },
            onNumberKeyBoardDelete(){
                const inputValue = this.inputValue;
                if (inputValue === '') {
                    return
                }
                this.inputValue = inputValue.substring(0, inputValue.length - 1)
            },
            onConfirm(){
                this.$emit('confirm')
            },
            onCancel(){
                this.blur();
            }
        }
    }
</script>

<style lang="scss">
    .md-form-title{
        color: $color-gray-middle;
        line-height: .46rem;
        padding: .2rem 0 .3rem;
        font-size: .28rem;

        &.small{
            padding: .1rem 0 .3rem;
        }
    }
    .md-form-error{
        font-size: .24rem;
        color: $color-red;
        line-height: .24rem;
        height: .24rem;
        margin-top: .2rem;
    }
    .md-input-item{
        position: relative;
        background-color: $color-white;

        & + .md-select-item,
        & + .md-input-item{
            margin-top: .3rem;
        }
    }
    .md-input-container{
        position: relative;
        height: 1.1rem;
        @include setBottomLine();
        @include dis_flex;
        @include align-items;

        &.not-board:before{
            display: none;
        }
        &.md-large-size{
            height: 1.4rem;
            .md-input-fake,
            .md-input-control{
                font-size: $font-input-large;
            }
            .md-input-control{
                line-height: $font-input-large;
                @include setPlaceholder(#ccc,.43rem);
            }
            &.is-ios{
                .md-input-control{
                    line-height: .7rem;
                }
            }
        }

        &.center{
            .md-input-fake,
            .md-input-control{
                text-align: center;
            }
        }
        &.right{
            .md-input-fake,
            .md-input-control{
                text-align: right;
            }
        }

        &.is-code{
            &:before{
                right: 2rem;
            }
        }

        .md-ipnut-title{
            min-width: 2rem;
            padding-right: .26rem;
            line-height: .7rem;
            color: $color-black;
            font-size: $font-heading-normal;
        }
        .md-money-symbol{
            line-height: .7rem;
            text-align: center;
            color: $color-black;
            font-size: $font-input-large;
        }
        .md-ipnut-center{
            position: relative;
            height: .7rem;
            @include boxflex(1);
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-flex-direction: column;
        }
        .md-input-placeholder{
            position: absolute;
            left: 0;
            right: 0;
            top:0;
            pointer-events: none;
            line-height: .7rem;
            color: $color-gray-light;
            font-size: $font-input-normal;
        }
        .md-input-fake,
        .md-input-control{
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
        .md-input-control{
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
            .md-input-control{
                line-height: .4rem;
            }
        }
        .md-input-fake{
            line-height: .7rem;
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
                animation: keyboard-cursor infinite 1s step-start;
            }
            &.focus:after{
                display: inline
            }
        }

        &.is-ios .md-ipnut-center .md-input-fake:after{
            border-right: solid .06rem #2C6CF5;
            border-radius: 2px;
        }
        &.is-android .md-ipnut-center .md-input-fake:after{
            border-right: solid .04rem $color-black
        }
        .md-input-clear,
        .md-input-tool{
            min-width: .58rem;
            padding-left: .1rem;

            .md-icon{
                width: .48rem;
                height: .48rem;
            }
        }
        .md-input-button{
            width: 2rem;
        }
        .md-code-btn{
            display: block;
            width: 2rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            color: $color-blue-dark;
            font-size: $font-heading-normal;

            &.disabled{
                pointer-events: none;
                color: $color-gray-middle;
            }
        }
        .md-ipnut-extra{
            width: .78rem;
            padding-right: .3rem;

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
