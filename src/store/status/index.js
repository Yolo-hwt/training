import { GetAllEquipStatusList, GetEquipStatusListByIDAndDate, GetEquipTyepeNum } from '@/api'
const state = {
    allStatusRecordList: [
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "故障",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
        {
            recordId: 1,
            equipId: 1,
            deviceName: "设备1",
            checkPerson: "小王",
            checkDate: "2022-12-19",
            checkResult: "正常",
            explaination: "设备各项数据正常",
        },
    ],
    deviceTypeList: [
        { num: 1048, status: "空闲" },
        { num: 735, status: "作业中" },
        { num: 580, status: "维修中" },
    ],


};
const mutations = {
    // ADMINLOGIN(state, info) {
    //     state.userInfo = info;
    // },
    ALLSTATUSLIST(state, list) {
        state.allStatusRecordList = list;
    },
    DEVICETYPELIST(state, list) {
        state.deviceTypeList = list;
    }
};
const actions = {
    //获取所有设备的状态记录
    async getAllEquipStatusRecord({ commit }) {
        let result = await GetAllEquipStatusList();
        if (result.code == 200) {
            commit('ALLSTATUSLIST', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取指定时间段内设备的状态记录列表
    async getRecordsByEidAndDate({ commit }, statusobj = {}) {
        let result = await GetEquipStatusListByIDAndDate(statusobj);
        if (result.code == 200) {
            commit('ALLSTATUSLIST', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取设备状态分布数据
    async getEquipTypeData({ commit }) {
        let result = await GetEquipTyepeNum();
        if (result.code == 200) {
            commit('DEVICETYPELIST', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

};
const getters = {
    allStatusRecordListGetter: (state) => state.allStatusRecordList,
    deviceTypeListGetter: (state) => state.deviceTypeList,
};
export default {
    state,
    mutations,
    actions,
    getters
}