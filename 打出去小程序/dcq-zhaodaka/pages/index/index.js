//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showDelete: false,
    searchVal: '',
    nav: 1
  },

  // 跳转详情
  navApply () {
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },

  // 筛选列表
  navSort (e) {
    let that = this
    let navIndex = e.currentTarget.dataset.nav
    that.setData({
      nav: navIndex
    })
  },

  // 清空搜索框
  deleteSearch () {
    let that = this
    that.setData({
      searchVal: '',
      showDelete: false
    })
  },

  // 监听搜索框
  onSearch (e) {
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
  
  
  onLoad: function (options) {

  },
})
