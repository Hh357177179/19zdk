// pages/game/game.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDelete: false,
    searchVal: '',
    nav: 1,
    token: '',
    page: 1,
    pagesize: 10,
    title: '',
    count: 0,
    items: [],
    sort: 'desc',
    keyword: '',
    visible: false
  },

  // navGame () {
  //   let that = this
  //   if (app.globalData.isVip == '0') {
  //     that.setData({ visible: true })
  //   }
  // },

  onClose () {
    this.setData({ visible: false })
  },

  // 获取首页列表
  getList() {
    let that = this
    if (app.globalData.token == '') {
      that.setData({ token: app.globalData.fakeToken })
    } else {
      that.setData({ token: app.globalData.token })
    }
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: that.data.token,
      sort: that.data.sort,
      keyword: that.data.keyword
    }
    console.log(params)
    postRequest('/user/matchList', params, true).then(res => {
      console.log(res)
      that.setData({
        count: res.count,
        items: that.data.items.concat(res.list)
      })
    })
  },

  // 筛选列表
  navSort(e) {
    let that = this
    let navIndex = e.currentTarget.dataset.nav
    that.setData({
      nav: navIndex
    })
  },

  // 清空搜索框
  deleteSearch() {
    let that = this
    that.setData({
      searchVal: '',
      showDelete: false,
      page: 1,
      items: []
    })
    that.getList()
  },

  // 监听搜索框
  onSearch(e) {
    // console.log(e)
    let that = this
    let value = e.detail.value
    if (value != '') {
      that.setData({
        showDelete: true
      })
    } else {
      that.setData({
        showDelete: false
      })
    }
    that.setData({ keyword: value, page: 1, items: [] })
    that.getList()
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
    this.getList()
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
    if (that.data.page * that.data.pagesize < that.data.count) {
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