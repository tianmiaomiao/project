<template>
    <div class="md-toast" :class="{'has-icon': icon}">
        <md-popup
            v-model="visible"
            @hide="onHide"
            :hasMask="hasMask"
            :maskClosable="false"
        >
            <div class="md-toast-content">
                <div class="md-toast-icon" v-if="icon">
                    <md-icon :name="icon"></md-icon>
                </div>
                <span v-text="content"></span>
            </div>
        </md-popup>
    </div>
</template>

<script>
    import Popup from '../popup'
    import Icon from '../icon'

    export default {
        name: 'md-toast',

        components: {
            [Popup.name]: Popup,
            [Icon.name]: Icon,
        },

        props: {
            icon: {
                type: String,
                default: '',
            },
            content: {
                type: [String, Number],
                default: '',
            },
            duration: {
                type: Number,
                default: 0,
            },
            hasMask: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                visible: false,
                timer : null
            }
        },

        mounted() {
            this.update()
        },
        updated() {
            this.update()
        },
        beforeDestroy() {
            if (this.duration) {
                clearTimeout(this.timer)
            }
        },

        methods: {
            update() {
                clearTimeout(this.timer)
                if (this.visible && this.duration) {
                    this.timer = setTimeout(() => {
                        this.hide()
                    }, this.duration)
                }
            },
            onHide() {
                this.$emit('hide')
            },
            hide() {
                this.visible = false
            },
        },
    }

</script>

<style lang="scss">
    .md-toast{
        position: relative;
        z-index:$zIndex;
        &.has-icon .md-toast-content{
            padding-left: 1rem;
        }
        .md-toast-content{
            position: relative;
            display: inline-block;
            text-align: left;
            padding: .32rem;
            border-radius: .08rem;
            font-size: $font-body-normal;
            color: $color-white;
            background-color: rgba(0,0,0,.5);
            box-sizing: content-box;
        }
        .md-toast-icon{
            position: absolute;
            top: .24rem;
            left: .32rem;
            width: .48rem;
            height: .48rem;
        }
        .md-popup{
            .md-popup-box{
                width: 100%;
                max-width: 5rem;
                text-align: center;
                overflow: visible;
                .md-popup-mask{
                    background: transparent;
                }
            }
        }
    }
</style>
