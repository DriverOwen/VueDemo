import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Me = () => import('views/me/Me')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/me',
    component:Me
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router