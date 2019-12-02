import api from '../axios'

// 获取维保日志列表
export const maintainList = params => api.post('/admin/user/maintainListV2', params)

// 获取维保日期详情
export const detailLog = params => api.post('/admin/user/maintainListV2Detail', params)