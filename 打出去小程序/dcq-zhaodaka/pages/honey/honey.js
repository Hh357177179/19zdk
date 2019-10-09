// pages/honey/honey.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    page: 1,
    pagesize: 15,
    counts: 0,
    noDataShow: false,
    honeyNum: 0,
    showHoney: false,
    codeSrc: '',
    btnText: '显示蜂蜜日志'
  },

  showBtn () {
    let that = this
    that.setData({
      showHoney: !that.data.showHoney
    })
    if (that.data.showHoney == true) {
      that.setData({
        btnText: '隐藏蜂蜜日志'
      })
    } else {
      that.setData({
        btnText: '显示蜂蜜日志'
      })
    }
  },

  getList () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: app.globalData.token
    }
    postRequest('/user/coinLog', params, true).then(res => {
      console.log(res)
      if (res.count == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        items: that.data.items.concat(res.list)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      honeyNum: app.globalData.userInfo.coin,
      codeSrc: 'https://ssl.zhaodaka.net/dcq/api/user/qcode?token=' + app.globalData.token 
    })
    that.getList()
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