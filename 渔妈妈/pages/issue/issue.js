// pages/issue/issue.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_note: '',
    include_note: '',
    order_id: '',
    transcripts: ''
  },

  transcriptsVal (e) {
    let that = this
    that.setData({
      transcripts: e.detail.value
    })
  },

  noteVal (e) {
    let that = this
    that.setData({
      user_note: e.detail.value
    })
  },

  includenoteVal (e) {
    let that = this
    that.setData({
      include_note: e.detail.value
    })
  },

  subEvalue () {
    let that = this
    if (that.data.user_note == '') {
      util.showMsg('请输入用户报告', '../../images/warning.png')
    } else if (that.data.include_note == '') {
      util.showMsg('请输入内部报告', '../../images/warning.png')
    } else {
      let params = {
        token: app.globalData.openid,
        order_id: that.data.order_id,
        teacher_note: that.data.user_note,
        teacher_inside_note: that.data.include_note
      }
      postRequest('/user/teacherEvaluate', params, true).then(res => {
        console.log(res)
        util.showMsg('发表成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      order_id: options.orderid
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