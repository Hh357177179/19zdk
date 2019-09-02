// pages/course/course.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chanelId: '',
    items: [],
    schoolObj: {},
    noDataShow: false
  },

  navDetail (e) {
    let channelId = e.currentTarget.dataset.channel_id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${channelId}`,
    })
  },

  getList () {
    let that = this
    let params = {
      channel_id: that.data.chanelId,
      type: 0
    }
    postRequest('/sign/activityList', params, true).then(res => {
      console.log(res)
      if (res.activity.length == 0) {
        that.setData({
          noDataShow: true
        })
      } else {
        that.setData({
          noDataShow: false
        })
      }
      that.setData({
        items: res.activity,
        schoolObj: res.school
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      chanelId: options.id
    })
    that.getList()
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