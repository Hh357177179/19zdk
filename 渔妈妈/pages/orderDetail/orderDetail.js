// pages/orderDetail/orderDetail.js
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
    detailObj: {},
    eValueObj: {},
    userRole: ''
  },

  // 获取评论
  getEvalue () {
    let that = this
    let params = {
      order_id: that.data.detailObj.order_id
    }
    postRequest('/user/orderDetail', params, true).then(res => {
      console.log(res)
      that.setData({
        eValueObj: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let obj = JSON.parse(options.detail)
    that.setData({
      detailObj: obj,
      userRole: app.globalData.role
    })
    that.getEvalue()
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