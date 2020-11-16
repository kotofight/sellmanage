import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Dashboard/Index.vue')
      },
      {
        path: '/order',
        meta: { name: '订单管理' },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Order/Index.vue')
      },
      {
        path: '/shop',
        meta: { name: '店铺管理' },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Shop/Index.vue')
      },
      {
        path: '/pro',
        meta: { name: '商品管理' },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Product/Index.vue'),
        redirect: '/pro/list',
        children: [
          {
            path: '/pro/list',
            meta: { name: '商品列表' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Product/ProList.vue'
              )
          },
          {
            path: '/pro/add',
            meta: { name: '商品添加' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Product/ProAdd.vue'
              )
          },
          {
            path: '/pro/cate',
            meta: { name: '商品分类' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Product/ProCate.vue'
              )
          }
        ]
      },
      {
        path: '/account',
        meta: { name: '账号管理' },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Account/Index.vue'),
        redirect: '/account/list',
        children: [
          {
            path: '/account/list',
            meta: { name: '账号列表' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Account/AccountList.vue'
              )
          },
          {
            path: '/account/add',
            meta: { name: '添加账号' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Account/AccountAdd.vue'
              )
          },
          {
            path: '/account/reset',
            meta: { name: '修改密码' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/Account/ResetPwd.vue'
              )
          }
        ]
      },
      {
        path: '/sellcount',
        meta: { name: '销售统计' },
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../views/SellCount/Index.vue'
          ),
        redirect: '/sellcount/goods',
        children: [
          {
            path: '/sellcount/order',
            meta: { name: '订单统计' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/SellCount/OrdersCount.vue'
              )
          },
          {
            path: '/sellcount/goods',
            meta: { name: '商品统计' },
            component: () =>
              import(
                /* webpackChunkName: "login" */ '../views/SellCount/GoodsCount.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/error'
  },
  {
    path: '/error',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Error.vue')
  }
]
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const router = new VueRouter({
  routes
})

export default router
