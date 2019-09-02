// pages/choTime/choTime.js
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
    items: [],
    type: '',
    teacher_id: '',
    is_online: ''
  },

  orderTime (e) {
    let that = this
    app.globalData.timeObj = e.currentTarget.dataset.timeobj
    if (that.data.type == 1) {
      wx.navigateTo({
        url: '/pages/specialist/specialist',
      })
    } else if (that.data.type == 0) {
      wx.navigateTo({
        url: '/pages/sendTeacher/sendTeacher',
      })
    }
  },

  getTimeList () {
    let that = this
    let params = {
      type: that.data.type,
      teacher_id: that.data.teacher_id,
      is_online: that.data.is_online
    }
    postRequest('/user/allowTeacherTime', params, true).then(res => {
      console.log(res)
      that.setData({
        items: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      type: options.type,
      teacher_id: options.tid,
      is_online: options.line
    })
    that.getTimeList()
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