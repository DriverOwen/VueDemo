<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 10px;
  }
  .info-title {
    color: #000;
    font-weight: 500;
  }
  .info-price {
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
  }
  .n-price {
    font-size: 25px;
    color: #ff8198;
  }
  .o-price {
    font-size: 15px;
    color: #666666;
    margin-left: 8px;
    text-decoration: line-through;
  }
  .discount {
    background: #ff8198;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;
    margin-left: 8px;
  }
  .info-other {
    display: flex;
    padding: 15px 0;
    justify-content: space-between;
    font-size: 12px;
    border-bottom: 1px solid #f0f2f7;
    color: #C3C3C3;
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: center;

  }
  .info-service-item {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #000;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;

  }
  .info-service img{
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }

</style>