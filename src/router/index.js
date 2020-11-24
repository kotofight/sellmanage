import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import { local } from '../utils/local.js'

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

const router = new VueRouter({
  routes
})
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const asyarr = {
  path: '/home',
  name: 'Home',
  visible: true,
  component: Home,
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      meta: { name: '后台首页', icon: 'icon-shouye' },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Dashboard/Index.vue')
    },
    {
      path: '/order',
      visible: true,
      meta: { name: '订单管理', role: ['super', 'normal'], icon: 'icon-icon-' },
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Order/Index.vue'),
      redirect: '/order/list',
      children: [
        {
          path: '/order/list',
          meta: { name: '订单列表' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Order/OrderList.vue'
            )
        },
        {
          path: '/order/edit/:id',
          meta: { name: '订单修改', role: ['super'] },
          visible: false,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Order/OrderEdit.vue'
            )
        }
      ]
    },
    {
      path: '/shop',
      meta: { name: '店铺管理', role: ['super'], icon: 'icon-dianpu' },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Shop/Index.vue')
    },
    {
      path: '/pro',
      meta: { name: '商品管理', icon: 'icon-shangpin' },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Product/Index.vue'),
      redirect: '/pro/list',
      children: [
        {
          path: '/pro/list',
          meta: { name: '商品列表' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Product/ProList.vue'
            )
        },
        {
          path: '/pro/add',
          meta: { name: '商品添加' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Product/ProAdd.vue'
            )
        },
        {
          path: '/pro/cate',
          meta: { name: '商品分类' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Product/ProCate.vue'
            )
        },
        {
          path: '/pro/edit/:id',
          meta: { name: '商品编辑', role: ['super'] },
          visible: false,
          name: 'proedit',
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Product/ProEdit.vue'
            )
        }
      ]
    },
    {
      path: '/account',
      meta: {
        name: '账号管理',
        role: ['super', 'normal'],
        icon: 'icon-zhanghao'
      },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Account/Index.vue'),
      redirect: '/account/list',
      children: [
        {
          path: '/account/list',
          meta: { name: '账号列表', role: ['super'] },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Account/AccountList.vue'
            )
        },
        {
          path: '/account/add',
          meta: { name: '添加账号', role: ['super'] },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Account/AccountAdd.vue'
            )
        },
        {
          path: '/account/reset',
          meta: { name: '修改密码' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Account/ResetPwd.vue'
            )
        },
        {
          path: '/account/personal',
          meta: { name: '个人中心' },
          visible: false,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/Account/Personal.vue'
            )
        }
      ]
    },
    {
      path: '/sellcount',
      meta: { name: '销售统计', role: ['super'], icon: 'icon-tongji' },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/SellCount/Index.vue'),
      redirect: '/sellcount/goods',
      children: [
        {
          path: '/sellcount/order',
          meta: { name: '订单统计' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/SellCount/OrdersCount.vue'
            )
        },
        {
          path: '/sellcount/goods',
          meta: { name: '商品统计' },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ '../views/SellCount/GoodsCount.vue'
            )
        }
      ]
    }
  ]
}
console.log(asyarr)
createRoute()

export function createRoute() {
  const role = local.get('role')
  if (!role) return
  const finalRouter = calcRouter(asyarr.children, role)
  // console.log(finalRouter)
  asyarr.children = finalRouter
  router.addRoutes([asyarr])

  const menu = calcMenu(finalRouter)
  console.log(menu)
  local.set('menu', JSON.stringify(menu))
}

function calcMenu(c) {
  return c.filter(item => {
    if (item.visible) {
      if (item.children && item.children.length > 0) {
        item.children = calcMenu(item.children)
      }
      return true
    } else {
      return false
    }
  })
}

function calcRouter(c, role) {
  return c.filter(item => {
    if (hasPromission(item, role)) {
      if (item.children && item.children.length > 0) {
        item.children = calcRouter(item.children, role)
      }
      return true
    } else {
      return false
    }
  })
}

function hasPromission(i, role) {
  if (i.meta && i.meta.role) {
    return i.meta.role.includes(role)
  } else {
    return true
  }
}

router.beforeEach((to, from, next) => {
  const token = local.get('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
