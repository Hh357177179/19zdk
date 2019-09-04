<template>
  <div class="root">
    <el-container>
      <el-header class="header">
        <span>探鱼者</span>
      </el-header>
      <el-container>
        <el-aside class="aside" width="210px">
          <!-- router
          :default-active="$route.path" -->
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="hsla(0,0%,100%,.65)"
            active-text-color="#fff"
            :unique-opened='true'
          >
          <template v-for="(item,index) in navList">
              <!-- 折叠二级菜单 -->
              <el-submenu :index="item.path" :key="index"
                  v-if="item.path != '*' && item.children">
                  <template slot="title">
                      <i class="iconfont icon_nav" :class="item.meta.icon"></i>
                      <span slot="title">{{item.meta.title}}</span>
                  </template>
                  <el-menu-item v-for="(t,i) in item.children" :index="t.path" :key="i"
                      v-show="t.path != '*'">
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
              <router-view v-show="showMain" ></router-view>
            </transition>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [],
      showMain: false
    };
  },
  created () {
    // console.log(this.$router.options.routes[0].children)
    this.navList = this.$router.options.routes[0].children
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
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
  },
  mounted () {
    this.showMain = true
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
  }
  .aside {
    background: #ccc;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding-top: 60px;
    .el-menu{
      height: 100%;
    }
    .icon_nav{
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
