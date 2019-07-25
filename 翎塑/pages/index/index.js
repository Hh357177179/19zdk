//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'

Page({
  data: {
    visible: false,
    settIngObj: {},
    userInfo: {}
  },

  // 跳转佣金日志
  navLog() {
    wx.navigateTo({
      url: '/pages/journal/journal',
    })
  },

  // 跳转预约服务
  navOrder() {
    wx.navigateTo({
      url: `/pages/consume/consume?nav=1`,
    })
  },

  // 跳转消费清单
  navList() {
    wx.navigateTo({
      url: '/pages/consume/consume?nav=2',
    })
  },

  // 跳转Vip介绍
  navVip() {
    wx.navigateTo({
      url: '/pages/vipInfo/vipInfo',
    })
  },

  // 跳转优惠券
  navCoupon() {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },

  // 跳转邀请好友

  navInvite() {
    wx.navigateTo({
      url: '/pages/invite/invite',
    })
  },

  logins() {
    let that = this
    wx.getSetting({
      success: userRes => {
        console.log('判断授权', userRes)
        if (userRes.authSetting['scope.userInfo']) {
          console.log('已经授权')
          wx.login({
            success: resCode => {
              console.log(resCode)
              wx.request({
                url: `${util.baseUrl}/user/login`,
                data: {
                  code: resCode.code
                },
                method: 'POST',
                success: resLogin => {
                  console.log('检查是否注册过', resLogin)
                  if (resLogin.data.code == 1002) {
                    wx.login({
                      success: secondCode => {
                        console.log('二次获取code',secondCode)
                        wx.getUserInfo({
                          success: resUserInfo => {
                            console.log('获取用户信息', resUserInfo)
                            wx.request({
                              url: `${util.baseUrl}/user/register`,
                              data: {
                                code: secondCode.code,
                                encryptedData: resUserInfo.encryptedData,
                                iv: resUserInfo.iv,
                                pid: ''
                              },
                              method: 'POST',
                              success: res => {
                                console.log('注册结果', res)
                                that.getUserInfo(resLogin.data.data.unionid)
                                that.setData({
                                  visible: false
                                })
                                app.globalData.avatar = res.data.data.avatar
                                app.globalData.unionid = res.data.data.unionid
                                app.globalData.id = res.data.data.id
                                app.globalData.nickname = res.data.data.nickname
                              }
                            })
                          }
                        })
                      }
                    })
                  } else {
                    console.log('已经注册过了')
                    that.getUserInfo(resLogin.data.data.unionid)
                    that.setData({
                      visible: false
                    })
                    app.globalData.avatar = resLogin.data.data.avatar
                    app.globalData.unionid = resLogin.data.data.unionid
                    app.globalData.id = resLogin.data.data.id
                    app.globalData.nickname = resLogin.data.data.nickname
                  }
                }
              })
            }
          })
        } else {
          console.log('未授权')
          that.setData({
            visible: true
          })
        }
      }
    })
  },


  // 获取用户信息
  getUserInfo(unionid) {
    let that = this
    let params = {
      token: unionid
    }
    postRequest('/user/getInfo', params, true).then(res => {
      console.log('获取到用户基本信息',res)
      app.globalData.level = res.level
      that.setData({
        userInfo: res
      })
    })
  },

  btnGetUserInfo(e) {
    let that = this
    console.log('点击授权')
    console.log(e.detail)
    that.setData({
      settIngObj: e.detail
    })
    if (e.detail.userInfo) {
      that.logins()
    } else {
      // util.showMsg('拒绝授权将无法使用')
      that.setData({
        visible: false
      })
    }
  },

  onLoad: function() {
    let that = this
    that.logins()
  }
})