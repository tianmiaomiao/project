<template>
    <div class="md-keyboard" @click.stop>
        <md-popup
            v-model="isKeyboardShow"
            :hasMask="hasMask"
            :maskClosable="maskClosable"
            :position="position"
            :okText="okText"
            :cancelText="cancelText"
            :title="title"
            is-show-title
            @show="show"
            @hide="hide"
            @input="onInput"
            @confirm="onConfirm"
            @cancel="onCancel"
        >
            <md-number-keyboard
                v-model="isKeyboardShow"
                :type= type
                @enter="onEnter"
                @delete="onDelete"
            ></md-number-keyboard>

        </md-popup>
    </div>
</template>
<script>
    import Popup from '../popup'
    import NumberKeyboard from './keyboard.vue'
    export default {
        name: 'md-keyboard',
        components: {
            [NumberKeyboard.name] : NumberKeyboard,
            [Popup.name] : Popup
        },
        data(){
            return {
                isKeyboardShow: false,
            }
        },
        props : {
            value: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: '',
            },
            hasMask: {
                type: Boolean,
                default: false,
            },
            maskClosable: {
                type: Boolean,
                default: false,
            },
            position: {
                type: String,
                default: 'bottom',
            },
            okText: {
                type: String,
                default: '确认',
            },
            cancelText: {
                type: String,
                default: '取消',
            },
        },
        watch:{
            value(val) {
                this.isKeyboardShow = val
            },
            isKeyboardShow(val) {
                this.$emit('input', val)
            },
        },
        computed: {},
        mounted(){
            this.value && (this.isKeyboardShow = this.value)
        },
        methods: {
            onEnter(val){
                this.$emit('enter', val)
            },
            onDelete(){
                this.$emit('delete')
            },
            onConfirm(){
                this.$emit('confirm')
            },
            onCancel(){
                this.$emit('cancel')
            },
            onInput(val) {
                this.$emit('input', val)
            },
            onShow() {
                this.$emit('show')
            },
            onHide() {
                this.$emit('hide')
            },
            show() {
                this.isKeyboardShow = true
            },
            hide() {
                this.isKeyboardShow = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
