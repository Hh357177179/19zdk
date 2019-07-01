import Ax from './axios';

// 获取日历赛程
export const getCalenderList = params => Ax.post('/user/trainList', params)

// 新增赛程
export const addCalender = params => Ax.post('/user/trainAdd', params)

// 比赛列表
export const gameList = params => Ax.post('/user/matchList', params)

// 比赛详情
export const gameDetail = params => Ax.post('/user/matchDetail', params)

// 获取用户信息
export const getUserInfo = params => Ax.post('/user/getInfo', params)

// 更新用户信息
export const upDateUser = params => Ax.post('/user/updateInfo', params)

// 我的训练计划
export const planList = params => Ax.post('/user/myTrain', params)

// 我的报名记录
export const applyList = params => Ax.post('/user/myOrder', params)

// 创建订单
export const creatOrder = params => Ax.post('/user/orderCreate', params)

// 订单支付
export const orderPay = params => Ax.post('/user/orderPay', params)