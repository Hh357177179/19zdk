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
    detailObj: {},
    num: '3',
    array: ['训练', '活动', '比赛'],
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

  backGame () {
    wx.navigateTo({
      url: `/pages/detailGame/detailGame?id=${this.data.detailObj.relation_id}`,
    })
  },

  getDetail() {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/mini/timeLineDetail', params, true).then(res => {
      console.log(res)
      let typeText = ''
      if (res.type == 1) {
        typeText = '训练'
      } else if (res.type == 2 || res.type == 7) {
        typeText = '活动'
      } else if (res.type == 3 || res.type == 8) {
        typeText = '比赛'
      } else if (res.type == 4) {
        typeText = '日记'
      }
      let date = new Date(res.time * 1000)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      that.setData({
        detailObj: res,
        typeTitle: typeText,
        title: res.title,
        time: `${y}-${m}-${d}`,
        address: res.address,
        teacher: res.teacher,
        note: res.note,
        videos: res.videos,
      })
      if (res.type == 7) {
        that.setData({
          num: 2
        })
      } else if (res.type == 8) {
        that.setData({
          num: 3
        })
      } else {
        that.setData({
          num: res.type
        })
      }
      if (res.images != '' && res.images != null && res.images != 'null') {
        that.setData({
          imgs: res.images.split(','),
          images: res.images,
        })
      }
      if (res.extra != '' && res.extra != null && res.extra != 'null') {
        let obj = {}
        obj = JSON.parse(res.extra)
        that.setData({
          extra: obj
        })
      }
    })
  },

  getUser() {
    let that = this
    let params = {
      token: wx.getStorageSync('token')
    }
    postRequest('/user/myInfo', params, false).then(res => {
      that.setData({
        user: res.name
      })
    })
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

  addWeed(e) {
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

  deleteWeed(e) {
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
    let imgArr = []
    wx.chooseImage({
      success(res) {
        imgArr = res.tempFilePaths
        for (let i in imgArr) {
          wx.uploadFile({
            url: `${util.baseUrl}/user/upload`,
            filePath: imgArr[i],
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
      }
    })
  },

  deleteImg (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let imgs = that.data.imgs
    imgs.splice(index, 1)
    that.setData({
      imgs: imgs
    })
  },


  editSubmit() {
    let that = this
    let params = {
      token: wx.getStorageSync('token'),
      id: that.data.detailObj.id,
      title: that.data.title,
      time: new Date(that.data.time) / 1000,
      address: that.data.address,
      teacher: that.data.teacher,
      videos: that.data.videos,
      images: that.data.imgs.join(','),
      note: that.data.note,
      extra: JSON.stringify(that.data.extra)
    }
    console.log(params)
    postRequest('/mini/editGrow', params, true).then(res => {
      console.log(res)
      util.showMsg('修改成功', '../../images/successIcon.png')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    })
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



  // submit() {
  //   let that = this
  //   if (that.data.num == 1) {
  //     console.log('训练')
  //     that.drillAdd()
  //   } else if (that.data.num == 2) {
  //     console.log('活动')
  //     that.drillAdd()
  //   } else if (that.data.num == 3) {
  //     console.log('比赛')
  //     console.log(that.data.extra)
  //     that.gameAdd()
  //   } else if (that.data.num == 4) {
  //     console.log('日记')
  //     that.diaryAdd()
  //   } else {
  //     util.showMsg('请选择事件类型', '../../images/warning.png')
  //   }
  // },

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
      nowDate: `${y}-${m}-${d}`,
      id: options.id
    })
    that.getDetail()
    that.getUser()
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