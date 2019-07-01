<template>
  <div class="sign_in">
    <div class="success_pic">
      <img src="../assets/img/successful.png" alt="">
    </div>
    <div class="success_text">{{text}}</div>
  </div>
</template>

<script>
import { SignIn } from '../api/index.js'
export default {
  data () {
    return {
      activity_id: '',
      text: ''
  }
  },
  created () {
    this.activity_id = this.$route.params.id;
  },
  methods: {
    signFun () {
      let params = {
        token: localStorage.getItem("tokenns"),
        activity_id: this.activity_id
      }
      console.log(params)
      SignIn(params).then(res => {
        this.text = '签到成功'
        this.$toast('签到成功')
      })
    }
  },
  mounted () {
    this.signFun()
  }
}
</script>

<style lang="less">
  .sign_in{
    border: 1px solid rgba(0,0,0,0);
    .success_pic{
      margin: 100px auto 0;
      width: 80px;
      height: 80px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .success_text{
      text-align: center;
      color: #cba787;
      font-size: 16px;
      margin-top: 20px;
    }
  }
</style>
