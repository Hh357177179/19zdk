import api from '../axios'

// 获取维保日志列表
export const maintainList = params => api.post('/admin/user/maintainList', params)