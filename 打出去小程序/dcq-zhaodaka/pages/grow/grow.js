//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'

Page({
  data: {
    noDataShow: false,
    showDelete: false,
    searchVal: '',
    nav: 1,
    token: '',
    page: 1,
    pagesize: 10,
    title: '',
    count: 0,
    items: [],
    visible: false,
    time_min: '',
    time_max: '',
    time_mins: '开始时间',
    time_maxs: '结束时间',
    typeArr: [],
    type: '',
    types: '请选择活动类型',
    stage: '',
    stageArr: [
      { id: '1', name: '正在筹备' },
      { id: '2', name: '即将开始' },
      { id: '3', name: '已经结束' },
    ],
    swordArr: [],
    swords: '',
    swordsId: '0',
    address: ''
  },
  titleVal (e) {
    let that = this
    that.setData({
      title: e.detail.value
    })
  },
  addressVal (e) {
    let that = this
    that.setData({
      address: e.detail.value
    })
  },
  restBtn () {
    let that = this
    that.setData({
      page: 1,
      stage: '',
      title: '',
      swords: '',
      type: that.data.type,
      types: '请选择活动类型',
      time_min: '',
      time_max: '',
      time_mins: '开始时间',
      time_maxs: '结束时间',
      swordsId: '0',
      address: ''
    })
    that.setData({ items: [], page: 1 })
    that.getList()
  },

  trueSearch () {
    let that = this
    that.setData({ items: [], page: 1 })
    that.getList()
  },

  stageClick (e) {
    console.log(e)
    let that = this
    that.setData({
      stage: e.currentTarget.dataset.stage_num
    })
  },
  swordsClick (e) {
    let that = this
    that.setData({
      swordsId: e.currentTarget.dataset.swords_num,
      swords: e.currentTarget.dataset.name
    })
  },

  getSwordList () {
    let that = this
    let params = {
      token: that.data.token
    }
    postRequest('/activity/swordsList', params, true).then(res => {
      console.log(res)
      that.setData({
        swordArr: res
      })
    })
  },

  bindTypeChange (e) {
    console.log(e)
    let that = this
    that.setData({
      types: that.data.typeArr[e.detail.value].name,
      type: that.data.typeArr[e.detail.value].name,
    })
  },

  // 获取活动类型
  getTypeList () {
    let that = this
    let params = {
      token: that.data.token
    }
    postRequest('/activity/typeList', params, true).then(res => {
      console.log(res)
      that.setData({ typeArr: res })
    })
  },

  bindStartChange (e) {
    console.log(e)
    let that = this
    that.setData({
      time_min: e.detail.value,
      time_mins: e.detail.value
    })
  },

  bindEndChange(e) {
    console.log(e)
    let that = this
    that.setData({
      time_max: e.detail.value,
      time_maxs: e.detail.value
    })
  },

  onClose () {
    let that = this
    that.setData({
      visible: false
    })
  },

  filtratePopu () {
    console.log('弹出层')
    let that = this
    that.setData({
      visible: true
    })
  },

  // 添加训练
  addDrill () {
    if (wx.getStorageSync('token') != '') {
      wx.navigateTo({
        url: '/pages/addDrill/addDrill',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 跳转详情
  navApply (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    if (wx.getStorageSync('token') != '') {
      wx.navigateTo({
        url: `/pages/apply/apply?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 筛选列表
  navSort (e) {
    let that = this
    let navIndex = e.currentTarget.dataset.nav
    that.setData({
      nav: navIndex
    })
  },
  

  // 获取首页列表
  getList () {
    let that = this
    let time_min = ''
    let time_max = ''
    if (wx.getStorageSync('token') == '') {
      that.setData({ token: app.globalData.fakeToken })
    } else {
      that.setData({ token: wx.getStorageSync('token') })
    }
    if (that.data.time_min == '开始时间') {
      that.setData({ time_min: '' })
    } else {
      time_min = new Date(that.data.time_min) / 1000
    }
    if (that.data.time_max == '结束时间') {
      that.setData({ time_max: '' })
    } else {
      time_max = new Date(that.data.time_max) / 1000
    }
    if (that.data.type == '请选择活动类型') {
      that.setData({ type: ''})
    }
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: that.data.token,
      stage: that.data.stage,
      title: that.data.title,
      swords: that.data.swords,
      format: '',
      type: that.data.type,
      address: that.data.address,
      time_min: time_min,
      time_max: time_max
    }
    console.log(params)
    postRequest('/mini/activityList', params, true).then(res => {
      console.log(res)
      if (res.count == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      if (wx.getStorageSync('token')) {
        wx.setStorageSync("newTraining", res.list[0].id)
        wx.hideTabBarRedDot({
          index: 2
        })
      }
      that.setData({
        count: res.count,
        items: that.data.items.concat(res.list),
        visible: false
      })
    })
  },

  
  onLoad: function (options) {
    this.getTypeList();
    this.getSwordList();
  },
  onShow: function () {
    let that = this
    that.setData({ items: [] })
    that.getList()
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
