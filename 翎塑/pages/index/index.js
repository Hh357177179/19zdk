//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  // 跳转佣金日志
  navLog () {
    wx.navigateTo({
      url: '/pages/journal/journal',
    })
  },

  // 跳转预约服务
  navOrder () {
    wx.navigateTo({
      url: `/pages/consume/consume?nav=1`,
    })
  },
  
  // 跳转消费清单
  navList () {
    wx.navigateTo({
      url: '/pages/consume/consume?nav=2',
    })
  },

  // 跳转Vip介绍
  navVip () {
    wx.navigateTo({
      url: '/pages/vipInfo/vipInfo',
    })
  },

  // 跳转优惠券
  navCoupon () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },

  // 跳转邀请好友

  navInvite () {
    wx.navigateTo({
      url: '/pages/invite/invite',
    })
  },

  onLoad: function () {

  }
})
