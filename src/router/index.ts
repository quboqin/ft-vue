import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { getUser } from '@/utils/aws-auth'

import Home from '#/Home.vue'
import Profile from '#/Profile.vue'
import Sign from '#/Sign.vue'
import OrderList from '#/OrderList.vue'
import Cart from '#/Cart.vue'
import Checkout from '#/Checkout.vue'
import AddressList from '#/AddressList.vue'
import AddressDetail from '#/AddressDetail.vue'
import CreditCardList from '#/CreditCardList.vue'
import CreditCardDetail from '#/CreditCardDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: OrderList,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/address-list',
    name: 'AddressList',
    component: AddressList,
    meta: { requiresAuth: true },
  },
  {
    path: '/address-detail',
    name: 'AddressDetail',
    component: AddressDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/credit-card-list',
    name: 'CreditCardList',
    component: CreditCardList,
    meta: { requiresAuth: true },
  },
  {
    path: '/credit-card-detail',
    name: 'CreditCardDetail',
    component: CreditCardDetail,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = await getUser()
  if (!user && to.matched.some((record) => record.meta.requiresAuth)) {
    return next({
      name: 'Sign',
    })
  }
  return next()
})

export default router
