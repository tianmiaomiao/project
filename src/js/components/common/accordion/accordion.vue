<template>
    <div class="accordion">
        <ul class="accordion-list">
            <li v-for="(item, index) in opts" :key="index" @click="toggle(opts, index)">
                <h3 class="tit"><span>{{item.title}}</span><i :class="[commomClass,item.open ? arrowClass : '']"></i>
                </h3>
                <div class="content" v-show="item.open">
                    <p>{{item.answer}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'accordion',
        props: {
            opts: {
                type: Array
            }
        },
        data () {
            return {
                commomClass: '',
                arrowClass: 'open'
            }
        },
        methods: {
            toggle (opts, index) {
                opts.forEach((item) => {
                    item.qid == index ? item.open = !item.open : item.open = false;
                })
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .accordion-list {
        li {
            background: #fff;
            padding: 0 0.32rem 0 0.4rem;
            margin-bottom: 0.15rem;
            .tit {
                height: 1rem;
                display: flex;
                align-items: center;
                position: relative;
                span {
                    font-size: 0.28rem;
                    display: block;
                    flex: 1;
                    -webkit-flex: 1;
                }
                i {
                    width: 0.3rem;
                    height: 0.2rem;
                    display: inline-block;
                    background: url(./arrow_up.png) no-repeat center center;
                    background-size: 0.26rem auto;
                    transition: transform 0.3s cubic-bezier(0.4, 0.6, 0.2, 1);
                    transform: rotate(-180deg);
                    &.open {
                        transform: rotate(0deg);
                    }
                }
            }
            .content {
                p {
                    font-size: 0.28rem;
                    color: #999;
                    padding-bottom: 0.3rem;
                    line-height: 0.42rem;
                }
            }
        }
    }
</style>
