// pages/grow/grow.js
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
    token: '',
    noDates: false,
    nowTime: '',
    topStatus: 0,
    topArr: []
  },

  scrollPosition (e) {
    let that = this
    console.log(1)
    let arrs = []
    arrs = [...that.data.topArr, ...that.data.items]
    that.setData({
      items: arrs,
      topArr: []
    })
  },

  groupDetail(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let relation_id = e.currentTarget.dataset.relation_id
    let is_complete = e.currentTarget.dataset.is_complete
    console.log(type)
    if (type == 1 || type == 2 || type == 3 || type == 4) {
      wx.navigateTo({
        url: `/pages/groupDetail/groupDetail?id=${id}&deletes=${1}`,
      })
    } else if (type == 5) {
      wx.navigateTo({
        url: `/pages/apply/apply?id=${relation_id}`,
      })
    } else if (type == 6) {
      wx.navigateTo({
        url: `/pages/detailGame/detailGame?id=${relation_id}`,
      })
    } else if (type == 7 || type == 8) {
      if (is_complete == 0) {
        wx.navigateTo({
          url: `/pages/editGrow/editGrow?id=${id}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/groupDetail/groupDetail?id=${id}`,
        })
      }
    }
  },

  addGroup() {
    if (wx.getStorageSync('token') != '') {
      wx.navigateTo({
        url: '/pages/addGrows/addGrows',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  formDate(date) {
    let time = new Date(date * 1000)
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let D = time.getDate()
    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = "0" + D
    }
    return `${Y}-${M}-${D}`
  },

  getList() {
    let that = this
    let params = {
      token: that.data.token
    }
    postRequest('/mini/timeLine', params, true).then(res => {
      console.log(res)
      let bigTime = []
      let smallTime = []
      let obj = {}
      for (let a in res) {
        res[a].formTime = that.formDate(res[a].time)
      }
      
      for (let b = 0; b < res.length; b++) {
        if (that.data.nowTime > res[b].formTime && (!res[b + 1] || that.data.nowTime < res[b + 1].formTime)) {
          obj.states = 0
          obj.times = that.data.nowTime
          obj.formTime = that.data.nowTime
          res.splice(b + 1, 0, obj);
          break;
        }
      }
      console.log(that.data.nowTime)
      for (let c in res) {
        if (res[c].formTime >= that.data.nowTime) {
          bigTime.push(res[c])
        } else {
          smallTime.push(res[c])
        }
      }
      console.log(bigTime)
      if (res.length == 0) {
        that.setData({
          noDates: true
        })
      } else {
        that.setData({
          noDates: false
        })
      }
      that.setData({
        items: bigTime,
        topArr: smallTime
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let time = new Date()
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let D = time.getDate()
    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = "0" + D
    }
    that.setData({
      nowTime: `${Y}-${M}-${D}`
    })
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
    let that = this
    if (wx.getStorageSync('token') != '') {
      that.setData({
        token: wx.getStorageSync('token')
      })
      this.getList()
    } else {
      that.setData({
        noDates: true
      })
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})