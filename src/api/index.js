import requests from "./request";

/**
 * 登陆部分接口
 * @returns 
 */
//注册用户
export const RegisterAdmin = (adminInfo) => requests({ url: '', data: adminInfo, method: 'post' });
//鉴权是否为管理员
export const AuthIsAdmin = (userNum) => requests({ url: "", data: userNum, method: 'post' });
//登录
export const AdminLoginIn = (adminInfo) => requests({ url: '', data: adminInfo, method: 'post' });


