<template>
  <div class="root">
    <el-container>
      <el-header class="header">
        <div>探鱼者</div>
        <div>
          <span>{{name}}</span>
          <span class="top_btn" @click="changePsw">修改密码</span>
          <span class="top_btn" @click="logOut">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside" width="210px">
          <!-- router
          :default-active="$route.path"-->
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="hsla(0,0%,100%,.65)"
            active-text-color="#fff"
            :unique-opened="true"
          >
            <template v-for="(item,index) in navList">
              <!-- 折叠二级菜单 -->
              <el-submenu :index="item.path" :key="index" v-if="item.path != '*' && item.children">
                <template slot="title">
                  <i class="iconfont icon_nav" :class="item.meta.icon"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </template>
                <el-menu-item
                  v-for="(t,i) in item.children"
                  :index="t.path"
                  :key="i"
                  v-show="t.path != '*'"
                >
                  <template slot="title">
                    <i class="iconfont icon_nav" :class="t.meta.icon"></i>
                    <span slot="title">{{t.meta.title}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>

              <!-- 一级菜单直接跳转 -->
              <template v-if="item.path != '*' && !item.children">
                <el-menu-item :index="item.path" :key="index" class="first-menu">
                  <i class="iconfont icon_nav" :class="item.meta.icon"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <transition name="el-zoom-in-center">
            <router-view v-show="showMain"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="600" :before-close="handleClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="old_password">
          <el-input type="password" v-model="ruleForm.old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="ruleForm.new_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_password">
          <el-input type="password" v-model="ruleForm.re_password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="truePsw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editPsw } from '@/api/user/user.js'
export default {
  data() {
    var validatePassOld = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.re_password !== '') {
            this.$refs.ruleForm.validateField('re_password');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.new_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      navList: [],
      showMain: false,
      name: "",
      dialogVisible: false,
      ruleForm: {
        old_password: '',
        new_password: '',
        re_password: ''
      },
      rules: {
          old_password: [
            { validator: validatePassOld, trigger: 'blur' }
          ],
          new_password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          re_password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    };
  },
  created() {
    this.name = sessionStorage.getItem("name");
    // console.log(this.$router.options.routes[0].children)
    let list = JSON.parse(sessionStorage.getItem("route"));
    console.log("符合条件的路由", list);
    const navList = this.$router.options.routes[0].children;
    const role_id = sessionStorage.getItem("auth_id");
    if (role_id - 0 === 0) {
      this.navList = navList.map(item => {
        if (item.children) {
          item.children = item.children.filter(child => !child.meta.un_show);
          return item;
        }
        return item;
      });
      return;
    }
    console.log("本地路由", this.navList);
    const menu = navList.map(item => {
      if (item.children) {
        item.children = item.children.filter(
          child => list.includes(child.name) && !child.meta.un_show
        );
        return item;
      }
      return item;
    });
    const sidebar = menu.filter(item => !item.children || item.children.length);
    console.log(sidebar, "遍历");
    this.navList = sidebar;
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(val.path)
        // if (val.path == '/home') {
        //   let arr = []
        //   arr = oldVal.path.split('/')
        //   console.log(arr)
        // }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    logOut () {
      this.$confirm('退出当前账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('name')
          sessionStorage.removeItem('route')
          sessionStorage.removeItem('auth_id')
          this.$nextTick(() => {
            this.$router.push('/login')
          })
        }).catch(() => {});
    },
    truePsw () {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            let params = {
              token: sessionStorage.getItem('token'),
              old_password: this.ruleForm.old_password,
              new_password: this.ruleForm.new_password,
              re_password: this.ruleForm.re_password
            }
            editPsw(params).then(res => {
              console.log(res)
              if (res) {
                this.handleClose()
                this.$alert('密码修改成功，请重新登录', '提示', {
                  confirmButtonText: '确定',
                  showClose: false,
                  callback: action => {
                    this.$router.push('/login')
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
    changePsw () {
      this.dialogVisible = true
    },
    handleClose () {
      this.$refs.ruleForm.resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false
      })
    }
  },
  mounted() {
    this.showMain = true;
  }
};
</script>

<style lang="less">
.root {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    background-color: #364452;
    z-index: 11;
    display: flex;
    align-items: center;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .top_btn {
      padding: 10px 20px;
      background: rgb(0, 21, 41);
      font-size: 15px;
      border-radius: 10px;
      margin-left: 20px;
    }
  }
  .aside {
    background: #ccc;
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
    margin-left: 210px;
    margin-top: 60px;
  }
}
</style>
