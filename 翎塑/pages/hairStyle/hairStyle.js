// pages/hairStyle/hairStyle.js
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
    num: 0,
    current: "",
    typeItems: [],
    cardItems: [],
    page: 1,
    pagesize: 10,
    counts: 0,
    noDataShow: false,
    dataSet: [
      {
        id: '6',
        content:'Lorem',
        liked: false,
        likedCount: 100,
        images: []
      }
    ],
    brick_option: {
      defaultExpandStatus: true,
      forceRepaint: false,
      imageFillMode: 'widthFix',
      fontColor: '#fff'
    }
  },

  onChange(e) {
    let that = this
    let id = e.detail.key
    console.log(id)
    that.setData({
      current: id,
      cardItems: [],
      page: 1
    })
    if (id == 0) {
      that.getDefault()
    } else {
      that.getTypeSearch()
    }
  },

  // 切换分类查询
  getTypeSearch () {
    let that = this
    let params = {
      hair_cate_id: that.data.current,
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: app.globalData.unionid
    }
    postRequest('/user/hairByCate', params, true).then(res => {
      console.log(res.list)
      console.log(that.data.dataSet)
      for (let i in res.list) {
        let imgArr = []
        imgArr.push(res.list[i].image)
        res.list[i].content = res.list[i].title
        res.list[i].liked = res.list[i].is_like
        res.list[i].likedCount = 1
        res.list[i].images = imgArr
        res.list[i].backgroundColor = '#cccccc'
      }
      if (res.list.length == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        cardItems: that.data.cardItems.concat(res.list),
        counts: res.count
      })
    })
  },

  // 收藏
  lickClick (e) {
    let that = this
    console.log(e)
    let index = ''
    let id = e.detail.card_id
    for (let i in that.data.cardItems) {
      if (that.data.cardItems[i].id == id) {
        index = i
      }
    }
    let params = {
      token: app.globalData.unionid,
      hair_id: id
    }
    wx.request({
      url: `${util.baseUrl}/user/likeHair`,
      data: params,
      method: "POST",
      success: res => {
        let stateLike = `cardItems[${index}].is_like`
        let likeds = `cardItems[${index}].liked`
        console.log(stateLike)
        console.log(res)
        if (res.data.code == 201) {
          that.setData({
            [stateLike]: false,
            [likeds]: false
          })
          util.showMsg('取消收藏！')
        } else if (res.data.code == 200) {
          that.setData({
            [stateLike]: true,
            [likeds]: true
          })
          util.showMsg('收藏成功！')
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },

  navDetail (e) {
    let id = e.detail.card_id
    wx.navigateTo({
      url: `/pages/hairDetail/hairDetail?id=${id}`,
    })
  },


  getDefault () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize,
      token: app.globalData.unionid
    }
    postRequest('/user/hairByRecommend', params, true).then(res => {
      console.log(res)
      console.log(that.data.dataSet)
      for (let i in res.list) {
        let imgArr = []
        imgArr.push(res.list[i].image)
        res.list[i].content = res.list[i].title
        res.list[i].liked = res.list[i].is_like
        res.list[i].likedCount = 1
        res.list[i].images = imgArr
        res.list[i].backgroundColor = '#cccccc'
      }
      if (res.list.length == 0) {
        that.setData({ noDataShow: true })
      } else {
        that.setData({ noDataShow: false })
      }
      that.setData({
        cardItems: that.data.cardItems.concat(res.list),
        counts: res.count
      })
    })
  },

  getType () {
    let that = this
    let params = {}
    postRequest('/user/hairCateList', params, false).then(res => {
      let obj = {
        id: 0,
        title: '推荐'
      }
      res.splice(0, 0, obj);
      that.setData({ typeItems: res} )
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let that = this
    that.setData({
      typeItems: [],
      cardItems: []
    })
    that.getType()
    that.getDefault()
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