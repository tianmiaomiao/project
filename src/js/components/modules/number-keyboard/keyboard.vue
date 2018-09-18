<template>
    <div class="md-number-keyboard">
        <div class="keyboard-container">
            <div class="keyboard-list">
                <div class="keyboard-item"
                     v-for="item in keyboardList"
                     @click="onEnter($event,item)"
                >{{item}}</div>

                <div class="keyboard-item point" v-if="type == 'number'" @click="onEnter($event,'.')">·</div>
                <div class="keyboard-item" v-else-if="type == 'idCard'" @click="onEnter($event,'X')">X</div>
                <div class="keyboard-item" v-else>&nbsp;</div>
                <div class="keyboard-item" @click="onEnter($event,'0')">0</div>
                <div class="keyboard-item backspace" @click="onDelete($event)">
                    <i class="keyboard-backspace"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    export default {
        name: 'md-number-keyboard',
        components: {
            [Icons.name] : Icons
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
            type : {
                type: String,
                default: 'normal', //normal number idCard
            }
        },
        watch : {
        },
        computed: {},
        mounted(){

        },
        methods: {
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
    .md-number-keyboard{
        .keyboard-container{
            background-color: #fff;
            @include setTopLine();
            @include setRightLine();
        }
        .keyboard-list{
            @include clearfix;

            .keyboard-item{
                position: relative;
                float: left;
                width: 33.33333333%;
                text-align: center;
                color: #000;
                font-size: .5rem;
                height: 1rem;
                line-height: 1rem;
                box-sizing: border-box;
                -webkit-tap-highlight-color: rgba(0,0,0,0);

                @include setLeftLine();
                @include setBottomLine();

                &.point{
                    font-weight: bold;
                }

                &.backspace{
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: .6rem auto;
                    background-image: url("./image/backspace.png");
                }
                &.empty{
                    background-color: #f5f5f5;
                    pointer-events: none;
                }

                &.tap-highlight{
                    background-color: #d2d2d2!important;
                }
            }
        }


    }
</style>
