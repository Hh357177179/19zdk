import api from '../axios'

export const getHomeList = params => api.post('/admin/user/main', params)