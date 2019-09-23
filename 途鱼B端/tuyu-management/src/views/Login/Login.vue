<template>
  <div class="login">
    <div class="login_card">
      <p class="login_title">探鱼者运营平台</p>
      <div class="user_main">
        <el-form :model="loginForm" ref="loginForm" status-icon :rules="rules">
          <el-form-item class="user_input" prop="account">
            <el-input prefix-icon="el-icon-s-custom" type="text" v-model="loginForm.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="psw" class="user_input">
            <el-input type="password" prefix-icon="el-icon-unlock" v-model="loginForm.psw" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="piccode" class="user_input" style="margin-top: 10px;">
            <div class="code_input">
              <el-input type="text" class="code_pic" v-model="loginForm.piccode" placeholder="请输入验证码"></el-input>
              <div class="pic_code"></div>
              <i class="el-icon-refresh-right rush_icon"></i>
            </div>
          </el-form-item> -->
          <el-form-item>
            <div class="login_btn">
              <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">立即登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginMixin } from '@/mixin/loginMix'
import { Login } from '@/api/user/user.js'
export default {
  mixins: [loginMixin],
  data () {
    return {
      loginForm: {
        account: 'admin',
        psw: 'admin',
        piccode: ''
      },
      loading: false
    }
  },
  methods: {
    // 登录
    submitForm (loginForm) {
      this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.loading = true
            console.log(this.loginForm)
            let params = {
              username: this.loginForm.account,
              password: this.loginForm.psw
            }
            Login(params).then(res => {
              console.log(res)
              // this.$cookies.set('token', res.token)
              let routerStr = JSON.stringify(res.nodes)
              sessionStorage.setItem('route', routerStr)
              sessionStorage.setItem('token', res.token)
              sessionStorage.setItem('auth_id', res.auth_id),
              sessionStorage.setItem('name', this.loginForm.account)
              this.loading = false
              this.$router.push('/')
            })
            .catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      // this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
  .login{
    width: 100%;
    min-height: 100vh;
    border: 1px solid rgba(0,0,0,0);
    background: #000c17 url("~@/assets/img/background.svg") no-repeat 50%;
    background-size: 100% 100%;
    .login_card{
      margin: 150px auto 0;
      .login_title{
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        padding: 10px 0;
        color: #c4defd;
      }
      .user_main{
        margin-top: 20px;
        .el-input__icon{
          padding: 0 3px;
          line-height: 47px;
          font-size: 16px;
        }
        .user_input{
          width: 400px;
          margin: 30px auto 0;
          .el-input__inner{
            height: 45px;
            background: rgba(255, 255, 255, 0.11);
            caret-color: #8ea1b4;
            color: #eee;
          }
        }
        .login_btn{
          margin: 40px auto 0;
          width: 400px;
          height: 50px;
         .el-button{
           width: 100%;
           height: 100%;
         } 
        }
      }
      .code_input{
        width: 400px;
        margin: 20px auto 0;
        display: flex;
        justify-content: space-between;
        .code_pic{
          width: 200px;
          .el-input__inner{
            height: 45px;
            background: rgba(255, 255, 255, 0.11);
            caret-color: #8ea1b4;
            color: #eee;
          }
        }
        .pic_code{
          width: 120px;
          background: burlywood;
        }
        .rush_icon{
          font-size: 30px;
          margin-top: 5px;
          color: #c4defd;
          cursor: pointer;
        }
      }
    }
  }
</style>

