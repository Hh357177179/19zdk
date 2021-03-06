import api from '../axios'

// 钓场列表
export const fishList = params => api.post('/project/pondList', params);

// 钓场详情
export const fishDetail = params => api.post('/project/pondGet', params)

// 新增钓场
export const addFish = params => api.post('/project/pondAdd', params)

// 删除钓场
export const deleteFish = params => api.post('/project/pondDel', params)

// 更新钓场
export const uploadFish = params => api.post('/project/pondUpdate', params)

// 赛事管理列表
export const matchList = params => api.post('/project/matchList', params)

// 赛事详情
export const matchDetail = params => api.post('/project/matchGet', params)

// 删除赛事
export const matchDelete = params => api.post('/project/matchEnd', params)

// 人员名单
export const peopleList = params => api.post('/project/matchOrder', params)





// 鱼币

// 获取会员鱼币列表
export const getVipFish = params => api.post('/project/userCoinList', params)

// 更新鱼币
export const rushVipFish = params => api.post('/project/userCoinUpdate', params)

// 鱼币规则
export const getRuleFish = params => api.post('/project/coinInfoDetail', params)

// 更新鱼币规则
export const rushRuleFish = params => api.post('/project/coinInfoUpdate', params)

