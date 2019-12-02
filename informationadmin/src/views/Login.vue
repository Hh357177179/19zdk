<template>
  <div class="login">
    <div class="login_card">
      <p class="login_title">五优采集</p>
      <div class="user_main">
        <el-form :model="loginForm" ref="loginForm" status-icon :rules="rules">
          <el-form-item class="user_input" prop="username">
            <el-input
              prefix-icon="el-icon-s-custom"
              type="text"
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="user_input">
            <el-input
              type="password"
              prefix-icon="el-icon-unlock"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
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
import { Login } from "@/api/index.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    // 登录
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.loading = true;
          console.log(this.loginForm);
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          Login(params)
            .then(res => {
              console.log(res);
              sessionStorage.setItem("token", res.token);
              this.$router.push('/home')
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  min-height: 100vh;
  border: 1px solid rgba(0, 0, 0, 0);
  background: #000c17 url("~@/assets/img/background.svg") no-repeat 50%;
  background-size: 100% 100%;
  .login_card {
    margin: 150px auto 0;
    .login_title {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      padding: 10px 0;
      color: #c4defd;
    }
    .user_main {
      margin-top: 20px;
      .el-input__icon {
        padding: 0 3px;
        line-height: 47px;
        font-size: 16px;
      }
      .user_input {
        width: 400px;
        margin: 30px auto 0;
        .el-input__inner {
          height: 45px;
          background: rgba(255, 255, 255, 0.11);
          caret-color: #8ea1b4;
          color: #eee;
        }
      }
      .login_btn {
        margin: 40px auto 0;
        width: 400px;
        height: 50px;
        .el-button {
          width: 100%;
          height: 100%;
        }
      }
    }
    .code_input {
      width: 400px;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
      .code_pic {
        width: 200px;
        .el-input__inner {
          height: 45px;
          background: rgba(255, 255, 255, 0.11);
          caret-color: #8ea1b4;
          color: #eee;
        }
      }
      .pic_code {
        width: 120px;
        background: burlywood;
      }
      .rush_icon {
        font-size: 30px;
        margin-top: 5px;
        color: #c4defd;
        cursor: pointer;
      }
    }
  }
}
</style>

