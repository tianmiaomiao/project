<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="router-animate" v-wechat-title="$route.meta.title" img-set="./static/favicon.ico" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view class="router-animate" v-wechat-title="$route.meta.title" img-set="./static/favicon.ico" v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script>
    import './scss/core.scss';
    import './scss/global.scss';

    export default {
        name: 'app',
        components: {
        },
        data(){
            return{
                transitionName: 'fade',
            }
        },
        computed:{},
        methods : {

        },
        mounted:function(){
//            if (document.body.clientWidth > 750) {
//                Util.setScale(0.5)
//            }
        }
    }

</script>