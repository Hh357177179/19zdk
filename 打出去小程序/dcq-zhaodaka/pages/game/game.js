// pages/game/game.js
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
    navNum: 1,
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
    visible: false,
    likeStatus: false,
    timeNow: null,
    showGame: true,
    showReward: false,
    rewardItems: [],
    swordsArr: ['花剑', '重剑', '佩剑'],
    swordsText: '请选择剑种',
    swords: '',
    showSwords: false,
    noDataShow: false
  },

  deleteSwords () {
    let that = this
    that.setData({
      swordsText: '请选择剑种',
      swords: '',
      page: 1,
      items: [],
      showSwords: false
    })
    that.getList()
  },

  bindSwordsChange (val) {
    console.log(val)
    let that = this
    that.setData({
      swordsText: that.data.swordsArr[val.detail.value],
      swords: that.data.swordsArr[val.detail.value],
      page: 1,
      items: [],
      showSwords: true
    })
    that.getList()
  },

  navTab (e) {
    let that = this
    let num = e.currentTarget.dataset.num
    that.setData({
      navNum: num,
      page: 1,
      count: 0,
      items: []
    })
    if (num == 1) {
      that.getList()
      that.setData({
        showGame: true,
        showReward: false
      })
    } else {
      that.getRewardList()
      that.setData({
        showGame: false,
        showReward: true
      })
    }
  },

  addDrill () {
    if (wx.getStorageSync('token') != '') {
      if (this.data.navNum == 1) {
        wx.navigateTo({
          url: '/pages/addActive/addActive',
        })
      } else {
        wx.navigateTo({
          url: '/pages/addReward/addReward',
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 获取悬赏
  getRewardList () {
    let that = this
    if (wx.getStorageSync('token') == '') {
      that.setData({
        token: app.globalData.fakeToken
      })
    } else {
      that.setData({
        token: wx.getStorageSync('token')
      })
    }
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: that.data.token,
    }
    postRequest('/user/questionList', params, true).then(res => {
      console.log('悬赏列表', res)
      that.setData({
        count: res.count,
        rewardItems: that.data.items.concat(res.list)
      })
    })
  },

  navGame(e) {
    let that = this
    if (wx.getStorageSync('token') == '') {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      if (wx.getStorageSync('isVip') < that.data.timeNow) {x
        that.setData({
          visible: true
        })
      } else {
        that.setData({
          visible: false
        })
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: `/pages/detailGame/detailGame?id=${id}`,
        })
      }
    }
  },

  // 点赞或者取消
  collectClick(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let status = e.currentTarget.dataset.status
    let params = {
      token: wx.getStorageSync('token'),
      match_id: id
    }
    postRequest('/user/likePublish', params, false).then(res => {
      let isLike = `items[${index}].is_like`
      let num = `items[${index}].like_num`
      that.setData({
        [isLike]: !status
      })
      if (status == false) {
        that.setData({
          [num]: that.data.items[index].like_num + 1
        })
      } else {
        that.setData({
          [num]: that.data.items[index].like_num - 1
        })
      }
      util.showMsg(res, '../../images/successIcon.png')
    })
  },

  onClose() {
    this.setData({
      visible: false
    })
  },

  // 获取首页列表
  getList() {
    let that = this
    if (wx.getStorageSync('token') == '') {
      that.setData({
        token: app.globalData.fakeToken
      })
    } else {
      that.setData({
        token: wx.getStorageSync('token'),
        likeStatus: true
      })
    }
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: that.data.token,
      sort: that.data.sort,
      swords: that.data.swords,
      keyword: that.data.keyword
    }
    console.log(params)
    postRequest('/user/matchList', params, true).then(res => {
      console.log(res)
      if (res.count == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      if (wx.getStorageSync('token')) {
        wx.setStorageSync("newGame", res.list[0].id)
        wx.hideTabBarRedDot({
          index: 1
        })
      }
      that.setData({
        count: res.count,
        items: that.data.items.concat(res.list)
      })
    })
  },

  clickTrue() {
    let that = this
    if (wx.getStorageSync('token') == '') {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      if (wx.getStorageSync('isVip') == 0) {
        that.setData({
          visible: false
        })
        wx.navigateTo({
          url: '/pages/vip/vip',
        })
      }
    }
    that.setData({
      visible: false
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
      title: '',
      keyword: '',
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
    that.setData({
      keyword: value,
      page: 1,
      items: []
    })
    that.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let date = Date.parse(new Date()) / 1000
    console.log(date)
    that.setData({
      timeNow: date
    })
  },

  getDotList () {
    let that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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
  onShareAppMessage: function() {

  }
})