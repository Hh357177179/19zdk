// pages/addGrows/addGrows.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '',
    array: ['训练', '活动', '比赛', '日记'],
    // array: ['训练', '活动', '日记'],
    title: '',
    time: '事件时间',
    typeTitle: '事件类型',
    nowDate: '',
    address: '',
    teacher: '',
    videos: '',
    images: '',
    note: '',
    // extra: '',
    imgs: [],
    init: {
      group_rank: '排名',
      group_m: 'M',
      group_v: 'v',
      group_hs: 'hs',
      group_hr: 'hr',
      group_note: '备注',
      rival: [
        {
          name: '对手姓名',
          mescore: '自己得分',
          rivalscore: '自己得分'
        }
      ]
    },
    extra: {
      rank: '最终排名',
      group: [
        {
          group_rank: '排名',
          group_m: 'M',
          group_v: 'v',
          group_hs: 'hs',
          group_hr: 'hr',
          group_note: '备注',
          rival: [
            {
              name: '对手姓名',
              mescore: '自己得分',
              rivalscore: '自己得分'
            }
          ]
        }
      ],
      weed: [
        {
          weed_name: '淘汰对手姓名',
          weed_mescore: '淘汰自己得分',
          weed_rivalscore: '淘汰自己得分'
        }
      ]
    }
  },

  upLoadPic () {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${util.baseUrl}/user/upload`,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'file': 'file'
          },
          success(res) {
            const imgs = JSON.parse(res.data)
            if (that.data.imgs.length < 4) {
              let arr = []
              arr.push(imgs.data)
              that.setData({
                imgs: that.data.imgs.concat(arr)
              })
            } else {
              util.showMsg('最多上传4张', '../../images/warning.png')
            }
          }
        })
      }
    })
  },

  // 训练
  drillAdd () {
    let that = this
    let params = {
      token: app.globalData.token,
      type: that.data.num,
      title: that.data.title,
      time: new Date(that.data.time) / 1000,
      address: that.data.address,
      teacher: that.data.teacher,
      videos: '',
      images: that.data.imgs.join(','),
      note: that.data.note
    }
    if (params.title == '') {
      util.showMsg('请输入事件名称', '../../images/warning.png')
    } else if (params.time == '事件时间') {
      util.showMsg('请选择事件时间', '../../images/warning.png')
    } else {
      console.log(params)
      postRequest('/mini/addGrow', params, true).then(res => {
        console.log(res)
        util.showMsg('添加成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }
  },

  // 日记
  diaryAdd () {
    let that = this
    let params = {
      token: app.globalData.token,
      type: that.data.num,
      title: that.data.title,
      time: that.data.time,
      note: that.data.note
    }
    if (params.title == '') {
      util.showMsg('请输入事件名称', '../../images/warning.png')
    } else if (params.time == '事件时间') {
      util.showMsg('请选择事件时间', '../../images/warning.png')
    } else if (params.note == '') {
      util.showMsg('请输入日记', '../../images/warning.png')
    } else {
      postRequest('/mini/addGrow', params, true).then(res => {
        console.log(res)
        util.showMsg('添加成功', '../../images/successIcon.png')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }
  },

  submit () {
    let that = this
    if (that.data.num == 1) {
      console.log('训练')
      that.drillAdd()
    } else if (that.data.num == 2) {
      console.log('活动')
      that.drillAdd()
    } else if (that.data.num == 3) {
      console.log('比赛')
    } else if (that.data.num == 4) {
      console.log('日记')
      that.diaryAdd()
    } else {
      util.showMsg('请选择事件类型', '../../images/warning.png')
    }
  },

  noteVal (e) {
    let that = this
    that.setData({ note: e.detail.value })
  },

  titleVal (e) {
    let that = this
    console.log(e)
    that.setData({ title: e.detail.value })
  },

  addressVal (e) {
    let that = this
    that.setData({ address: e.detail.value })
  },

  teacherVal (e) {
    let that = this
    that.setData({ teacher: e.detail.value })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', Number(e.detail.value) + 1)
    that.setData({
      index: e.detail.value,
      num: Number(e.detail.value) + 1,
      typeTitle: that.data.array[e.detail.value]
    })
    console.log('类型数字',that.data.num)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    that.setData({
      nowDate: `${y}-${m}-${d}`
    })
    console.log(that.data.extra)
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