import axios from 'axios'
import app from '../main'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,removeToken } from '@/utils/auth'
import { get } from 'http';


axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  // baseURL: 'http://tanyuzhe.zhaodaka.vip/admin/user'
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let tokens = getToken()
    if (tokens) {
      config.headers['X-Token'] = getToken()
    }
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code != 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 2 * 1000
      })
      if (res.code == 1100) {
        MessageBox.confirm('用户验证信息过期，请重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeToken()
          // app.$router.push('/login')
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
