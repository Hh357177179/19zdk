// pages/collect/collect.js
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
    items: [],
    page: 1,
    pagesize: 15,
    noDataShow: false,
    counts: 0
  },

  getList () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxCBlOm5ZEFoSL-WlO8UPALQ",
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/myLike', params, true).then(res => {
      console.log(res)
      if (res.list.length == 0) {
        that.setData({
          noDataShow: true
        })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        counts: res.count,
        items: that.data.items.concat(res.list)
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