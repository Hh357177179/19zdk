// pages/me/me.js
const util = require('../../utils/util.js')
const app = getApp()
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navStatus: 0,
    showUser: false,
    showLogin: false,
    userInfos: {},
    wxUser: {}
  },

  // 跳转我的预约
  navMeOrder () {
    let that = this
    console.log(app.globalData.role)
    let statusVal = app.globalData.role
    if (statusVal == 1) {
      wx.navigateTo({
        url: '/pages/meOrder/meOrder',
      })
    } else if (statusVal == 2) {
      wx.navigateTo({
        url: '/pages/teacherOrder/teacherOrder',
      })
    } else {
      util.showMsg('请先登录', '../../images/warning.png')
    }
  },

  // 跳转我的报名
  navMeApply () {
    let that = this
    console.log(app.globalData.role)
    let statusVal = app.globalData.role
    if (statusVal) {
      wx.navigateTo({
        url: '/pages/meApply/meApply',
      })
    } else {
      util.showMsg('请先登录', '../../images/warning.png')
    }
  },

  // 跳转我发布的预约
  navOrderList () {
    wx.navigateTo({
      url: '/pages/meSendOrder/meSendOrder',
    })
  },

  // 发布预约
  sendTeacher () {
    let that = this
    console.log(app.globalData.role)
    let statusVal = app.globalData.role
    if (statusVal) {
      wx.navigateTo({
        url: '/pages/teacherEvalue/teacherEvalue',
      })
    } else {
      util.showMsg('请先登录', '../../images/warning.png')
    }
  },

  navLogin () {
    let that = this
    if (that.data.navStatus == 1) {
      wx.navigateTo({
        url: '/pages/phone/phone',
      })
    } else if (that.data.navStatus == 2) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 检查是否授权

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
    let that = this
    if (!wx.getStorageSync('phone') && app.globalData.userInfo == null) {
      that.setData({
        navStatus: 1,
        showLogin: true,
        showUser: false
      })
      console.log('跳转注册页面')
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo == null) {
      console.log('跳转授权页面')
      that.setData({
        navStatus: 2,
        showLogin: true,
        showUser: false
      })
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo != null) {
      that.setData({
        showLogin: false,
        showUser: true,
        userInfos: app.globalData.userInfo
      })
      that.getUser()
    }
  },

  getUser () {
    let that = this
    wx.getUserInfo({
      success: wxUserInfo => {
        console.log(wxUserInfo)
        that.setData({
          wxUser: wxUserInfo.userInfo
        })
      }
    })
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