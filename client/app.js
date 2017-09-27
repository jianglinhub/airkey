/**
 * Created by yong.liu on 2017/4/29.
 */
import Vue from 'vue'

import App from './modules/App'
import store from './modules/store/index'
import router from './modules/router'
import 'common/stylus/index.styl'

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})