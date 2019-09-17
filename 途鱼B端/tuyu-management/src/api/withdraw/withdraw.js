import api from '../axios'

// 提现列表
export const withList = params => api.post('/project/withdrawList', params);

// 处理提现
export const handleWithdraw = params => api.post('/project/withdraw', params);