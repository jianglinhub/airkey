import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const CheckOut = () => import('components/checkout/checkout')

const KeyControl = () => import('components/key-control/key-control')

const LoseEfficacy = () => import('components/lose-efficacy/lose-efficacy')

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/checkout'
    },
    {
      path: '/checkout',
      component: CheckOut
    },
    {
      path: '/key-control',
      component: KeyControl
    },
    {
      path: '/lose-efficacy',
      component: LoseEfficacy
    }
  ]
})

export default router