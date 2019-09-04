// pages/transcription/transcription.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
var timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    transcriptsVal: '',
    cursor: 0,
    tagIndex: 0,
    showTrue: false
  },

  // 轮询
  interSave() {
    let that = this
    timer = setInterval(() => {
      if (that.data.transcriptsVal != '') {
        that.saveData()
      }
    }, 5000)
  },

  // 获取回显
  getEcho () {
    let that = this
    let params = {
      order_id: that.data.order_id
    }
    postRequest('/user/orderDetail', params, true).then(res => {
      that.setData({
        transcriptsVal: res.transcripts
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      order_id: options.orderid
    })
    that.getEcho()
    that.interSave()
  },

  onTranscripts(e) {
    let that = this
    that.setData({
      transcriptsVal: e.detail.value,
      cursor: e.detail.cursor
    })
  },

  saveData() {
    let that = this
    let params = {
      token: app.globalData.openid,
      order_id: that.data.order_id,
      transcripts: that.data.transcriptsVal
    }
    postRequest('/user/transcripts', params, false).then(res => {
      // util.showMsg('发表成功', '../../images/successIcon.png')
      that.setData({
        showTrue: true
      })
      setTimeout(() => {
        that.setData({
          showTrue: false
        })
      }, 1500)
      if (that.data.tagIndex != 0) {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  subEvalue() {
    let that = this
    if (that.data.transcriptsVal != '') {
      that.setData({
        tagIndex: 0
      })
      that.saveData()
    }
  },
  subEvalueBack () {
    let that = this
    if (that.data.transcriptsVal != '') {
      that.setData({
        tagIndex: 1
      })
      that.saveData()
    }
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
    clearInterval(timer)
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