// pages/detailGame/detailGame.js
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
    pdfArr: [],
    link: []
  },

  getList () {
    let that = this
    let params = {
      token: app.globalData.token,
      match_id: that.data.id
    }
    postRequest('/user/matchDetail', params, true).then(res => {
      console.log(res)
      that.setData({
        itemObj: res,
        link: JSON.parse(res.link)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({id: options.id})
    that.getList()
  },

  navApply (e) {
    let that = this
    let link = e.currentTarget.dataset.link
    let id = link.split('activity_id=')
    console.log(id)
    // wx.navigateTo({
    //   url: `/pages/apply/apply?id=${id[1]}`,
    // })
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