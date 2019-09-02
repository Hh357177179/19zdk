// pages/sendTeacher/sendTeacher.js
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
    teacherName: '请选择老师姓名',
    timeText: '时间'
  },

  sendTeacherOrder() {
    let that = this
    if (!wx.getStorageSync('phone') && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/phone/phone',
      })
      console.log('跳转注册页面')
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo != null) {
      let params = {
        token: app.globalData.openid,
        appointment_id: app.globalData.timeObj.id,
        is_other: 0,
        address: ''
      }
      postRequest('/user/createOrder', params, true).then(res => {
        console.log(res)
        let param = {
          token: app.globalData.openid,
          order_id: res.order_id
        }
        postRequest('/user/orderPay', param, true).then(resConfig => {
          console.log(resConfig)
          let configs = JSON.parse(resConfig.config)
          wx.requestPayment({
            timeStamp: configs.timeStamp,
            nonceStr: configs.nonceStr,
            package: configs.package,
            signType: configs.signType,
            paySign: configs.paySign,
            'success': function (res) {
              util.showMsg('预约成功', '../../images/successIcon.png')
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1500)
            },
            'fail': function (res) {
              console.log(res)
              // util.showMsg('购买失败！')
            },
          })
        })
      })
    }
  },

  // 获取订单详情
  getPrice() {
    let that = this
    let params = {
      appointment_id: app.globalData.timeObj.id
    }
    postRequest('/user/appointmentDetail', params, false).then(res => {
      that.setData({
        price: Number(res.price)
      })
    })
  },

  // 时间格式化
  dateTime(time) {
    var date = new Date(time);
    var M = date.getMonth() + 1;
    var y = date.getFullYear();
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds()

    if (M < 10) M = "0" + M;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    let strTime = `${y}-${M}-${d} ${h}:${m}`
    return strTime
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.dateTime(app.globalData.timeObj.begin_time * 1000)
    let times = that.dateTime(app.globalData.timeObj.begin_time * 1000)
    that.setData({
      teacherName: app.globalData.teacherObj.teacher_name,
      timeText: times
    })
    that.getPrice()
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