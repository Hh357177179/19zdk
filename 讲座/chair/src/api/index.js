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

// vip列表
export function vipList () {
  return Ax.post(`/sign/vipList`)
}

// vip详情
export function vipDetail(params) {
  return Ax.post(`/sign/vipDetail`, params)
}

// vip创建订单
export function vipCreatOrder(params) {
  return Ax.post(`/sign/vipOrderCreate`, params)
}

// vip支付
export function payVip(param) {
  return Ax.post(`/sign/vipOrderPay`, param)
}

// 获取学校列表
export function getSchool(param) {
  return Ax.post('/sign/channelList', param)
}

// 我报名的列表
export function getMyList(param) {
  return Ax.post('/sign/myList', param)
}

// 检查是否报名
export function applySuccess(param) {
  return Ax.post(`/sign/isNew`, param)
}

// 扫码签到
export function SignIn (param) {
  return Ax.post(`/sign/doSign`, param)
}

// 是否有免费卷
export function haveRoll(param) {
  return Ax.post(`/sign/freeNumber`, param)
}

// 注册
export function Register(param) {
  return Ax.post(`/sign/authentication`, param)
}

export function getCode (param) {
  return Ax.post(`/sign/sms`, param)
}

export function getUsers (param) {
  return Ax.post(`/sign/userInfo`, param)
}

export default Ax