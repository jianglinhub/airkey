/**
 * Created by yong.liu on 2017/4/29.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Resource from 'vue-resource';

Vue.use(VueRouter);

Vue.use(Resource);
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import keyControlApp from './modules/keyControlApp.vue';
import store from './modules/store/index';
import routes from './route';

const router = new VueRouter({
    mode: 'history',
    base: '/pages',
    routes: routes
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(keyControlApp)
});