<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" class="detailNav"></detail-nav-bar>
    <div>
      {{this.$store.state.cartList.length}}
    </div>
    <scroll ref="scroll" :probe-type="3" class="detailContent" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info @imgLoad="imgLoad" :images-info="detailInfo"></detail-images-info>
      <detail-params-info ref="params" :param-info="paramsInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <MainBottomBar @addToCar="addToCar"></MainBottomBar>
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
  import MainBottomBar from "@/components/content/bottomBar/MainBottomBar";
  import {debounce} from "@/common/utils";

  export default {
    name: "Detail",
    components: {
      MainBottomBar,
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
        recommends: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
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

        /* 当上面数据请求完毕后，再回调获取offsetTop */
        /* dom已经加载完，但是图片还没有加载完，导致值有问题 */
        // this.$nextTick(()=>{
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        // })

        /* 使用防抖，在图片加载完后再来获取值 */
        this.getThemeTopY = debounce(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs)
        },200)
      })
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })
    },
    methods: {
      titleClick(index){
        // console.log('接受了点击事件');
        this.$refs.scroll.gotoScroll(0,-this.themeTopYs[index],300)
      },
      imgLoad(){
        console.log('--');
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      contentScroll(position){
        // console.log(position);
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length;i ++){
          if((this.currentIndex !== i) && (i < length -1 && positionY > this.themeTopYs[i] &&positionY < this.themeTopYs[i+1])||
            (i === length - 1  && positionY > this.themeTopYs[i])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
          }
        }
      },
      addToCar(){
        // console.log("接受到了addCar");
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        /* 添加到购物车 */
        // this.$store.commit("addCart", product)
        this.$store.dispatch("addCart",product)
      }
    }
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