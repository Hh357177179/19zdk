// pages/groupDetail/groupDetail.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemObj: {},
    id: '',
    image: [],
    extra: {},
    deletes: 0
  },

  editBtns () {
    let id = this.data.itemObj.id
    wx.navigateTo({
      url: `/pages/editGrow/editGrow?id=${id}`,
    })
  },

  getDetail () {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/mini/timeLineDetail', params, true).then(res => {
      console.log(res)
      let obj = {}
      if (res.extra) {
        obj = JSON.parse(res.extra)
      }
      that.setData({
        itemObj: res,
        image: res.images.split(','),
        extra: obj
      })
      console.log(that.data.extra)
    })
  },

  getUser () {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/user/myInfo', params, false).then(res => {
      that.setData({
        user: res.name
      })
    })
  },

  deleteList () {
    let that = this
    let params = {
      id: that.data.itemObj.id,
      token: app.globalData.token
    }
    postRequest('/mini/timeLineDel', params, true).then(res => {
      console.log(res)
      if (res) {
        util.showMsg('删除成功', '../../images/successIcon.png')
      }
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (options.deletes) {
      that.setData({ deletes: options.deletes })
    }
    console.log(options.id)
    that.setData({
      id: options.id
    })
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
    let that = this
    that.getDetail()
    that.getUser()
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