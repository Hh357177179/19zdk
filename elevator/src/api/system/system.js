import api from '../axios'

// 获取维保日志列表
export const getConfig = params => api.post('/admin/user/getConfig', params)

// 获取维保日期详情
export const setConfig = params => api.post('/admin/user/setConfig', params)