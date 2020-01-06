import api from '../axios'

  export const useUnitInfo =  params => api.post('/admin/user/useInfoComplete', params)

  export const weibaoUnitInfo = params => api.post('/admin/user/maintainInfoComplete', params)