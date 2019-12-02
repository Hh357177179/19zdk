// pages/callme/callme.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    content: ''
  },

  phoneVal (e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },

  contentVal (e) {
    let that = this
    console.log(e)
    that.setData({
      content: e.detail.value
    })
  },

  submitContent () {
    let that = this
    if (that.data.phone == '') {
      util.showMsg('请输入手机号码', '../../images/warning.png')
    } else if (that.data.content == '') {
      util.showMsg('请输入留言内容', '../../images/warning.png')
    } else {
      let params = {
        token: app.globalData.openid,
        phone: that.data.phone,
        content: that.data.content
      }
      postRequest('/user/message', params, true).then(res => {
        util.showMsg('留言成功', '../../images/successIcon.png')
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