import api from '../axios'

// 获取组织架构列表
export const groupList = params => api.post('/admin/user/groupList', params);

// 添加组织
export const addGroups = params => api.post('/admin/user/groupAdd', params)

// 删除组织
export const deleteGroups = params => api.post('/admin/user/groupDel', params)

// 编辑组织
export const editGroups = params => api.post('/admin/user/groupEdit', params)

// 获取角色列表
export const getUserList = params => api.post('/admin/user/userList', params)

// 添加角色
export const addPersonal = params => api.post('/admin/user/userAdd', params)

// 删除角色
export const deletePerson = params => api.post('/admin/user/userDel', params)

// 查看人员详情
export const searchPerson = params => api.post('/admin/user/userDetail', params)

// 更新用户基本信息
export const updataUser = params => api.post('/admin/user/userBaseUpdate', params)

// 更新维保人员信息
export const updataMaintenance = params => api.post('/admin/user/userMaintainUpdate', params)

// 更改安全员信息
export const updataSafety = params => api.post('/admin/user/userManageUpdate', params)

// 公告列表
export const bulletin = params => api.post('/admin/user/publishList', params)

// 获取单位列表
export const unitList = params => api.post('/admin/user/getBaseUnit', params)

// 发布公告
export const sendNotices = params => api.post('/admin/user/publishNotice', params)

// 获取我负责的
export const getMyElevatorList = params => api.post('/admin/user/myElevatorList', params)

// 刷新人脸
export const rushFeace = params => api.post('/admin/user/clearFaceInfo', params)