<template>
    <div class="steps">
        <div class="item" v-for="(item,index) in opts.list">
            <div :class="[commomClass,item.desc ? '' : desClass]">{{item.name}}</div>
            <div class="desc" v-if="item.desc">{{item.desc}}</div>
            <div class="bar" :class="getCurrent(index)"><i></i></div>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        name: 'step',
        props: {
            opts: ""
        },
        methods:{
            getCurrent(num){
              if(this.opts.current >= num){
                  return "active"
              }
            }
        },
        data () {
            return {
              commomClass: 'name',
              desClass: 'hasDesc',
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .steps{
    position: relative;
    width: 100%;
    .item{
      position: relative;
      z-index: 10;
      padding:.12rem 0 .12rem .5rem;
      font-size: .26rem;
      color: #333;
      line-height: .38rem;
      height: 1rem;
      .hasDesc{
        padding-top: 0.2rem;
      }
      .bar{
        position: absolute;
        left: 0;
        top: .39rem;
        display: block;
        width: .23rem;
        height: .23rem;
        border-radius: .23rem;
        padding:.04rem;
        i{
          display: block;
          width: .15rem;
          height: .15rem;
          border-radius: .15rem;
          border:.02rem solid #ff484a;
          background-color: #fff;
        }
        &.active{
          background-color: #ff484a;
          i{
            background-color: transparent;
          }
        }
      }
    }
    .line{
      position: absolute;
      left: .11rem;
      top: .5rem;
      bottom: .5rem;
      border-left: .01rem solid #ff686a;
    }
  }

</style>
