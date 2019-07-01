<template>
  <div class="success">
    <div class="back_mian" style="padding-bottom: 10px;">
       <div class="success_result">
        <div class="s_pic">
          <img src="../assets/img/successful.png" alt>
        </div>
        <p class="result_text">报名成功</p>
      </div>
      <div class="back_home" @click="backHome">返回首页</div>
    </div>
    <div class="pay_class">
      <div v-if="showCard" class="back_mian" style="padding-bottom: 10px;">
        <div class="pay_title">会员</div>
        <div
          class="vip_card clearfix"
          v-for="(card, index) in vipArr"
          :key="index"
          @click="rVipDetail(card.id)"
        >
          <div class="clearfix">
            <div class="vip_card_title">{{card.title}}</div>
            <div class="vip_card_prise">{{card.money}}元</div>
          </div>
          <div class="search_more">查看详细信息</div>
          <div class="right_icon">
            <img src="../assets/img/rightIcon.png" alt>
          </div>
        </div>
      </div>
      <div class="dowm_app">
        <p class="down_title">渔妈妈APP下载</p>
        <p class="down_text">安卓手机：下载地址 <a href="http://muxindev.quasend.com/down/yumamaindex.html">http://muxindev.quasend.com/down/yumamaindex.html</a></p>
        <p class="down_text">苹果手机：在 App store 搜索“渔妈妈”</p>
      </div>
    </div>
    <div class="er_code">
      <img src="../assets/img/ercode.jpeg" alt>
    </div>
    <div class="er_text">如果要详细了解“渔妈妈家庭教育”，请扫码关注公众号</div>
  </div>
</template>

<script>
import { allList, vipList } from "../api/index.js";
export default {
  data() {
    return {
      payArr: [],
      type: 2,
      vipArr: [],
      showCard: false
    };
  },
  methods: {
    backHome() {
      this.$router.push(`${localStorage.getItem("paths")}`);
    },
    // 详情
    detailPage(id) {
      this.$router.push(`/detail/${id}`);
    },
    rVipDetail(id) {
      this.$router.push(`/vipDetail/${id}`);
    },
    getPayList() {
      let params = {
        channel_id: localStorage.getItem("channel"),
        type: this.type
      };
      allList(params).then(res => {
        console.log(213, res.activity);
        this.payArr = res.activity;
      });
    },
    getVipList() {
      vipList().then(res => {
        console.log(res);
        this.vipArr = [...res];
      });
    }
  },
  mounted() {
    if (this.$route.params.id == 1) {
      this.showCard = true;
    }
    this.getPayList();
    this.getVipList();
  }
};
</script>

<style lang="less">
.success {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  .success_result {
    width: 100%;
    background: #fff;
    padding-top: 20px;
    .s_pic {
      margin: 0 auto 20px;
      width: 64px;
      height: 64px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .result_text {
      text-align: center;
      color: #191f25;
      font-size: 20px;
    }
  }
  .back_home {
    width: 200px;
    border-radius: 10px;
    line-height: 45px;
    background: #cba787;
    color: #fff;
    font-size: 18px;
    margin: 20px auto 0;
    text-align: center;
  }
  .pay_class {
    margin-top: 10px;
    .dowm_app{
      margin-top: 10px;
      background: #fff;
      padding: 10px 20px;
      .down_title{
        font-size: 16px;
        color: #cba787;
        margin-bottom: 5px;
      }
      .down_text{
        color: #333;
        line-height: 20px;
        font-size: 15px;
      }
    }
    .pay_title {
      padding: 10px 20px;
      font-size: 16px;
      color: #cba787;
    }
    .vip_card {
      width: 300px;
      box-shadow: 0px 8px 16px 0px #ccc;
      margin: 20px auto;
      border-radius: 5px;
      padding: 15px 20px 10px;
      .vip_card_title {
        font-size: 16px;
        font-weight: 600;
        float: left;
        color: #333;
      }
      .vip_card_prise {
        font-size: 15px;
        float: right;
        color: #666;
      }
      .search_more {
        font-size: 13px;
        margin-top: 5px;
        float: left;
        color: #cba787;
      }
      .right_icon {
        width: 15px;
        height: 15px;
        float: left;
        margin: 7px 0 0 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .pay_list {
    margin-bottom: 16px;
    background: #fff;
    box-shadow: 0px 8px 16px 0px #f0f0f0;
    padding: 10px 20px;
    .pay_pic {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pay_info {
      margin-left: 15px;
      width: 300px;
    }
    .info_title {
      font-size: 18px;
      font-weight: 600;
      color: #191f25;
      margin-top: 10px;
      margin-bottom: 3px;
    }
    .info_teacher {
      // font-weight: 400;
      font-size: 14px;
      color: rgba(25, 31, 37, 0.72);
    }
  }
  .er_code {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .er_text {
    font-size: 13px;
    color: #333;
    text-align: center;
    margin-top: 5px;
  }
  .back_mian{
    background: #fff;
  }
}
</style>
