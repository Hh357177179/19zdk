import api from '../axios'

// 会员中心列表
export const userList = params => api.post('/project/userList', params);

// 获取用户详情
export const userGet = params => api.post('/project/userGet', params)

// 用户银行卡信息
export const userBank = params => api.post('/project/userBank', params)

// 更新用户信息
export const userUpdate = params => api.post('/project/userUpdate', params)