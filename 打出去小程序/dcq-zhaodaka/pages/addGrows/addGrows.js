// pages/addGrows/addGrows.js
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
    num: '3',
    array: ['训练', '活动', '比赛', '日记'],
    title: '',
    time: '事件时间',
    typeTitle: '事件类型',
    nowDate: '',
    address: '',
    teacher: '',
    videos: '',
    images: '',
    note: '',
    imgs: [],
    extra: {
      rank: '',
      group: [{
        group_rank: '',
        group_m: '',
        group_v: '',
        group_hs: '',
        group_hr: '',
        group_note: '',
        rival: [{
          name: '',
          mescore: '',
          rivalscore: ''
        }, ]
      }],
      weed: [{
        weedGroup: [{
          weed_name: '',
          weed_mescore: '',
          weed_rivalscore: ''
        }],
      }]
    }
  },

  // 新增淘汰赛
  addWeedGroup() {
    let that = this
    let objArr = {
      weedGroup: [{
        weed_name: '',
        weed_mescore: '',
        weed_rivalscore: ''
      }],
    }
    let arr = that.data.extra
    arr.weed.push(objArr)
    that.setData({
      extra: arr
    })
    console.log(that.data.extra)
  },

  // 新增小组
  addGroup() {
    let that = this
    let obj = {
      group_rank: '',
      group_m: '',
      group_v: '',
      group_hs: '',
      group_hr: '',
      group_note: '',
      rival: [{
        name: '',
        mescore: '',
        rivalscore: ''
      }, ]
    }
    let arr = that.data.extra
    arr.group.push(obj)
    that.setData({
      extra: arr
    })
  },

  addWeed (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let arr = that.data.extra
    let obj = {
      weed_name: '',
      weed_mescore: '',
      weed_rivalscore: ''
    }
    arr.weed[index].weedGroup.push(obj)
    that.setData({
      extra: arr
    })
  },

  // 新增对手
  addRival(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let arr = that.data.extra
    let obj = {
      name: '',
      mescore: '',
      rivalscore: ''
    }
    console.log(arr)
    arr.group[index].rival.push(obj)
    console.log(arr)
    that.setData({
      extra: arr
    })
  },

  deleteWeed (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let arr = that.data.extra
    arr.weed[index].weedGroup.splice(small, 1)
    that.setData({
      extra: arr
    })
  },

  // 删除对手
  deleteRival(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let arr = that.data.extra
    console.log(arr)
    arr.group[index].rival.splice(small, 1)
    console.log(arr)
    that.setData({
      extra: arr
    })
  },

  upLoadPic() {
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
            console.log(res)
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
  drillAdd() {
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
  diaryAdd() {
    let that = this
    let params = {
      token: app.globalData.token,
      type: that.data.num,
      title: that.data.title,
      time: new Date(that.data.time) / 1000,
      note: that.data.note
    }
    console.log(params)
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

  // 比赛
  gameAdd () {
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
      note: that.data.note,
      extra: JSON.stringify(that.data.extra)
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

  // 最终排名
  rankVal(e) {
    let that = this
    let rank = `extra.rank`
    that.setData({
      [rank]: e.detail.value
    })
  },

  // 小组赛排名
  groupRankVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupRank = `extra.group[${index}].group_rank`
    that.setData({
      [gtoupRank]: e.detail.value
    })
  },

  // M#
  gtoupmVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupM = `extra.group[${index}].group_m`
    that.setData({
      [gtoupM]: e.detail.value
    })
  },

  // V#
  gtoupvVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupV = `extra.group[${index}].group_v`
    that.setData({
      [gtoupV]: e.detail.value
    })
  },
  // Hs
  gtoupHsVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupHs = `extra.group[${index}].group_hs`
    that.setData({
      [gtoupHs]: e.detail.value
    })
  },
  // HR
  gtoupHrVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupHr = `extra.group[${index}].group_hr`
    that.setData({
      [gtoupHr]: e.detail.value
    })
  },

  // noto
  gtoupNoteVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let gtoupNote = `extra.group[${index}].group_note`
    that.setData({
      [gtoupNote]: e.detail.value
    })
  },

  nameVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let rivalName = `extra.group[${index}].rival[${small}].name`
    that.setData({
      [rivalName]: e.detail.value
    })
  },
  weedNameVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let weedName = `extra.weed[${index}].weedGroup[${small}].weed_name`
    that.setData({
      [weedName]: e.detail.value
    })
  },

  mescoreVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let rivalMescore = `extra.group[${index}].rival[${small}].mescore`
    that.setData({
      [rivalMescore]: e.detail.value
    })
  },

  weedMescoreVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let weedMescore = `extra.weed[${index}].weedGroup[${small}].weed_mescore`
    that.setData({
      [weedMescore]: e.detail.value
    })
  },

  rivalscoreVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let rivalScore = `extra.group[${index}].rival[${small}].rivalscore`
    that.setData({
      [rivalScore]: e.detail.value
    })
  },

  weedRivalscoreVal(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let small = e.currentTarget.dataset.small
    let weedRivalscore = `extra.weed[${index}].weedGroup[${small}].weed_rivalscore`
    that.setData({
      [weedRivalscore]: e.detail.value
    })
  },



  submit() {
    let that = this
    if (that.data.num == 1) {
      console.log('训练')
      that.drillAdd()
    } else if (that.data.num == 2) {
      console.log('活动')
      that.drillAdd()
    } else if (that.data.num == 3) {
      console.log('比赛')
      console.log(that.data.extra)
      that.gameAdd()
    } else if (that.data.num == 4) {
      console.log('日记')
      that.diaryAdd()
    } else {
      util.showMsg('请选择事件类型', '../../images/warning.png')
    }
  },

  noteVal(e) {
    let that = this
    that.setData({
      note: e.detail.value
    })
  },

  titleVal(e) {
    let that = this
    console.log(e)
    that.setData({
      title: e.detail.value
    })
  },

  addressVal(e) {
    let that = this
    that.setData({
      address: e.detail.value
    })
  },

  teacherVal(e) {
    let that = this
    that.setData({
      teacher: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindPickerChange: function(e) {
    let that = this
    console.log('picker发送选择改变，携带值为', Number(e.detail.value) + 1)
    that.setData({
      index: e.detail.value,
      num: Number(e.detail.value) + 1,
      typeTitle: that.data.array[e.detail.value]
    })
    console.log('类型数字', that.data.num)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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