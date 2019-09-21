//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'

Page({
  data: {
    showDelete: false,
    searchVal: '',
    nav: 1,
    token: '',
    page: 1,
    pagesize: 10,
    title: '',
    count: 0,
    items: []
  },

  // 跳转详情
  navApply (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/apply/apply?id=${id}`,
    })
  },

  // 筛选列表
  navSort (e) {
    let that = this
    let navIndex = e.currentTarget.dataset.nav
    that.setData({
      nav: navIndex
    })
  },

  // 清空搜索框
  deleteSearch () {
    let that = this
    that.setData({
      searchVal: '',
      showDelete: false,
      page: 1,
      items:[]
    })
    that.getList()
  },

  // 监听搜索框
  onSearch (e) {
    console.log(e)
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
    that.setData({ title: value, page: 1, items: [] })
    that.getList()
  },
  

  // 获取首页列表
  getList () {
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
      stage: '',
      title: that.data.title,
      swords: '',
      format: '',
      type: '',
      address: '',
      time_min: '',
      time_max: ''
    }
    console.log(params)
    postRequest('/activity/index', params, true).then(res => {
      console.log(res)
      that.setData({
        count: res.count,
        items: that.data.items.concat(res.list)
      })
    })
  },

  
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.getList()
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
  }
})
