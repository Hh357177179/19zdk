import axios from 'axios'
// import api from '../../vue.config'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: 'http://kexin.zhaodaka.vip'
  // baseURL: 'api.php?r='
})

// 请求拦截 
Ax.interceptors.request.use(
  config => {
    config.headers = {'token': 'OBveYQzLz313dabQXJQlULEyi'}
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
Ax.interceptors.response.use(
  response => {
    if (response.data.code == 200) {
      return response.data.result
    } else {
      alert(response.data.message)
    }
  },
  err => {
    console.log(123321,err)
  }
)



// 获取标题栏目
export function getColumn () {
  return Ax.get(`/api.php?r=duxcms/Label/categoryList`)
}

// 获取文章列表
export function getArticList(param) {
  return Ax.post(`/api.php?r=article/List/index`, param)
}

// 单页面
export function getPages (param) {
  return Ax.get(`/api.php?r=page/info/index&class_id=${param}`)
}
export default Ax