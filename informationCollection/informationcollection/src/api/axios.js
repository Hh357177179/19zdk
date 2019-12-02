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
      if (res.data.code == "200") {
        return Promise.resolve(res.data.data);
      } else {
        app.$toast(res.data.msg)
      }
    }
    else return Promise.resolve(res.data);
  },
  e => Promise.reject(e)
)

export default Ax;