<template>
    <div class="md-trade-keyboard">
        <div class="keyboard-container">
            <div class="keyboard-space" v-if="type === 'share'">
                <div class="keyboard-item" @click="onSpace($event,1)">全仓</div>
                <div class="keyboard-item" @click="onSpace($event,0.5)">半仓</div>
                <div class="keyboard-item" @click="onSpace($event,0.33)">1/3仓</div>
                <div class="keyboard-item" @click="onSpace($event,0.25)">1/4仓</div>
            </div>
            <div class="keyboard-list">
                <div class="keyboard-item"
                     v-for="item in keyboardList"
                     @click="onEnter($event,item)"
                >{{item}}</div>
                <!--选股键盘-->
                <template v-if="type === 'normal'">
                    <div class="keyboard-item letter" @click="onChangeKeyboard">ABC</div>
                    <div class="keyboard-item" @click="onEnter($event,'0')">0</div>
                </template>
                <!--仓位键盘-->
                <template v-if="type === 'share'">
                    <div class="keyboard-item" @click="onEnter($event,'0')">0</div>
                    <div class="keyboard-item" @click="onEnter($event,'00')">00</div>
                </template>
                <!--价格键盘-->
                <template v-if="type === 'cost'">
                    <div class="keyboard-item point" @click="onEnter($event,'.')">·</div>
                    <div class="keyboard-item" @click="onEnter($event,'0')">0</div>
                </template>
                <div class="keyboard-item closeKeyboard" @click="onCancel($event)"></div>
            </div>
            <div class="keyboard-handle">
                <div class="keyboard-item backspace" @click="onDelete($event)"></div>
                <!--选股键盘-->
                <template v-if="type === 'normal'">
                    <div class="keyboard-item" @click="onEnter($event,'300')">300</div>
                    <div class="keyboard-item" @click="onEnter($event,'600')">600</div>
                </template>
                <!--仓位键盘\价格键盘-->
                <template v-else>
                    <div class="keyboard-item" @click="onChangeValue($event,1)">+{{scale}}</div>
                    <div class="keyboard-item" @click="onChangeValue($event,2)">-{{scale}}</div>
                </template>
                <div class="keyboard-item">
                    <div class="keyboard-confirm" @click="onConfirm">{{okText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'md-stock-keyboard',
        components: {
        },
        data(){
            return {
                keyboardList : [1,2,3,4,5,6,7,8,9]
            }
        },
        props : {
            value : {
                type: Boolean,
                default: false,
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
            type : {
                type: String,
                default: 'normal', //normal share cost
            }
        },
        watch : {
        },
        computed: {},
        mounted(){

        },
        methods: {
            onSpace(event,val){
                event.stopImmediatePropagation();
                var spaceVal = parseInt(parseInt(this.maxValue * val)/100)*100;
                if(spaceVal < 100){
                    spaceVal = 100;
                }
                this.$emit('filler',spaceVal)
                this.clickStatus(event);
            },
            onChangeKeyboard(event){
                event.stopImmediatePropagation();
                this.$emit('changeKeyboard')
            },
            onChangeValue(event,type){
                event.stopImmediatePropagation();
                this.$emit('changeValue',type,this.scale)
                this.clickStatus(event);
            },
            onEnter(event,val){
                event.stopImmediatePropagation();
                this.$emit('enter',val)
                this.clickStatus(event);
            },
            onDelete(event){
                event.stopImmediatePropagation();
                this.$emit('delete')
                this.clickStatus(event);
            },
            onCancel(event){
                event.stopImmediatePropagation();
                this.$emit('cancel')
            },
            onConfirm(event){
                event.stopImmediatePropagation();
                this.$emit('confirm')
            },
            clickStatus(event){
                var removeHoverTimer = null;

                event.target.classList.add("tap-highlight");
                removeHoverTimer = setTimeout(()=>{
                    event.target.classList.remove("tap-highlight");
                    removeHoverTimer && clearTimeout(removeHoverTimer);
                },100)
            }
        }
    }
</script>

<style lang="scss">
    .md-trade-keyboard{
        .keyboard-container{
            background-color: #fff;
            @include dis_flex;
            @include setTopLine();
            @include setRightLine();
        }
        .keyboard-space{
            @include boxflex(1);
            .keyboard-item{
                font-size: .36rem;
            }
        }
        .keyboard-handle{
            @include boxflex(1);
            .keyboard-item{
                font-size: .44rem;
            }
        }
        .keyboard-list{
            @include clearfix;
            @include boxflex(3);
            .keyboard-item{
                width: 33.3333%;
            }
        }
        .keyboard-item{
            position: relative;
            float: left;
            width: 100%;
            text-align: center;
            color: #000;
            font-size: .5rem;
            height: 1.24rem;
            line-height: 1.24rem;
            box-sizing: border-box;
            -webkit-tap-highlight-color: rgba(0,0,0,0);

            @include setLeftLine();
            @include setBottomLine();

            &.point{
                font-weight: bold;
            }
            &.letter{
                font-size: .42rem;
            }

            &.backspace{
                background-repeat: no-repeat;
                background-position: center center;
                background-size: .6rem auto;
                background-image: url("./image/backspace.png");
            }
            &.closeKeyboard{
                background-repeat: no-repeat;
                background-position: center center;
                background-size: .78rem auto;
                background-image: url("./image/keyboard.png");
            }
            &.empty{
                background-color: #f5f5f5;
                pointer-events: none;
            }

            &.tap-highlight{
                background-color: #d2d2d2!important;
            }
            .keyboard-confirm{
                background-color: #FF3E3E;
                text-align: center;
                color: #fff;
                font-size: .36rem;
            }
        }


    }
</style>
