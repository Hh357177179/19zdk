// pages/workShop/workShop.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest,
  getRequest
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

const {
  year,
  month,
  day,
  hour,
  minute
} = getDateString()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value6: [year, month, day, hour, '0'],
    lang: 'zh_CN',
    timePopup: false,
    times: [],
    beginTime: '请选择开课时间',
    address: '',
    money: '',
    number: '',
    desc: '',
    id: ''
  },

  submitBtn () {
    let that = this 
    if (that.data.beginTime == '请选择开课时间') {
      util.showMsg('请选择时间', '../../images/warning.png')
    } else if (that.data.address == '') {
      util.showMsg('请填写地址', '../../images/warning.png')
    } else if (that.data.money == '') {
      util.showMsg('请填写费用', '../../images/warning.png')
    } else if (that.data.number == '') {
      util.showMsg('请填写人数', '../../images/warning.png')
    } else if (that.data.desc == '') {
      util.showMsg('请填写描述', '../../images/warning.png')
    } else {
      let str = that.data.beginTime.replace(/-/g, "/")
      let date = new Date(str).getTime() / 1000
      let params = {
        token: app.globalData.openid,
        start_time: date,
        address: that.data.address,
        money: that.data.money,
        number: that.data.number,
        desc: that.data.desc
      }
      console.log(params)
      postRequest('/user/publishWorkshop', params, true).then(res => {
        console.log(res)
        if (res) {
          util.showMsg('发布成功', '../../images/successIcon.png')
          that.setData({
            beginTime: '请选择开课时间',
            address: '',
            money: '',
            number: '',
            desc: ''
          })
        }
      })
    }
  },

  descVal (e) {
    let that = this
    that.setData({
      desc: e.detail.value
    })
  },

  numberVal (e) {
    let that = this
    that.setData({
      number: e.detail.value
    })
  },

  moneyVal (e) {
    let that = this
    that.setData({
      money: e.detail.value
    })
  },

  addressVal (e) {
    let that = this
    that.setData({
      address: e.detail.value
    })
  },

  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    // console.log(`onValueChange${index}`, e.detail)
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

  // 选择时间
  timeTrue() {
    let that = this
    console.log(that.data.times)
    if (that.data.times != '') {
      that.setData({
        beginTime: that.data.times
      })
    } else {
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      that.setData({
        beginTime: `${Y}-${M}-${D} ${h}:00`
      })
    }
    that.setData({
      timePopup: false
    })
  },

  timeList() {
    let that = this
    that.setData({
      timePopup: true
    })
  },

  timeClose() {
    let that = this
    that.setData({
      timePopup: false
    })
  },

  getDetail () {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/user/workshopDetail', params, true).then(res => {
      console.log('获取详情',res)
      if (res) {
        let date = new Date(res.start_time * 1000)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let hh = date.getHours()
        let mm = date.getMinutes()
        if (mm < 10) {
          mm = '0' + mm
        }
        let strDate = `${y}-${m}-${d} ${hh}:${mm}`
        console.log(strDate)
        that.setData({
          money: res.money,
          desc: res.desc,
          address: res.address,
          number: res.number,
          beginTime: strDate
        })
      }
    })
  },

  editBtn () {
    let that = this
    if (that.data.beginTime == '请选择开课时间') {
      util.showMsg('请选择时间', '../../images/warning.png')
    } else if (that.data.address == '') {
      util.showMsg('请填写地址', '../../images/warning.png')
    } else if (that.data.money == '') {
      util.showMsg('请填写费用', '../../images/warning.png')
    } else if (that.data.number == '') {
      util.showMsg('请填写人数', '../../images/warning.png')
    } else if (that.data.desc == '') {
      util.showMsg('请填写描述', '../../images/warning.png')
    } else {
      let str = that.data.beginTime.replace(/-/g, "/")
      let date = new Date(str).getTime() / 1000
      let params = {
        token: app.globalData.openid,
        workshop_id: that.data.id,
        start_time: date,
        address: that.data.address,
        money: that.data.money,
        number: that.data.number,
        desc: that.data.desc
      }
      console.log(params)
      postRequest('/user/editWorkshop', params, true).then(res => {
        console.log(res)
        if (res) {
          util.showMsg('修改成功', '../../images/successIcon.png')
          that.setData({
            beginTime: '请选择开课时间',
            address: '',
            money: '',
            number: '',
            desc: ''
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('参数',options)
    let that = this
    if (options.id) {
      that.setData({ id: options.id })
      that.getDetail()
    }
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