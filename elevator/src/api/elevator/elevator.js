import api from '../axios'

// 获取电梯列表
export const getElevatorList = params => api.post('/admin/user/elevatorList', params)

// 创建电梯
export const createdElevator = params => api.post('/admin/user/elevatorAdd', params)

// 更新电梯经纬度
export const updataLonLat = params => api.post('/admin/user/elevatorLocationUpdate', params)

// 获取电梯详情
export const getDetails = params => api.post('/admin/user/elevatorDetail', params)


export const deleteElevator = params => api.post('/admin/user/elevatorDel', params)

// 编辑电梯
export const editElevator = params => api.post('/admin/user/elevatorEdit', params)


// 获取维保单位
export const getMaintenance = params => api.post('/admin/user/getMaintainUnit', params)