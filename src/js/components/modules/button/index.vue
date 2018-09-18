<template>
    <div class="md-button"
         :class="[type, size, disabled ? 'disabled' : '']"
         @click="onBtnClick">
        <div class="md-button-inner">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'md-button',
        components: {},
        data(){
            return {}
        },
        props : {
            type: {
                type: String,
                default: '',
            },
            size: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
        },
        mounted(){
        },
        methods: {
            onBtnClick(event) {
                if (this.disabled) {
                    event.stopImmediatePropagation()
                } else {
                    this.$emit('click', event)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .md-button{
        position: relative;
        display: block;
        margin: 0 auto;
        max-width: 100%;
        text-align: center;
        overflow: hidden;
        border-radius: $radius-size-normal;

        @include button-variant($button-color-default,$button-bg-default,$button-border-default);
        @include button-size($font-button-normal,$button-size-default);

        & + .md-button{
            margin-top: .2rem;
        }

        .md-button-inner{
            width: 100%;
            height: 100%;
            text-overflow: ellipsis;
            word-break: break-all;
            word-wrap: break-word;
            white-space: nowrap;
        }

        &.large{
            @include button-size($font-button-large,$button-size-large);
        }
        &.small{
            @include button-size($font-button-small,$button-size-small);
        }

        &.primary{
            @include button-variant($button-color-primary,$button-bg-primary,$button-border-primary);

            &.line{
                @include button-variant($button-line-primary,transparent,$button-border-primary);
            }
        }
    }
</style>
