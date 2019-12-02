// pages/order/order.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
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
  data: {
    disSub: true,
    nums: 1,
    teachname: '',
    teachindex: -1,
    visibleTeach: false,
    technician: '',
    time: '',
    noServer: false,
    visibleTime: false,
    pid: 0,
    options: [],
    secondItem: [],
    visible: false,
    ids: -1,
    chooseArr: [],
    value1: [year, month, day, hour, minute],
    teacherItem: [],
    cate_ids: '',
    note: '',
    phone: '',
    employee_id: '',
    time: ''
  },
  setValue(values, key) {
    let that = this
    that.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.displayValue.join(' '),
      times: `${values.value[0]}-${values.value[1]}-${values.value[2]} ${values.value[3]}:${values.value[4]}`
    })
  },
  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
  },

  noteVal (e) {
    let that = this
    let notes = e.detail.value
    that.setData({
      note: notes
    })
  },
  phoneVal(e) {
    let that = this
    let phones = e.detail.value
    that.setData({
      phone: phones
    })
  },

  sendOrder () {
    let that = this
    if (that.data.cate_ids == '') {
      util.showMsg('请选择服务项目')
    } else if (that.data.time == '') {
      util.showMsg('请选择预约时间')
    } else if (that.data.phone == '') {
      util.showMsg('请填写手机号码')
    } else {
      let params = {
        token: app.globalData.unionid,
        cate_pid: 1,
        cate_ids: that.data.cate_ids,
        time: that.data.time,
        employee_id: that.data.employee_id,
        number: that.data.nums,
        phone: that.data.phone,
        note: that.data.note
      }
      console.log('传递参数', params)
      postRequest('/user/appointment', params, true).then(res => {
        wx.redirectTo({
          url: '/pages/success/success'
        })
      })
    }
  },

  subNum () {
    let that = this
    if (that.data.nums > 1) {
      that.setData({
        nums: that.data.nums - 1,
      })
    } else {
      that.setData({disSub: true})
    }
  },

  addNum () {
    let that = this
    that.setData({
      nums: that.data.nums + 1,
      disSub: false
    })
  },

  showTeach () {
    let that = this
    that.setData({
      visibleTeach: true
    })
  },

  showServer () {
    let that = this
    that.setData({
      visible: true
    })
  },

  showTime () {
    let that = this
    that.setData({
      visibleTime: true
    })
  },

  onCloseTeach() {
    let that = this
    that.setData({
      visibleTeach: false,
      // teachindex: -1,
      // teachname: ''
    })
  },

  choTeach (e) {
    let that = this
    that.setData({
      teachindex: e.currentTarget.dataset.teachindex,
      teachname: e.currentTarget.dataset.technician
    })
  },

  trueBtnTeach () {
    let that = this
    that.setData({
      employee_id: that.data.teachindex,
      technician: that.data.teachname,
      visibleTeach: false
    })
    console.log('选择的技师',that.data.employee_id)
  },

  // 获取服务项目
  getServer () {
    let that = this
    let params = {
      pid: that.data.pid
    }
    postRequest('/user/cateList', params, false).then(res => {
      that.setData({
        options: res,
        ids: res[0].id
      })
      console.log('服务', that.data.options)
      that.getSecond()
    })
  },

  // 选择一级服务
  choBigTitle (e) {
    let that = this
    that.setData({
      ids: e.currentTarget.dataset.ids
    })
    that.getSecond()
  },

  // 根据一级获取二级
  getSecond () {
    let that = this
    let params = {
      pid: that.data.ids
    }
    postRequest('/user/cateList', params, false).then(res => {
      if (res.length == 0) {
        that.setData({
          noServer: true
        })
      } else {
        that.setData({
          noServer: false
        })
      }
      res.forEach(item => {
        item.choose = false
      });
      that.setData({
        secondItem: res,
      })
      console.log('二级', that.data.secondItem)
    })
  },

  // 选择二级
  choSecond (e) {
    let that = this
    let arr = `secondItem[${e.currentTarget.dataset.secondindex}].choose`
    that.setData({
      [arr]: !that.data.secondItem[e.currentTarget.dataset.secondindex].choose
    })
  },

  onClose () {
    let that = this
    that.setData({
      visible: false
    })
  },

  onCloseTime () {
    let that = this
    that.setData({
      visibleTime: false
    })
  },

  trueBtnTime () {
    let that = this
    let value = that.data.value1
    value[1] = Number(value[1]) + 1
    if (value[1] < 10) value[1] = '0' + value[1]
    if (value[2] < 10) value[2] = '0' + value[2]
    if (value[3] < 10) value[3] = '0' + value[3]
    if (value[4] < 10) value[4] = '0' + value[4]
    that.setData({
      displayValue1: `${value[0]}年 ${value[1]}月 ${value[2]}日 ${value[3]}时 ${value[4]}分`,
      times: `${value[0]}/${value[1]}/${value[2]} ${value[3]}:${value[4]}`
    })
    console.log(that.data.times)
    let str = new Date(that.data.times).getTime() / 1000
    // console.log(str)
    that.setData({
      time: str,
      visibleTime: false
    })
  },

  trueBtn () {
    let that = this
    let arrs = []
    let arrStr = []
    arrs = that.data.secondItem.filter(item => item.choose == true)
    arrs.forEach(element => {
      arrStr.push(element.id)
    });
    that.setData({
      cate_ids: arrStr.join(','),
      chooseArr: arrs,
      visible: false
    })
    console.log('选中的服务', that.data.cate_ids)
  },

  // 获取技师列表
  getTeacher () {
    let that = this
    let params = {
      cate_id: 1
    }
    postRequest('/user/employeeList', params, false).then(res => {
      console.log(res)
      that.setData({
        teacherItem: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getServer()
    that.getTeacher()
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