// pages/consume/consume.js
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
    navNum: 0,
    page: 1,
    pagesize: 10,
    consumeItem: [],
    orderItem: [],
    counts: 0
  },

  // 取消预约
  cancelOrder (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认取消该预约？',
      success(res) {
        if (res.confirm) {
          let params = {
            token: app.globalData.unionid,
            appointment_id: e.currentTarget.dataset.appointment_id
          }
          postRequest('/user/appointmentCancel', params, true).then(res => {
            that.setData({
              page: 1,
              orderItem: []
            })
            that.getOrder()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  // 切换nav
  chooseNav (e) {
    let that = this
    that.setData({
      consumeItem: [],
      orderItem: [],
      navNum: e.currentTarget.dataset.navnum,
      page: 1
    })
    if (e.currentTarget.dataset.navnum == 1) {
      that.getOrder()
      that.getServerList()
      wx.setNavigationBarTitle({
        title: '预约服务'
      })
    } else {
      that.getConsume()
      wx.setNavigationBarTitle({
        title: '消费清单'
      })
    }
  },

  // 获取消费清单
  getConsume () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/paymentList', params, true).then(res => {
      console.log(res)
      that.setData({
        counts: res.count,
        consumeItem: that.data.consumeItem.concat(res.list)
      })
    })
  },

  // 获取服务分类
  getServerList () {
    let that = this
    let params = {
      pid: 0
    }
    postRequest('/user/cateList', params, false).then(res => {
      console.log('分类',res)
    })
  },

  // 获取预约列表
  getOrder () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/appointmentList', params, true).then(res => {
      console.log(res)
      that.setData({
        counts: res.count,
        orderItem: that.data.orderItem.concat(res.list)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navNum: options.nav
    })
    if (options.nav == 1) {
      wx.setNavigationBarTitle({
        title: '预约服务'
      })
      that.getOrder()
      that.getServerList()
    } else if (options.nav == 2) {
      wx.setNavigationBarTitle({
        title: '消费清单'
      })
      that.getConsume()
    }
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
      if (that.data.navNum == 1) {
        that.getOrder()
      } else if (that.data.navNum == 2) {
        that.getConsume()
      }
    } else {
      util.showMsg('已经到底了')
    }
  }
})