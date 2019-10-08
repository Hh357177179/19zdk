// pages/vip/vip.js
const util = require('../../utils/util.js')
const app = getApp()
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    index: 1,
    showVip: false,
  },

  honeyClick() {
    let that = this
    that.setData({
      index: 1
    })
  },

  rmbClick() {
    let that = this
    that.setData({
      index: 2
    })
  },

  // 蜂蜜支付
  honeyVip() {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/user/vipStartByHoney', params, true).then(res => {
      console.log(res)
      util.showMsg('开通成功', '../../images/successIcon.png')
      that.getUserAgain()
    })
  },

  // 人民币支付
  rmbVip() {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/user/vipStartByMoney', params, true).then(res => {
      console.log(res)
      let param = {
        token: app.globalData.token,
        order_id: res.order_id
      }
      postRequest('/mini/vipOrderPayByMini', param, true).then(res => {
        let configs = JSON.parse(res.config)
        wx.requestPayment({
          timeStamp: configs.timeStamp,
          nonceStr: configs.nonceStr,
          package: configs.package,
          signType: configs.signType,
          paySign: configs.paySign,
          'success': function(resSuccess) {
            util.showMsg('支付成功', '../../images/successIcon.png')
            that.getUserAgain()
          },
          'fail': function(resFail) {
            console.log(resFail)
            util.showMsg('支付失败', '../../images/warning.png')
          },
        })
      })
    })
  },

  // 重新获取用户信息
  getUserAgain() {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/user/getMyinfo', params, false).then(res => {
      app.globalData.userInfo = res
      app.globalData.isVip = res.vip_time
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    })
  },

  buyVip() {
    let that = this
    if (app.globalData.token != '') {
      wx.showModal({
        title: '提示',
        content: '确认使用当前方式支付吗？',
        success(res) {
          if (res.confirm) {
            console.log(that.data.index)
            if (that.data.index == 1) {
              console.log('蜂蜜')
              that.honeyVip()
            } else {
              console.log('人民币')
              that.rmbVip()
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (app.globalData.isVip != 0) {
      that.setData({
        time: app.globalData.isVip,
        showVip: true
      })
    } else {
      that.setData({
        showVip: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})