<template>
    <div class="md-list-item">
        <div class="md-list-container" @click="onClickItem">
            <div class="md-list-left" v-if="$slots.left">
                <slot name="left"></slot>
            </div>
            <div class="md-list-center">
                <div class="md-list-title" v-if="title">{{title}}</div>
                <div class="md-list-desc" v-if="desc">{{desc}}</div>
            </div>
            <div class="md-list-right" v-if="$slots.right">
                <slot name="right"></slot>
            </div>
            <div class="md-list-more" v-if="isArror">
                <md-icon :name="'md-icon-right'"></md-icon>
            </div>
        </div>
    </div>
</template>
<script>
    import Icons from '../icon/index.vue'
    export default {
        name: 'md-list-item',
        components: {
            [Icons.name] : Icons
        },
        data(){
            return {}
        },
        props : {
            title: {
                type: String,
                default: '',
            },
            desc: {
                type: String,
                default: '',
            },
            isArror: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
        },
        mounted(){
        },
        methods: {
            onClickItem (event){
                if (this.disabled) {
                    event.stopImmediatePropagation()
                } else {
                    this.$emit('click', event)
                }
            }
        }
    }
</script>

<style lang="scss">
    .md-list-item{
        position: relative;
        background-color: $color-white;

        .md-list-container{
            position: relative;
            min-height: 1.1rem;
            padding:.3rem .26rem;
            @include setBottomLine();
            @include dis_flex;
            @include align-items;
        }

        .md-list-left{
            padding-right: .2rem;
            font-size: $font-heading-normal;
            @include dis_flex;
            @include align-items;

            & > span,
            & > div{
                display: inline-block;
            }
            img{
                display: block;
            }
        }

        .md-list-center{
            @include boxflex(1);

            .md-list-title{
                color: $color-black;
                font-size: $font-heading-normal;
                line-height: $line-height-large;
            }
            .md-list-desc{
                color: $color-gray-middle;
                font-size: $font-body-medium;
                line-height: $line-height-medium;
            }
        }

        .md-list-right{
            color: $color-gray-middle;
            font-size: $font-heading-normal;
        }

        .md-list-more{
            width: .28rem;
            height: .28rem;
            margin-left: .2rem;
        }
    }
</style>
