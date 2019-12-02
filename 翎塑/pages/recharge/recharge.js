// pages/recharge/recharge.js
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
    rechargeVal: '',
    rechargeItem: [],
    recharge_id: ''
  },

  // 获取充值列表
  getRecharge () {
    let that = this
    let params = {}
    postRequest('/user/rechargeList', params, true).then(res => {
      console.log(res)
      that.setData({
        rechargeItem: res
      })
    })
  },

  choTag (e) {
    let that = this
    console.log(e)
    let num = e.currentTarget.dataset.price
    that.setData({
      rechargeVal: num,
      recharge_id: e.currentTarget.dataset.recharge_id
    })
  },

  onRecharge (e) {
    let that = this
    let num = e.detail.value
    that.setData({
      rechargeVal: num
    })
  },

  submitBtn () {
    let that = this
    if (that.data.rechargeVal < 0) {
      util.showMsg('充值金额不能为0')
    } else {
      let params = {
        token: app.globalData.unionid,
        recharge_id: that.data.recharge_id
      }
      console.log(params)
      postRequest('/user/rechargeOrderCreate', params, true).then(res => {
        let param = {
          token: app.globalData.unionid,
          order_id: res.order_id
        }
        postRequest('/user/rechargeOrderPay', param, true).then(orderRes => {
          let configs = JSON.parse(orderRes.config)
          console.log(configs)
          wx.requestPayment({
            timeStamp: configs.timeStamp,
            nonceStr: configs.nonceStr,
            package: configs.package,
            signType: configs.signType,
            paySign: configs.paySign,
            'success': function (resSuccess) {
              console.log('充值成功!', resSuccess)
              that.setData({
                buyShow: false
              })
              wx.redirectTo({
                url: '/pages/index/index',
              })
            },
            'fail': function (resFail) {
              console.log(resFail)
              util.showMsg('充值失败！')
            },
          })
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecharge()
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