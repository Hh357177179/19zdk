// pages/teacherList/teacherList.js
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
    type: '',
    teacherPopu: false,
    teachName: '',
    allItems: [],
    noText: false,
    is_online: ''
  },

  noVal (e) {
    let that = this
    if (e.detail.value != '') {
      if (that.data.allItems.length != 0) {
        let arr = that.data.allItems.filter(x => x.teacher_name == e.detail.value)
        console.log(arr)
        that.setData({ items: arr })
        if (arr.length == 0) {
          that.setData({
            noText: true
          })
        } else {
          that.setData({
            noText: false,
            items: arr 
          })
        }
      }
    } else {
      that.setData({ 
        items: that.data.allItems,
        noText: false,
       })
    }
  },

  navSearch () {
    let that = this
    that.setData({
      teacherPopu: true
    })
  },

  onClose () {
    let that = this
    that.setData({
      teacherPopu: false
    })
  },

  getList () {
    let that = this
    let params = {
      type: that.data.type,
      is_online: that.data.is_online
    }
    postRequest('/user/allowTeacherList', params, true).then(res => {
      console.log(res)
      // if (res.length > 3) {
      //   that.setData({
      //     items: res.slice(0, 3),
      //     allItems: res
      //   })
      // } else {
        that.setData({
          items: res,
          allItems: res
        })
      // }
    })
  },

  choTime (e) {
    let that = this
    let obj = e.currentTarget.dataset.teacher
    app.globalData.allObj = obj
    let tid = obj.id
    wx.navigateTo({
      url: `/pages/choTime/choTime?type=${that.data.type}&&tid=${tid}&&line=${that.data.is_online}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      type: options.type,
      is_online: options.line
    })
    that.getList()
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