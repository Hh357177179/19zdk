// pages/userAuther/userAuther.js
import { $wuxCalendar } from '../../dist/index'
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
    birthText: '请选择孩子的出生日期',
    value1: [],
    name: ''
  },

  nameVal (e) {
    let that = this
    that.setData({
      name: e.detail.value
    })
  },

  openCalendar1() {
    $wuxCalendar().open({
      value: this.data.value1,
      onChange: (values, displayValues) => {
        if (values.length == 0) {
          this.setData({
            birthText: '请选择孩子的出生日期'
          })
        } else {
          this.setData({
            value1: displayValues,
            birthText: ''
          })
        }
      },
    })
  },

  submitAdd () {
    let that = this
    if (that.data.name == '') {
      util.showMsg('姓名不能为空', '../../images/warning.png')
    } else if (that.data.value1.length == 0) {
      util.showMsg('生日不能为空', '../../images/warning.png')
    } else {
      let params = {
        token: app.globalData.openid,
        name: that.data.name,
        date: that.data.value1[0]
      }
      console.log(params)
      postRequest('/sign/authentication', params, true).then(res => {
        console.log(res)
        app.globalData.is_new = 0
        wx.navigateBack()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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