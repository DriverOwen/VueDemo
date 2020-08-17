<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpload: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpload
      })

      this.scroll.on("scroll",(position) => {
        this.$emit("scroll",position)
      })
      /* 监听上拉事件*/
      this.scroll.on("pullingUp",() => {
        this.$emit("pullingUp")
      })
    },
    methods: {
      gotoScroll(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        console.log('---');
        this.scroll && this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>