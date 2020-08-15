<template>
  <div class="tab-control">
    <!--因为需求上看这里只是字不一样所以并没有使用插槽-->
    <div v-for="(item,index) in titles" :key="item" class="tab-control-item"
         :class="{active: index === currentIndex}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>

  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
    padding: 5px;
  }

  .active {
    color: #ff8198;
  }

  .active span{
    border-bottom: 2px solid #ff8198;
  }
</style>