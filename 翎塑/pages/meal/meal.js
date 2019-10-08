// pages/meal/meal.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    id: ''
  },

  // 立即购买
  buyClick () {
    let that = this
    let params = {
      price_id: that.data.id,
      token: app.globalData.unionid,
    }
    postRequest('/user/priceOrderCreate', params, true).then(res => {
      console.log(res)
      let param = {
        token: app.globalData.unionid,
        order_id: res.order_id
      }
      postRequest('/user/priceOrderPay', param, true).then(res => {
        console.log(res)
        let configs = JSON.parse(res.config)
        wx.requestPayment({
          timeStamp: configs.timeStamp,
          nonceStr: configs.nonceStr,
          package: configs.package,
          signType: configs.signType,
          paySign: configs.paySign,
          'success': function (resSuccess) {
            util.showMsg('支付成功!')
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          },
          'fail': function (resFail) {
            console.log(resFail)
            util.showMsg('支付失败！')
          },
        })
      })
    })
  },

  getDetail () {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/user/priceDetail', params, true).then(res => {
      console.log(res)
      that.setData({
        detailObj: res
      })
      var temp = WxParse.wxParse('article', 'html', res.content, that, 5);
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