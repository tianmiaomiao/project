<template>
    <div class="md-dialog">
        <md-popup
            v-model="value"
            :hasMask="hasMask"
            :maskClosable="maskClosable"
            :position="position"
            :transition="transition"
            :preventScroll="preventScroll"
            @input="onInput"
            @show="onShow"
            @hide="onHide"
        >
            <div class="md-dialog-content">
                <div class="md-dialog-body">
                    <h2 class="md-dialog-title" v-if="title" v-text="title"></h2>
                    <div class="md-dialog-text" :class="align" v-if="content" v-html="content"></div>
                    <div class="md-dialog-text" :class="align" v-else-if="$slots.default">
                        <slot></slot>
                    </div>
                </div>
                <footer class="md-dialog-actions">
                    <a
                        role="button"
                        v-for="(btn, index) in btns"
                        :key="index"
                        :class="[
                            btn.name ? 'js-'+btn.name : ''
                        ]"
                        v-text="btn.text"
                        @click="onClick(btn)"
                    ></a>
                </footer>
            </div>

        </md-popup>
    </div>
</template>
<script>
    import Popup from '../popup'
    import Icon from '../icon'
    export default {
        name: 'md-dialog',
        components: {
            [Popup.name]: Popup,
            [Icon.name]: Icon,
        },
        data(){
            return {}
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            icon: {
                type: String,
                default: '',
            },
            content: {
                type: String,
                default: '',
            },
            align: {
                type: String,
                default: 'left',
            },
            btns: {
                type: Array,
                default: () => [],
            },
            appendTo: {
                default: () => document.body,
            },
            hasMask: {
                type: Boolean,
                default: true,
            },
            maskClosable: {
                type: Boolean,
                default: false,
            },
            position: {
                type: String,
                default: 'center',
            },
            transition: {
                type: String,
                default: 'fade',
            },
            preventScroll: {
                type: Boolean,
                default: false,
            },
            preventScrollExclude: {
                type: String,
                default: '',
            },
        },
        computed: {},
        mounted(){
            if (this.appendTo) {
                this.appendTo.appendChild(this.$el)
            }
        },
        beforeDestroy() {
            if (this.appendTo) {
                this.appendTo.removeChild(this.$el)
            }
        },
        methods: {
            onInput(val) {
                this.$emit('input', val)
            },
            onShow() {
                this.$emit('show')
            },
            onHide() {
                this.$emit('hide')
            },
            onClick(btn) {
                if (typeof btn.handler === 'function') {
                    btn.handler.call(null)
                } else {
                    this.close()
                }
            },
            close() {
                this.$emit('input', false)
            },
        }
    }
</script>

<style lang="scss">
    .md-dialog{
        position: relative;
        z-index: $zIndex;

        .md-dialog-content{
            width: 5.6rem;
            overflow: hidden;
            border-radius: .2rem;
            background-color: $dialog-bg-color;

            .md-dialog-body{
                position: relative;
                color: $dialog-text-color;
                font-size: $dialog-text-size;
                line-height: $line-height-small;
                padding : .44rem .7rem;
            }
            .md-dialog-text{
                text-align: center;
                &.left{
                    text-align: left;
                }
                &.right{
                    text-align: right;
                }
            }
            .md-dialog-title{
                text-align: center;
                line-height: .46rem;
                font-size: $dialog-title-size;
                padding-bottom: .18rem;
            }

            .md-dialog-actions{
                position: relative;
                height: 1rem;
                @include setTopLine();
                @include dis_flex;

                a{
                    position: relative;
                    text-align: center;
                    line-height: 1rem;
                    color: #333;
                    font-size: $dialog-btn-size;
                    @include boxflex(1);

                    &.js-ok{
                        color: #4576FF;
                    }
                    &:nth-child(2){
                        color: #4576FF;
                        @include setLeftLine();
                    }
                }
            }
        }
    }

</style>
