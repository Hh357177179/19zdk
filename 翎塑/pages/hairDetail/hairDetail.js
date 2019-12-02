// pages/hairDetail/hairDetail.js
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
    obj: {},
    id: ''
  },

  getDetail () {
    let that = this
    let params = {
      id: that.data.id,
      token: app.globalData.unionid
    }
    postRequest('/user/hairDetail', params, true).then(res => {
      console.log(res)
      that.setData({ obj: res })
    })
  },


  // 收藏
  collectClick(e) {
    let that = this
    console.log(e)
    let params = {
      token: app.globalData.unionid,
      hair_id: that.data.id
    }
    wx.request({
      url: `${util.baseUrl}/user/likeHair`,
      data: params,
      method: "POST",
      success: res => {
        let stateLike = `obj.is_like`
        console.log(stateLike)
        console.log(res)
        if (res.data.code == 201) {
          that.setData({
            [stateLike]: false
          })
          util.showMsg('取消收藏！')
        } else if (res.data.code == 200) {
          that.setData({
            [stateLike]: true
          })
          util.showMsg('收藏成功！')
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({ id: options.id })
    this.getDetail()
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

  }
})