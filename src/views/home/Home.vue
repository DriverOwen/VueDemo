<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :cbanners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <Feature></Feature>
    <tab-control :titles="['a','b','c']" class="tab-control"></tab-control>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import Feature from "@/views/home/childComps/Feature";
  import TabControl from "@/components/content/tabControl/tabControl";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";




  export default {
    name: "Home",
    components:{
      TabControl,
      Feature,
      RecommendView,
      HomeSwiper,
      NavBar
    },
    data() {
      return {
        banners:[],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'news': {page: 0,list: []},
          'sell': {page: 0,list: []}
        }
      }
    },
    computed: {

    },
    created() {
      // 1. 请求多个数据
      getHomeMultidata().then(data => {
        console.log(data);
        this.banners = data.data.banner.list;
        this.recommends = data.data.recommend.list;
      })

      // 2. 求情商品数据
      getHomeGoods('pop',1).then(res => {
        console.log(res);
      })
    },
    methods: {}
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100%;
    position: relative;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{

    position: sticky;
    position: -webkit-sticky;
    top:44px;
    z-index: 99;
  }
</style>
