<template>
    <div class="md-picker-column" :style="{ height: `${style.indicatorHeight + 2 * style.maskerHeight}px` }">
        <div class="md-picker-container">
            <div class="md-picker-masker top" :style="{ 'height': `${style.maskerHeight}px` }"></div>
            <div class="md-picker-masker bottom" :style="{ 'height': `${style.maskerHeight}px` }"></div>
            <div class="md-picker-list">
                <template v-for="(colunm, i) in columnValues">
                    <div class="md-picker-item" :key="i">
                        <ul class="picker-list" ref="pickerList" :style="{ 'padding-top': `${style.maskerHeight}px` }">
                            <template v-for="(item, j) in colunm">
                                <li
                                    :style="{
                                        'height': `${style.indicatorHeight}px`,
                                        'line-height': `${style.indicatorHeight}px`
                                    }"
                                    :key="j"
                                    v-text="item.text || item.label"
                                ></li>
                            </template>
                        </ul>
                    </div>
                </template>
            </div>
            <div class="md-picker-hooks">
                <template v-for="n in cols">
                    <div
                        class="md-picker-hook"
                        :key="n - 1"
                        @touchstart="onColumnTouchStart($event, n - 1)"
                        @mousedown="onColumnTouchStart($event, n - 1, true)"
                        @touchmove="onColumnTouchMove($event, n - 1)"
                        @mousemove="onColumnTouchMove($event, n - 1, true)"
                        @touchend="onColumnTouchEnd($event, n - 1)"
                        @mouseup="onColumnTouchEnd($event, n - 1, true)"
                    ></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import { noop , getDpr , render , traverse ,compareObjects} from '../../../lib/core.js'
    import { Scroller } from 'scroller'
    const dpr = getDpr();
    const API_LIST = [
        'getColumnValue',
        'getColumnValues',
        'getColumnIndex',
        'getColumnIndexs',
        'getColumnIgnoreIndex',
        'setColumnValues',
        'refresh',
        'inheritPickerApi',
    ]

    export default {
        name: 'md-picker-column',
        components: {},
        data(){
            return {
                style: {
                    maskerHeight: 86 * dpr,
                    indicatorHeight: 43 * dpr,
                },
                columnValues: [],
                scrollers: [],
                scrollDirect: 1,
                scrollPosition: 0,
                activedIndexs: [],
                isInitialed: false,
                isScrollInitialed: false,
                isScrolling: false,
                isMouseDown: false,
            }
        },
        props: {
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
                    return []
                },
            },
            invalidIndex: {
                type: Array,
                default() {
                    return []
                },
            },
        },
        computed: {},
        watch: {
            data: {
                handler(val, oldVal) {
                    /* istanbul ignore if */
                    if (!compareObjects(val, oldVal)) {
                        this.columnValues = val
                    }
                },
                deep: true,
            },
        },
        created(){
            this.columnValues = this.data;

//            this.initColumnsScroller();
        },
        methods: {
            // MARK: private methods
            // initial scroller for each column
            initColumnsScroller(startIndex = 0) {
                let hooks = this.$el.querySelectorAll('.md-picker-hook');

                /* istanbul ignore if */
                if (!hooks) {
                    return
                }

                hooks = Array.isArray(hooks) ? hooks : Array.prototype.slice.call(hooks);

                for (let i = startIndex, len = hooks.length; i < len; i++) {
                    const container = hooks[i];
                    container && this.initSingleColumnScroller(container, i)
                }

                // initial index only refresh all columns
                if (!startIndex) {
                    this.initColumnIndex();
                    if (!this.isInitialed) {
                        this.isInitialed = true;
                        setTimeout(() => {
                            this.$emit('initialed')
                        }, 0)
                    }
                }

                this.isScrollInitialed = true
            },
            // initial scroller for column by index
            initSingleColumnScroller(container, index) {
                const columns = this.$el.querySelectorAll('.picker-list');
                const content = columns[index];

                /* istanbul ignore if */
                if (index === undefined || !columns || !container || !content) {
                    return
                }

                const rect = container.getBoundingClientRect();
                const scroller = new Scroller(
                    (left, top) => {
                        render(content, left, top)
                    },
                    {
                        scrollingX: false,
                        snapping: true,
                        scrollingComplete: () => {
                            this.onColumnScrollEnd(index)
                        },
                    },
                );

                // set scroller size
                scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop)
                scroller.setDimensions(
                    container.clientWidth,
                    container.clientHeight,
                    content.offsetWidth,
                    content.offsetHeight + this.style.maskerHeight,
                )
                scroller.setSnapSize(0, this.style.indicatorHeight)

                // save scroller instance
                this.$set(this.scrollers, index, scroller)
            },

            // each column scroll to active item by defaultIndex
            initColumnIndex() {
                const data = this.columnValues;
                const scrollers = this.scrollers;
                const defaultValue = this.defaultValue;
                const defaultIndex = this.defaultIndex;

                this.getColumnIndexByDefault(data, defaultIndex, defaultValue, (columnIndex, itemIndex) => {
                    const scroller = scrollers[columnIndex]
                    const offsetTop = this.getColumnOffsetByIndex(itemIndex)

                    /* istanbul ignore if */
                    if (!scroller) {
                        console.log(`initialColumnIndex: scroller of column ${columnIndex} is undefined`)
                        return 1
                    }

                    scroller.scrollTo(0, offsetTop)
                    // save active index of each column
                    this.$set(this.activedIndexs, columnIndex, itemIndex)
                })
            },
            getColumnIndexByDefault(data, defaultIndex, defaultValue, fn) {
                /* istanbul ignore if */
                if (!data) {
                    return
                }

                traverse(data, (item, level, indexs) => {
                    const columnIndex = indexs[0]
                    const itemIndex = indexs[1]
                    const itemDefaultIndex = defaultIndex[columnIndex]
                    const itemDefaultValue = defaultValue[columnIndex]

                    if (
                        (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex) ||
                        (itemDefaultValue !== undefined &&
                        (item.text === itemDefaultValue || item.label === itemDefaultValue || item.value === itemDefaultValue))
                    ) {
                        fn(columnIndex, itemIndex)
                        return 2
                    }
                })
            },
            getColumnIndexByOffset(top) {
                return Math.round(top / this.style.indicatorHeight)
            },
            getColumnOffsetByIndex(index) {
                return index * this.style.indicatorHeight
            },
            isColumnIndexInvalid(columnIndex, itemIndex) {
                const invalidIndex = this.invalidIndex[columnIndex] || [];

                return invalidIndex.indexOf(itemIndex)
            },
            scrollToValidIndex(columnIndex, itemIndex) {
                const scroller = this.scrollers[columnIndex];
                const dirction = this.scrollDirect;
                let count = itemIndex;
                const isInvalid = this.isColumnIndexInvalid(columnIndex, count);

                while (isInvalid && isInvalid !== -1) {
                    count += dirction
                }

                let offsetTop = this.getColumnOffsetByIndex(count)
                scroller.scrollTo(0, this.scrollInZoon(scroller, offsetTop), true)
            },
            scrollInZoon(scroller, top) {
                const MaxTop = scroller.getScrollMax().top;

                if (top < 0) {
                    return 0
                } else if (top > MaxTop) {
                    return MaxTop
                } else {
                    return top
                }
            },

            // MARK: events handler
            onColumnTouchStart(event, index, isMouse) {
                event.preventDefault();

                const scroller = this.scrollers[index];
                const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches;

                /* istanbul ignore if */
                if (!scroller) {
                    console.log(`touchstart: scroller of column ${index} is undefined`)
                    return
                }

                this.scrollPosition = isMouse ? event.pageY : event.touches[0].pageY
                scroller.doTouchStart(touches, event.timeStamp)
                isMouse && (this.isMouseDown = true)
            },
            onColumnTouchMove(event, index, isMouse) {
                const scroller = this.scrollers[index]
                const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches

                /* istanbul ignore if */
                if (!scroller || (isMouse && !this.isMouseDown)) {
                    return
                }

                const diff = this.scrollPosition - (isMouse ? event.pageY : event.touches[0].pageY)
                this.scrollDirect = diff ? diff / Math.abs(diff) : 1

                scroller.doTouchMove(touches, event.timeStamp)
                isMouse && (this.isMouseDown = true)
            },
            onColumnTouchEnd(event, index, isMouse) {
                const scroller = this.scrollers[index];

                /* istanbul ignore if */
                if (!scroller || (isMouse && !this.isMouseDown)) {
                    return
                }
                scroller.doTouchEnd(event.timeStamp)
                isMouse && (this.isMouseDown = false)
            },
            onColumnScrollEnd(index) {
                const scroller = this.scrollers[index];
                const top = scroller.getValues().top;
                const scrollTop = this.scrollInZoon(scroller, top);
                const activeItemIndex = this.getColumnIndexByOffset(scrollTop);
                const isInvalid = this.isColumnIndexInvalid(index, activeItemIndex);

                if ((isInvalid && isInvalid !== -1) || activeItemIndex === this.activedIndexs[index]) {
                    this.scrollToValidIndex(index, activeItemIndex)
                    return false
                }

                /* istanbul ignore next */
                this.$set(this.activedIndexs, index, activeItemIndex)
                /* istanbul ignore next */
                this.$emit('change', index, activeItemIndex, this.getColumnValue(index))
            },
            // MARK: public methods
            inheritPickerApi(instance, blacklist = []) {
                traverse(API_LIST, api => {
                    /* istanbul ignore if */
                    if (!instance) {
                        return 2
                    } else if (~blacklist.indexOf(api)) {
                        return 1
                    }

                    const fn = this[api]

                    /* istanbul ignore else */
                    if (fn) {
                        instance[api] = fn
                    } else {
                        console.log(`inheritPickerApi: Api method [${api}] is undefined`)
                    }
                })
            },
            getColumnValue(index) {
                const activeValues = this.getColumnValues();

                return activeValues[index || 0];
            },
            getColumnValues() {
                const data = this.columnValues;
                const activeIndexs = this.activedIndexs;
                let activeValues = [];

                data.forEach((item, index) => {
                    activeValues[index] = item[activeIndexs[index]]
                })

                return activeValues
            },
            getColumnIndex(index = 0) {
                return this.activedIndexs[index]
            },
            getColumnIndexs() {
                return this.activedIndexs
            },
            getColumnIgnoreIndex(data, defaultIndex = [], defaultValue = [], fn = noop) {
                /* istanbul ignore next */
                this.getColumnIndexByDefault(data, defaultIndex, defaultValue, fn)
            },
            setColumnValues(index, values, callback = noop) {
                /* istanbul ignore if */
                if (index === undefined || values === undefined) {
                    return
                }
                this.$set(this.activedIndexs, index, 0) // reset active index
                this.$set(this.columnValues, index, values)
                this.$nextTick(() => {
                    this.initSingleColumnScroller(index)
                    callback()
                })
            },
            refresh(callback, startIndex = 0) {
                // this.activedIndexs = []
                this.$nextTick(() => {
                    this.initColumnsScroller(startIndex)
                    callback && callback()
                })
            },
        },
    }
</script>

<style lang="scss">
    .datetime{
        .picker-list{
            li{
                font-size: .3rem!important;
            }
        }
    }
    .md-picker-column{
        position: relative;
        width: 100%;
        height: 4.32rem;
        background:#fff;
        transform:  translate3d(0, 0, 0);
        -moz-transform:  translate3d(0, 0, 0);
        -webkit-transform:  translate3d(0, 0, 0);

        .md-picker-container{
            height: 100%;

            .md-picker-masker{
                position: absolute !important;
                z-index: 2;
                left: 0;
                right: 0;
                height: 1.72rem;
                transform:  translate3d(0, 0, 0);
                -moz-transform:  translate3d(0, 0, 0);
                -webkit-transform:  translate3d(0, 0, 0);

                &.top{
                    top:0;
                    background: -webkit-gradient(linear,left bottom,left top,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)));
                    @include setBottomLine(#ADB0A7);
                }
                &.bottom{
                    bottom: 0;
                    background: -webkit-gradient(linear,left top,left bottom,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)));
                    @include setTopLine(#ADB0A7);
                }
            }

            .md-picker-list{
                height: 100%;
                padding: 0 .1rem;
                @include dis_flex;
                .md-picker-item{
                    position: relative;
                    overflow: hidden;
                    @include boxflex(1);

                    .picker-list{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        transform-origin: left top;
                        transform:  translate3d(0, 0, 0);
                        -moz-transform:  translate3d(0, 0, 0);
                        -webkit-transform:  translate3d(0, 0, 0);

                        li{
                            display: block;
                            width: 100%;
                            padding: 0 .1rem;
                            height: .86rem;
                            line-height: .86rem;
                            text-align: center;
                            font-size: .38rem;
                            color: #333;
                            @include text-overflow;
                        }
                    }
                }
            }

            .md-picker-hooks{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                @include dis_flex;

                .md-picker-hook{
                    height: 100%;
                    @include boxflex(1);
                }
            }

        }
    }
</style>
