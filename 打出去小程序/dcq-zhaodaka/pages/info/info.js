// pages/info/info.js
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
    visibleTip: false,
    num: true,
    id: '',
    // showMask: false,
    place: '请选择居住地',
    nowDate: '',
    status: '',
    identityArr: ['监护人'],
    identity: '请选择身份',
    array: ['中国大陆', '其他国籍'],
    genderArr: ['男', '女'],
    swordsArr: ['花剑', '重剑', '佩剑', '各剑种', '花剑与佩剑', '花剑与重剑', '佩剑与重剑'],
    region: ['上海市', '市辖区', '长宁区'],
    customItem: '',
    genderText: '请选择性别',
    name: '', //姓名
    country: '请选择国籍', //国籍
    dateof: '请选择出生日期', // 出生
    gender: '', //性别
    swords: '请选择剑种', //剑种
    province: '', //省
    city: '', //市
    area: '', //区
    address: '', //详细地址,
    school: '', //学校
    unit: '', //单位
    photo: "", //肖像
    id_number: '', //身份证号
    passport_number: '', //护照号码
    guardian: '', //监护人
    relationship: '', //与选手关系
    phone: '', //联系电话
    email: '', //E-mall
    states: false
  },

  onClose () {
    let that = this
    that.setData({ visibleTip: false })
  },

  agreeXy () {
    let that = this
    that.setData({ num: !that.data.num })
  },

  // 上传
  upLoadPic() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${util.baseUrl}/user/upload`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'file': 'file'
          },
          success(res) {
            const data = JSON.parse(res.data)
            console.log(data)
            that.setData({
              photo: data.data
            })
          }
        })
      }
    })
  },

  bindIdentityChange (e) {
    console.log(e)
    let that = this
    let index = e.detail.value
    that.setData({
      identity: that.data.identityArr[index]
    })
  },

  showDialog () {
    let that = this
    that.setData({
      visibleTip: true
    })
  },

  emailVal (e) {
    let that = this
    that.setData({
      email: e.detail.value
    })
  },

  phoneVal (e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },

  relationshipVal (e) {
    let that = this
    that.setData({
      relationship: e.detail.value
    })
  },

  id_numberVal (e) {
    let that = this
    that.setData({
      id_number: e.detail.value
    })
  },

  passport_numberVal (e) {
    let that = this
    that.setData({
      passport_number: e.detail.value
    })
  },

  guardianVal (e) {
    let that = this
    that.setData({
      guardian: e.detail.value
    })
  },

  unitVal(e) {
    let that = this
    that.setData({
      unit: e.detail.value
    })
  },

  nameVal(e) {
    let that = this
    that.setData({
      name: e.detail.value
    })
  },

  addressVal(e) {
    let that = this
    that.setData({
      address: e.detail.value
    })
  },

  schoolVal(e) {
    let that = this
    that.setData({
      school: e.detail.value
    })
  },

  // 编辑选手
  editInfo () {
    let that = this
    let params = {
      id: that.data.id,
      name: that.data.name,
      country: that.data.country,
      dateof: that.data.dateof,
      swords: that.data.swords,
      province: that.data.province,
      gender: that.data.gender,
      city: that.data.city,
      area: that.data.area,
      address: that.data.address,
      school: that.data.school,
      unit: that.data.unit,
      photo: that.data.photo,
      id_number: that.data.id_number,
      passport_number: that.data.passport_number,
      guardian: that.data.guardian,
      relationship: that.data.relationship,
      phone: that.data.phone,
      email: that.data.email,
      token: wx.getStorageSync('token')
    }
    if (that.data.num == false) {
      util.showMsg('请勾选承诺书', '../../images/warning.png')
    } else if (params.name == '') {
      util.showMsg('请输入选手姓名', '../../images/warning.png')
    } else if (params.country == '') {
      util.showMsg('请选择国籍', '../../images/warning.png')
    } else if (params.dateof == '') {
      util.showMsg('请选择出生日期', '../../images/warning.png')
    } else if (params.gender == '') {
      util.showMsg('请选择性别', '../../images/warning.png')
    } else if (params.swords == '') {
      util.showMsg('请选择剑种', '../../images/warning.png')
    } else if (params.province == '') {
      util.showMsg('请选择居住地', '../../images/warning.png')
    } else if (params.address == '') {
      util.showMsg('请输入详细地址', '../../images/warning.png')
    } else if (params.photo == '') {
      util.showMsg('请上传头像', '../../images/warning.png')
    } else if (params.id_number == '' && params.passport_number == '') {
      util.showMsg('身份证或护照', '../../images/warning.png')
    } else if (params.guardian == '') {
      util.showMsg('请输入监护人', '../../images/warning.png')
    } else if (params.relationship == '') {
      util.showMsg('请输入选手关系', '../../images/warning.png')
    } else if (params.phone == '') {
      util.showMsg('请输入联系电话', '../../images/warning.png')
    } else {
      if (wx.getStorageSync('userInfo').status == 1) {
        postRequest('/user/authenticationPlayer', params, true).then(res => {
          console.log(res)
          util.showMsg('认证成功', '../../images/successIcon.png')
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        })
      } else {
        postRequest('/user/updateMyinfo', params, true).then(res => {
          console.log(res)
          util.showMsg('修改成功', '../../images/successIcon.png')
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        })
      }
    }
  },


  submitForm() {
    let that = this
    let state = wx.getStorageSync('userInfo').status
    console.log(state)
    if (state == 1) {
      console.log('新增')
      that.editInfo()
    } else if (state == 2) {
      console.log('编辑')
      that.editInfo()
    }
  },

  bindRegionChange: function(e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2],
      place: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`
    })
  },

  bindPickerChangeSwords: function(e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      swords: that.data.swordsArr[e.detail.value]
    })
  },

  bindPickerChange: function(e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == 0) that.setData({ passport_number: '' })
    if (e.detail.value == 1) that.setData({ id_number: '' }) 
    this.setData({
      country: that.data.array[e.detail.value]
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateof: e.detail.value
    })
  },

  bindPickerChangeGender: function(e) {
    let that = this
    let index = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (index == 0) {
      this.setData({
        genderText: '男',
        gender: '1'
      })
    } else {
      this.setData({
        genderText: '女',
        gender: '2'
      })
    }

  },

  // 查看我的信息
  getMeInfo() {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/user/myInfo', params, true).then(res => {
      console.log(res)
      if (res.gender == 1) {
        that.setData({ genderText: '男' })
      } else {
        that.setData({ genderText: 女 })
      }
      that.setData({
        id: res.id,
        name: res.name,
        country: res.country,
        dateof: res.dateof,
        swords: res.swords,
        province: res.province,
        gender: res.gender,
        city: res.city,
        area: res.area,
        place: `${res.province}/${res.city}/${res.area}`,
        address: res.address,
        school: res.school,
        unit: res.unit,
        photo: res.photo,
        id_number: res.id_number,
        passport_number: res.passport_number,
        guardian: res.guardian,
        relationship: res.relationship,
        phone: res.phone,
        email: res.email
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let date = new Date()
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    if (M < 10) M = '0' + M
    if (D < 10) D = '0' + D
    let status = wx.getStorageSync('userInfo').status
    if (status != '1') {
      console.log('调用查看我的信息')
      that.setData({
        states: false
      })
      that.getMeInfo()
    } else {
      that.setData({
        states: true
      })
      console.log('添加')
    }
    that.setData({
      status: status,
      nowDate: `${Y}-${M}-${D}`
    })
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