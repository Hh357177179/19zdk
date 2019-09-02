// pages/invite/invite.js
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
    num: 1,
    page: 1,
    pagesize: 10,
    items: [],
    counts: 0,
    meNum: 0,
    otherNum: 0,
    noDataShow: false
  },

  changeNav (e) {
    let that = this
    that.setData({
      items: [],
      num: e.currentTarget.dataset.num,
      page: 1
    })
    if (e.currentTarget.dataset.num == 1) {
      that.getMeList()
    } else {
      that.getFriendList()
    }
  },

  // 获取直接邀请
  getMeList () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/myFriend', params, true).then(res => {
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
        items: that.data.items.concat(res.list),
        counts: res.count
      })
    })
  },

  // 获取好友邀请
  getFriendList () {
    let that = this
    let params = {
      token: app.globalData.unionid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/mySonFriend', params, true).then(res => {
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
        items: that.data.items.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMeList()
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
      if (that.data.num == 1) {
        that.getMeList()
      } else {
        that.getFriendList()
      }
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