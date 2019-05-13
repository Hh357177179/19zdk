import axios from 'axios'
import app from '@/main'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: '/api'
})

// 响应拦截
Ax.interceptors.response.use(
  res => {
    if (res.data.code) {
      if (res.data.code === "200") return Promise.resolve(res.data.data);
      else app.$toast(res.data.msg)
    }
    else return Promise.resolve(res.data);
  },
  e => Promise.reject(e)
)

// 课程详情
export function DetailClass(params) {
  return Ax.post(`/sign/activityDetail`, params)
}

// 获取课程列表
export function allList(params) {
  return Ax.post(`/sign/activityList`, params)
}

// 获取jssdk配置
export function apiGetWxConfig(params) { 
  return Ax.post(`/wechat/getJssdkConfig`, params)
}

export function oauth () {
  window.location.href = `http://ymmsign.zhaodaka.vip/oauth`
}

// 创建订单
export function creatOrder(params) { 
  return Ax.post(`/sign/orderCreate`, params)
}

// 支付
export function payOrder(params) {
  return Ax.post(`/sign/orderPay`, params)
}

export default Ax