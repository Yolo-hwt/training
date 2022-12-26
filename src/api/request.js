import axios from "axios";
import nProgress from "nprogress";
// import store from "@/store";

//创建axios实例
const requests = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {
    console.log("请求拦截器", config);
    nProgress.start();
    return config;
})
//响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error(error))
})

export default requests;


