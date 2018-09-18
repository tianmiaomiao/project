<template>
    <div class="md-checkbox" :class="{isCheck:isChecked}">
        <div class="check-box"  @click="onClick">
            <div class="check-icon">
                <md-icon :name="'md-icon-checked'" v-show="isChecked"></md-icon>
                <md-icon :name="'md-icon-unChecked'" v-show="!isChecked"></md-icon>
            </div>
            {{title}}
        </div>
        <slot></slot>
    </div>
</template>
<script>
    import Icon from '../icon'
    export default {
        name: 'md-checkbox',
        components: {
            [Icon.name] : Icon
        },
        data(){
            return {
                isChecked : false
            }
        },
        props : {
            value : {
                type : Boolean,
                default: false,
            },
            title : {
                type : String,
                default: '我已阅读并同意',
            }
        },
        mounted(){
            this.isChecked = this.value;
        },
        methods: {
            onClick(event){
                this.isChecked = !this.isChecked;
                this.$emit('input',this.isChecked);
                this.$emit('click', event)
            }
        }
    }
</script>

<style lang="scss">
    .md-checkbox{
        position: relative;
        display: inline-block;
        line-height: .4rem;
        color: $color-gray-middle;
        font-size: .28rem;
        -webkit-transition: color .3s ease;
        -moz-transition: color .3s ease;
        transition: color .3s ease;
        padding-left: .48rem;

        & + .md-checkbox{
            margin-top: .1rem;
        }

        &.isCheck{
            color: $color-gray-dark;
        }

        .check-box{
            display: inline-block;
            vertical-align: top;
        }

        .check-icon{
            position: absolute;
            left: 0;
            top: .02rem;
            display: inline-block;
            width:0.3rem;
            height:0.3rem;
            vertical-align: top;
        }
        .md-check-link{
            display: inline-block;
            vertical-align: top;
            color: $color-blue-dark;
        }
    }
</style>
