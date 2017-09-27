import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const CheckOut = (resolve) => {
  import('components/checkout/checkout').then((module) => {
    resolve(module)
  })
}

const KeyControl = (resolve) => {
  import('components/key-control/key-control').then((module) => {
    resolve(module)
  })
}

const LoseEfficacy = (resolve) => {
  import('components/lose-efficacy/lose-efficacy').then((module) => {
    resolve(module)
  })
}

export default new Router({
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