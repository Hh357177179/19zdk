<template>
  <div class="detail">
    <!-- <div class="detail_pic">
      <img src="../assets/img/c2.jpeg" alt>
    </div>-->
    <div class="detail_info">
      <div class="detail_title">{{detailObj.title}}</div>
      <div class="pay_span" v-if="detailObj.type == 2">付费</div>
      <div class="d_teacher d_text overflowText">
        <span class="d_label">讲座老师：</span>
        {{detailObj.teacher_name}}
      </div>
      <div class="d_time d_text overflowText">
        <span class="d_label">讲座时间：</span>
        {{detailObj.start_time}}
      </div>
      <div class="d_local d_text overflowText">
        <span class="d_label">讲座地点：</span>
        {{detailObj.address}}
      </div>
      <div class="d_duration d_text overflowText">
        <span class="d_label">讲座时长：</span>
        {{detailObj.duration}}
      </div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">课程简介:</p>
      <div class="teacher_intro">{{detailObj.target}}</div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">讲师简介:</p>
      <div
        class="teacher_intro" v-if="detailObj.teacher_resume != null && detailObj.teacher_resume != ''">{{detailObj.teacher_resume}}</div>
      <div class="teacher_intro">该讲师暂无简介</div>
    </div>
    <div class="apply" @click="applyBtn">点击报名</div>
    <van-dialog v-model="show" title="报名信息" show-cancel-button :before-close="beforeCloses">
      <van-field v-model="userName" label="姓名" placeholder="请输入姓名"/>
      <van-field v-model="userTel" label="手机号码" placeholder="请输入手机号码"/>
    </van-dialog>
  </div>
</template>

<script>
import { getJssdk, DetailClass, creatOrder, payOrder } from "@/api/index.js";
export default {
  data() {
    return {
      show: false,
      userName: "",
      userTel: "",
      activity_id: "",
      detailObj: {}
    };
  },
  created() {
    this.activity_id = this.$route.params.id;
  },
  methods: {
    // 点击报名
    applyBtn() {
      this.show = true;
    },
    // dialog确认
    beforeCloses(action, done) {
      if (action == "cancel") {
        (this.userName = ""), (this.userTel = "");
        done();
      } else {
        done(false); //不关闭弹框
        if (this.userName == "") {
          this.$toast("请输入姓名");
        } else if (this.userTel == "") {
          this.$toast("请输入手机号码");
        } else {
          console.log("验证通过");
          let params = {
            token: localStorage.getItem("token"),
            activity_id: this.activity_id,
            name: this.userName,
            phone: this.userTel
          };
          const that = this;
          creatOrder(params).then(resOrder => {
            console.log(resOrder);
            done();
            if (resOrder.need_pay == 0) {
              this.$router.push("/success");
            } else {
              let param = {
                token: localStorage.getItem("token"),
                order_id: resOrder.order_id
              };
              payOrder(param).then(resPay => {
                console.log(1111,resPay);
                const config = JSON.parse(resPay.config);
                console.log(123,config)
                WeixinJSBridge.invoke("getBrandWCPayRequest", config, res => {
                  if (res.err_msg === "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    that.$router.push("/success");
                  } else {
                    this.$toast.fail('支付失败')
                  }
                })
              })
            }
          })
          .catch((e) => {
            this.$toast.fail(e.msg || '报名失败')
          })
        }
      }
    },
    // 获取课程详情
    getDetail() {
      let params = {
        activity_id: this.activity_id
      };
      DetailClass(params).then(res => {
        // console.log(res)
        this.detailObj = { ...res };
        console.log(this.detailObj);
      });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style lang="less">
.detail {
  width: 100%;
  min-height: 100vh;
  // background: #f3f2f1;
  .detail_pic {
    width: 100%;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail_info {
    position: relative;
    padding: 0 16px;
    .pay_span {
      width: 50px;
      background: #cba787;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border-radius: 3px;
      position: absolute;
      right: 5px;
      top: 0;
    }
    .detail_title {
      color: #191f25;
      font-size: 18px;
      font-weight: 600;
      line-height: 20px;
      margin-top: 20px;
      margin-bottom: 10px;
      width: 300px;
    }
    .d_text {
      width: 340px;
      font-size: 15px;
      color: rgba(25, 31, 37, 0.8);
      line-height: 24px;
      .d_label {
        color: rgba(25, 31, 37, 0.6);
      }
    }
  }
  .teacher_info {
    padding: 0 16px;
    font-size: 18px;
    color: #cba787;
    margin-top: 15px;
    .teacher_title {
      font-weight: 600;
    }
    .teacher_intro {
      color: rgba(25, 31, 37, 8);
      font-size: 15px;
      line-height: 25px;
    }
  }
  .apply {
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
  .van-dialog__header {
    padding-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
