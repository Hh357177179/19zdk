// pages/addActive/addActive.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    weapon: '请选择剑种类型',
    weaponArr: [],
    venue: '',
    addtime: '请选择开始时间',
    endtime: '请选择结束时间',
    age: '',
    logo: ''
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
              logo: data.data
            })
          }
        })
      }
    })
  },
  
  sendActive () {
    let that = this
    if (that.data.name == '') {
      util.showMsg('请填写赛事名称', '../../images/warning.png')
    } else if (that.data.weapon == '请选择剑种类型') {
      util.showMsg('请选择剑种类型', '../../images/warning.png')
    } else if (that.data.venue == '') {
      util.showMsg('请填写比赛地址', '../../images/warning.png')
    } else if (that.data.addtime == '请选择开始时间') {
      util.showMsg('请选择开始时间', '../../images/warning.png')
    } else if (that.data.endtime == '请选择结束时间') {
      util.showMsg('请选择结束时间', '../../images/warning.png')
    } else if (that.data.age == '') {
      util.showMsg('请填写年龄资格', '../../images/warning.png')
    } else {
      let dates = ''
      let first = that.data.addtime.replace(/-/g, '/')
      let second = that.data.endtime.replace(/-/g, '/')
      dates = `${first}-${second}`
      let params = {
        token: app.globalData.token,
        name: that.data.name,
        weapon: that.data.weapon,
        venue: that.data.venue,
        dates: dates,
        age: that.data.age,
        eligibility: '',
        logo: that.data.logo
      }
      console.log(params)
      postRequest('/user/matchPublish', params, true).then(res => {
        util.showMsg('上传成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }
  },
  
  ageVal(e) {
    let that = this
    that.setData({
      age: e.detail.value
    })
  },

  bindEndChange(e) {
    let that = this
    that.setData({
      endtime: e.detail.value
    })
  },

  bindStartChange(e) {
    let that = this
    that.setData({
      addtime: e.detail.value
    })
  },

  nameVal (e) {
    let that = this
    that.setData({
      name: e.detail.value
    })
  },

  venueVal (e) {
    let that = this
    that.setData({
      venue: e.detail.value
    })
  },
  
  bindWeaponChange(e) {
    let that = this
    let index = e.detail.value
    that.setData({ weapon: that.data.weaponArr[index].name })
  },

  // 获取剑种
  getWeapon() {
    let that = this
    let params = {
      token: app.globalData.token
    }
    postRequest('/activity/swordsList', params, false).then(res => {
      console.log('剑种', res)
      that.setData({ weaponArr: res })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeapon()
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