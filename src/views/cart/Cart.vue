<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getCartlength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "Cart",
    components: {NavBar},
    computed: {
      getCartlength(){
        return this.$store.getters.getCartlength
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background: #ff8198;
    color: #fff;
  }
</style>
