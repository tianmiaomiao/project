<template>
    <div class="page-view iosx-container">
        <div class="page-main">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <md-field :title="'日期选择'">
                    <md-date-picker
                        ref="datePicker"
                        today-text="今天"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        :default-date="currentDate"
                        is-view
                        @initialed="onDatePickerInitialed"
                    ></md-date-picker>
                </md-field>
                <md-field :title="'底部滑出'">
                    <md-list-item
                        is-arror
                        :title="datePickerValue"
                        @click.native="isDatePickerShow = true"
                    ></md-list-item>
                    <md-date-picker
                        ref="datePicker"
                        v-model="isDatePickerShow"
                        type="datetime"
                        today-text="今天"
                        title="选择出险时间"
                        is-twelve-hours
                        :text-render="textRender"
                        :default-date="currentDate"
                        @change="onDatePickerChange"
                        @confirm="onDatePickerConfirm"
                    ></md-date-picker>
                </md-field>
                <md-field :title="'时间选择'">
                    <md-date-picker
                        type="time"
                        :unit-text="['', '', '', 'h', 'm']"
                        :half-day-text="['AM', 'PM']"
                        :minute-step="30"
                        is-twelve-hours
                        is-view
                    ></md-date-picker>
                </md-field>
                <md-field :title="'时间选择'">
                    <md-date-picker
                        ref="datePicker"
                        type="datetime"
                        :default-date="currentDate"
                        is-twelve-hours
                        is-view
                    ></md-date-picker>
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
    import Toast from '../../js/components/modules/toast/index.js'
    import Dialog from '../../js/components/modules/dialog/index.js'
    import PickerDate from '../../js/components/modules/picker-date/'
    import ListItem from  '../../js/components/modules/list-item/index.vue'
    import Popup from '../../js/components/modules/popup'

    export default {
        name: 'dialog-demo',
        components: {
            VHeader,
            VFooter,
            [Field.name]: Field,
            [Dialog.name]: Dialog,
            [ListItem.name]: ListItem,
            [PickerDate.name]: PickerDate,
            [Popup.name]: Popup,
        },
        data(){
            return {
                headerData: {
                    backBtn: true
                },
                minDate: new Date('2013/9/9'),
                maxDate: new Date('2020/9/9'),
                currentDate: new Date(),
                isDatePickerShow : false,
                datePickerValue: '请选择出险时间',
                isPickerShow: false,
            }
        },
        watch:{
        },
        computed: {
        },
        methods: {
            textRender() {
                const args = Array.prototype.slice.call(arguments)

                const typeFormat = args[0] // 类型
                const column0Value = args[1] // 第1列选中值
                const column1Value = args[2] // 第2列选中值
                const column2Value = args[3] // 第2列选中值
                const column3Value = args[4] // 第2列选中值
                const column4Value = args[5] // 第2列选中值

//                if (typeFormat === 'yyyy') {
//                    return `${column0Value}年`
//                }else if (typeFormat === 'MM') {
//                    return `${new Date().getMonth() + 1}月`
//                }else if (typeFormat === 'dd') {
//                    return `${column2Value}日`
//                } else if (typeFormat === 'hh') {
//                    return `${column3Value}时`
//                } else if (typeFormat === 'mm') {
//                    return `${column4Value}分`
//                }
            },
            onDatePickerInitialed() {
                console.log(`DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
            },
            onDatePickerChange(columnIndex, itemIndex, value) {

                console.log(value)
            },
            onDatePickerConfirm(columnsValue) {
                console.log(this.$refs.datePicker.getFormatDate('yyyy年MM月dd日hh时mm分'))
                this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy年MM月dd日hh时mm分')
            },
        },
        mounted(){
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
