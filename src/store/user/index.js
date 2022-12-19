import { AdminLoginIn, RegisterAdmin } from '@/api'
const state = {
    userInfo: {},
    checkPersonList: [{
        udi: 1,
        name: "冯栩澎"
    },
    {
        udi: 2,
        name: "周航"
    }, {
        udi: 3,
        name: "黄文涛"
    }, {
        udi: 4,
        name: "田昌陇"
    }, {
        udi: 5,
        name: "王泽仁"
    }, {
        udi: 6,
        name: "吴佳明"
    }]
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
    checkPersonListGetter: (state) => state.checkPersonList,
};
export default {
    state,
    mutations,
    actions,
    getters
}