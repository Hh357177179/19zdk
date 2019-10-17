import axios from 'axios'
import app from '@/main'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
      return config
  },
  e => Promise.reject(e),
)

// 响应拦截
api.interceptors.response.use(
  res => {
    if (res.data.code == 200) {
      return res.data.data
    } else if (res.data.code == 1001){
      console.log('错误', res)
      app.$toast.fail(res.data.msg)
    }
  },
  e => Promise.reject(e)
)


export default api