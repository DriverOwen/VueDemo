<template>
  <bottom-bar class="MainBottomBar">
    <div slot="left" class="left">

    </div>
    <div slot="right" class="right">
      <div class="addCard" @click="addToCar">
      加入购物车
      </div>
      <div class="purchase">购买</div>
    </div>
  </bottom-bar>
</template>

<script>
  import BottomBar from "@/components/content/bottomBar/BottomBar";

  export default {
    name: "MainBottomBar",
    components: { BottomBar},
    methods: {
      addToCar(){
        // console.log('addCar');
        this.$emit('addToCar')
      }
    }
  }
</script>

<style scoped>
  .MainBottomBar {
    position: fixed;
    z-index: 10;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    height: 50px;
  }
  .left,.right{
    flex: 1 1;
    display: flex;
  }
  .left{
    text-align: center;
    line-height: 50px;
  }
  .addCard,.purchase{
    font-size: 12px;
    line-height: 50px;
    text-align: center;
    flex: 1 1;
  }
  .addCard{
    background: rgb(252,219,18);
    color: #000;
  }
  .purchase{
    background: rgb(248,117,150);
    color: #fff;
  }
</style>