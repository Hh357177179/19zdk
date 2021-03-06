// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOnline: false
  },
  
  callMe () {
    let that = this
    if (!wx.getStorageSync('phone') && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/phone/phone',
      })
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else if (wx.getStorageSync('phone') != '' && app.globalData.userInfo != null) {
      wx.navigateTo({
        url: '/pages/callme/callme',
      })
    }
  },

  // 是否隐藏
  showOrhide () {
    let that = this
    wx.request({
      url: 'https://ssl.zhaodaka.net/ymmsign/api/user/isLock',
      method: 'POST',
      data: {},
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          that.setData({
            showOnline: false
          })
        } else {
          that.setData({
            showOnline: true
          })
        }
      }
    })
  },

  navWork () {
    wx.navigateTo({
      url: `/pages/workList/workList`
    })
  },

  navTeacher () {
    wx.navigateTo({
      url: `/pages/allplace/allplace`
    })
  },

  navSpecialist () {
    wx.navigateTo({
      url: '/pages/teacherList/teacherList?type=1&line=0'
    })
  },

  navOnline () {
    wx.navigateTo({
      url: '/pages/teacherList/teacherList?type=0&line=1'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showOrhide()
    // 用户版本更新
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
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