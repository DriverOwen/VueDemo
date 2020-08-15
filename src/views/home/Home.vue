<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :cbanners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <Feature></Feature>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <good-list :goods="showGoods"></good-list>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import Feature from "@/views/home/childComps/Feature";
  import TabControl from "@/components/content/tabControl/tabControl";
  import GoodList from "@/components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";





  export default {
    name: "Home",
    components:{
      GoodList,
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
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据

     this.getHomeMultidata();

      // 2. 求情商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('sell');
      this.getHomeGoods('new');
    },
    methods: {
      /* 事件监听方法 */
      tabClick(index){
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
        }
      },
      /* 网络请求方法 */
      getHomeMultidata(){
        getHomeMultidata().then(data => {
          console.log(data);
          this.banners = data.data.banner.list;
          this.recommends = data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      }
    }
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
    right: 0;
    z-index: 9;
  }

</style>
