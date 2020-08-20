<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             :key="item"
             class="item-title"
             :class="{isActive: index === currentIndex}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {NavBar},
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>


<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .item-title {
    flex: 1;
  }
  .isActive{
    color: #ff8198;
  }
  .back {
    width: 12px;
    height: 12px;
    margin-top: 5px;
    margin-left: 10px;
  }

</style>