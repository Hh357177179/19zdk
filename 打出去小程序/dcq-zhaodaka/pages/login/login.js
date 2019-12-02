// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp()
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login () {
    let that = this
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    wx.login({
      success: resCode => {
        console.log(resCode)
        wx.request({
          url: `${util.baseUrl}/mini/login`,
          data:{
            code: resCode.code
          },
          method: "POST",
          success: resLogin => {
            console.log(resLogin)
            if (resLogin.data.code == 1002) {
              wx.getUserInfo({
                success: resUser => {
                  console.log(resUser)
                  wx.login({
                    success: secondCode => {
                      console.log(secondCode)
                      let params = {
                        code: secondCode.code,
                        encryptedData: resUser.encryptedData,
                        iv: resUser.iv
                      }
                      wx.request({
                        url: `${util.baseUrl}/mini/register`,
                        data: params,
                        method: "POST",
                        success: resUserInfo => {
                          // console.log(resUserInfo.data.data)
                          app.globalData.token = resUserInfo.data.data.unionid
                          wx.setStorage({
                            key: 'token',
                            data: resUserInfo.data.data.unionid
                          })
                          that.getUserInfo(resUserInfo.data.data.unionid)
                          wx.hideLoading()
                        }
                      })
                    }
                  })
                }
              })
            } else {
              console.log('直接保存用户信息', resLogin)
              app.globalData.token = resLogin.data.data.unionid
              wx.setStorage({
                key: 'token',
                data: resLogin.data.data.unionid
              })
              that.getUserInfo(resLogin.data.data.unionid)
              wx.hideLoading()
            }
          }
        })
      }
    })
  },

  getUserInfo (token) {
    let that = this
    let params = {
      token: token
    }
    postRequest('/user/getMyinfo',params, false).then(res => {
      app.globalData.userInfo = res
      app.globalData.isVip = res.vip_time
      wx.setStorage({
        key: 'userInfo',
        data: res,
      })
      wx.setStorage({
        key: 'isVip',
        data: res.vip_time,
      })
      wx.navigateBack()
    })
  },

  btnGetUserInfo(e) {
    let that = this
    if (e.detail.userInfo) {
      that.login()
    } else {
      // util.showMsg('拒绝授权将无法使用')
      wx.navigateBack()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})