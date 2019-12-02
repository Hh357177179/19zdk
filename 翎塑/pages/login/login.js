// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // settIngObj: {}
  },

  btnGetUserInfo(e) {
    // let that = this
    // console.log('点击授权')
    // console.log(e.detail)
    // // that.setData({
    // //   settIngObj: e.detail
    // // })
    // if (e.detail.userInfo) {
    //   // that.logins()
    // } else {
    //   // util.showMsg('拒绝授权将无法使用')
    //   wx.redirectTo({
    //     url: '/pages/index/index',
    //   })
    // }
    wx.redirectTo({
      url: '/pages/index/index',
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

  }
})