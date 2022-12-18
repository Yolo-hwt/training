import {
    SendEquipErrorById,
} from "@/api"
const state = {

};
const mutations = {

    // ALLTARGETINFO(state, info) {
    //     state.mapConfig.mapSignList = info;
    // }
};
const actions = {
    // //添加一条作业记录
    async sendDeviceError({ commit }, errorinfo = {}) {
        let result = await SendEquipErrorById(errorinfo);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}