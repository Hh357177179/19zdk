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

// 下架商品
export const downShop = params => api.post('/project/goodsForbid', params)

// 上架商品
export const upShop = params => api.post('/project/goodsResume', params)

// 删除商品
export const deleteShop = params => api.post('/project/goodsDel', params)

// 查看商品
export const searchShop = params => api.post('/project/goodsGet', params)

// 添加商品
export const goodsAdd = params => api.post('/project/goodsAdd', params)

// 商品更新
export const goodsUpdate = params => api.post('/project/goodsUpdate', params)


// 订单管理

// 获取订单列表
export const getOrderList = params => api.post('/project/orderList', params)

// 发货修改订单信息
export const sendOrEdit = params => api.post('/project/orderSend', params)

// 查看订单
export const searchOrder = params => api.post('/project/orderGet', params)