// pages/grow/grow.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    token: '',
    noDates: false,
    nowTime: ''
  },

  groupDetail (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/groupDetail/groupDetail?id=${id}`,
    })
  },

  addGroup () {
    if (app.globalData.token != '') {
      wx.navigateTo({
        url: '/pages/addGrows/addGrows',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  formDate (date) {
    let time = new Date(date * 1000)
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let D = time.getDate()
    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = "0" + D
    }
    return `${Y}-${M}-${D}`
  },

  getList () {
    let that = this
    let params = {
      token: that.data.token
    }
    postRequest('/mini/timeLine', params, true).then(res => {
      console.log(res)
      for (let a in res) {
        res[a].formTime = that.formDate(res[a].time)
      }
      if (res.length == 0) {
        that.setData({
          noDates: true
        })
      } else {
        that.setData({
          noDates: false
        })
      }
      that.setData({ items: res})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let time = new Date()
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let D = time.getDate()
    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = "0" + D 
    }
    that.setData({
      nowTime: `${Y}-${M}-${D}`
    })
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
    if (app.globalData.token != '') {
      that.setData({
        token: app.globalData.token
      })
      this.getList()
    } else {
      that.setData({ noDates: true })
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