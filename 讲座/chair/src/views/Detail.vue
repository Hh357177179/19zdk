<template>
  <div class="detail">
    <!-- <div class="detail_pic">
      <img src="../assets/img/c2.jpeg" alt>
    </div>-->
    <div class="detail_info">
      <div class="detail_title">{{detailObj.title}}</div>
      <div class="pay_span" v-if="detailObj.type == 2">付费</div>
      <div class="d_teacher d_text overflowText">
        <span class="d_label">讲座/辅导老师：</span>
        {{detailObj.teacher_name}}
      </div>
      <div class="d_time d_text overflowText">
        <span class="d_label">讲座/辅导时间：</span>
        {{detailObj.start_time}}
      </div>
      <div class="d_local d_text overflowText">
        <span class="d_label">讲座/辅导地点：</span>
        {{detailObj.address}}
      </div>
      <div class="d_duration d_text overflowText">
        <span class="d_label">讲座/辅导时长：</span>
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
        class="teacher_intro"
        v-if="detailObj.teacher_resume != null && detailObj.teacher_resume != ''"
      >{{detailObj.teacher_resume}}</div>
      <div
        class="teacher_intro"
        v-if="detailObj.teacher_resume == null || detailObj.teacher_resume == ''"
      >该讲师暂无简介</div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">面向人群:</p>
      <div
        class="teacher_intro"
        v-if="detailObj.crowd != null && detailObj.crowd != ''"
      >{{detailObj.crowd}}</div>
      <div class="teacher_intro" v-if="detailObj.crowd == null || detailObj.crowd == ''">该课程暂无面向人群范围</div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">问题:</p>
      <div
        class="teacher_intro"
        v-if="detailObj.question != null && detailObj.question != ''"
      >{{detailObj.question}}</div>
      <div
        class="teacher_intro"
        v-if="detailObj.question == null || detailObj.question == ''"
      >该课程暂无问题</div>
    </div>
    <div class="apply" @click="applyBtn(detailObj.type)">点击报名</div>
    <van-dialog v-model="show" title="报名信息" show-cancel-button :before-close="beforeCloses">
      <div class="true_text">是否确认报名改课程？</div>
      <!-- <van-field v-model="userName" label="姓名" label-align="center" placeholder="请输入姓名"/>
      <van-field
        v-model="userTel"
        type="tel"
        label-align="center"
        maxlength="11"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="note"
        type="textarea"
        label-align="center"
        rows="1"
        autosize
        label="备注"
        placeholder="请输入备注"
      />
      <van-field
        v-model="question"
        type="textarea"
        label-align="center"
        rows="1"
        autosize
        label="回答"
        :placeholder="placText"
      /> -->
      <p class="switch_line clearfix" v-if="showSwitch">
        <span>是否使用免费劵</span>
        <van-switch
          @change="changeSwitch"
          class="switchOn"
          v-model="checkeds"
          active-color="#07c160"
          inactive-color="#323233"
          size="20px"
        />
      </p>
    </van-dialog>
  </div>
</template>

<script>
import {
  getJssdk,
  DetailClass,
  creatOrder,
  payOrder,
  haveRoll
} from "@/api/index.js";
export default {
  data() {
    return {
      showSwitch: false,
      checkeds: true,
      show: false,
      userName: "",
      userTel: "",
      activity_id: "",
      note: "",
      question: "",
      detailObj: {},
      placText: "请输入回答",
      is_free: ""
    };
  },
  created() {
    this.activity_id = this.$route.params.id;
  },
  methods: {
    changeSwitch(val) {
      console.log(val);
      if (val) {
        this.is_free = 1;
      } else {
        this.is_free = 0;
      }
    },
    // 点击报名
    applyBtn(type) {
      console.log(type);
      let params = {
        token: localStorage.getItem("tokenns")
      };
      haveRoll(params).then(res => {
        console.log(res);
        if (type == 1) {
          this.showSwitch = false;
          this.checkeds = false;
          this.is_free = 0;
        } else {
          if (res.free_number <= 0) {
            this.showSwitch = false;
            this.checkeds = false;
            this.is_free = 0;
          } else {
            this.showSwitch = true;
            this.checkeds = true;
            this.is_free = 1;
          }
        }
        this.show = true;
        if (this.detailObj.question != "") {
          this.placText = this.detailObj.question;
        }
      });
    },
    // dialog确认
    beforeCloses(action, done) {
      if (action == "cancel") {
        done();
      } else {
        done(false); //不关闭弹框
          let params = {
            token: localStorage.getItem("tokenns"),
            activity_id: this.activity_id,
            // name: this.userName,
            // phone: this.userTel,
            // note: this.note,
            // question: this.question,
            is_free: this.is_free
          };
          const that = this;
          creatOrder(params)
            .then(resOrder => {
              console.log(resOrder);
              done();
              if (resOrder.need_pay == 0) {
                this.$router.push(`/success/${this.detailObj.is_buy_vip}`);
              } else {
                // alert(this.$route.path)
                // console.log(this.$route)
                // alert(resOrder)
                let param = {
                  token: localStorage.getItem("tokenns"),
                  order_id: resOrder.order_id
                };
                payOrder(param).then(resPay => {
                  const config = JSON.parse(resPay.config);
                  console.log("config回调", config);
                  WeixinJSBridge.invoke("getBrandWCPayRequest", config, res => {
                    console.log('测试', config)
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                      that.$router.push(
                        `/success/${this.detailObj.is_buy_vip}`
                      );
                    } else {
                      this.$toast.fail("支付失败");
                    }
                  });
                });
              }
            })
            .catch(e => {
              // this.$toast.fail(e.msg || "报名失败");
            });
      }
    },
    // 获取课程详情
    getDetail() {
      let params = {
        activity_id: this.activity_id
      };
      DetailClass(params).then(res => {
        console.log(res);
        this.detailObj = { ...res };
        // console.log(this.detailObj);
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
  .switch_line {
    padding-left: 20px;
    font-size: 14px;
    color: #323233;
    line-height: 44px;
    span {
      float: left;
    }
    .switchOn {
      margin: 10px 0 0 10px;
      float: left;
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
  .van-dialog__content{
    text-align: center;
    padding: 10px 0;
    color: #333;
    font-size: 15px;
  }
  .true_text{
    text-align: center;
  }
}
</style>
