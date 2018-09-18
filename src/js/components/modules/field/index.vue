<template>
    <div class="md-field">
        <div class="md-field-title" v-if="title">{{title}}</div>
        <div class="md-field-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'md-field',
        props : {
            title : {
                type: String,
                default: '',
            }
        }
    }
</script>

<style lang="scss">
    .md-field{
        background-color: $color-white;

        & + .md-field{
            margin-top: .2rem;
        }

        .md-field-title{
            height: .92rem;
            padding: .4rem .26rem 0;
            line-height: .52rem;
            font-size: $font-heading-small;
        }
    }

</style>
