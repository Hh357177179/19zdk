// pages/me/me.js
const util = require('../../utils/util.js')
const app = getApp()
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    showUserInfo: false,
    userInfo: {},
    avatar: ''
  },

  getUser () {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/user/getMyinfo', params, true).then(res => {
      console.log('个人信息',res)
      that.setData({
        userInfo: res,
        avatar: res.avatar
      })
      app.globalData.userInfo = res
    })
  },

  meCollect () {
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },

  navConsider () {
    wx.navigateTo({
      url: '/pages/meConsider/meConsider',
    })
  },

  onClose () {
    let that = this
    that.setData({
      visible: false
    })
  },

  navJoin () {
    wx.navigateTo({
      url: '/pages/meJoin/meJoin',
    })
  },

  navRanking () {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },

  // 转账
  navTransfer () {
    // let that = this
    // that.setData({
    //   visible: true
    // })
  },

  navHoney () {
    wx.navigateTo({
      url: '/pages/honey/honey',
    })
  },

  // 登录
  login () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  navVip () {
    wx.navigateTo({
      url: '/pages/vip/vip',
    })
  },

  navUserInfo() {
    wx.navigateTo({
      url: '/pages/info/info',
    })
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
    console.log(app.globalData.userInfo)
    let that = this
    if (app.globalData.userInfo == null) {
      that.setData({ showUserInfo: false })
    } else {
      that.getUser()
      that.setData({ showUserInfo: true })
    }
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