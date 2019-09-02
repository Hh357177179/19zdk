// pages/login/login.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 授权登录
  logins() {
    let that = this
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.login({
      success: resCode => {
        console.log(resCode)
        wx.request({
          url: `${util.baseUrl}/user/isLogin`,
          data: {
            code: resCode.code
          },
          method: 'POST',
          success: resLogin => {
            console.log('检查是否注册', resLogin)
            console.log('已经注册过')
            app.globalData.userInfo = resLogin.data.data
            app.globalData.openid = resLogin.data.data.openid
            app.globalData.phone = resLogin.data.data.phone
            app.globalData.status = resLogin.data.data.status
            app.globalData.role = resLogin.data.data.role
            app.globalData.is_new = resLogin.data.data.is_new
            app.globalData.name = resLogin.data.data.name
            wx.setStorageSync('phone', resLogin.data.data.phone)
            wx.hideLoading()
            wx.navigateBack()
          }
        })
      }
    })
  },

  // 授权
  btnGetUserInfo(e) {
    let that = this
    console.log('点击授权', e)
    if (e.detail.userInfo) {
      console.log('授权成功')
      that.logins()
    } else {
      util.showMsg('授权失败', '../../images/warning.png')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})