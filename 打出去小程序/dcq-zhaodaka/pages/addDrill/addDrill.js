// pages/addDrill/addDrill.js
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
    dateof: '请选择最晚出生年龄',
    dateofnow: '请选择最早出生年龄',
    array: [1999,2000,2001,2002,2003,2004,2005,2006,2007],
    otherAsk: '',
    otherInvite: '',
    activeTitle: '',
    typeArr: [],
    weaponArr: [],
    formatArr: [],
    placeArr: [],
    types: '请选择活动类型',
    people_number: '',
    swords: '请选择剑种类型',
    format: '请选择赛制类型',
    club: '请选择活动场地',
    address: '',
    addtime: '请选择开始时间',
    endtime: '请选择结束时间',
    money: '',
    parent_name: '',
    player_name: '',
    parent_phone: '',
    photo: '',
    note: ''
  },

  sendActive () {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      type: that.data.types,
      title: that.data.activeTitle,
      address: that.data.address,
      requirement: `${that.data.dateof}—${that.data.dateofnow}之间出生的剑手 ${that.data.otherAsk} ${that.data.otherInvite}`,
      addtime: new Date(that.data.addtime) / 1000,
      endtime: new Date(that.data.endtime) / 1000,
      format: that.data.format,
      swords: that.data.swords,
      money: that.data.money,
      people_number: that.data.people_number,
      parent_name: that.data.parent_name,
      player_name: that.data.player_name,
      parent_phone: that.data.parent_phone,
      note: that.data.note,
      logo: that.data.photo
    }
    console.log(params)
    postRequest('/activity/publish', params, true).then(res => {
      console.log(res)
      util.showMsg('发布成功', '../../images/successIcon.png')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    })
  },

  addressVal (e) {
    let that = this
    that.setData({
      address: e.detail.value
    })
  },

  noteVal (e) {
    let that = this
    that.setData({
      note: e.detail.value
    })
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

  parentPhoneVal (e) {
    let that = this
    that.setData({ parent_phone: e.detail.value })
  },

  playerNameVal (e) {
    let that = this
    that.setData({ player_name: e.detail.value })
  },

  parentNameVal (e) {
    let that = this
    that.setData({ parent_name: e.detail.value })
  },

  moneyVal (e) {
    let that = this
    console.log(e)
    that.setData({ money: e.detail.value})
  },

  bindEndChange (e) {
    let that = this
    that.setData({
      endtime: e.detail.value
    })
  },

  bindStartChange (e) {
    let that = this
    that.setData({
      addtime: e.detail.value
    })
  },

  bindPlaceChange (e) {
    let that = this
    console.log(e)
    let index = e.detail.value
    that.setData({ club: that.data.placeArr[index].name, address: that.data.placeArr[index].address })
  },

  bindFormatChange (e) {
    let that = this
    console.log(e)
    let index = e.detail.value
    that.setData({ format: that.data.formatArr[index].name })
  },

  bindWeaponChange (e) {
    let that = this
    console.log(e)
    let index = e.detail.value
    that.setData({ swords: that.data.weaponArr[index].name })
  },

  peopleNumberVal (e) {
    let that = this
    that.setData({ people_number: e.detail.value })
  },
  
  bindTypeChange (e) {
    let that = this
    let index = e.detail.value
    that.setData({
      types: that.data.typeArr[index].name
    })
  },

  activeTitleVal (e) {
    let that = this
    that.setData({ activeTitle: e.detail.value })
  },

  otherAskVal (e) {
    let that = this
    that.setData({ otherAsk: e.detail.value })
  },
  
  otherInviteVal (e) {
    let that = this
    that.setData({ otherInvite: e.detail.value })
  },

  bindYearChange (e) {
    let that = this
    let index = e.detail.value
    that.setData({
      dateof: that.data.array[index]
    })
  },

  bindYearNowChange (e) {
    let that = this
    let index = e.detail.value
    if (that.data.array[index] > that.data.dateof) {
      util.showMsg('不可大于最晚出生年龄')
    } else {
      that.setData({
        dateofnow: that.data.array[index]
      })
    }
  },

  // 获取活动类型
  getType () {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/activity/typeList', params, false).then(res => {
      console.log('类型', res)
      that.setData({ typeArr: res })
    })
  },

  // 获取剑种
  getWeapon () {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/activity/swordsList', params, false).then(res => {
      console.log('剑种',res)
      that.setData({ weaponArr: res })
    })
  },

  // 获取赛制
  getFormat () {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/activity/formatList', params, false).then(res => {
      console.log('赛制',res)
      that.setData({ formatArr: res })
    })
  },

  // 获取地址
  getPlace () {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/activity/addressList', params, false).then(res => {
      console.log('场地',res)
      that.setData({ placeArr: res })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getType()
    this.getWeapon()
    this.getFormat()
    this.getPlace()
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