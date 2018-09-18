<template>
    <div class="md-input-error" v-if="errorValue">
        <div class="error-icon">
            <md-icon :name="'md-icon-error'"></md-icon>
        </div>
        {{errorValue}}
    </div>
</template>
<script>
    import Icon from '../icon'
    export default {
        name: 'md-input-error',
        components: {
            [Icon.name] : Icon,
        },
        data(){
            return {
                errorValue: '',
            }
        },
        props: {
            value: {
                type: String,
                default: '',
            }
        },
        watch:{
            value(val) {
                this.errorValue = val;
            }
        },
        created(){
            this.errorValue = this.value;
        }
    }
</script>

<style lang="scss" scoped>
    .md-input-error{
        line-height: .48rem;
        height: .48rem;
        padding-left: .58rem;
        position: relative;
        font-size: .28rem;
        color: #ef4352;
        margin-top: .3rem;

        .error-icon{
            display: block;
            width: .48rem;
            height: .48rem;
            position: absolute;
            left: 0;
            top:0;
        }
    }
</style>
