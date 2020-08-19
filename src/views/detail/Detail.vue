<template>
  <div id="detail">
    <detail-nav-bar class="detailNav"></detail-nav-bar>
    <scroll class="detailContent">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :images-info="detailInfo"></detail-images-info>
      <detail-params-info :param-info="paramsInfo"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <good-list :goods="recommends"></good-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from "@/network/detail";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";


  import Scroll from "@/components/common/scroll/Scroll";
  import DetailImagesInfo from "@/views/detail/childComps/DetailImagesInfo";
  import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import GoodList from "@/components/content/goods/GoodsList";

  export default {
    name: "Detail",
    components: {
      GoodList,
      DetailCommentInfo,
      DetailParamsInfo, DetailImagesInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: null
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

        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list;
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