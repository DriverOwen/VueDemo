<template>
  <div class="toast" v-show="isShow">
    <p class="title">
      {{message}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '暂无消息', duration = 1500){
        this.message = message
        this.isShow = true
        setTimeout(()=>{
          this.message = ''
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    background: rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 12px 10px;
  }
  .title {
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
</style>