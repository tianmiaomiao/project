<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="'调用方法一'">
                    <md-picker
                        ref="picker"
                        :data="pickerData"
                        :default-index="pickerDefaultIndex"
                        :cols="3"
                        @initialed="onPickerInitialed"
                        @change="onPickerConfirm"
                        is-view
                        is-cascade
                    ></md-picker>
                </md-field>

            </div>
            <!--<v-footer></v-footer>-->
        </div>
    </div>
</template>
<script>
    import VHeader from  '../../js/components/layout/header/header.vue'
    import VFooter from  '../../js/components/layout/footer/footer.vue'
    import Field from  '../../js/components/modules/field/index.vue'
    import InputItem from  '../../js/components/modules/input-item/index.vue'
    import ListItem from  '../../js/components/modules/list-item/index.vue'
    import Button from  '../../js/components/modules/button/index.vue'
    import Icons from '../../js/components/modules/icon/index.vue'
    import Popup from '../../js/components/modules/popup/index.vue'
    import Toast from '../../js/components/modules/toast/index.js'
    import Dialog from '../../js/components/modules/dialog/index.js'
    import Picker from '../../js/components/modules/picker/'
    import cityData from './json/city.json'
    import simple from './json/simple.json'

    export default {
        name: 'dialog-demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [InputItem.name]: InputItem,
            [ListItem.name]: ListItem,
            [Icons.name]: Icons,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
            [Picker.name]: Picker,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                pickerData: [],
                pickerDefaultIndex: [],
                pickerValue: '',
            }
        },
        watch:{
        },
        computed: {
            column () {
                return this.$refs.picker.column
            }
        },
        methods: {
            onPickerInitialed(){
                const columnValues = this.column.getColumnValues()
                let value = ''

                columnValues.forEach(item => {
                    value += `${item.label}-`
                })

                console.log(`Picker getColumnValues: ${value.substr(0, value.length - 1)}`)
            },
            onPickerConfirm(columnIndex , itemIndex , value){
                if (value) {
                    this.pickerValue = value.label;
                    console.log(this.pickerValue)
                }
            },
            getColumnValue(index) {
                const value = this.column.getColumnValue(index)

                console.log(value)
            },
        },
        mounted(){
            let self = this;
            this.pickerData = cityData;
            this.pickerDefaultIndex = [3, 3, 1]
            setTimeout(()=>{

                self.getColumnValue(1)
            },100)
        },

    }
</script>

<style lang="scss" scoped>
    .page-main{
        background-color: $bg-color-base;
        .md-box{
            position: relative;
            width: 2rem;
            height: 2rem;
            margin: .2rem;
            @include setAllLine();
        }
    }
</style>
