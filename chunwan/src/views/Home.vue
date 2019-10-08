<template>
  <div class="home">
    <div class="banner">
      <img src="../assets/img/banner.jpeg" alt>
    </div>
    <div class="home_main">
      <div class="main_list" @click="navApply">
        <div class="list_back">少</div>
        <div class="list_text">在线报名</div>
      </div>
      <div class="main_list">
        <div class="list_back">儿</div>
        <div class="list_text">赛事通知</div>
      </div>
      <div class="main_list">
        <div class="list_back">春</div>
        <div class="list_text">购买门票</div>
      </div>
      <div class="main_list">
        <div class="list_back">晚</div>
        <div class="list_text">活动图片</div>
      </div>
    </div>
    <div class="entrance">
      <div class="entrance_card">现场直播</div>
      <div class="entrance_card">直通少儿春晚</div>
    </div>
    <div class="advertising">
      <div class="advertising_list">
        <van-divider>独家冠名</van-divider>
        <div class="advertising_pic">
          <img src="../assets/img/car1.jpeg" alt>
        </div>
      </div>
      <div class="advertising_list">
        <van-divider>特约赞助</van-divider>
        <div class="advertising_pic">
          <img src="../assets/img/car1.jpeg" alt>
        </div>
      </div>
      <div class="advertising_list">
        <van-divider>新闻动态</van-divider>
        <div class="advertising_pic">
          <img src="../assets/img/car1.jpeg" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    navApply () {
      this.$router.push('/apply')
    }
  }
};
</script>

<style lang="less">
.home {
  .banner {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .home_main {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .main_list {
      width: 20%;
      text-align: center;
      .list_back {
        width: 60px;
        height: 60px;
        background: #d33630;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto 5px;
        font-size: 20px;
        font-weight: bold;
      }
      .list_text {
        font-size: 13px;
        color: #d33630;
      }
    }
  }
  .entrance {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .entrance_card {
      width: 150px;
      text-align: center;
      padding: 15px 0;
      font-size: 18px;
      color: #fff;
      background: #d33630;
      border-radius: 5px;
    }
  }
  .advertising {
    margin-top: 20px;
    padding: 0 10px 20px;
    .advertising_list {
      margin-top: 40px;
      .advertising_pic {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

