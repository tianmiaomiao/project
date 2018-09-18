<template>
    <div class="page-view iosx-container">
        <div class="page-main show-footer">
            <!--header-->
            <v-header :opts="headerData"></v-header>
            <div class="page-container">
                <ul class="list">
                    <li v-for="item in list">
                        Line:
                        <span v-text="item"></span>
                    </li>
                </ul>
                <InfiniteLoading :on-infinite="onInfinite" ref="infiniteLoading">
                    <span slot="spinner" class="spinner">Loading</span>
                    <span slot="no-results" class="no-results">暂无数据</span>
                    <span slot="no-more" class="no-more">没有更多数据了</span>
                </InfiniteLoading>
            </div>
            <v-footer></v-footer>
        </div>
    </div>
</template>

<script>
    import Toast from '../../js/components/common/toast/index.js'
    import MessageBox from '../../js/components/common/dialog/index.js'
    import VHeader from  '../../js/components/layout/header/header.vue'
    import VFooter from  '../../js/components/layout/footer/footer.vue'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: 'indexView',
        components: {
            VHeader,
            VFooter,
            InfiniteLoading
        },
        data () {
            return {
                headerData: {
                    backBtn: true
                },
                loaded: false,
                list: []
            }
        },
        methods: {
            onInfinite () {
                var self = this;
                setTimeout(() => {
                    const temp = [];

                    if(self.list.length < 30){
                        for (let i = self.list.length + 1; i <= self.list.length + 10; i++) {
                            temp.push(i);
                        }
                        self.list = self.list.concat(temp);
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    }else{
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                }, 1000);
            },
        },
        created(){
            this.$nextTick(() => {
                this.visible = true;
            })
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .list{
        li{
            line-height: 1.3rem;
        }
    }


</style>
