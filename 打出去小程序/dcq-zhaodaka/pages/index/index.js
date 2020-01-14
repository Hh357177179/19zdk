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
    topArr: [],
    intoView:''
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

  returnToday() {
    let that = this;
    wx.createSelectorQuery().selectAll('.today-flag').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        // console.log(rect);
        // console.log("view" + rect.dataset.indexid);
       that.setData({
         intoView: "view" + rect.dataset.indexid
       });
      })
    }).exec()
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
      // for (let c in res) {
      //   if (res[c].formTime >= that.data.nowTime) {
      //     bigTime.push(res[c])
      //   } else {
      //     smallTime.push(res[c])
      //   }
      // }
      // console.log(bigTime)
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
        items: res,
        // topArr: smallTime
      })
      that.returnToday()
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

  // 获取比赛列表
  getGameList () {
    let that = this
    let params = {
      page: 1,
      pagesize: 20,
      token: that.data.token,
      sort: 'desc',
      swords: '',
      keyword: ''
    }
    console.log(params)
    postRequest('/user/matchList', params, true).then(res => {
      console.log('比赛列表',res)
      if (wx.getStorageSync('newGame') < res.list[0].id) {
        wx.showTabBarRedDot({
          index: 1
        })
      }
    })
  },

  // 获取训练列表
  getTraining () {
    let that = this
    let params = {
      page: 1,
      pagesize: 20,
      token: that.data.token,
      stage: '',
      title: '',
      swords: '',
      format: '',
      type: '',
      address: '',
      time_min: '',
      time_max: ''
    }
    postRequest('/mini/activityList', params, true).then(res => {
      console.log('训练列表',res)
      if (wx.getStorageSync('newTraining') < res.list[0].id) {
        wx.showTabBarRedDot({
          index: 2
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
    let that = this
    if (wx.getStorageSync('token') != '') {
      that.setData({
        token: wx.getStorageSync('token')
      })
      this.getList()
      this.getGameList()
      this.getTraining()
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