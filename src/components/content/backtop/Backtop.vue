<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="back-top">
  </div>
</template>

<script>
  export default {
    name: "Backtop"
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 9;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>