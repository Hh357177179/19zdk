<template>
  <div class="root">
    <el-container>
      <el-container>
        <el-header class="head">
          <div>互联网+电梯监管智慧平台</div>
          <div class="info">
            <span>{{name}}</span>
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
                  v-show="t.path != '*' && !t.meta.un_show && t.meta.show != false"
                >
                  <template slot="title">
                    <i class="iconfont icon_nav" :class="t.meta.icon"></i>
                    <span slot="title">{{t.meta.title}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>

              <!-- 一级菜单直接跳转 -->
              <template v-if="item.path != '*' && !item.children && !item.meta.un_show">
                <el-menu-item :index="item.path" :key="index" class="first-menu">
                  <i class="iconfont icon_nav" :class="item.meta.icon"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [],
      identityState: sessionStorage.getItem("type"),
      name: sessionStorage.getItem("name"),
      titles: sessionStorage.getItem('title'),
      roles: sessionStorage.getItem('role')
    };
  },
  created() {
    const navList = this.$router.options.routes[1].children;
    
      for (let a in navList) {
        if (navList[a].name == "organize") {
          for (let b in navList[a].children) {
            if (navList[a].children[b].name == "organizeNotice") {
              if (this.identityState != 1) {
                navList[a].children[b].meta.show = false;
              } else {
                navList[a].children[b].meta.show = true;
              }
            }
          }
        }
        if (navList[a].name == "System") {
          if (this.titles == '系统平台' && this.roles == '系统管理员') {
            navList[a].meta.un_show = false
          } else {
            navList[a].meta.un_show = true
          }
        }
        console.log('所有路由',navList)
    }
    this.navList = navList;
  },
  methods: {
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
