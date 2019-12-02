// pages/activity/activity.js
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
    current: '',
    cardItem: [],
    tabArr: [],
    listArr: [],
    pagesize: 10,
    page: 1,
    counts: 0,
    id: ''
  },

  searchDetail (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/meal/meal?id=${id}`
    })
  },

  cardDetail (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/oddsCard/oddsCard?id=${id}`,
    })
  },

  // 获取价目列表
  getPriceList () {
    let that = this
    let params = {
      price_cate_id: that.data.id,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/priceByCate', params, true).then(res => {
      console.log(res)
      that.setData({
        counts: res.count,
        listArr: res.list
      })
    })
  },

  getTab () {
    let that = this
    let params = {}
    postRequest('/user/priceCateList', params, true).then(res => {
      console.log(res)
      that.setData({
        tabArr: res,
        id: res[0].id
      })
      that.getPriceList()
    })
  },

  // 特惠卡列表
  getCard () {
    let that = this
    let params = {}
    postRequest('/user/cardList', params, true).then(res => {
      // console.log(res)
      that.setData({ cardItem: res })
    })
  },

  onChange(e) {
    let that = this
    let id = e.detail.key
    that.setData({
      current: id,
      id: id,
      page: 1
    })
    that.getPriceList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCard()
    this.getTab()
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
      that.getPriceList()
    } else {
      util.showMsg('已经到底了')
    }
  }
})