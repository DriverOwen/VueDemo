<template>
  <div class="detail-swiper">
    <swiper  class="Detailswiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="topImage">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .Detailswiper{
    max-height: 300px;
    overflow: hidden;
  }
</style>