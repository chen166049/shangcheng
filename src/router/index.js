import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/shopping',
    children: [
      {
        path: '/shopping',//首页
        name: 'Shopping',
        component: () => import('../views/Shopping.vue')
      },
      {
        path: '/classification', //商品分类
        name: 'classification',
        component: () => import('../views/Classification.vue')
      },
      {
        path: '/shopcar', //购物车
        name: 'shopcar',
        component: () => import('../views/Shopcar.vue')
      },
      {
        path: '/my', //我的
        name: 'my',
        component: () => import('../views/My.vue')
      },
    ]
  },
  {
    path: '/login',//登录注册
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/details', //商品详情
    name: 'details',
    component: () => import('../views/Details.vue')
  },
  {
    path: '/personal', //个人资料
    name: 'personal',
    component: () => import('../views/Personal.vue')
  },
  {
    path: '/settlement', //订单结算
    name: 'settlement',
    component: () => import('../views/Settlement.vue')
  },
  {
    path: '/address', //地址列表
    name: 'address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/addressedit', //编辑地址
    name: 'addressEdit',
    component: () => import('../views/AddressEdit.vue')
  },
  {
    path: '/myorder', //全部订单
    name: 'myorder',
    component: () => import('../views/Myorder.vue')
  },
  {
    path: '/evaluate', //评价中心
    name: 'evaluate',
    component: () => import('../views/Evaluate.vue')
  },
  {
    path: '/evaluates', //商品评价
    name: 'evaluates',
    component: () => import('../views/Evaluates.vue')
  },
  {
    path: '/evaluated', //评价详情 
    name: 'evaluated',
    component: () => import('../views/Evaluated.vue')
  },
  {
    path: '/collection', //我的收藏 
    name: 'collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/browse', //浏览历史 
    name: 'browse',
    component: () => import('../views/Browse.vue')
  },
  {
    path: '/location', //浏览历史 
    name: 'location',
    component: () => import('../views/Location.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
