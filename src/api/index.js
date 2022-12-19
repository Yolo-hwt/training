import requests from "./request";

/**
 * 登陆部分接口
 * @returns 
 */
//注册用户
export const RegisterAdmin = (adminInfo) => requests({ url: "/register", data: adminInfo, method: 'post' });
//鉴权是否为管理员
export const AuthIsAdmin = (userNum) => requests({ url: "/judgeAdmin", data: userNum, method: 'post' });
//登录系统
export const AdminLoginIn = (adminInfo) => requests({ url: "/login", data: adminInfo, method: 'post' });

/**
 * 监测部分接口
 */
//获取所有设备信息
export const GetAllEquipInfo = () => requests({ url: "/getAllEquipInfo", method: "get" });
//根据id获取单个设备信息
export const GetEquipInfoById = (equipIdobj) => requests({ url: "/getEquipInfoById", data: equipIdobj, method: "post" });
//获取所有设备当前的位置信息
export const GetAllEquipSite = () => requests({ url: "/getAllEquipSite", method: "get" });
//根据id获取设备当前位置
export const GetEquipSiteById = (equipIdobj) => requests({ url: "/getEquipSiteById", data: equipIdobj, method: "post" });
//获取所有目的地信息
export const GetAllTargetPlaceInfo = () => requests({ url: "/getAllTargetPlaceInfo", method: "get" });
//添加设备作业记录到数据库
export const AddEquipWorkRecord = (workobj) => requests({ url: "/addEquipWorkRecord", data: workobj, method: "post" });
//获取各台设备总运行时长
export const GetDevsTotalWorkTime = () => requests({ url: "/getDevsTotalWorkTime", method: "get" });
//获取指定id设备的总运行时长
export const GetDevTotalWorkTimeById = (equipIdobj) => requests({ url: "/getDevTotalWorkTimeById", data: equipIdobj, method: "post" });

//trace
//历史轨迹查询
export const GetEquipTraceByIdAndTime = (equipIdobj) => requests({ url: "/getEquipTraceByIdAndTime", data: equipIdobj, method: "post" });

/**
 * 点检记录
 */
//获取所有设备点检记录
export const GetAllEquipCheckList = () => requests({ url: "/getAllEquipCheckList", method: "get" });
//获取指定设备的点检记录
export const GetEquipCheckListById = (equipIdobj) => requests({ url: "/getEquipCheckListById", data: equipIdobj, method: "post" });
//获取指定设备指定日期（哪一天）的点检记录
export const GetEquipCheckListByIdAndDate = (recordobj) => requests({ url: "/getEquipCheckListByIdAndDate", data: recordobj, method: "post" });

//上报设备故障，在数据库中插入点检记录，状态变更记录，更改设备当前状态
export const SendEquipErrorById = (recordobj) => requests({ url: "/sendEquipErrorById", data: recordobj, method: "post" });
//插入一条点检记录
export const SendEquipCheckRecord = (recordobj) => requests({ url: "/sendEquipCheckRecord", data: recordobj, method: "post" });

/**
 * 状态管理
 */
//获取指定设备的状态记录列表
export const GetEquipStatusListByID = (equipIdobj) => requests({ url: "/getEquipStatusListByID", data: equipIdobj, method: "post" });
//获取指定时间段内设备的状态记录列表（状态变更可能非常频繁，不适用较模糊的某一天）
export const GetEquipStatusListByIDAndDate = (statusobj) => requests({ url: "/getEquipStatusListByIDAndDate", data: statusobj, method: "post" });
//获取所有设备的状态记录列表
export const GetAllEquipStatusList = () => requests({ url: "/getAllEquipStatusList", method: "get" });
//获取各种状态下设备的数量
export const GetEquipTyepeNum = () => requests({ url: "/getEquipTyepeNum", method: "get" });
