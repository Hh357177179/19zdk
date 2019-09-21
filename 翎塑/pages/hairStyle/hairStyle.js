// pages/hairStyle/hairStyle.js
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
    num: 0,
    typeItems: [],
    cardItems: [],
    page: 1,
    pagesize: 10,
    counts: 0,
    noDataShow: false,
  },

  recommend () {
    let that = this
    that.setData({ num: 0, page: 1, cardItems: [] })
    that.getDefault()
  },

  // 切换分类查询
  getTypeSearch () {
    let that = this
    let params = {
      hair_cate_id: that.data.num,
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: app.globalData.unionid
    }
    postRequest('/user/hairByCate', params, true).then(res => {
      console.log(res)
      if (res.list.length == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        cardItems: that.data.cardItems.concat(res.list),
        counts: res.count
      })
    })
  },

  // 收藏
  lickClick (e) {
    let that = this
    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.id
    let isLike = e.currentTarget.dataset.status
    let index = e.currentTarget.dataset.index
    let params = {
      token: app.globalData.unionid,
      hair_id: id
    }
    wx.request({
      url: `${util.baseUrl}/user/likeHair`,
      data: params,
      method: "POST",
      success: res => {
        let stateLike = `cardItems[${index}].is_like`
        console.log(stateLike)
        console.log(res)
        if (res.data.code == 201) {
          that.setData({
            [stateLike]: false
          })
          util.showMsg('取消收藏！')
        } else if (res.data.code == 200) {
          that.setData({
            [stateLike]: true
          })
          util.showMsg('收藏成功！')
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },

  navDetail (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/hairDetail/hairDetail?id=${id}`,
    })
  },


  getDefault () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: app.globalData.unionid
    }
    postRequest('/user/hairByRecommend', params, true).then(res => {
      console.log(res)
      if (res.list.length == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        cardItems: that.data.cardItems.concat(res.list),
        counts: res.count
      })
    })
  },

  choType (e) {
    let that = this
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    that.setData({ num: id, cardItems: [], page: 1 })
    that.getTypeSearch()
  },

  getType () {
    let that = this
    let params = {}
    postRequest('/user/hairCateList', params, false).then(res => {
      console.log(res)
      that.setData({ typeItems: res} )
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getType()
    this.getDefault()
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