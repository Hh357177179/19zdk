// pages/delivery/delivery.js
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
    noAddress: false, // 新增地址
    choAddress: false, // 选择地址
    localObj: {},
    shopArr: [],
    type: '',
    address_id: '',
    orderIds: ''
  },

  rClocal() {
    wx.navigateTo({
      url: '/pages/selectaddress/selectaddress',
    })
  },

  // 跳转新增收货地址
  rAddLocal() {
    wx.navigateTo({
      url: '/pages/addlocal/addlocal',
    })
  },

  // 我的地址
  getLocal() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
      // token: "o0hnX5SYSbXF7dW1kCCHwIwmGmy4"
    }
    postRequest('/user/addressList', params, true).then(res => {
      // console.log(res)
      if (res.length == 0) {
        that.setData({
          noAddress: true,
          choAddress: false,
        })
      } else {
        that.setData({
          noAddress: false,
          choAddress: true,
          localObj: res[app.globalData.aress]
        })
      }
    })
  },

  // 确认订单
  submitOrder (e) {
    let that = this
    console.log(that.data.localObj)
    let localStr = JSON.stringify(that.data.localObj)
    if (localStr == "{}") {
      util.showMsg('请选择地址')
    } else {
      console.log(e)
      let params = {
        token: app.globalData.userInfo.openid,
        order_id: e.target.dataset.shopid,
        address_id: e.target.dataset.localid
      }
      console.log(params)
      postRequest(`/main/goodAddAdress`, params, true).then(res => {
        util.showMsg('确认成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 2000)
      })
    }
  },

  // 获取未配送列表
  getNoDelivery() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      // token: 'o0hnX5SYSbXF7dW1kCCHwIwmGmy4',
      type: 2,
      page: 1,
      pagesize: 1
    }
    postRequest('/main/goodOrderList', params, true).then(res => {
      console.log('全部商品', res)
      let obj = res.list.filter(x => x.id == that.data.orderIds)
      that.setData({
        shopArr: obj[0]
      })
      console.log(that.data.shopArr)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    that.setData({
      orderIds: options.orderIds
    })
    this.getNoDelivery()
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
    that.getLocal()
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})