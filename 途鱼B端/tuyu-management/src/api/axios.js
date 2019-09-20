import axios from 'axios'
import app from '@/main'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let api = axios.create({
  baseURL: '/admin',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
    // const token = sessionStorage.getItem('token')
    // console.log(config)
    // console.log(token)
    // if (!token) {
    //   app.$confirm('您的登录已过期，请重新登录。', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     app.$router.push('/login')
    //   }).catch(() => { });
    //   return 
    // } else {
      return config
    // }
  },
  e => Promise.reject(e),
)

// 响应拦截
api.interceptors.response.use(
  res => {
    if (res.data.code) {
      if (res.data.code == 200) {
        return res.data.data
      } else if (res.data.code == 1100) {
        app.$confirm('您的登录已过期，请重新登录。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          app.$router.push('/login')
        }).catch(() => { });
      }
      else app.$message.error(res.data.msg);
    }
    else return Promise.resolve(res.data);
  },
  e => Promise.reject(e)
)


export default api