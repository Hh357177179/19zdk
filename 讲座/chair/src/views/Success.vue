<template>
  <div class="success">
    <div class="success_result">
      <div class="s_pic">
        <img src="../assets/img/successful.png" alt="">
      </div>
      <p class="result_text">报名成功</p>
    </div>
    <div class="back_home" @click="backHome">返回首页</div>
    <div class="pay_class">
      <p class="pay_title">精选课程</p>
    </div>
    <div class="pay_list" v-for="(item, index) in payArr" :key="index" @click="detailPage(item.id)">
      <div class="pay_info">
        <div class="info_title overflowText">{{item.title}}</div>
        <div class="info_teacher overflowText">讲座老师：{{item.teacher_name}}</div>
        <div class="info_teacher overflowText">讲座时间：{{item.start_time}}</div>
        <div class="info_teacher overflowText">讲座地点：{{item.address}}</div>
      </div>
    </div>
    <div class="er_code">
      <img src="../assets/img/ercode.jpeg" alt="">
    </div>
    <div class="er_text">如果要详细了解“渔妈妈家庭教育”，请扫码关注公众号</div>
  </div>
</template>

<script>
import { allList } from '../api/index.js'
export default {
  data () {
    return {
      payArr: [],
      type: 2
    }
  },
  methods: {
    backHome () {
      this.$router.push(`${localStorage.getItem('paths')}`)
    },
    // 详情
    detailPage (id) {
      this.$router.push(`/detail/${id}`)
    },
    getPayList () {
      let params = {
        channel_id: localStorage.getItem('channel'),
        type: this.type
      }
      allList(params).then(res => {
        console.log(res)
        this.payArr = [...res]
      })
    }
  },
  mounted () {
    this.getPayList()
  }
}
</script>

<style lang="less">
  .success{
    width: 100%;
    min-height: 100vh;
    // background: #f6f6f6;
    .success_result{
      width: 100%;
      background: #fff;
      padding-top: 20px;
      .s_pic{
        margin: 0 auto 20px;
        width: 64px;
        height: 64px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .result_text{
        text-align: center;
        color: #191F25;
        font-size: 20px;
      }
    }
    .back_home{
      width: 200px;
      border-radius: 10px;
      line-height: 45px;
      background: #cba787;
      color: #fff;
      font-size: 18px;
      margin: 20px auto 0;
      text-align: center;
    }
    .pay_class{
      margin-top: 20px;
      .pay_title{
        padding: 0 20px;
        font-size: 16px;
        color: #cba787;
      }
    }
    .pay_list{
      margin-bottom: 16px;
      background: #fff;
      box-shadow:0px 8px 16px 0px #f0f0f0;
      padding:10px 20px;
      .pay_pic{
        width: 100%;
        height: 200px;
        border-radius: 5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .pay_info{
        margin-left: 15px;
        width: 300px;
      }
      .info_title{
        font-size: 18px;
        font-weight: 600;
        color: #191F25;
        margin-top: 10px;
        margin-bottom: 3px;
      }
      .info_teacher{
        // font-weight: 400;
        font-size: 14px;
        color:rgba(25,31,37,0.72);
      }
    }
    .er_code{
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .er_text{
      font-size: 13px;
      color: #333;
      text-align: center;
      margin-top: 5px;
    }
  }
</style>
