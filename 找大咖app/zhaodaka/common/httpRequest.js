const util = require('./util.js')

const defaultRequest = function ({ uniurl, unimethod, params, visloading } = {}) {
	visloading && util.sLoading();
	return new Promise((resolve, reject) => {
    if (vurl == null || vurl == '') {
      reject('请求地址未填写');
      uni.hideLoading()
    } else {
      uni.request({
        url: util.baseUrl + vurl,
        method: vmethod,
        data: params,
        success: res => {
					console.log(res)
          // if (res.data.code == 200) {
          //   uni.hideLoading()
          //   resolve(res.data.data)
          // } else {
          //   util.showMsg(res.data.msg)
          // }
					resolve(res)
        },
        fail: res => {
          reject(res)
          console.log('网络错误')
        }
      })
    }
  })
}

// get请求
const getRequest = function (vurl, params, visloading) {
  return defaultRequest({
    vurl,
    vmethod: "GET",
    params,
    visloading
  })
}

// post请求
const postRequest = function (vurl, params, visloading) {
  return defaultRequest({
    vurl,
    vmethod: "POST",
    params,
    visloading
  })
}

// 导出
module.exports = {
  getRequest: getRequest,
  postRequest: postRequest
}