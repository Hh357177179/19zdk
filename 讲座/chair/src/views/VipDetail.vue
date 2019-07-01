<template>
  <div class="vipDetail">
    <p class="title">{{vipObj.title}}</p>
    <p class="vip_parise">价格：{{vipObj.money}}元</p>
    <p class="des_text">{{vipObj.desc}}</p>
    <div class="buy_vip" @click="VipBuy">购买Vip</div>
    <van-dialog v-model="show" title="报名信息" show-cancel-button :before-close="beforeCloses">
      <van-field v-model="userName" label="姓名" label-align="center" placeholder="请输入姓名"/>
      <van-field v-model="userTel" type="tel" label-align="center" maxlength='11' label="手机号码" placeholder="请输入手机号码"/>
    </van-dialog>
  </div>
</template>

<script>
import { vipDetail, vipCreatOrder, payVip } from '../api/index'
export default {
  data () {
    return {
      vipObj: {},
      vipId: '',
      desArr: [],
      show: false,
      userName: '',
      userTel: ''
    }
  },
  methods: {
    VipBuy () {
      this.show = true
    },
    beforeCloses (action, done) {
       if (action == "cancel") {
        (this.userName = ""), (this.userTel = "");
        done();
      } else {
        done(false);
        if (this.userName == "") {
          this.$toast("请输入姓名");
        } else if (!(/^1[3456789]\d{9}$/.test(this.userTel))) {
          this.$toast("请输入正确手机号码");
        } else {
          let params = {
            token: localStorage.getItem("tokenns"),
            // token: 'oDgyEwd1-O9j77IM7rQ3MkB4AUGA',
            vip_id: this.vipObj.id,
            name: this.userName,
            phone: this.userTel
          }
          const that = this;
          vipCreatOrder(params).then(orderRes => {
            console.log(orderRes)
            done();
            let param = {
              token: localStorage.getItem("tokenns"),
              order_id: orderRes.order_id
            };
            payVip(param).then(resPay => {
                const config = JSON.parse(resPay.config);
                console.log('config回调',config)
                WeixinJSBridge.invoke("getBrandWCPayRequest", config, res => {
                  if (res.err_msg === "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    that.$router.push("/success");
                  } else {
                    // this.$toast.fail('支付失败')
                    this.$toast.fail(res.errMsg)
                  }
                })
              })
          })
          .catch(() => {
            this.$toast.fail(e.msg || '创建订单失败')
          })
        }
      }
    },
    getVipDetail () {
      let params = {
        vip_id: this.vipId
      }
      vipDetail(params).then(res => {
        console.log(res)
        this.vipObj = res
      })
    }
  },
  mounted () {
    this.vipId = this.$route.params.id
    this.getVipDetail()
  }
}
</script>

<style lang="less">
  .vipDetail{
    padding: 30px 20px;
    .title{
      font-size: 18px;
      font-weight: 600;
      color: #cba787;
    }
    .vip_parise{
      font-size: 16px;
      font-weight: 600;
      color: #666;
      margin-top: 10px;
    }
    .des_text{
      margin-top: 10px;
      color: #333;
      font-size: 15px;
      padding-bottom: 60px;
    }
    .buy_vip {
      width: 100%;
      height: 50px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #cba787;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      font-weight: 600;
      border-top: 1px solid #f0f0f0;
    }
  }
</style>
