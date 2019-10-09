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
      let linkArr = JSON.parse(res.link)
      console.log(linkArr)
      let arrs = []
      for (let i in linkArr) {
        let obj = {}
        if (linkArr[i].indexOf('dcqweb.zhaodaka.vip') != -1) {
          let indexStr = linkArr[i].indexOf('activity_id=')
          let str = linkArr[i].substr(indexStr + 12, 3)
          console.log(str)
          obj.state = 1
          obj.ids = str
          obj.path = ''
          arrs.push(obj)
        } else {
          obj.ids = '',
          obj.path = linkArr[i]
          obj.state = 0
          arrs.push(obj)
        }
      }
      console.log(arrs)
      that.setData({
        itemObj: res,
        link: arrs
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

  copyText (e) {
    console.log(e)
    let link = e.currentTarget.dataset.link
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: link,
      success: function (res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  navApply (e) {
    let that = this
    let id = e.currentTarget.dataset.link
    console.log(id)
    wx.navigateTo({
      url: `/pages/apply/apply?id=${id}`,
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