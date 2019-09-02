// pages/teacherEvalue/teacherEvalue.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest, getRequest
} from '../../utils/httpRequest.js'
function getDateString(date = new Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }
}

const { year, month, day, hour, minute } = getDateString()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cheOnline: false,
    disInput: true,
    classValue: 120,
    times: '',
    allTime: {},
    localText: '地址',
    beginTime: '开课时间',
    isVip: 0,
    price: '',
    other_price: '',
    address: '',
    begin_time: '',
    showOther: false,
    placePopup: false,
    placeItem: [],
    indexs: 0,
    texts: '',
    value6: [year, month, day, hour, '0'],
    lang: 'zh_CN',
    timePopup: false,
    online: 0,
    is_online: 0,
  },

  timeList () {
    let that = this
    that.setData({
      timePopup: true
    })
  },

  setValue(values, key) {
    console.log(values)
    if (values.value[4] == '0') {
      this.setData({
        [`value${key}`]: values.value,
        [`displayValue${key}`]: values.displayValue.join(' '),
        times: `${values.value[0]}-${Number(values.value[1]) + 1}-${values.value[2]} ${values.value[3]}:${values.value[4]}0`
      })
    } else {
      this.setData({
        [`value${key}`]: values.value,
        [`displayValue${key}`]: values.displayValue.join(' '),
        times: `${values.value[0]}-${Number(values.value[1]) + 1}-${values.value[2]} ${values.value[3]}:${values.value[4]}`
      })
    }
  },

  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    console.log(`onValueChange${index}`, e.detail)
  },

  choPlaces (e) {
    let that = this
    let index = e.currentTarget.dataset.indexs
    let text = e.currentTarget.dataset.text
    that.setData({
      indexs: index,
      texts: text
    })
  },

  trueBtn () {
    let that = this
    that.setData({
      address: that.data.texts,
      localText: that.data.texts,
      placePopup: false
    })
  },

  timeClose () {
    let that = this
    that.setData({
      timePopup: false
    })
  },

  timeTrue () {
    let that = this
    if (that.data.times != '') {
      that.setData({
        beginTime: that.data.times,
        timePopup: false
      })
    } else {
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      that.setData({
        beginTime: `${Y}-${M}-${D} ${h}:${m}`,
        timePopup: false
      })
    }
  },

  onClose () {
    let that = this
    that.setData({
      placePopup: false,
      indexs: 0
    })
  },

  classVal (e) {
    let that = this
    that.setData({
      classValue: e.detail.value
    })
  },

  localList () {
    let that = this
    let params = {}
    getRequest('/user/addressList', params, true).then(res => {
      console.log(res)
      that.setData({
        placeItem: res,
        placePopup: true
      })
    })
  },

  otherVal (e) {
    let that = this
    that.setData({
      other_price: e.detail.value
    })
  },

  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    let that = this
    if (e.detail.value == true) {
      that.setData({
        isVip: 1,
        showOther: true,
        disInput: false,
        classValue: ''
      })
    } else {
      that.setData({
        isVip: 0,
        showOther: false,
        other_price: '',
        disInput: true,
        classValue: 120
      })
    }
  },

  onlineSwitch (e) {
    console.log('携带值为', e.detail.value)
    let that = this
    if (e.detail.value == true) {
      that.setData({
        is_online: 1,
        isVip: 0,
        showOther: false,
        other_price: '',
        address: '在线预约',
        beginTime: '开课时间',
        classValue: 80
      })
    } else {
      that.setData({
        is_online: 0,
        isVip: 0,
        showOther: false,
        other_price: '',
        address: '',
        localText: '地址',
        beginTime: '开课时间',
        classValue: 120
      })
    }
  },

  sendIssue () {
    let that = this
    if (that.data.address == '') {
      util.showMsg('请选择地点', '../../images/warning.png')
    } else if (that.data.beginTime == '开课时间') {
      util.showMsg('请选择时间', '../../images/warning.png')
    } else if (that.data.classValue == '') {
      util.showMsg('请输入课时费', '../../images/warning.png')
    } else {
    let times = that.data.beginTime.replace(/-/g, '/')
    console.log(times)
    let time = (new Date(times).getTime() / 1000)
    console.log(time)
    console.log(that.data.beginTime)
      let params = {
        token: app.globalData.openid,
        is_vip: that.data.isVip,
        address: that.data.address,
        begin_time: time,
        price: that.data.classValue,
        other_price: that.data.other_price,
        is_online: that.data.is_online
      }
      console.log(params)
      postRequest('/user/publishAppointment', params, true).then(res => {
        console.log(res)
        util.showMsg('发布成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/me/me',
          })
        }, 1500)
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