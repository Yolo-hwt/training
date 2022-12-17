const state = {
    mapConfig: {
        //地图缩放级别
        mapZoomLevel: 20,
        //地图中心点
        mapCenterPoint: {
            longitude: 116.404,
            dimension: 39.9124,
        },
        mapHeaing: 0, //地图旋转角度
        mapTilt: 0, //地图斜角度
        //地图标点列表
        mapSignList: [
            {
                sid: 1,
                // longitude: 116.404,
                // dimension: 39.9152,
                longitude: 116.403,
                dimension: 39.9128,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 2,
                // longitude: 116.404,
                // dimension: 39.9148,
                longitude: 116.403,
                dimension: 39.9124,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 3,
                // longitude: 116.404,
                // dimension: 39.91442,
                longitude: 116.403,
                dimension: 39.91202,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 4,
                // longitude: 116.405,
                // dimension: 39.9153,
                longitude: 116.404,
                dimension: 39.9129,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 5,
                // longitude: 116.405,
                // dimension: 39.9148,
                longitude: 116.404,
                dimension: 39.9124,

                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },

            {
                sid: 6,
                // longitude: 116.405,
                // dimension: 39.91441,
                longitude: 116.404,
                dimension: 39.91201,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 7,
                // longitude: 116.4057,
                // dimension: 39.9148,
                longitude: 116.4047,
                dimension: 39.9124,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
            {
                sid: 8,
                // longitude: 116.4057,
                // dimension: 39.9144,
                longitude: 116.4047,
                dimension: 39.9120,
                opts: {
                    width: 250, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                },
            },
        ],
    }
};
const mutations = {

};
const actions = {
    //用户登录
    // async adminLogin({ commit }, adminInfo = {}) {
    //     let result = await AdminLoginIn(adminInfo);
    //     if (result.code == 200) {
    //         commit('ADMINLOGIN', result.data.userInfo);
    //         return 'ok';
    //     } else {
    //         return Promise.reject(new Error('failed'))
    //     }
    // },

};
const getters = {
    mapConfigGetter: (state) => state.mapConfig,
};
export default {
    state,
    mutations,
    actions,
    getters
}