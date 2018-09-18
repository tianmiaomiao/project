<template>
    <div class="agree-checkBox" :class="{'active':checkData.isChecked}" @click="check">
        <span class="agree"></span>{{checkData.title}}
    </div>
</template>
<script>
    export default {
        name: 'agree',
        data(){
            return {
            }
        },
        props:{
            checkData : {
                title : '已阅读并同意',
                isChecked : false
            }
        },
        methods: {
            check: function () {
                this.checkData.isChecked = !this.checkData.isChecked;

                this.$emit('fnCheck',this.checkData.isChecked);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .agree-checkBox{
        position: relative;
        display: inline-block;
        line-height: .4rem;
        color: #bdbdbd;
        font-size: .28rem;
        -webkit-transition: color .3s ease;
        -moz-transition: color .3s ease;
        transition: color .3s ease;
        padding-left: .5rem;
        .agree{
            position: absolute;
            left: 0;
            top:0;
            display: inline-block;
            width:0.36rem;
            height:0.36rem;
            vertical-align: top;
            margin-top: 0;
            background:url("./unChecked.png") no-repeat center 0;
            background-size:cover;
        }
        &.active{
            color: #333;
            .agree{
                background:url("./checked.png") no-repeat center 0;
                background-size:cover;
            }
        }
    }

</style>
