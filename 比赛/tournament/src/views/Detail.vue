<template>
  <div class="detail">
    <!-- <div class="banner_img">图片</div>
    <div class="detail_desc">{{detailObj.content}}</div> -->
    <div class="detail_desc" v-html="detailObj.content">{{detailObj.content}}</div>
    <div class="apply_main">
      <div class="apply_info">
        <p>活动时间：{{detailObj.time}}</p>
        <p>报名费用：{{detailObj.price}}元</p>
      </div>
      <div class="apply_btn" v-if="showPay" @click="ApplySubmit">我要报名</div>
      <div class="apply_btn already_btn" v-if='alreadyPay'>已报名</div>
    </div>
  </div>
</template>

<script>
import {gameDetail, creatOrder, orderPay} from '@/api/index.js'
export default {
  data () {
    return {
      id: '',
      detailObj: {},
      showPay: false,
      alreadyPay: false
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    getDetail () {
      let params = {
        token: localStorage.getItem('tokenns'),
        match_id: this.id
      }
      gameDetail(params).then(res => {
        console.log(res)
        this.detailObj = res
        if (res.is_pay == true) {
          this.showPay = false
          this.alreadyPay = true
        } else {
          this.showPay = true
          this.alreadyPay = false
        }
      })
    },
    ApplySubmit () {
      console.log('创建订单')
      let params = {
        token: localStorage.getItem('tokenns'),
        match_id: this.id
      }
      console.log(params)
      const that = this;
      creatOrder(params).then(orderRes => {
        console.log(orderRes)
        let param = {
          token: localStorage.getItem('tokenns'),
          order_id: orderRes.order_id
        }
        orderPay(param).then(resPay => {
          console.log(resPay)
          const config = JSON.parse(resPay.config);
          WeixinJSBridge.invoke("getBrandWCPayRequest", config, res => {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              that.$router.go(-1);
            } else {
              this.$toast.fail("支付失败");
            }
          });
        })
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang="less">
  .detail {
    padding-bottom: 60px;
    .banner_img{
      width: 100%;
      height: 200px;
      background: #ccc;
    }
    .detail_desc{
      color: #333;
      font-size: 15px;
      line-height: 20px;
      padding: 10px 20px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .apply_main{
      border-top: 20px solid #f0f0f0; 
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .apply_info{
        p{
          margin-top: 5px;
          font-size: 15px;
          color: #666;
        }
      }
      .apply_btn{
        background: #76A1FF;
        text-align: center;
        line-height: 50px;
        margin-top: 5px;
        height: 45px;
        width: 120px;
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
      }
      .already_btn{
        opacity: 0.5;
      }
    }
  }
</style>
