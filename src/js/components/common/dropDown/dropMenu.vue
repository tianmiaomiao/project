<template>
    <div>
      <div class="mask"  @click="hideDropMenu()"></div>
      <transition appear mode="out-in" name="fadeIn">
        <div class="dropDown" v-show="visible" :style="setStyle()">
          <div class="item"
               v-for="(item,index) in typeData.list"
               :class="{'active' : typeData.curItem == index }"
               @click="selectItem(index)">
            <span class="name">{{item.name}}</span>
            <i class="icon"></i>
          </div>
        </div>
      </transition>
    </div>
</template>


<script>
    var defaults = {
        visible: false,
        typeData:'',
    };
    export default {
        data() {
            return {
                ...defaults
            };
        },
        created() {
            this.$nextTick(() => {
                this.rendered = true;
                this.typeData.curItem = this.typeData.curItem || 0;
            })
        },
        methods: {
          setStyle(){
              return {
                  top: this.typeData.offTop || '0'
              }
          },
          
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top:0;
      z-index: 99;
    }
    .dropDown{
        position: absolute;
        top:100%;
        left: 0;
        width: 100%;
        z-index: 100;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        .item{
          position: relative;
          line-height: .88rem;
          border-top: 1px solid #eee;
          color: #a0a0a0;
          font-size: .28rem;
          padding:0 .32rem;
          text-align: left;
          
          &.active{
            color: #ef4353;
            .icon{
              opacity: 1;
            }
          }
          .icon{
            float: right;
            width: .36rem;
            height: .24rem;
            margin-top: .32rem;
            margin-right: .4rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-image: url("./tick.png");
            opacity: 0;
            -webkit-transition: opacity .3s;
            -moz-transition: opacity .3s;
            transition: opacity .3s;
          }
        }
    }
    .fadeIn-enter-active, .fadeIn-leave-active {
      transition: opacity .3s,transform .2s;
      -moz-transition: opacity .3s,transform .2s;
      -webkit-transition: opacity .3s,transform .2s;
    }
    .fadeIn-enter, .fadeIn-leave-to {
      opacity: 0;
      transform: translateY(-.2rem);
      -moz-transform: translateY(-.2rem);
      -webkit-transform: translateY(-.2rem);
    }
</style>
