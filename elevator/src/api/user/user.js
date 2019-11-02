import api from '../axios'

// 登录
export const Login = params => api.post('/admin/user/login', params);

// 获取用户信息
export const getInfo = params => api.post('/admin/user/getInfo', params)