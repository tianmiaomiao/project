<template>
    <div class="md-icon"
         :class="name"
         :style="[
             {backgroundImage},
             {size}
         ]"
    ></div>
</template>
<script>
    import IconList from './icons-list.json'
    export default {
        name: 'md-icon',
        components: {},
        data(){
            return {
                IconList : IconList,
                backgroundImage : ''
            }
        },
        props : {
            name: {
                type: String,
                default: '',
            },
            size: {
                type: String,
                default: '',
            },
        },
        computed: {},
        mounted(){
        }
    }
</script>

<style lang="scss">
    .md-icon{
        width: 100%;
        height: 100%;
        display: inline-block;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .md-icon-clear     { background-image: url( "./images/md-icon-clear.png") }
    .md-icon-tip       { background-image: url( "./images/md-icon-tip.png") }
    .md-icon-phone     { background-image: url( "./images/md-icon-phone.png") }
    .md-icon-eye       { background-image: url( "./images/md-icon-eye.png") }
    .md-icon-eye-opne  { background-image: url( "./images/md-icon-eye-open.png") }
    .md-icon-right     { background-image: url( "./images/md-icon-right.png") }
    .md-icon-backspace { background-image: url( "./images/md-icon-backspace.png") }
    .md-icon-loading   { background-image: url( "./images/md-icon-loading.gif") }
    .md-icon-checked   { background-image: url( "./images/md-icon-check.png") }
    .md-icon-unChecked { background-image: url( "./images/md-icon-uncheck.png") }
    .md-icon-error     { background-image: url( "./images/md-icon-error.png") }
    .md-icon-bottom    { background-image: url( "./images/md-icon-bottom.png") }
</style>
