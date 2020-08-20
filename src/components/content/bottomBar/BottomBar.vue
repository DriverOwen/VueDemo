<template>
  <div class="bottomBar">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: "BottomBar"
  }
</script>

<style scoped>
  .bottomBar {
    display: flex;
  }
</style>