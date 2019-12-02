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
    userInfo: {},
    user: {},
    withdrawShow: false,
    withVal: '',
    pids: '',
    scene: '',
    phoneShow: false
  },

  getPhoneNumber(e) {
    let that = this
    if (e.detail.iv) {
      wx.login({
        success: phone => {
          let params = {
            code: phone.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          }
          postRequest('/user/authPhone', params, true).then(res => {
            util.showMsg('绑定成功')
            that.setData({
              phoneShow: false
            })
          })
        }
      })
    } else {
      util.showMsg('获取手机失败', '../../image/warning.png')
    }
  },

  onClosePhone () {
    let that = this
    that.setData({
      phoneShow: false
    })
  },

  // 发起预约
  sendOrder () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
  },

  // 待支付
  navPayOrder () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/subPackages/Tobepaid/Tobepaid',
      })
    }
  },

  navBuy () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/buyList/buyList',
      })
    }
  },

  // 跳转佣金日志
  navLog() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/journal/journal',
      })
    }
  },

  // 跳转预约服务
  navOrder() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: `/pages/consume/consume?nav=1`,
      })
    }
  },

  // 跳转我的特惠卡
  navpPreference () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/preference/preference',
      })
    }
  },

  // 我的收藏
  navCollect () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/collect/collect',
      })
    }
  },

  // 精选发型
  navHair () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/hairStyle/hairStyle',
      })
    }
  },

  // 特惠活动
  navActivity () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/activity/activity',
      })
    }
  },
  
  navRecharge () {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: `/pages/recharge/recharge`
      })
    }
  },

  onCloseWith () {
    let that = this
    that.setData({
      withdrawShow: false,
      withVal: ''
    })
  },

  // 跳转消费清单
  navList() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/consume/consume?nav=2',
      })
    }
  },

  // 跳转Vip介绍
  navVip() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/vipInfo/vipInfo',
      })
    }
  },

  // 跳转优惠券
  navCoupon() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/coupon/coupon',
      })
    }
  },

  // 跳转邀请好友

  navInvite() {
    if (app.globalData.unionid == '') {
      util.showMsg('请先登录！')
    } else {
      wx.navigateTo({
        url: '/pages/invite/invite',
      })
    }
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
                                pid: that.data.pids
                              },
                              method: 'POST',
                              success: res => {
                                console.log('注册结果', res)
                                app.globalData.avatar = res.data.data.avatar
                                app.globalData.unionid = res.data.data.unionid
                                app.globalData.id = res.data.data.id
                                app.globalData.nickname = res.data.data.nickname
                                that.getUserInfo(res.data.data.unionid)
                                that.setData({
                                  visible: false
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  } else {
                    console.log('已经注册过了')
                    app.globalData.avatar = resLogin.data.data.avatar
                    app.globalData.unionid = resLogin.data.data.unionid
                    app.globalData.id = resLogin.data.data.id
                    app.globalData.nickname = resLogin.data.data.nickname
                    that.getUserInfo(resLogin.data.data.unionid)
                    that.setData({
                      visible: false
                    })
                  }
                }
              })
            }
          })
        } else {
          console.log('未授权')
          that.setData({
            // visible: true
          })
        }
      }
    })
  },

  onWith (e) {
    let that = this
    console.log(e)
    that.setData({
      withVal: e.detail.value
    })
  },

  onWithdraw () {
    let that = this
    if (that.data.userInfo.reward == "0.00" && that.data.userInfo.reward == "" && that.data.userInfo.reward == "null" && that.data.userInfo.reward == null) {
      util.showMsg('无无提现佣金额度')
    } else {
      that.setData({
        withdrawShow: true
      })
    }
  },

  submitWith () {
    let that = this
    if (that.data.withVal == '') {
      util.showMsg('提现佣余不能为空')
    } else if (that.data.withVal > that.data.userInfo.reward) {
      util.showMsg('可提现佣余额不足')
    } else {
      let params = {
        token: app.globalData.unionid,
        money: that.data.withVal
      }
      postRequest('/user/withdraw', params, true).then(res => {
        util.showMsg('提现成功')
        that.setData({
          withVal: '',
          withdrawShow: false
        })
        that.getUserInfo()
      })
    }
  },

  getUser () {
    let that = this
    wx.getUserInfo({
      success: res => {
        console.log('通过微信获取信息',res)
        that.setData({
          user: res.userInfo
        })
        if (that.data.scene != '') {
          wx.navigateTo({
            url: '/pages/payOrder/payOrder',
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
      console.log('获取到用户基本信息', res)
      if (res.phone == '') {
        that.setData({
          phoneShow: true
        })
      }
      that.getUser()
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

  onLoad: function(options) {
    let that = this
    if (options.scene) {
      let sceneStr = decodeURIComponent(options.scene)
      that.setData({
        scene: sceneStr
      })
    }
    if (options.pid) {
      that.setData({
        pids: options.pid
      })
      that.logins()
    } else {
      that.logins()
    }
  },
  onShow: function () {
    // let that = this
    // that.logins()
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '翎塑',
      path: 'pages/index/index',
      imageUrl: '../../images/share.jpg'
    }
  }
})