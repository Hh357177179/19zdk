// pages/detail/detail.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: '',
    detailObj: {},
    free_number: ''
  },

  // 点击报名
  sendApply () {
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
    if (that.data.free_number != 0) {
      let params = {
        token: app.globalData.openid,
        activity_id: that.data.activity_id,
        name: app.globalData.name,
        phone: app.globalData.phone,
        is_free: 1
      }
      console.log(params)
      postRequest('/sign/orderCreate', params, true).then(res => {
        console.log(res)
        // if (res.need_pay == 0) {
          util.showMsg('报名成功', '../../images/successIcon.png')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/success/success',
            }, 1500)
          })
        // }
      })
    } else {
      console.log('需要付费了')
      let params = {
        token: app.globalData.openid,
        activity_id: that.data.activity_id,
        name: app.globalData.name,
        phone: app.globalData.phone,
        is_free: 0
      }
      postRequest('/sign/orderCreate', params, true).then(res => {
        console.log('创建订单',res)
        if (res.need_pay) {
          let param = {
            token: app.globalData.openid,
            order_id: res.order_id
          }
          postRequest('/sign/orderPay', param, false).then(resConfig => {
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
                  wx.switchTab({
                    url: '/pages/order/order',
                  })
                }, 1500)
              },
              'fail': function (res) {
                console.log(res)
                // util.showMsg('购买失败！')
              },
            })
          })
        }
      })
    }
  },

  getFree () {
    let that = this
    let params = {
      token: app.globalData.openid
    }
    postRequest('/sign/freeNumber', params, true).then(res => {
      console.log(res)
      that.setData({
        free_number: res.free_number
      })
    })
  },

  // 获取详情
  getDetail () {
    let that = this
    let params = {
      activity_id: that.data.activity_id
    }
    postRequest('/sign/activityDetail', params, true).then(res => {
      console.log(res)
      that.setData({
        detailObj: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      activity_id: options.id
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
    let that = this
    if (app.globalData.openid) {
      that.getFree()
    }
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