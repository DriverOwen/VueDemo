import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import VueLazyLoad  from 'vue-lazyload'
import Toast from '@/components/common/Toast'

/* 使用封装toast */
Vue.use(Toast)
/* 图片懒加载 */
Vue.use(VueLazyLoad,{
  loading: require("@/assets/img/common/placeholder.png")
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
