import api from '../axios'

// 登录
export const Login = params => api.post('/user/login', params);

// 管理员列表
export const adminList = params => api.post('/user/index', params);

// 账号禁用-解除
export const forBidden = params => api.post('/user/handle', params);

// 获取用户组列表
export const getGroup = params => api.post('/user/authList', params)

// 获取所有节点列表
export const getNodeList = params => api.post('/user/nodeList', params)

// 添加节点
export const addNodes = params => api.post('/user/nodeAdd', params)

// 删除节点
export const deleteNodes = params => api.post('/user/nodeDel', params)

// 添加用户组
export const addGroups = params => api.post('/user/authAdd', params)

// 删除用户组
export const deleteGroups = params => api.post('/user/authDel', params)

// 查看用户组下节点
export const authNodes = params => api.post('/user/authNodes', params)

// 删除用户组下节点
export const authDelNode = params => api.post('/user/authDelNode', params)

// 添加用户组下节点
export const authAddNode = params => api.post('/user/authAddNode', params)

// 添加管理员
export const addAdmin = params => api.post('/user/add', params)

// 编辑管理员
export const editAdmin = params => api.post('/user/edit', params)


// 修改密码
export const editPsw = params => api.post('/user/passwordUpdate', params)

// 获取系统设置
export const getSystem = params => api.post('/user/getConfig', params)

// 更新系统设置
export const setSystem = params => api.post('/user/setConfig', params)