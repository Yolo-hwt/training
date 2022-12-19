import {
    SendEquipErrorById,
    GetAllEquipCheckList,
    SendEquipCheckRecord,
    GetEquipCheckListByIdAndDate
} from "@/api"
//伪造test模块echarts数据
function fakeChartData() {
    const baseYear = 2022;
    const baseMonth = 12;
    const baseDay = 10;
    let base = +new Date(baseYear, baseMonth, baseDay, 0, 0, 0);
    let oneDay = 24 * 3600 * 1000;//ms
    let data = [[base, Math.round(Math.random() * 20)]];

    for (let i = 0; i < 10; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round(Math.random() * 20)]);
    }
    return data;
}
const state = {
    testRecordList: [
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
    testTimeData: fakeChartData(),
};
const mutations = {

    // ALLTARGETINFO(state, info) {
    //     state.mapConfig.mapSignList = info;
    // }
    //所有test记录
    ALLTESTRECORD(state, records) {
        state.testRecordList = records;
    },
    //点检记录插入state
    ADDTESTRECORD(state, record) {
        record.recordId = state.testRecordList.length;
        state.testRecordList.unshift(record);
    }
};
const actions = {
    //上报设备错误
    async sendDeviceError({ commit }, errorinfo = {}) {
        let result = await SendEquipErrorById(errorinfo);
        if (result.code == 200 && result.data == true) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //添加一条点检记录
    async addEquipCheckRecord({ commit }, workobj = {}) {
        //点检记录插入state
        commit('ADDTESTRECORD', workobj);
        let result = await SendEquipCheckRecord(workobj);
        if (result.code == 200 && result.data == true) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取所有点检记录
    async getAllCheckList({ commit }) {
        let result = await GetAllEquipCheckList();
        if (result.code == 200) {
            commit('ALLTESTRECORD', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //根据设备和日期获取点检记录
    async getRecordsByEidAndDate({ commit }, infoObj = {}) {
        let result = await GetEquipCheckListByIdAndDate(infoObj);
        if (result.code == 200) {
            commit('ALLTESTRECORD', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取设备点检频率
    //...

};
const getters = {
    testRecordListGetter: (state) => state.testRecordList,
    testTimeDataGetter: (state) => state.testTimeData,
};

export default {
    state,
    mutations,
    actions,
    getters
}