<template>
  <div class="tick">
    <img :class="{active:isActive}" src="~assets/img/cart/tick.svg" alt="">

  </div>
</template>

<script>
  export default {
    name: "CheckBox",
    props: {
      isActive:{
        type: Boolean,
        default: false
      }

    }
  }
</script>

<style scoped>
  .tick {
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #ff8198;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tick img{
    width: 90%;
    height: 90%;
  }
  .active{
    background: #ff8198;
  }
</style>