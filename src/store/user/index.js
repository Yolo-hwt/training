import { AdminLoginIn, RegisterAdmin } from '@/api'
const state = {
    userInfo: {},
};
const mutations = {
    ADMINLOGIN(state, info) {
        state.userInfo = info;
    },
    ADMINREGISTER() {
    }
};
const actions = {
    //用户登录
    async adminLogin({ commit }, adminInfo = {}) {
        let result = await AdminLoginIn(adminInfo);
        if (result.code == 200) {
            commit('ADMINLOGIN', result.data.userInfo);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //用户注册
    async adminRegister({ commit }, adminInfo = {}) {
        let result = await RegisterAdmin(adminInfo);
        if (result.code == 200) {
            commit('ADMINREGISTER');
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
};
const getters = {
    userInfoGetter: (state) => state.userInfo,
};
export default {
    state,
    mutations,
    actions,
    getters
}