// pages/evaluate/evaluate.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    orderDetail: {},
    star: 3,
    starText: '一般',
    starVal: 30,
    user_note: ''
  },

  noteVal (e) {
    console.log(e)
    let that = this
    that.setData({ user_note: e.detail.value})
  },

  subEvalue () {
    let that = this
    if (that.data.user_note == '') {
      util.showMsg('请输入评论', '../../images/warning.png')
    } else {
      let params = {
        token: app.globalData.openid,
        order_id: that.data.order_id,
        user_point: that.data.starVal,
        user_note: that.data.user_note
      }
      postRequest('/user/userEvaluate', params, true).then(res => {
        console.log(res)
        util.showMsg('发表成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }
  },

  // 获取详情
  getDetails () {
    let that = this
    let params = {
      order_id: that.data.order_id
    }
    postRequest('/user/orderDetail', params, true).then(res => {
      console.log(res)
      that.setData({
        orderDetail: res
      })
    })
  },

  first () {
    let that = this
    that.setData({ 
      star: 1,
      starText: '非常差',
      starVal: 10
    })
  },

  second() {
    let that = this
    that.setData({
      star: 2,
      starText: '差',
      starVal: 20
    })
  },
  thirdly() {
    let that = this
    that.setData({
      star: 3,
      starText: '一般',
      starVal: 30
    })
  },
  fourth() {
    let that = this
    that.setData({
      star: 4,
      starText: '好',
      starVal: 40
    })
  },
  fifth() {
    let that = this
    that.setData({
      star: 5,
      starText: '非常好',
      starVal: 50
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      order_id: options.orderid
    })
    that.getDetails()
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