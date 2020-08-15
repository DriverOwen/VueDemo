<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in cbanners" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper';
    export default {
        name: "HomeSwiper",
        props: {
            cbanners:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        components:{
            Swiper,SwiperItem
        }
    }
</script>

<style scoped>


</style>
