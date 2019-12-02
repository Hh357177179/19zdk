<template>
  <div class="root">
    <el-container>
      <el-container>
        <el-header class="head">
          <div>五优采集</div>
          <div class="info">
            <!-- <span>{{name}}</span> -->
            <el-button type="info" plain class="sign_out" @click="changePsw">修改密码</el-button>
            <el-button type="info" plain class="sign_out" @click="signOut">退出</el-button>
          </div>
        </el-header>
        <el-aside width="205px" class="slide">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
        <el-menu-item index="/home">
        <i class="el-icon-s-order"></i>
        <span slot="title">报名列表</span>
      </el-menu-item>
       <el-menu-item index="/system">
        <i class="el-icon-setting"></i>
        <span slot="title">系统配置</span>
      </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <el-form :model="pswForm" status-icon :rules="rules" ref="pswForm" label-width="100px">
          <el-form-item label="旧密码" prop="old_password">
            <el-input type="password" v-model="pswForm.old_password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password">
            <el-input type="password" v-model="pswForm.new_password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_password">
            <el-input type="password" v-model="pswForm.re_password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submitEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editPsw } from '../api/index.js'
export default {
  data() {
     var oldValidatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.pswForm.re_password !== '') {
          this.$refs.pswForm.validateField('re_password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pswForm.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      pswForm: {
        old_password: '',
        new_password: '',
        re_password: ''
      },
      rules: {
        new_password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        re_password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        old_password: [
          { validator: oldValidatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitEdit () {
      this.$refs.pswForm.validate((valid) => {
        if (valid) {
          let params = {
            token: sessionStorage.getItem('token'),
            old_password: this.pswForm.old_password,
            new_password: this.pswForm.new_password,
            re_password: this.pswForm.re_password
          }
          editPsw(params).then(res => {
            console.log(res)
            if (res) {
              this.$alert('密码修改成功，请重新登录', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.signOut()
                }
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose () {
      this.$refs.pswForm.resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false
      })
    },
    changePsw () {
      this.dialogVisible = true
    },
    signOut() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less">
.root {
  .head {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #545c64;
    line-height: 60px;
    color: #fff;
    border-bottom: 1px solid #ccc;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sign_out {
      margin-left: 20px;
      padding: 8px 20px;
    }
  }
  .slide {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding-top: 60px;
    .el-menu {
      height: 100%;
    }
    .icon_nav {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .main {
    margin-left: 205px;
    margin-top: 60px;
  }
  .el-main {
    padding: 10px;
  }
}
</style>
