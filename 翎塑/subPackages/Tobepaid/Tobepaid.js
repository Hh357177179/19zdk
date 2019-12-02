// subPackages/Tobepaid/Tobepaid.js
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
    list: [],
    page: 1,
    pagesize: 10,
    counts: 0
  },

  payOrderAgain (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
      order_id: id
    }
    console.log(params)
    postRequest('/user/paymentByWechat', params, true).then(res => {
      console.log(res)
      let configs = JSON.parse(res.config)
      console.log(configs)
      wx.requestPayment({
        timeStamp: configs.timeStamp,
        nonceStr: configs.nonceStr,
        package: configs.package,
        signType: configs.signType,
        paySign: configs.paySign,
        'success': function (resSuccess) {
          util.showMsg('支付成功!')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }, 1500)
        },
        'fail': function (resFail) {
          console.log(resFail)
          util.showMsg('支付失败！')
        },
      })
    })
  },

  cancelOrder (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
      order_id: id
    }
    postRequest('/user/orderCancel', params, false).then(res => {
      that.getList()
    })
  },

  getList () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/noPayList', params, true).then(res => {
      console.log(res)
      that.setData({
        list: res.list,
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
     that.getList()
    } else {
      util.showMsg('已经到底了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})