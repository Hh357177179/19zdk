<template>
  <div class="policy">
    <div class="banner">
      <img src="../../assets/img/ban1.jpg" alt>
    </div>
    <div class="information_nav">
      <div class="news_nav">
        <span v-for="(item,index) in titleArr" :key="index">{{item.name}}</span>
      </div>
    </div>
    <div class="information_main">
      <div class="infor_list clearfix">
        <div class="infor_left">
          <p class="infor_title">【简讯】聚焦业务主线，助推战略升级——百思特咨询携手理士国际启动LTC项目</p>
          <p class="infor_time clearfix">
            <span class="time_icon iconfont icon-shijian"></span>
            <span class="time_text">2019-09-09</span>
          </p>
          <p class="infor_content">聚焦业务主线，助推战略升级百思特咨询携手理士国际启动LTC项目近期，为使公司销售业务规范化、标准化，推动，助推战略升级百思特咨询携手理士国际启动LTC项目近期，为使公司销售业务规范化、标准化，推动</p>
          <div class="search_btn clearfix">
            <span>查看更多</span>
            <span class="iconfont icon-right"></span>
          </div>
        </div>
        <div class="infor_pic"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticList, getColumn } from '@/api/index.js'
export default {
  data() {
    return {
      titleArr: [],
      num: 0,
      class_id: '',
      page: 1
    };
  },
  methods: {
     getOnly () {
      getArticList(this.class_id, this.page).then(res => {
        console.log(res)
      })
    },
    getNavBar() {
      getColumn().then(res => {
        // console.log(res)
        this.titleArr = res[this.$route.params.id - 1].sub
        console.log(this.titleArr)
        this.class_id = res[this.$route.params.id - 1].sub[0].class_id
        console.log(this.class_id)
        // this.getOnly()
      })
    }
  },
  mounted () {
    this.getNavBar()
  }
};
</script>

<style lang="less">
.policy {
  width: 100%;
  height: 100%;
  .banner {
    width: 100%;
    height: 475px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .information_nav {
    width: 100%;
    height: 72px;
    border-bottom: 1px solid #f0f0f0;
    color: #666;
    .news_nav {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      span {
        display: inline-block;
        width: 160px;
        border-right: 1px solid #f0f0f0;
        text-align: center;
        margin-top: 25px;
      }
    }
  }
  .information_main {
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    .infor_list {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 30px;
      .infor_left {
        float: left;
        width: 690px;
        .infor_title {
          margin-top: 20px;
          font-size: 20px;
          color: #333;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          cursor: pointer;
        }
        .infor_title:hover {
          color: @fontColor;
        }
        .infor_time {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          span {
            float: left;
          }
          .time_icon {
            font-size: 20px;
            margin-right: 5px;
          }
          .time_text {
            margin-top: 3px;
          }
        }
        .infor_content {
          color: #666;
          font-size: 15px;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2; 
        }
        .search_btn{
          width: 150px;
          height: 40px;
          border: 1px solid #e5e5e5;
          text-align: center;
          margin-top: 62px;
          color: #666;
          cursor: pointer;
          span{
            line-height: 40px;
            font-size: 15px;
          }
          .icon-right{
            margin-left: 10px;
          }
        }
        .search_btn:hover{
          background: @fontColor;
          color: #fff;
          border-color: @fontColor;
        }
      }
      .infor_pic {
        width: 450px;
        height: 250px;
        background: #ccc;
        float: right;
      }
    }
  }
}
</style>
