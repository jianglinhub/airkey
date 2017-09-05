/**
 * Created by sky on 2017/5/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import config from './modules/config';
import window from './modules/window';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        config,
        window
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});