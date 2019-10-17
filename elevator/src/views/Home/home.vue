<template>
  <div class="home">
    <div id="container" :style="{ width: 100 + '%', height: mapHeight + 'px' }"></div>
    <div class="status_card">
      <div class="card_list">
        <p class="one card_color"></p>
        <p class="card_text">待维保</p>
      </div>
      <div class="card_list">
        <p class="two card_color"></p>
        <p class="card_text">正在维保</p>
      </div>
      <div class="card_list">
        <p class="three card_color"></p>
        <p class="card_text">超期维保</p>
      </div>
      <div class="card_list">
        <p class="four card_color"></p>
        <p class="card_text">正常</p>
      </div>
    </div>
    <div class="home_card">
      <div class="home_list">
        <div class="card_title">今日维保</div>
        <p class="list_info">
          <span>正在维保中</span>
          <span>7</span>
        </p>
        <p class="list_info">
          <span>待完成维保</span>
          <span>17</span>
        </p>
        <p class="list_info">
          <span>已完成维保</span>
          <span>37</span>
        </p>
      </div>
      <div class="home_list">
        <div class="card_title">超期维保</div>
        <p class="list_info">
          <span>超期待处理</span>
          <span>2</span>
        </p>
        <p class="list_info">
          <span>已处理超期</span>
          <span>7</span>
        </p>
      </div>
      <div class="home_list">
        <div class="card_title">电梯信息</div>
        <p class="list_info">
          <span>未完善资料</span>
          <span>2</span>
        </p>
        <p class="list_info">
          <span>已完善资料</span>
          <span>7</span>
        </p>
      </div>
      <div class="home_list">
        <div class="card_title">注册维保人员信息</div>
        <p class="list_info">
          <span>未完善资料</span>
          <span>2</span>
        </p>
        <p class="list_info">
          <span>已完善资料</span>
          <span>7</span>
        </p>
      </div>
      <div class="home_list">
        <div class="card_title">注册安全管理员信息</div>
        <p class="list_info">
          <span>未完善资料</span>
          <span>2</span>
        </p>
        <p class="list_info">
          <span>已完善资料</span>
          <span>7</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
export default {
  data() {
    return {
      mapHeight: 0
    };
  },
  created () {
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.mapHeight = h * 0.73
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let map = new AMap.Map("container", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      });
    }
  }
};
</script>

<style lang="less">
.home {
  .status_card {
    background: #fff;
    position: fixed;
    right: 30px;
    top: 90px;
    z-index: 2;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 15px 15px 5px;
    .card_list {
      font-size: 13px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .card_text{
        width: 52px;
        text-align: left;
      }
      .card_color{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .one{
        background: #fdea60;
      }
      .two {
        background: #4083dd;
      }
      .three{
        background: #c43f38;
      }
      .four{
        background: #6ecb84;
      }
    }
  }
  .home_card{
    display: flex;
    justify-content: space-between;
    .home_list{
      width: 19%;
      height: 150px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      padding: 0 20px;
      margin-top: 15px;
      .card_title{
        margin-top: 10px;
        text-align: center;
        font-size: 15px;
        color: #333;
        font-weight: bold;
      }
      .list_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-top: 15px;
      }
    }
  }
}
</style>
