/**
 * Created by yong.liu on 2017/4/29.
 */
import Vue from 'vue'

import App from './modules/App'
import store from './modules/store/index'
import router from './modules/router'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

router.beforeEach((to, from, next) => {
  if (store.state.vin == '') {
    if (to.path == '/checkout' || to.path == '/lose-efficacy') {
      next()
    } else {
      next({path: '/checkout'})
    }
  } else {
    if (to.path == '/checkout' || to.path == '/lose-efficacy') {
      next({path: '/key-control'})
    } else {
      next()
    }
  }
})


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})