// pages/vipInfo/vipInfo.js
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
    level: '',
    levelItems: []
  },

  // 获取vip介绍
  getVipList () {
    let that = this
    let params = {}
    postRequest('/user/level', params, true).then(res => {
      console.log(res)
      that.setData({
        levelItems: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载/user/level
   */
  onLoad: function (options) {
    let that = this
    // console.log(app.globalData.level)
    that.setData({
      level: app.globalData.level
    })
    that.getVipList()
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

  }
})