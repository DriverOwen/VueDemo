<template>
  <div id="detail">
    <detail-nav-bar class="detailNav"></detail-nav-bar>
    <scroll class="detailContent">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import {getDetail,Goods,Shop} from "@/network/detail";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";


  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: "Detail",
    components: {Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {}
      }
    },
    created(){
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        /* 获取顶部图片 */
        this.topImages = data.itemInfo.topImages
        /* 获取商品信息 */
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo
      })
    },
    // beforeRouteEnter(to,from,next){
    //   console.log(this.$refs.maintabbar);
    //   next()
    // }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background: #fff;
    height: 100vh;
  }
  .detailNav {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .detailContent{
    height: calc(100% - 44px);
  }
</style>