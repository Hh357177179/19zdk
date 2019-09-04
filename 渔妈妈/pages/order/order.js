//index.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'

Page({
  data: {
    nav: 1,
    items: [],
    likeItems: [],
    keyword: '',
    teacherPopu: false,
    navText: '搜索学校名称',
    schoolShow: true,
    noDataShow: false,
    communityShow: true,
    noDataText: '暂无符合条件的学校'
  },
  addHeart (e) {
    let that = this
    if (!wx.getStorageSync('phone') && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/phone/phone',
      })
      console.log('跳转注册页面')
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo != null) {
      let channel = e.currentTarget.dataset.channelid
      let params = {
        token: app.globalData.openid,
        channel_id: channel
      }
      postRequest('/user/likePublish', params, true).then(res => {
        that.getList()
        that.getLike()
      })
    }
  },
  getList () {
    let that = this
    let params = {
      type: that.data.nav,
      keyword: that.data.keyword
    }
    postRequest('/sign/channelList', params, true).then(res => {
      res.forEach(element => {
        element.like = 0
      })
      that.setData({
        items: res
      })
      if (that.data.nav == 1) {
        that.setData({
          noDataText: '暂无符合条件的学校'
        })
      } else {
        that.setData({
          noDataText: '暂无符合条件的社区'
        })
      }
      if (res.length == 0) {
        that.setData({
          noDataShow: true
        })
      } else {
        that.setData({
          noDataShow: false
        })
      }
    })
  },
  choNav (e){
    let that = this
    if (e.currentTarget.dataset.nav == 1) {
      that.setData({
        navText: '搜索学校名称'
      })
    } else {
      that.setData({
        navText: '搜索社区名称'
      })
    }
    that.setData({
      nav: e.currentTarget.dataset.nav,
      keyword: ''
    })
    that.getList()
    if (app.globalData.openid) {
      that.getLike()
    }
  },
  navCourse (e) {
    let that = this
    let chanelId = e.currentTarget.dataset.channel_id
    wx.navigateTo({
      url: `/pages/course/course?id=${chanelId}`,
    })
  },

  // 获取关注列表
  getLike () {
    let that = this
    let params = {
      token: app.globalData.openid
    }
    postRequest('/user/likeList', params, false).then(res => {
      console.log(res)
      for (let a = 0; a < res.channel_ids.length; a++) {
        console.log(res.channel_ids[a])
        for (let b = 0; b < that.data.items.length; b++) {
          if (res.channel_ids[a] == that.data.items[b].channel_id) {
            let likes = `items[${b}].like`;
            that.setData({
              [likes]: 1
            })
          }
        }
      }
    })
  },

  searchResult () {
    let that = this
    that.getList()
    if (app.globalData.openid) {
      that.getLike()
    }
  },

  onClose() {
    let that = this
    that.setData({
      teacherPopu: false
    })
  },

  searchShow () {
    let that = this
    that.setData({
      teacherPopu: true
    })
  },

  noVal (e) {
    let that = this
    that.setData({
      keyword: e.detail.value
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.getList()
  },
  onShow: function () {
    if (app.globalData.openid) {
      this.getLike()
    }
  }
})
