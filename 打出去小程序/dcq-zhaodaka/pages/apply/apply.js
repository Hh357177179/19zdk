// pages/apply/apply.js
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
    activity_id: '',
    token: '',
    itemObj: {},
    meUserId: '',
    code: '',
    is_deduction: 0,
    package_id: 0,
    message: '',
    packageItem: [],
    packageText: '请选择您要购买的套餐',
    packageObj: {},
    showContent: false
  },

  createdImg() {
    wx.navigateTo({
      url: `/pages/cratedImg/cratedImg?id=${this.data.itemObj.id}&type=1`,
    })
  },

  textAreaVal(e) {
    let that = this
    that.setData({
      message: e.detail.value
    })
  },

  bindPickerPackage(e) {
    console.log('选中', e)
    let that = this
    let index = e.detail.value
    let chooseItem = {}
    chooseItem = that.data.packageItem[index]
    console.log(chooseItem)
    that.setData({
      package_id: chooseItem.package_id,
      packageText: chooseItem.title,
      packageObj: chooseItem,
      showContent: true
    })
  },

  clickCollect() {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      relation_id: that.data.itemObj.id,
      type: 5
    }
    postRequest('/mini/collect', params, true).then(res => {
      console.log(res)
      let isLike = `itemObj.is_collect`
      if (res == 1) {
        util.showMsg('收藏成功', '../../images/successIcon.png')
        that.setData({
          [isLike]: true
        })
      } else {
        util.showMsg('取消收藏', '../../images/successIcon.png')
        that.setData({
          [isLike]: false
        })
      }
    })
  },

  // 报名
  applyBtn() {
    let that = this
    if (that.data.packageItem.length != 0) {
      if (that.data.package_id == '') {
        util.showMsg('请选择套餐', '../../images/warning.png')
      } else {
        let params = {
          token: wx.getStorageSync('token'),
          activity_id: that.data.itemObj.id,
          code: that.data.code,
          is_deduction: that.data.is_deduction,
          package_id: that.data.package_id,
          message: that.data.message
        }
        console.log('请求参数', params)
        postRequest('/activity/orderCreate', params, true).then(res => {
          console.log(res)
          let param = {
            token: wx.getStorageSync('token'),
            order_id: res.order_id
          }
          postRequest('/mini/activityOrderPayByMini', param, true).then(res => {
            let configs = JSON.parse(res.config)
            wx.requestPayment({
              timeStamp: configs.timeStamp,
              nonceStr: configs.nonceStr,
              package: configs.package,
              signType: configs.signType,
              paySign: configs.paySign,
              'success': function (resSuccess) {
                util.showMsg('支付成功', '../../images/successIcon.png')
                that.getDetail()
              },
              'fail': function (resFail) {
                console.log(resFail)
                util.showMsg('支付失败', '../../images/warning.png')
              },
            })
          })
        })
      }
    } else {
      let params = {
        token: wx.getStorageSync('token'),
        activity_id: that.data.itemObj.id,
        code: that.data.code,
        is_deduction: that.data.is_deduction,
        package_id: that.data.package_id,
        message: that.data.message
      }
      console.log('请求参数', params)
      postRequest('/activity/orderCreate', params, true).then(res => {
        console.log(res)
        let param = {
          token: wx.getStorageSync('token'),
          order_id: res.order_id
        }
        postRequest('/mini/activityOrderPayByMini', param, true).then(res => {
          let configs = JSON.parse(res.config)
          wx.requestPayment({
            timeStamp: configs.timeStamp,
            nonceStr: configs.nonceStr,
            package: configs.package,
            signType: configs.signType,
            paySign: configs.paySign,
            'success': function (resSuccess) {
              util.showMsg('支付成功', '../../images/successIcon.png')
              that.getDetail()
            },
            'fail': function (resFail) {
              console.log(resFail)
              util.showMsg('支付失败', '../../images/warning.png')
            },
          })
        })
      })
    }
  },

  // 取消考虑
  cancelConsider() {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      activity_id: that.data.itemObj.id,
      user_id: wx.getStorageSync('userInfo').id
    }
    postRequest('/activity/unConsider', params, true).then(res => {
      console.log(res)
      that.getDetail()
    })
  },

  // 选手签到
  signIn() {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      activity_id: that.data.itemObj.id
    }
    postRequest('/activity/sign', params, true).then(res => {
      console.log(res)
    })
  },

  // 考虑
  clickConsider(e) {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      activity_id: that.data.itemObj.id
    }
    postRequest('/activity/consider', params, true).then(res => {
      console.log(res)
      that.getDetail()
    })
  },

  // 获取详情
  getDetail() {
    let that = this
    let params = {
      activity_id: that.data.activity_id,
      token: that.data.token
    }
    postRequest('/activity/detail', params, true).then(res => {
      console.log(res)
      that.setData({
        itemObj: res,
        packageItem: res.package
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log('接收到的参数', options)
    if (options.scene) {
      that.setData({ activity_id: options.scene })
    } else {
      that.setData({ activity_id: options.id })
    }

    if (wx.getStorageSync('token') != '') {
      that.setData({
        meUserId: wx.getStorageSync('userInfo').id,
        token: wx.getStorageSync('token')
      })
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
    let that = this
    if (wx.getStorageSync('token')) {
      that.getDetail()
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
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