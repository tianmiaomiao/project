<template>
    <div
        class="md-picker"
        :class="{'with-popup': !isView}"
    >
        <template v-if="isView">
            <md-picker-column
                ref="pickerColumn"
                :data="data"
                :default-value="defaultValue"
                :default-index="defaultIndex"
                :invalid-index="invalidIndex"
                :cols="cols"
                @initialed="$emit('initialed')"
                @change="onPickerChange"
            ></md-picker-column>
        </template>
        <template v-else>
            <md-popup
                v-model="isPickerShow"
                position="bottom"
                @beforeShow="onPickerBeforeShow"
                @show="onPickerShow"
                @hide="onPickerHide"
                prevent-scroll
            >
                <md-popup-title
                    :title="title"
                    :ok-text="okText"
                    :cancel-text="cancelText"
                    @confirm="onPickerConfirm"
                    @cancel="onPickerCancel"
                ></md-popup-title>
                <md-picker-column
                    ref="pickerColumn"
                    :data="data"
                    :default-value="defaultValue"
                    :default-index="defaultIndex"
                    :invalid-index="invalidIndex"
                    :cols="cols"
                    @initialed="$emit('initialed')"
                    @change="onPickerChange"
                ></md-picker-column>
            </md-popup>
        </template>
    </div>
</template>
<script>
    import {compareObjects ,cascadePicker} from '../../../lib/core.js'
    import Popup from '../popup'
    import PopTitleBar from '../popup-title'
    import PickerColumn from './picker-column'

    export default {
        name: 'md-picker',
        components: {
            [Popup.name]: Popup,
            [PopTitleBar.name]: PopTitleBar,
            [PickerColumn.name]: PickerColumn,
        },
        data(){
            return {
                isPickerShow: false,
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            data: {
                type: Array,
                default() {
                    return []
                },
            },
            cols: {
                type: Number,
                default: 1,
            },
            defaultValue: {
                type: Array,
                default() {
                    return []
                },
            },
            defaultIndex: {
                type: Array,
                default() {
                    const arr = new Array(this.cols);
                    for (let i = 0, len = arr.length; i < len; i++) {
                        arr[i] = 0
                    }
                    return arr
                },
            },
            invalidIndex: {
                type: Array,
                default() {
                    return []
                },
            },
            isCascade: {
                type: Boolean,
                default: false,
            },
            isView: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
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

        computed: {
            column() {
                return this.$refs['pickerColumn']
            },
            isScrollInitialed() {
                return this.column.isScrollInitialed
            },
        },
        watch: {
            value(val) {
                this.isPickerShow = val
                val && this.initPicker()
            },
            isPickerShow(val) {
                if (!val) {
                    this.$emit('input', val)
                }
            },
            data: {
                handler(val, oldVal) {
                    this.resetPickerColumn(val, oldVal)
                },
                deep: true,
            },
            defaultIndex: {
                handler(val, oldVal) {
                    this.resetPickerColumn(val, oldVal)
                },
                deep: true,
            },
        },
        mounted(){
            this.initPicker();

            if (this.isView) {
                this.$nextTick(() => {
                    this.column.refresh()
                })
            }
        },
        methods: {
            initPicker() {
                if (!this.isView && this.value) {
                    this.isPickerShow = this.value
                }

                this.column.inheritPickerApi(this, ['refresh'])
            },
            initPickerColumn() {
                /* istanbul ignore if */
                if (!this.isCascade) {
                    return
                }

                const defaultIndexOfFirstColumn = this.defaultIndex[0] || 0
                this.$nextTick(() => {
                    cascadePicker(this.column, {
                        currentLevel: 0,
                        maxLevel: this.cols,
                        values: this.data[0] ? this.data[0][defaultIndexOfFirstColumn] || [] : [],
                        defaultIndex: this.defaultIndex,
                    })
                    this.$nextTick(() => {
                        this.column.refresh()
                    })
                })
            },
            resetPickerColumn(val, oldVal) {
                if (!compareObjects(val, oldVal)) {
                    this.initPickerColumn()
                }
            },
            onPickerConfirm() {
                const column = this.column;
                const columnValues = column.getColumnValues();
                let isScrolling = false;
                column.scrollers.forEach(scroller => {
                    /* istanbul ignore next */
                    if (
                        scroller._isAnimating !== false ||
                        scroller._isDecelerating !== false ||
                        scroller._isDragging !== false ||
                        scroller._isGesturing !== false
                    ) {
                        isScrolling = true;
                        return false
                    }
                })

//                if (!isScrolling) {
                    this.isPickerShow = false;
                    this.$emit('confirm', columnValues)
//                }
            },
            onPickerCancel() {
                this.isPickerShow = false;
                this.$emit('cancel')
            },
            onPickerChange(columnIndex, itemIndex, values) {
                /* istanbul ignore next */
                if (this.isCascade) {
                    cascadePicker(
                        this.column,
                        {
                            currentLevel: columnIndex,
                            maxLevel: this.cols,
                            values,
                        },
                        () => {
                            // reinitiate columns after the changing column
                            this.column.refresh(null, columnIndex + 1)
                        },
                    )
                }
                /* istanbul ignore next */
                this.$emit('change', columnIndex, itemIndex, values)
            },
            onPickerBeforeShow() {
                /* istanbul ignore next */
                if (!this.isScrollInitialed) {
                    this.$nextTick(() => {
                        this.column.refresh()
                    })
                }
            },
            onPickerHide() {
                this.$emit('hide')
            },
            onPickerShow() {
                this.$emit('show')
            },
            refresh() {
                this.column.isScrollInitialed = false;

                /**
                 * Manual call 'column.refresh' only when picker is in-view or popup is show,
                 * otherwise 'column.refresh' will be called at popup's 'onBerforeShow' automatically
                 */
                if (this.isView || this.isPickerShow) {
                    this.column.refresh.apply(this.column, arguments)
                }
            },
        }
    }
</script>

<style lang="scss">
    .md-picker{
        width: 100%;
        &.with-popup .md-popup{
            z-index: $zIndex;
        }
    }
</style>
