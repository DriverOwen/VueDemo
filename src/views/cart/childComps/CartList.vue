<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <!-- 循环部分 -->
      <div :key="index" class="shop-item" v-for="(item, index) in cartList">
        <div class="item-selector">
          <check-box :title="item.title" :is-active="item.checked" @click.native="checkClick(index)"></check-box>
        </div>
        <div class="item-img">
          <img :src="item.image" alt="商品图片" />
        </div>
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-desc">商品描述: {{ item.desc }}</div>
          <div class="info-bottom">
            <div class="item-price left">¥{{ item.price }}</div>
            <div class="item-count right">x{{ item.count }}</div>
          </div>
        </div>
      </div>
    </scroll>

    <!-- 底部订单栏 -->
    <div class="cart-bottom-bar">
      <div class="cart-bottom-check">
        <check-box :is-active="checkedAll" @click.native="handleCheckedAll" >
          全选
        </check-box>
      </div>
      <div class="cart-bottom-price">
        合计：
        <span>¥ {{ totalPrice }}</span>
        元
      </div>
      <div class="cart-bottom-btn">
        <button >提交订单({{ checkedLength }})</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import { mapGetters } from "vuex";
  import CheckBox from "@/components/content/checkBox/CheckBox";
  export default {
    name: "CartList",
    components: {CheckBox, Scroll },
    data() {
      return {
        checkedAll: false
      };
    },
    computed: {
      ...mapGetters(["cartList", "getCartlength"]),
      // 购物车总价
      totalPrice() {
        return this.cartList
          .filter(item => item.checked)
          .reduce((prev, item) => prev + item.price * item.count, 0)
          .toFixed(2);
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length;
      },
    },
    methods: {
      // 全选
      handleCheckedAll() {
        if(this.getCartlength > 0){
          if(this.checkedAll){
            this.cartList.forEach(item => (item.checked = false));
            this.checkedAll =  !this.checkedAll
          }else{
            this.cartList.forEach(item => (item.checked = true));
            this.checkedAll =  !this.checkedAll
          }
        }
      },
      // 单选
      checkClick(index){
        this.cartList[index].checked = ! this.cartList[index].checked
        let result = this.cartList.filter(item => item.checked);
        this.checkedAll = result.length > 0 && result.length === this.cartList.length ? true : false;
      }

    },
    created() {
      // 每次刷新页面获取本地存储购物车数据
      // let list = JSON.parse(localStorage.getItem("cartList")) || [];
      // if (list) {
      //   this.setCartList(list);
      // }
    },
    mounted() {
      // 刷新better-scroll
      this.$refs.scroll.refresh();
    }
  };
</script>

<style scoped>
  .cart-list {
    width: 100%;
    height: 100%;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 99px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }

  .shop-item {
    font-size: 0;
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #cccccc;
  }

  .shop-item:last-child {
    border-bottom: 0;
  }

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 17px;
    position: relative;
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .item-info .item-desc {
    font-size: 14px;
    margin-top: 15px;
    color: #666666;
  }

  .info-bottom {
    position: absolute;
    right: 10px;
    bottom: 10px;
    left: 10px;
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: #ff4500;
  }

  .cart-bottom-bar {
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
  }

  .cart-bottom-price {
    margin-left: 50px;
  }

  .cart-bottom-price span {
    color: red;
  }

  .cart-bottom-btn button {
    line-height: 50px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    height: 50px;
    padding: 0 15px;
    color: white;
    border: 0;
    outline: none;
    background: linear-gradient(to right, #ff6034, #ee0a24);
  }

  .cart-bottom-btn button:active {
    opacity: 0.8;
  }
</style>
