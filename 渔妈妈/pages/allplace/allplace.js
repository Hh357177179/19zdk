// pages/allplace/allplace.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  getRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    noText: false,
    placeName: '',
    keyword: ''
  },

  navTeacher (e) {
    let address = e.currentTarget.dataset.address
    wx.navigateTo({
      url: `/pages/teacherAndTime/teacherAndTime?address=${address}`,
    })
  },

  noVal (e) {
    console.log(e)
    let that = this
    that.setData({ keyword: e.detail.value })
    that.getList()
  },

  // 获取所有地址
  getList () {
    let that = this
    let params = {
      keyword: that.data.keyword
    }
    getRequest('/user/addressList', params, true).then(res => {
      console.log(res)
      that.setData({
        items: res
      })
      if (res.length == 0) {
        that.setData({
          noText: true
        })
      } else {
        that.setData({ noText: false })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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