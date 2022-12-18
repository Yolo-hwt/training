import {
    GetAllEquipInfo,
    GetEquipInfoById,
    GetAllTargetPlaceInfo,
    AddEquipWorkRecord,
    GetEquipTraceByIdAndTime,
    GetDevsTotalWorkTime,
} from "@/api"
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
    },
    equipOptions: [
        {
            equipId: 1,
            deviceName: "墨子一号",
            location: 1,
            date: "2022.12.17",
            totalWOrkTime: "116",
            status: "空闲",
        },
        {
            equipId: 2,
            deviceName: "墨子二号",
            location: 2,
            date: "2022.12.17",
            totalWOrkTime: "100",
            status: "作业中",
        },
        {
            equipId: 3,
            deviceName: "墨子三号",
            location: 3,
            date: "2022.12.17",
            totalWOrkTime: "200",
            status: "维修中",
        },
        {
            equipId: 4,
            deviceName: "墨子四号",
            location: 4,
            date: "2022.12.17",
            totalWOrkTime: "150",
            status: "空闲",
        },
        {
            equipId: 5,
            deviceName: "墨子五号",
            location: 5,
            date: "2022.12.17",
            totalWOrkTime: "100",
            status: "空闲",
        },
    ],
};
const mutations = {
    ALLEQUIPINFO(state, infos) {
        state.equipOptions = infos;
    },
    EQUIPINFO(state, info) {
        for (const { equip, index } of state.equipOptions) {
            if (equip.equipId === info.equipId) {
                state.equipOptions[index] = info;
                break;
            }
        }
    },
    ALLTARGETINFO(state, info) {
        state.mapConfig.mapSignList = info;
    }
};
const actions = {
    //获取所有设备信息
    async getAllEuipInfo({ commit }) {
        let result = await GetAllEquipInfo();
        if (result.code == 200) {
            commit('ALLEQUIPINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //根据id获取单个设备信息
    async getEquipInfoById({ commit }, equipIdobj = {}) {
        let result = await GetEquipInfoById(equipIdobj);
        if (result.code == 200) {
            commit('EQUIPINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取所有目的地信息
    async getAllTargetInfo({ commit }) {
        let result = await GetAllTargetPlaceInfo();
        if (result.code == 200) {
            commit('ALLTARGETINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //添加一条作业记录
    async addEquipWorkRecord({ commit }, workinfo = {}) {
        let result = await AddEquipWorkRecord(workinfo);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //根据设备id和日期获取历史轨迹
    async getTraceByEidAndDate({ commit }, equipInfo = {}) {
        let res = await GetEquipTraceByIdAndTime(equipInfo);
        if (res.code == 200) {
            return res.data;
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取设备工时
    async getAllDeviceWorkTIme({ commit }) {
        let res = await GetDevsTotalWorkTime();
        if (res.code == 200) {
            return res.data;
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
};
const getters = {
    mapConfigGetter: (state) => state.mapConfig,
    mapSignListGetter: (state) => state.mapConfig.mapSignList,
    equipOptionsGetter: (state) => state.equipOptions,
};
export default {
    state,
    mutations,
    actions,
    getters
}