// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDelete: false,
    searchVal: '',
    nav: 1
  },

  // 跳转详情
  navApply() {
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },

  // 筛选列表
  navSort(e) {
    let that = this
    let navIndex = e.currentTarget.dataset.nav
    that.setData({
      nav: navIndex
    })
  },

  // 清空搜索框
  deleteSearch() {
    let that = this
    that.setData({
      searchVal: '',
      showDelete: false
    })
  },

  // 监听搜索框
  onSearch(e) {
    console.log(e)
    let that = this
    let value = e.detail.value
    if (value != '') {
      that.setData({
        showDelete: true
      })
    } else {
      that.setData({
        showDelete: false
      })
    }
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