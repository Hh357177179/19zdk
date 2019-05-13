<template>
  <div class="hpage">
    <div class="banner">
      <el-carousel :interval="3000" arrow="never">
        <el-carousel-item v-for="(item, index) in bannerArr" :key="index">
          <!-- <img :src="item.ban" alt=""> -->
          <img src="../../assets/img/b1.jpg" alt>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="server_card">
      <p class="card_title">服务内容</p>
      <p class="card_text">以提升客户业绩和可持续发展能力为己任</p>
      <div class="icon_card">
        <div class="server_card_list">
          <p class="icon_list iconfont icon-xiangmushenbaoguanli"></p>
          <p class="crad_text">项目申报</p>
        </div>
        <div class="server_card_list">
          <p class="icon_list iconfont icon-jifeiguanli"></p>
          <p class="crad_text">加计扣除</p>
        </div>
        <div class="server_card_list">
          <p class="icon_list iconfont icon-rongzirongquankaihu"></p>
          <p class="crad_text">融资服务</p>
        </div>
      </div>
    </div>
    <div class="policy policy_back">
      <p class="policy_title">政策咨询</p>
      <p class="policy_text">以提升客户业绩和可持续发展能力为己任</p>
      <div class="policy_nav">
        <p>申报通知</p>
        <p>项目公示</p>
        <p>管理办法</p>
      </div>
      <div class="policy_card clearfix">
        <div class="prolicy_left">
          <div class="prolicy_pic"></div>
          <div class="pic_text">
            <p class="pic_title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
            <p class="pic_content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          </div>
        </div>
        <div class="prolicy_right">
          <div class="prolicy_list">
            <div class="prolicy_time">
              
            </div>
            <div class="time_text">
              <p class="time_title">我是标题</p>
              <p class="time_content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="policy class_room">
      <p class="policy_title">科科讲堂</p>
      <p class="policy_text">以提升客户业绩和可持续发展能力为己任</p>
      <div class="policy_card clearfix">
        <div class="prolicy_left">
          <div class="prolicy_pic"></div>
          <div class="pic_text">
            <p class="pic_title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
            <p class="pic_content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          </div>
        </div>
        <div class="prolicy_right">
          <div class="prolicy_list">
            <div class="prolicy_time">
              
            </div>
            <div class="time_text">
              <p class="time_title">我是标题</p>
              <p class="time_content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticList, getColumn } from '../../api/index.js'
export default {
  data() {
    return {
      bannerArr: [
        { ban: "../../assets/img/b1.jpg" },
        { ban: "../../assets/img/b2.jpg" },
        { ban: "../../assets/img/b3.jpg" }
      ],
      zhenceId: '',
      zhengceArr: []
    }
  },
  methods: {
    getLists () {
      let params = {
          class_id: this.zhenceId,
          page: 1
        }
        getArticList(params).then(res => {
          let arrs = res.List.splice(0,4)
          this.zhengceArr = arrs
          console.log(this.zhengceArr)
        })
    },
    getNav () {
      getColumn().then(res => {
        console.log(res)
        let arr = res.filter(x => x.class_id == 1)
        // console.log(arr)
        this.zhenceId = arr[0].sub[0].class_id
        this.getLists()
      })
    }
  },
  mounted () {
    this.getNav()
  }
};
</script>


<style lang="less">
.hpage {
  width: 100%;
  height: 100%;
  .banner {
    width: 100%;
    height: 640px;
    .el-carousel {
      height: 640px;
      .el-carousel__container {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .server_card {
    margin-top: 50px;
    .card_title {
      width: 100%;
      font-size: 24px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    .card_text {
      margin-top: 10px;
      text-align: center;
      color: #666;
      margin-bottom: 40px;
    }
    .icon_card {
      width: 920px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .server_card_list {
        cursor: pointer;
        width: 300px;
        height: 200px;
        background: #e7effe;
        text-align: center;
        padding-top: 40px;
        border-radius: 4px;
        border: 1px solid @fontColor;
        .icon_list {
          font-size: 70px;
          color: @fontColor;
        }
        .crad_text {
          margin-top: 15px;
          font-size: 18px;
          color: @fontColor;
        }
      }
    }
  }
  .policy {
    margin-top: 50px;
    width: 100%;
    height: 800px;
    .policy_title {
      padding-top: 50px;
      width: 100%;
      font-size: 24px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    .policy_text {
      margin-top: 10px;
      text-align: center;
      color: #666;
      margin-bottom: 20px;
    }
    .policy_nav {
      display: flex;
      justify-content: space-between;
      width: 400px;
      margin: 0 auto;
      font-size: 20px;
      color: #fff;
      p {
        padding: 0 10px 5px;
        cursor: pointer;
      }
    }
    .policy_card {
      margin: 10px auto;
      width: 1200px;
      // height: 500px;
      background: #f00;
      .prolicy_left {
        float: left;
        .prolicy_pic {
          width: 500px;
          height: 400px;
          background: #fff;
        }
        .pic_text {
          width: 500px;
          .pic_title {
            margin-top: 10px;
            font-size: 20px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
          .pic_content{
            font-size: 17px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
      .prolicy_right {
        margin-left: 20px;
        float: left;
        .prolicy_list {
          float: left;
          .prolicy_time{
            width: 80px;
            height: 80px;
            background: #ccc;
            float: left;
          }
          .time_text{
            float: left;
            margin-left: 20px;
            margin-top: 10px;
            .time_title{
              font-size: 20px;
            }
            .time_content {
              font-size: 17px;
            }
          }
        }
      }
    }
  }
  .policy_back{
    background: url('../../assets/img/cardBackPic.png') no-repeat;
    background-size: 100% 100%;
  }
  .class_room{
    height: 680px;
  }
}
</style>

