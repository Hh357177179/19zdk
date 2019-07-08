// pages/consume/consume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navNum: 0,
  },

  // 取消预约
  cancelOrder () {
    wx.showModal({
      title: '提示',
      content: '确认取消该预约？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  // 切换nav
  chooseNav (e) {
    let that = this
    that.setData({
      navNum: e.currentTarget.dataset.navnum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navNum: options.nav
    })
    if (options.nav == 1) {
      wx.setNavigationBarTitle({
        title: '预约服务'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '消费清单'
      })
    }
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