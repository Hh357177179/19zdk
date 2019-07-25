<template>
  <div class="me">
    <div class="head_main">
      <div class="avatar">
        <img :src="userObj.avatar" alt="">
      </div>
      <p class="nickName">{{userObj.nickname}}</p>
    </div>
    <div class="me_list">
      <p class="list_info" @click="Approve">{{$t('text13')}}</p>
      <p class="list_info" @click="planRouter">{{$t('text14')}}</p>
      <!-- <p class="list_info">我的参赛记录</p> -->
      <p class="list_info" @click="applyRecord">{{$t('text15')}}</p>
      <!-- <p class="list_info" @click="Approve">申请认证</p> -->
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/index.js'
export default {
  data () {
    return {
      userObj: {}
    }
  },
  methods: {
    // SearchUser () {
    //   this.$router.push('/userInfo')
    // },
    planRouter () {
      this.$router.push('/drill')
    },
    Approve () {
      this.$router.push('/approveInfo')
    },
    applyRecord () {
      this.$router.push('/applyRecord')
    },
    getUser () {
      let params = {
        token: localStorage.getItem('tokenns')
      }
      getUserInfo(params).then(res => {
        console.log(res)
        this.userObj = res
      })
    },
  },
  mounted () {
    this.getUser()
  }
}
</script>

<style lang="less">
  .me{
    width: 100%;
    height: 100%;
    .head_main{
      width: 100%;
      height: 160px;
      background: #76A1FF;
      padding-top: 25px;
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .nickName{
        font-size: 15px;
        text-align: center;
        padding: 10px 0;
        color: #333;
      }
    }
    .me_list{
      padding: 0 40px;
      .list_info{
        background: #76A1FF;
        line-height: 50px;
        border-radius: 5px;
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>
