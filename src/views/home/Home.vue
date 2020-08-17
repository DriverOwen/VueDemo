<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-upload="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper  :cbanners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <Feature></Feature>
      <tab-control  :titles="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <backtop @click.native="backTopClick" v-show="isShowBacktop"></backtop>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import Feature from "@/views/home/childComps/Feature";
  import TabControl from "@/components/content/tabControl/tabControl";
  import GoodList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import Backtop from "@/components/content/backtop/Backtop";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";
  import {debounce} from "@/common/utils";

  export default {
    name: "Home",
    components:{
      Backtop,
      Scroll,
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
        currentType: 'pop',
        isShowBacktop: false,
        tabOffsetTop: 0,
        isTabFixed: false
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
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
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
          this.$refs.scroll.finishPullUp();
        })
      },
      backTopClick(){
        this.$refs.scroll.gotoScroll(0,0,500);
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBacktop = (-position.y) > 1000;
        /* tabControl 吸顶效果 */
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad(){
        /* 获取tabScrollTop */
        // console.log();
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,500);
      /* 监听item中图片加载完成 */
      this.$bus.$on("itemImageLoad",()=> {
        // this.$refs.scroll.refresh();
        refresh();

      })
    }
}
</script>

<style scoped>
  #home{

    height: 100vh;
    position: relative;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;
    width: 100%;
    position: relative;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    z-index: 9;
  }

  .content{
    /*height: calc(100% - 49px);*/
    /*margin-top: 44px;*/
    /* 使内容自动撑大 用calc计算 或者 定位   */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*.fixed {*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  left: 0;*/
  /*}*/
</style>
