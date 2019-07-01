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
      <div class="teacher_intro" v-if="detailObj.teacher_resume != null && detailObj.teacher_resume != ''">{{detailObj.teacher_resume}}</div>
      <div class="teacher_intro" v-if="detailObj.teacher_resume == null || detailObj.teacher_resume == ''">该讲师暂无简介</div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">面向人群:</p>
      <div class="teacher_intro" v-if="detailObj.crowd != null && detailObj.crowd != ''">{{detailObj.crowd}}</div>
      <div class="teacher_intro" v-if="detailObj.crowd == null || detailObj.crowd == ''">该课程暂无面向人群范围</div>
    </div>
    <div class="teacher_info">
      <p class="teacher_title">问题:</p>
      <div class="teacher_intro" v-if="detailObj.question != null && detailObj.question != ''">{{detailObj.question}}</div>
      <div class="teacher_intro" v-if="detailObj.question == null || detailObj.question == ''">该课程暂无问题</div>
    </div>
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
      note: '',
      question: '',
      detailObj: {},
      placText: '请输入回答'
    };
  },
  created() {
    this.activity_id = this.$route.params.id;
  },
  methods: {
    // 获取课程详情
    getDetail() {
      let params = {
        activity_id: this.activity_id
      };
      DetailClass(params).then(res => {
        console.log(res)
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
}
</style>
