// pages/payOrder/payOrder.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chopayway: -1,
    balance: '0',
    min_pay_amout: '',
    userlevel: '',
    couponText: '',
    couponid: 0,
    visibleCoupon: false,
    couponItem: [],
    userObj: {},
    firstArr: [],
    visible: false,
    ids: -1,
    secondItem: [],
    chooseArr: [],
    total_fee: '',
    pay_fee: '',
    amount: 0,
    couponNum: 0,
    consumeVal: '',
    realityPay: 0,
    levelItem: {},
    midVal: 0,
    cate_ids: ''
  },

  consumeOn(e) {
    let that = this
    let nums = e.detail.value
    if (nums != '') {
      that.setData({
        consumeVal: e.detail.value,
        realityPay: e.detail.value * that.data.levelItem.discount,
        midVal: e.detail.value * that.data.levelItem.discount,
      })
    } else {
      that.setData({
        consumeVal: e.detail.value,
        realityPay: 0
      })
    }
    that.setData({
      couponid: 0,
      couponText: `${that.data.couponNum}张优惠券可用`
    })
  },

  // 获取会员列表
  getLevel() {
    let that = this
    let params = {}
    postRequest('/user/level', params, false).then(res => {
      console.log(res)
      let arr = []
      arr = res.filter(x => x.id == that.data.userlevel)
      console.log(arr)
      that.setData({
        levelItem: arr[0]
      })
    })
  },

  choosePayWay(e) {
    let that = this
    if (that.data.realityPay <= that.data.balance) {
      let choNums = e.currentTarget.dataset.chopayway
      that.setData({
        chopayway: choNums
      })
    } else {
      let choNums = e.currentTarget.dataset.chopayway
      if (choNums != 1) {
        that.setData({
          chopayway: choNums
        })
      } else {
        util.showMsg('余额不足~')
      }
    }
  },

  submitPay() {
    let that = this
    if (that.data.cate_ids == '') {
      util.showMsg('请选择消费项目')
    } else if (that.data.consumeVal == '') {
      util.showMsg('请输入消费金额')
    } else if (that.data.chopayway == -1) {
      util.showMsg('请选择付款方式')
    } else {
      let params = {
        token: app.globalData.unionid,
        // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
        cate_id: that.data.cate_ids,
        coupon_id: that.data.couponid,
        total_fee: that.data.consumeVal,
        pay_fee: that.data.realityPay
      }
      console.log(params)
      postRequest('/user/payment', params, false).then(res => {
        console.log(res)
        if (that.data.chopayway == 1) {
          let param = {
            token: app.globalData.unionid,
            // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
            order_id: res.order_id
          }
          postRequest('/user/paymentByBalance', param, true).then(respon => {
            util.showMsg('支付成功!')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 1500)
          })
        } else {
          let params = {
            token: app.globalData.unionid,
            // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
            order_id: res.order_id
          }
          console.log(params)
          postRequest('/user/paymentByWechat', params, true).then(res => {
            console.log(res)
            let configs = JSON.parse(res.config)
            console.log(configs)
            wx.requestPayment({
              timeStamp: configs.timeStamp,
              nonceStr: configs.nonceStr,
              package: configs.package,
              signType: configs.signType,
              paySign: configs.paySign,
              'success': function (resSuccess) {
                util.showMsg('支付成功!')
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/index/index',
                  })
                }, 1500)
              },
              'fail': function (resFail) {
                console.log(resFail)
                util.showMsg('支付失败！')
              },
            })
          })
        }
      })
    }
  },

  trueBtnCoupon() {
    let that = this
    console.log(that.data.couponid)
    let arrs = []
    arrs = that.data.couponItem.filter(x => x.id == that.data.couponid)
    console.log(arrs)
    if (arrs.length != []) {
      that.setData({
        couponText: `优惠券抵扣${arrs[0].amount}`,
        amount: arrs[0].amount,
        visibleCoupon: false,
        realityPay: that.data.midVal - arrs[0].amount
      })
    } else {
      that.setData({
        couponText: `${that.data.couponNum}张优惠券可用`,
        amount: '',
        visibleCoupon: false,
        realityPay: that.data.midVal
      })
    }
    console.log('需要支付', that.data.realityPay)
  },

  chooseCoupon(e) {
    let that = this
    if (that.data.couponid != e.currentTarget.dataset.couponid) {
      let items = e.currentTarget.dataset.items
      console.log('传递',items)
      that.setData({
        min_pay_amout: items.min_pay_amout
      })
      console.log(1232)
      console.log(that.data.consumeVal)
      if (Number(items.min_pay_amout) <= Number(that.data.consumeVal)) {
        that.setData({
          couponid: e.currentTarget.dataset.couponid
        })
      } else {
        util.showMsg('该优惠券不可用')
      }
    } else {
      that.setData({
        couponid: 0
      })
    }
  },

  showServer() {
    let that = this
    that.setData({
      visible: true
    })
  },

  trueBtn() {
    let that = this
    let arrs = []
    let arrStr = []
    arrs = that.data.secondItem.filter(item => item.choose == true)
    arrs.forEach(element => {
      arrStr.push(element.id)
    });
    that.setData({
      cate_ids: arrStr.join(','),
      chooseArr: arrs,
      visible: false
    })
    console.log('chooseText', that.data.chooseArr)
    console.log('选中的服务', that.data.cate_ids)
  },

  // 选择二级
  choSecond(e) {
    let that = this
    let arr = `secondItem[${e.currentTarget.dataset.secondindex}].choose`
    that.setData({
      [arr]: !that.data.secondItem[e.currentTarget.dataset.secondindex].choose
    })
  },

  // 选择一级服务
  choBigTitle(e) {
    let that = this
    that.setData({
      ids: e.currentTarget.dataset.ids
    })
    console.log(that.data.ids)
    that.getSecond()
  },

  // 根据一级获取二级
  getSecond() {
    let that = this
    let params = {
      pid: that.data.ids
    }
    postRequest('/user/cateList', params, false).then(res => {
      if (res.length == 0) {
        that.setData({
          noServer: true
        })
      } else {
        that.setData({
          noServer: false
        })
      }
      res.forEach(item => {
        item.choose = false
      });
      that.setData({
        secondItem: res,
      })
      console.log('二级', that.data.secondItem)
    })
  },

  onClose() {
    let that = this
    that.setData({
      visible: false
    })
  },

  onCloseCoupon() {
    let that = this
    that.setData({
      visibleCoupon: false,
      couponid: 0
    })
  },

  choCoupon() {
    let that = this
    that.setData({
      visibleCoupon: true
    })
  },

  // 获取服务
  getServer() {
    let that = this
    let params = {
      pid: that.data.pid
    }
    postRequest('/user/cateList', params, false).then(res => {
      that.setData({
        firstArr: res,
        ids: res[0].id
      })
      that.getSecond()
    })
  },

  // 获取用户基本信息
  getUserInfos() {
    let that = this
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA"
    }
    postRequest('/user/getInfo', params, false).then(res => {
      console.log(res)
      that.setData({
        userObj: res,
        userlevel: res.level,
        balance: res.balance
      })
      that.getLevel()
    })
  },

  // 获取优惠券
  getCoupon() {
    let that = this
    let params = {
      token: app.globalData.unionid,
      // token: "o9N8gxJCtkOvbKbxOGllk7P3TbxA",
      page: 1,
      pagesize: 9999,
      type: 1
    }
    postRequest('/user/couponList', params, true).then(res => {
      console.log(res)
      that.setData({
        couponItem: res.list,
        couponNum: res.list.length,
        couponText: `${res.list.length}张优惠券可用`
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getCoupon()
    that.getUserInfos()
    that.getServer()
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