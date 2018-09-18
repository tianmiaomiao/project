<template>
    <div class="md-select-item">
        <div class="select-item-inner">
            <!--左侧插槽-->
            <div class="select-item-extra" v-if="$slots.left">
                <slot name="left"></slot>
            </div>
            <!--左侧title-->
            <div class="select-item-title" v-if="title">{{title}}</div>
            <div class="select-item-center"
                 :class="{
                    selected : isSelect,
                    readonly : readonly,
                    disabled : disabled,
                 }"
                 @click="onSelectClick"
            >
                {{selectValue}}
                <div class="select-item-placeholder" v-show="!selectValue && placeholder && !disabled && !readonly" v-text="placeholder"></div>
                <md-icon name="md-icon-bottom" v-if="!readonly"></md-icon>
            </div>
            <!--右侧图标插槽-->
            <div class="select-item-tool" v-if="$slots.right">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    export default {
        name: 'md-select-item',
        components: {
            [Icons.name] : Icons
        },
        data(){
            return {
                selectValue : ''
            }
        },
        watch:{
            value(val){
                this.selectValue = val;
            },
            isSelect(val){
                this.isSelect = val;
            }
        },
        props: {
            title: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
            value: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            isEncrypt : {
                type: Boolean,
                default: false, //是否加密value
            },
            readonly : {
                type: Boolean,
                default: false, //是否隐藏箭头并设置可点状态
            },
            isSelect: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        mounted(){
            this.selectValue = this.value;
            this.setValue();
        },
        methods: {
            onSelectClick(event){
                if (this.disabled || this.readonly) {
                    event.stopImmediatePropagation()
                } else {
                    this.$emit('click', event)
                }
            },
            setValue(){
                if(this.isEncrypt && this.readonly){
                    if(this.type == 'phone'){
                        this.selectValue = Util.encryptPhoneNumber(this.value)
                    }else if(this.type == 'bankCard'){
                        this.selectValue = Util.encryptBankNumber(this.value)
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .md-select-item{
        position: relative;
        background-color: $color-white;

        & + .md-select-item,
        & + .md-input-item{
            margin-top: .3rem;
        }

        .select-item-inner{
            position: relative;
            height: 1.1rem;
            @include setBottomLine();
            @include dis_flex;
            @include align-items;
        }
        .select-item-title{
            min-width: 2rem;
            padding-right: .26rem;
            line-height: .7rem;
            color: $color-black;
            font-size: $font-heading-normal;
        }
        .select-item-center{
            position: relative;
            @include boxflex(1);
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-flex-direction: column;
            height: .7rem;
            line-height: .7rem;
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
            padding-right: .5rem;

            &.disabled,
            &.readonly{
                color: #939393;
            }
            
            &.selected{
                .md-icon{
                    transform: translateY(-50%) rotate(180deg);
                    -moz-transform: translateY(-50%) rotate(180deg);
                    -webkit-transform: translateY(-50%) rotate(180deg);
                }
            }
            .md-icon{
                position: absolute;
                z-index: 1;
                right: 0;
                top: 50%;
                width: .48rem;
                height: .48rem;
                transform: translateY(-50%);
                -moz-transform: translateY(-50%);
                -webkit-transform: translateY(-50%);
            }
        }

        .select-item-placeholder{
            position: absolute;
            left: 0;
            right: 0;
            top:0;
            pointer-events: none;
            line-height: .7rem;
            color: $color-gray-light;
            font-size: $font-input-normal;
        }
    }


</style>
