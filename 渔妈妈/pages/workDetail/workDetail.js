// pages/workDetail/workDetail.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest,
  getRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
    statePay: -1
  },

  applyBtn () {
    let that = this
    if (!wx.getStorageSync('phone') && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/phone/phone',
      })
      console.log('跳转注册页面')
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      that.submitApply()
    }
  },

  submitApply () {
    let that = this
    let params = {
      token: app.globalData.openid,
      workshop_id: that.data.detail.id
    }
    postRequest('/user/workshopCreateOrder', params, true).then(res => {
      console.log('创建订单', res)
      if (res.need_pay) {
        let param = {
          token: app.globalData.openid,
          order_id: res.order_id
        }
        postRequest('/user/workshopOrderPay', param, true).then(resConfig => {
          console.log(resConfig)
          let configs = JSON.parse(resConfig.config)
          wx.requestPayment({
            timeStamp: configs.timeStamp,
            nonceStr: configs.nonceStr,
            package: configs.package,
            signType: configs.signType,
            paySign: configs.paySign,
            'success': function (res) {
              util.showMsg('报名成功', '../../images/successIcon.png')
              setTimeout(() => {
                wx.navigateBack()
              }, 1500)
            },
            'fail': function (res) {
              console.log(res)
            },
          })
        })
      }
    })
  },

  getDetail () {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/user/workshopDetail', params, true).then(res => {
      console.log(res)
      if (res) {
        if (res.number > res.order_num) {
          that.setData({ statePay: 0 })
        } else {
          that.setData({ statePay: 1 })
        }
        that.setData({
          detail: res
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id: options.id
    })
    that.getDetail()
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