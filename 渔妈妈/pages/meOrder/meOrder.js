// pages/meOrder/meOrder.js
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
    nav: 2,
    listItems: [],
    page: 1,
    pagesize: 10,
    counts: 0,
    noDataShow: false,
    orderId: ''
  },

  searchDetail (e) {
    let details = JSON.stringify(e.currentTarget.dataset.detail)
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?detail=${details}`,
    })
  },

  userEvaluate (e) {
    let that = this
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/evaluate/evaluate?orderid=${orderid}`,
    })
  },

  choNav(e) {
    let that = this
    console.log(e)
    let navs = e.currentTarget.dataset.nav
    that.setData({
      listItems: [],
      nav: navs,
      page: 1
    })
    that.getList()
  },

  getList () {
    let that = this
    let params = {
      token: app.globalData.openid,
      page: that.data.page,
      pagesize: that.data.pagesize,
      type: that.data.nav
    }
    postRequest('/user/userAppointment', params, true).then(res => {
      console.log(res)
      if (that.data.page == 1 && res.list.length == 0) {
        that.setData({
          noDataShow: true
        })
      } else {
        that.setData({
          noDataShow: false
        })
      }
      that.setData({
        counts: res.count,
        listItems: that.data.listItems.concat(res.list)
      })
    })
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
    let that = this
    that.setData({ listItems: []})
    that.getList()
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