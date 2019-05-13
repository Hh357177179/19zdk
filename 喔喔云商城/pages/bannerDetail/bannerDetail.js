// pages/bannerDetail/bannerDetail.js
const WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bid: '',
    content: '',
    bindName: 'article',
    article_content: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let params = {
      banner_id: options.bId
    }
    postRequest('/main/bannerDetail', params, false).then(res => {
      // console.log(res)
      WxParse.wxParse('article', 'html', res.content, that, 20);
      that.setData({
        imgUrl: res.picurl
      })
    })
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