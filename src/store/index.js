import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user';
import map from './map';
import test from './test';
import status from './status';

//对外暴露一个Store类的实例
export default new Vuex.Store({
    modules: {
        user,
        map,
        test,
        status,
    }
})