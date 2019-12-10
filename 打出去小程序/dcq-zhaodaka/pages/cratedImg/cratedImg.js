// pages/cratedImg/cratedImg.js
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
    state: 0,
    obj: {},
    id: '',
    indicatorDots: true,
    visible: false,
    qrCode: '',
    name: ''
  },

  onClose () {
    let that = this
    that.setData({
      visible: false,
      state: 0
    })
  },

  clickImg (e) {
    let that = this
    wx.showToast({ title: '海报绘制中', icon: 'loading', duration: 10000 });
    let scene = `id=${that.data.id}`
    let params = {
      token: wx.getStorageSync('token'),
      scene: scene,
      page: 'pages/detailGame/detailGame'
    }
    postRequest('/mini/makeMiniCode', params, false).then(resCode => {
      console.log(resCode)
      let dates = that.data.obj.dates
      let img = e.currentTarget.dataset.img
      let name = that.data.name
      let qrCodeImg = `https://ssl.zhaodaka.net/dcq${resCode.src}`
      that.setData({
        visible: true
      })

      wx.getImageInfo({
        src: qrCodeImg,
        success: resPic => {
          console.log(resPic)
          wx.getImageInfo({
            src: img,
            success: res => {
              const ctx = wx.createCanvasContext('shareCanvas')
              // 底图
              ctx.drawImage(res.path, 0, 0, 250, 444)

              ctx.setTextAlign('center') // 文字居中
              ctx.setFillStyle('#ffffff') // 文字颜色：黑色
              ctx.setFontSize(10) // 文字字号：22px
              ctx.fillText(dates, 132, 415)
              // ctx.save()

              ctx.setTextAlign('left')
              ctx.setFontSize(13)
              ctx.font = 'normal bold 13px sans-serif'
              ctx.fillText(name, 10, 65)

              const qrImgSize = 60
              console.log('小程序码', qrCodeImg)
              ctx.drawImage(resPic.path, 10, 375, qrImgSize, qrImgSize)

              ctx.stroke()
              ctx.draw()
              wx.hideToast();
              that.setData({ state: 1 })
            }
          })
        }
      })
    })
  },

  createImage() {
    wx.canvasToTempFilePath({ //将canvas生成图片
      canvasId: 'shareCanvas',
      x: 0,
      y: 0,
      width: 1000,
      height: 1776,
      destWidth: 1000, //截取canvas的宽度
      destHeight: 1776, //截取canvas的高度
      success: res => {
        wx.saveImageToPhotosAlbum({ //保存图片到相册
          filePath: res.tempFilePath,
          success: resSuccess => {
            wx.showToast({
              title: "海报保存成功！",
              duration: 2000
            })
          }
        })
      }
    })
  },   

  getList() {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      match_id: that.data.id
    }
    postRequest('/user/matchDetail', params, true).then(res => {
      console.log(res)
      let names = res.name
      names = names.substring(names.indexOf('【') + 1, names.indexOf('】'))
      console.log(names)
      that.setData({
        obj: res,
        name: names
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    let that = this
    that.setData({
      id: options.id
    })
    that.getList()
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