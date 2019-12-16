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
    visibleSetting: false,
    qrCode: '',
    name: '',
  },

  onCloseSet () {
    let that = this
    that.setData({
      visibleSetting: false
    })
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
    let option = {
      bigX: 10,
      bigY: 65,
      dateX: 132,
      dateY: 415,
      contentX: 350
    }
    let index = e.currentTarget.dataset.index
    if (index == 1) {
      option.bigX = 10
      option.bigY = 65
      option.dateX = 132
      option.dateY = 415
      option.contentX = 350
    } else {
      option.bigX = 12
      option.bigY = 245
      option.dateX = 132
      option.dateY = 405
      option.contentX = 330
    }
    let pagePath = ''
    if (this.type == 1) {
      pagePath = 'pages/detailGame/detailGame'
    } else {
      pagePath = 'pages/apply/apply'
    }
    wx.showToast({ title: '海报绘制中', icon: 'loading', duration: 10000 });
    let scene = `${that.data.id}`
    let params = {
      token: wx.getStorageSync('token'),
      scene: scene,
      page: pagePath
    }
    postRequest('/mini/makeMiniCode', params, false).then(resCode => {
      console.log(resCode)
      let dates = that.data.obj.dates
      let img = e.currentTarget.dataset.img
      
      let name = that.data.name
      let context = that.data.obj.name
      let qrCodeImg = `https://ssl.zhaodaka.net/dcq${resCode.src}`
      // let qrCodeImg = `https://ssl.zhaodaka.net/dcq/static/mini/minicode_15.png`
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
              ctx.fillText(dates, option.dateX, option.dateY)
              // ctx.save()

             if (index == 2) {
               ctx.setStrokeStyle('#fff')
               ctx.setLineWidth(1)
               ctx.moveTo(12, 310)
               ctx.lineTo(230, 310)

               ctx.moveTo(12, 360)
               ctx.lineTo(230, 360)
             }

              ctx.setTextAlign('left')
              ctx.font = 'normal bold 14px sans-serif'
              ctx.fillText(name, option.bigX, option.bigY)
              
              var chr = context.split("");
              var temp = "";
              var row = [];
              ctx.font = 'normal bold 11px sans-serif'
              ctx.setFillStyle('#fff')

              for (var a = 0; a < chr.length; a++) {
                if (ctx.measureText(temp).width < 250) {
                  temp += chr[a];
                }
                else {
                  a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                  row.push(temp);
                  temp = "";
                }
              }
              row.push(temp);


              if (row.length > 2) {
                var rowCut = row.slice(0, 2);
                var rowPart = rowCut[1];
                var test = "";
                var empty = [];
                for (var a = 0; a < rowPart.length; a++) {
                  if (ctx.measureText(test).width < 250) {
                    test += rowPart[a];
                  }
                  else {
                    break;
                  }
                }
                empty.push(test);
                var group = empty[0] + "..."//这里只显示两行，超出的用...表示
                rowCut.splice(1, 1, group);
                row = rowCut;
              }
              for (var b = 0; b < row.length; b++) {
                ctx.fillText(row[b], 10, option.contentX + b * 15, 220);
              }


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
    let that = this
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
          },
          fail: err => {
            console.log(err)
            if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
              that.setData({
                visibleSetting: true
              })
            }
          }
        })
      }
    })
  },

  openSetting () {
    wx.openSetting({
      success(settingdata) {
        console.log(settingdata)
        if (settingdata.authSetting['scope.writePhotosAlbum']) {
          util.showMsg('获取权限成功', '../../images/successIcon.png')
        } else {
          util.showMsg('获取权限失败', '../../images/warning.png')
        }
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
      if (names.indexOf('【') != -1 && names.indexOf('】') != -1) {
        names = names.substring(names.indexOf('【') + 1, names.indexOf('】'))
      }
      console.log(names)
      that.setData({
        obj: res,
        name: names
      })
    })
  },

  getTraining () {
    let that = this
    let params = {
      activity_id: that.data.id,
      token: wx.getStorageSync('token')
    }
    postRequest('/activity/detail', params, true).then(res => {
      console.log('训练',res)
      const start = that.formatDate(res.addtime)
      const end = that.formatDate(res.endtime)
      let names = res.title
      if (names.indexOf('【') != -1 && names.indexOf('】') != -1) {
        names = names.substring(names.indexOf('【') + 1, names.indexOf('】'))
      }
      res.dates = `${start}-${end}`
      res.name = res.title
      that.setData({
        obj: res,
        name: names
      })
      console.log(res.dates)
    })
  },

  formatDate (time) {
    let date = new Date(time * 1000)
    let addY = date.getFullYear()
    let addM = date.getMonth() + 1
    let addD = date.getDate()
    console.log(addY, addM, addD)
    if (addM < 10) {
      addM = '0' + addM
    }
    if (addD < 10) {
      addD = '0' + addD
    }
    console.log(addY, addM, addD)
    return `${addY}/${addM}/${addD}`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this
    that.setData({
      id: options.id
    })
    if (options.type == 2) {
      that.getList()
    } else {
      console.log('训练')
      that.getTraining()
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