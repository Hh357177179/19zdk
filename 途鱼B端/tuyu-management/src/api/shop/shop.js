import api from '../axios'

// 商品分类列表
export const shopList = params => api.post('/project/cateList', params);

// 删除分类
export const deleteList = params => api.post('/project/cateDel', params)

// 新增分类
export const addClass = params => api.post('/project/cateAdd', params)

// 编辑分类
export const editCLass = params => api.post('/project/cateUpdate', params)

// 商品管理列表
export const commodityList = params => api.post('/project/goodsList', params)