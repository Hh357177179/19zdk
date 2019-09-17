import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取当前用户权限列表
export function getInfo(data) {
  return request({
    url: '/nodeList',
    method: 'post',
    data
  })
}

// 获取管理员列表
export function getStaff(data) {
  return request({
    url: '/index',
    method: 'post',
    data
  })
}

// 管理员禁用-解禁
export function handleForbidden(data) {
  return request({
    url: '/handle',
    method: 'post',
    data
  })
}

// 获取用户组
export function getGroup(data) {
  return request({
    url: '/authList',
    method: 'post',
    data
  })
}

// 添加用户组
export function addGroup(data) {
  return request({
    url: '/authAdd',
    method: 'post',
    data
  })
}

// 删除用户组
export function deleteGroup (data) {
  return request({
    url: '/authDel',
    method: 'post',
    data
  })
}

// 删除节点
export function deleteNode(data) {
  return request({
    url: '/nodeDel',
    method: 'post',
    data
  })
}

// 添加节点
export function addNode (data) {
  return request({
    url: '/nodeAdd',
    method: 'post',
    data
  })
}

// 用户组下节点列表
export function authNodes(data) {
  return request({
    url: '/authNodes',
    method: 'post',
    data
  })
}

// 用户组增加一个节点
export function authAddNode(data) {
  return request({
    url: '/authAddNode',
    method: 'post',
    data
  })
}

// 用户组删除一个节点
export function authDelNode(data) {
  return request({
    url: '/authDelNode',
    method: 'post',
    data
  })
}

// 添加管理员
export function addAdmin(data) {
  return request({
    url: '/add',
    method: 'post',
    data
  })
}


export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
