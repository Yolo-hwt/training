import { AdminLoginIn, RegisterAdmin } from '@/api'
const state = {
    userInfo: {},
    checkPersonList: [{
        uid: 1,
        name: "冯栩澎"
    },
    {
        uid: 2,
        name: "周航"
    }, {
        uid: 3,
        name: "黄文涛"
    }, {
        uid: 4,
        name: "田昌陇"
    }, {
        uid: 5,
        name: "王泽仁"
    }, {
        uid: 6,
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
        // console.log('login result', result);
        // if (result.code == 200) {
        commit('ADMINLOGIN', result);
        return result;
        // } else {
        //     return Promise.reject(new Error('failed'))
        // }
    },
    //用户注册
    async adminRegister({ commit }, adminInfo = {}) {
        // console.log("adminInfo:", adminInfo);
        let result = await RegisterAdmin(adminInfo);

        // if (result.code == 200) {
        commit('ADMINREGISTER');
        return 'ok';
        // } else {
        //     return Promise.reject(new Error('failed'))
        // }
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