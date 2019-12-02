import api from './axios'

// 登录
export const Login = params => api.post('/admin/user/login', params);

// 获取报名列表
export const getOrderList = params => api.post('/admin/user/orderList', params)

// 查看报名详情
export const searchOrder = params => api.post('/admin/user/orderDetail', params)

// 获取系统配置
export const getSystem = params => api.post('/admin/user/getConfig', params)

// 保存系统配置
export const saveSystem = params => api.post('/admin/user/setConfig', params)

// 修改密码
export const editPsw = params => api.post('/admin/user/passwordUpdate', params)