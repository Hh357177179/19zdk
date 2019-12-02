import Ax from './axios';

// 上传
export const uploadPic = params => Ax.post('/user/upload', params)

// 报名后跳转
export const routeUrl = params => Ax.post('/user/getJumpUrl', params)

// 提交
export const submitForm = params => Ax.post('/user/order', params)