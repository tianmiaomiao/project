<template>
    <div class="md-keyboard" @click.stop>
        <md-popup
            v-model="isKeyboardShow"
            :hasMask="hasMask"
            :maskClosable="maskClosable"
            :position="position"
            @show="show"
            @hide="hide"
            @input="onInput"
        >
            <md-stock-keyboard
                v-model="isKeyboardShow"
                :type= "type"
                :scale= "scale"
                :maxValue= "maxValue"
                :okText="okText"
                @enter="onEnter"
                @filler="onFiller"
                @delete="onDelete"
                @cancel="onCancel"
                @confirm="onConfirm"
                @changeKeyboard="onChangeKeyboard"
                @changeValue="onChangeValue"
            ></md-stock-keyboard>

        </md-popup>
    </div>
</template>
<script>
    import Popup from '../popup'
    import TradeKeyboard from './trade-keyboard.vue'
    export default {
        name: 'md-trade-keyboard',
        components: {
            [TradeKeyboard.name] : TradeKeyboard,
            [Popup.name] : Popup
        },
        data(){
            return {
                isKeyboardShow: false,
            }
        },
        props : {
            value : {
                type: Boolean,
                default: false,
            },
            type : {
                type: String,
                default: 'normal', //normal share cost
            },
            scale : {
                type: [String, Number],
                default: '',
            },
            maxValue : {
                type: [String, Number],
                default: '',
            },
            okText : {
                type: String,
                default: '确定',
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
            }
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
        created(){
        },
        mounted(){
            this.value && (this.isKeyboardShow = this.value)
        },
        methods: {
            onEnter(val){
                this.$emit('enter', val)
            },
            onFiller(val){
                this.$emit('filler', val)
            },
            onDelete(){
                this.$emit('delete')
            },
            onChangeKeyboard(){
                //切换系统键盘
                this.$emit('changeKeyboard')
                this.hide();
            },
            onChangeValue(type,val){
                //加减value type : 1 加  2 减
                this.$emit('changeValue',type,val)
            },
            onCancel(){
                this.$emit('cancel')
                this.hide();
            },
            onConfirm(){
                this.$emit('confirm')
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
