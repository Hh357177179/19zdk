// pages/ranking/ranking.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['全部', '区域'],
    index: 0,
    place: '请选择区域',
    region: ['', '', ''],
    customItem: '',
    showArea: false,
    items: [],
    area: '',
    rankingObj: {}
  },

  getList () {
    let that = this
    let area = ''
    if (that.data.place == '请选择区域') {
      area = ''
    } else {
      area = that.data.place
    }
    let params = {
      token: wx.getStorageSync('token'),
      area: area
    }
    postRequest('/user/ranking', params, true).then(res => {
      console.log(res)
      that.setData({
        items: res
      })
    })
  },

  getArea () {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/user/getMyRanking', params, false).then(res => {
      console.log(res)
      that.setData({ rankingObj: res })
    })
  },

  bindPickerChange: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value
    })
    if (e.detail.value == 0) {
      that.setData({ showArea: false, items: [], region: ['', '', ''], place: '请选择区域' })
      this.getList()
    } else {
      that.setData({ showArea: true })
    }
  },

  bindRegionChange: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2],
      place: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getArea()
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