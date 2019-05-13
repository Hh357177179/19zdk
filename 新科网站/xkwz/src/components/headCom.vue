<template>
  <div class="head clearfix">
    <span class="logo">
      <img src="../assets/img/logo.png" alt>
    </span>
    <div class="right_top clearfix">
      <div class="top_right clearfix">
        <p class="tel_head">
          <span>
            <i class="iconfont icon-dianhua"></i>
            <span>400-888-000</span>
          </span>
          <!-- <span class="join_us right_us">加入我们</span>
          <span class="tel_us right_us">联系我们</span> -->
        </p>
      </div>
      <div class="nav_bar">
        <p class="nav_list" :class="num == -1 ? 'addColor' : ''" tag="li" @click="routerNav('/', -1)">首页</p>
        <p :class="num == index ? 'addColor' : ''" @click="routerNav(list.url, index, list.class_id)" class="nav_list" v-for="(list, index) in listNav" :key="index">{{list.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getColumn } from '@/api/index.js'
export default {
  data() {
    return {
      num: -1,
      listNav: [],
      headList: [
        { name: "政策资讯", path: "/policy" },
        { name: "服务内容", path: "/server" },
        { name: "科科讲堂", path: "/classroom" },
        { name: "关于科新", path: "/about" }
      ]
    };
  },
  // watch: {
  //   '$route': function(to, from) {
  //      console.log(this.$route.path)
  //      if (this.$route.path) {

  //      }
  //   }
  // },
  methods: {
    // 导航跳转
    routerNav (path, index,id) {
      this.num = index
      if (this.num != -1) {
        this.$router.push(`${path}/${id}`)
      } else {
        this.$router.push('/')
      }
    },
    getColumnList () {
      getColumn().then(res => {
        for (let i = 0;i < res.length;i++) {
          res[i].url = this.headList[i].path
        }
        // console.log(res.result)
        this.listNav = res
      })
    }
  },
  mounted () {
    this.getColumnList()
  }
};
</script>

<style lang="less">
.head {
  width: 100%;
  height: 120px;
  background: @backWhite;
  padding: 0 50px;
  .logo {
    width: 211px;
    height: 60px;
    float: left;
    margin-top: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right_top {
    float: right;
    width: 800px;
    .top_right {
      width: 100%;
      .tel_head {
        float: right;
        font-size: 20px;
        color: @fontColor;
        font-weight: bold;
        margin-top: 40px;
        span {
          i {
            float: @floatLeft;
            margin-top: 2px;
          }
          float: @floatLeft;
        }
        .icon-dianhua {
          margin-right: 10px;
        }
        .right_us {
          float: left;
          font-size: 12px;
          color: @fontBlack;
          padding-left: 16px;
          // border-left: 1px solid #ccc;
          margin-left: 20px;
          font-weight: normal;
          line-height: 23px;
        }
      }
    }
    .nav_bar{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .nav_list{
        font-size: 18px;
        cursor: pointer;
        color: #333;
        border-bottom: 3px solid rgba(0,0,0,0);
        padding-bottom: 8px;
      }
      .addColor{
        color: @fontColor;
        border-color: @fontColor;
      }
      .nav_list:hover{
        color: @fontColor;
        border-color: @fontColor;
      }
    }
  }
}
</style>
