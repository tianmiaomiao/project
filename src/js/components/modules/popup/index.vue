<template>
    <div class="md-popup"
         v-show="isPopupShow"
         :class="[
             hasMask ? 'show-mask' : '',
             position
         ]"
    >
        <transition name="fade">
            <div class="md-popup-mask"
                 v-show="hasMask && isPopupBoxShow"
                 @click="onPopupMaskClick"
            ></div>
        </transition>
        <transition
            :name="transition"
            @before-enter="onPopupTransitionStart"
            @before-leave="onPopupTransitionStart"
            @after-enter="onPopupTransitionEnd"
            @after-leave="onPopupTransitionEnd"
        >
            <div class="md-popup-box"
                v-show="isPopupBoxShow"
                :class="[
                    transition
                ]"
            >
                <md-popup-title
                    v-if="isShowTitle"
                    :title="title"
                    :okText="okText"
                    :cancelText="cancelText"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                ></md-popup-title>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    import PopupTitle from '../popup-title/index.vue'
    export default {
        name: 'md-popup',
        components: {
            [PopupTitle.name] : PopupTitle,
        },
        data(){
            return {
                isPopupShow: false,
                isPopupBoxShow: false,
                isAnimation: false,
            }
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
            okText: {
                type: String,
                default: '确定',
            },
            cancelText: {
                type: String,
                default: '取消',
            },
            isShowTitle: {
                type: Boolean,
                default: false,
            },
            hasMask: {
                type: Boolean,
                default: true,
            },
            maskClosable: {
                type: Boolean,
                default: true,
            },
            position: {
                type: String,
                default: 'center',
            },
            transition: {
                type: String,
                default() {
                    switch (this.position) {
                        case 'bottom':
                            return 'slide-up'
                        case 'top':
                            return 'slide-down'
                        default:
                            return 'fade'
                    }
                },
            },
            preventScroll: {
                type: Boolean,
                default: false,
            },
        },
        watch:{
            value(val) {
                if (val) {
                    if (this.isAnimation) {
                        setTimeout(() => {
                            this.showPopupBox()
                        }, 50)
                    } else {
                        this.showPopupBox()
                    }
                } else {
                    this.hidePopupBox()
                }
            },
        },
        computed: {},
        mounted(){
        },
        methods: {
            showPopupBox(){
                this.isPopupShow = true;
                this.isAnimation = true;
                this.$nextTick(() => {
                    this.isPopupBoxShow = true;
                })
                this.preventScroll && this.setPreventScroll(true);
            },
            hidePopupBox(){
                this.isAnimation = true;
                this.isPopupBoxShow = false;
                this.preventScroll && this.setPreventScroll(false);
                this.$emit('input', false);
                setTimeout(()=>{
                    this.isPopupShow = false
                },300)
            },
            onPopupMaskClick(){
                this.maskClosable && this.hidePopupBox()
            },
            setPreventScroll(isBind) {
                const handler = isBind ? 'addEventListener' : 'removeEventListener';
                const masker = this.$el.querySelector('.md-popup-mask');
                const boxer = this.$el.querySelector('.md-popup-box');

                masker && masker[handler]('touchmove', this.preventDefault, false);
                boxer && boxer[handler]('touchmove', this.preventDefault, false);
            },
            preventDefault(event) {
                event.preventDefault()
            },
            onConfirm(){
                this.hidePopupBox();
                this.$emit('confirm');
            },
            onCancel(){
                this.hidePopupBox();
                this.$emit('cancel');
            },
            // MARK: event handler
            onPopupTransitionStart() {
                if (!this.isPopupBoxShow) {
                    this.$emit('beforeHide')
                    this.$emit('before-hide')
                } else {
                    this.$emit('beforeShow')
                    this.$emit('before-show')
                }
            },
            onPopupTransitionEnd() {
                /* istanbul ignore next */
                if (!this.isAnimation) {
                    return
                }

                /* istanbul ignore next */
                if (!this.isPopupBoxShow) {
                    // popup hide after popup box finish animation
                    this.isPopupShow = false
                    this.$emit('hide')
                } else {
                    this.$emit('show')
                }

                /* istanbul ignore next */
                this.isAnimation = false
            },
        }
    }
</script>

<style lang="scss">
    .iosX{
        .md-popup.bottom .md-popup-box{
            padding-bottom: $iosx-bottom-size;
        }
    }
    .md-popup{
        &.show-mask{
            position: fixed;
            left: 0;
            top:0;
            right: 0;
            bottom:0;
            z-index: $zIndex;
            .md-popup-box{
                position: absolute;
                z-index: 2;
            }
        }
        .md-popup-mask{
            position: absolute;
            left: 0;
            top:0;
            bottom: 0;
            right: 0;
            background-color: #000;
            opacity: $mask-opacity;
            z-index: 1;
        }
        .md-popup-box{
            position:fixed;
            z-index: $zIndex;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            will-change:auto;
        }
        &.center,
        &.top,
        &.bottom{
            .md-popup-box{
                transition: all .3s;
                -webkit-transition: all .3s;
            }
        }
        &.top,
        &.bottom{
            .md-popup-box{
                width: 100%;
            }
        }
        &.top{
            .md-popup-box{
                left: 0;
                top:0;
            }
        }
        &.bottom{
            .md-popup-box{
                left: 0;
                bottom:0;
                background-color: #fff;
            }
        }
        &.center{
            .md-popup-box{
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
            }
        }

        .fade-enter-active,
        .fade-leave-active{
            transition: opacity .3s;
            -webkit-transition: opacity .3s;
        }
        .fade-enter,
        .fade-leave-to,
        .fade-leave-active{
            opacity: 0
        }
        .slide-up-enter-active,
        .slide-up-leave-active,
        .slide-down-enter-active,
        .slide-down-leave-active{
            transform: translateY(0);
            -webkit-transform: translateY(0);
        }
        .slide-up-enter,
        .slide-up-leave-to{
            transform: translateY(70%);
            -webkit-transform: translateY(70%);
        }
        .slide-up-leave-active{
            transform: translateY(100%);
            -webkit-transform: translateY(100%);
        }

        .slide-down-enter,
        .slide-down-leave-to{
            transform: translateY(-70%);
            -webkit-transform: translateY(-70%);
        }
        .slide-down-leave-active{
            transform: translateY(-100%);
            -webkit-transform: translateY(-100%);
        }
    }

</style>
