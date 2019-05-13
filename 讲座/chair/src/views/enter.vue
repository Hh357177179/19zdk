<template>
  <div class="home">
    <p class="school_name">{{school}}</p>
    <p class="main_info">报名须知：每个用户仅可报名一个讲座</p>
    <div class="card_list" v-for="(item, index) in listArr" :key="index" @click="detailPage(item.id)">
      <!-- <div class="card_pic">
        <img src="../assets/img/c1.jpg" alt="">
      </div> -->
      <div class="card_info">
        <div class="info_title overflowText">{{item.title}}</div>
        <div class="info_teacher overflowText">讲座老师：{{item.teacher_name}}</div>
        <div class="info_teacher overflowText">讲座时间：{{item.start_time}}</div>
        <div class="info_teacher overflowText">讲座地点：{{item.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {allList} from '@/api/index.js'
export default {
  data () {
    return {
      channel_id: '',
      type: 1,
      listArr: [],
      school: ''
    }
  },
  created () {
    this.channel_id  = this.$route.params.id
    localStorage.setItem('channel', this.$route.params.id)
  },
  methods: {
    // 获取首页列表
    getList () {
      let params = {
        channel_id: this.channel_id,
        type: this.type
      }
      allList(params).then(res => {
        console.log(res)
        this.school = res.school.title
        this.listArr = [...res.activity]
      })
    },
    // 详情
    detailPage (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>


<style lang="less">
  .home{
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
    padding-top: 16px;
    .school_name{
      font-size: 16px;
      color: #cba787;
      text-align: center;
      margin-bottom: 10px;
    }
    .main_info{
      font-size: 14px;
      color: #cba787;
      margin-left: 20px;
      margin-bottom: 10px;
    }
    .card_list{
      margin-bottom: 16px;
      background: #fff;
      padding: 16px 20px;
      .card_pic{
        width: 100%;
        height: 200px;
        border-radius: 5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .card_info{
        width: 330px;
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
  }
</style>

