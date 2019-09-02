// pages/phone/phone.js
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
    phone: '',
    code: '',
    btnDis: false,
    codeText: '获取验证码'
  },

  // 手机号码输入
  phoneVal(e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },

  // 验证码输入
  codeVal(e) {
    let that = this
    that.setData({
      code: e.detail.value
    })
  },

  // 获取验证码
  getCode() {
    let that = this
    if (that.data.phone == '') {
      util.showMsg('请输入手机号码', '../../images/warning.png')
    } else {
      let params = {
        phone: that.data.phone
      }
      console.log(params)
      postRequest('/user/sms', params, true).then(res => {
        console.log(res)
        var o = 60
        var t = setInterval(function() {
          that.setData({
            codeText: o + "s",
            btnDis: true
          }), 0 == o && (clearInterval(t), that.setData({
            codeText: "获取验证码",
            btnDis: false
          })), o -= 1;
        }, 1e3);
      })
    }
  },

  btnGetUserInfo(e) {
    let that = this
    console.log('点击授权', e)
    if (e.detail.userInfo) {
      console.log('授权成功')
      that.logins()
    } else {
      util.showMsg('授权失败', '../../images/warning.png')
    }
  },

  logins() {
    let that = this
    if (that.data.phone == '') {
      util.showMsg('请输入手机号码', '../../images/warning.png')
    } else if (that.data.code == '') {
      util.showMsg('请输入验证码', '../../images/warning.png')
    } else {
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
              if (resLogin.data.code == 1002) {
                wx.getUserInfo({
                  success: resUserInfo => {
                    console.log('获取用户信息注册', resUserInfo)
                    wx.request({
                      url: `${util.baseUrl}/user/register`,
                      data: {
                        openid: resLogin.data.data.openid,
                        nickname: resUserInfo.userInfo.nickName,
                        avatar: resUserInfo.userInfo.avatarUrl,
                        phone: that.data.phone,
                        code: that.data.code
                      },
                      method: 'POST',
                      success: res => {
                        console.log(res)
                        wx.request({
                          url: `${util.baseUrl}/sign/userInfo`,
                          data: {
                            token: res.data.data.openid
                          },
                          method: 'POST',
                          success: resUser => {
                            app.globalData.avatar = resUser.data.data.avatar
                            app.globalData.nickname = resUser.data.data.phone
                            app.globalData.userInfo = resUser.data.data
                            app.globalData.openid = resUser.data.data.openid
                            app.globalData.phone = resUser.data.data.phone
                            app.globalData.role = resUser.data.data.role
                            app.globalData.is_new = resUser.data.data.is_new
                            app.globalData.name = resUser.data.data.name
                            wx.setStorageSync('phone', resUser.data.data.phone)
                            wx.hideLoading()
                            wx.navigateBack()
                          }
                        })
                      }
                    })
                  }
                })
              } else {
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
            }
          })
        }
      })
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