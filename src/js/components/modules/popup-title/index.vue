<template>
    <div
        class="md-popup-title"
        @touchmove="preventScroll"
    >
        <!-- Cancel -->
        <div
            class="popup-title-left"
            v-if="cancelText"
            v-html="cancelText"
            @click="$emit('cancel')"
        ></div>
        <div
            class="popup-title-left"
            v-else-if="$slots.cancel"
            @click="$emit('cancel')"
        >
            <slot name="cancel"></slot>
        </div>

        <!-- Title -->
        <div
            class="popup-title-txt"
            v-if="title"
            v-html="title"
        ></div>
        <div
            class="popup-title-txt"
            v-else
        >
            <slot name="title"></slot>
        </div>

        <!-- Ok -->
        <div
            class="popup-title-right"
            v-if="okText"
            v-html="okText"
            @click="$emit('confirm')"
        ></div>
        <div
            class="popup-title-right"
            v-else-if="$slots.confirm"
            @click="$emit('confirm')"
        >
            <slot name="confirm"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'md-popup-title',

        props: {
            title: {
                type: String,
                default: '',
            },
            okText: {
                type: String,
                default: '',
            },
            cancelText: {
                type: String,
                default: '',
            },
        },
        methods: {
            preventScroll(e){
                e.preventDefault()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-popup-title{
        position: relative;
        color       : $popup-title-color;
        font-size   : $popup-title-size;
        height      : $popup-title-height;
        background-color: $popup-title-bg;
        @include setBottomLine();

        .popup-title-left,
        .popup-title-right{
            font-weight: 400;
            width: 20%;
            float: left;
            text-align: center;
            line-height: $popup-title-height;
        }
        .popup-title-right{
            float: right;
            color: $popup-confirm-color;
        }
        .popup-title-txt{
            width: 60%;
            float: left;
            text-align: center;
            line-height: $popup-title-height;
        }
    }
</style>
