<template>
  <div class="home">
    <Breadcrumb></Breadcrumb>
    <div class="mt10 home_card">
      <el-card class="home_card_list">
        <p class="card_title">今日关键数据</p>
        <div class="databoard">
          <div class="databoard_left">
            <p>
              <span class="label">新增会员数</span>
              <span class="label_data">
                50
                <i class="unit">人</i>
              </span>
            </p>
            <p>
              <span class="label">今日销售额</span>
              <span class="label_data">
                5000000
                <i class="unit">元</i>
              </span>
            </p>
          </div>
          <div class="databoard_right">
            <p>
              <span class="label">新增用户数</span>
              <span class="label_data">
                50
                <i class="unit">人</i>
              </span>
            </p>
            <p>
              <span class="label">今日成交量</span>
              <span class="label_data">
                5000000
                <i class="unit">笔</i>
              </span>
            </p>
          </div>
        </div>
      </el-card>
      <el-card class="home_card_list">
        <p class="card_title">昨日关键数据</p>
        <div class="databoard">
          <div class="databoard_left">
            <p>
              <span class="label">新增会员数</span>
              <span class="label_data">
                50
                <i class="unit">人</i>
              </span>
            </p>
            <p>
              <span class="label">昨日销售额</span>
              <span class="label_data">
                5000000
                <i class="unit">元</i>
              </span>
            </p>
          </div>
          <div class="databoard_right">
            <p>
              <span class="label">新增用户数</span>
              <span class="label_data">
                50
                <i class="unit">人</i>
              </span>
            </p>
            <p>
              <span class="label">昨日销售额</span>
              <span class="label_data">
                5000000
                <i class="unit">元</i>
              </span>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="common_border">
      <p class="common_use_title">常用功能</p>
      <div class="common_use">
        <div class="tag_list">订单管理</div>
        <div class="tag_list">渔场管理</div>
        <div class="tag_list">会员管理</div>
        <div class="tag_list">渔场管理</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  data() {
    return {};
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.home {
  width: 100%;
  .home_card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .home_card_list {
      border-top: 5px solid #f68b0e;
      width: 49%;
      .card_title {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 15px;
        border-bottom: 1px dashed #f68b0e;
      }
      .databoard {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font-size: 16px;
        color: #000;
        // padding: 0 40px;
        .databoard_left, .databoard_right {
          p {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .label {
              margin-right: 10px;
            }
            .label_data {
              font-weight: bold;
              font-size: 20px;
              color: #f68b0e;
              .unit {
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }
  .common_border{
    border-top: 4px solid #f68b0e;
    margin-top: 30px;
    .common_use_title{
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 15px;
      border-bottom: 1px dashed #f68b0e;
    }
    .common_use{
      display: flex;
      margin-top: 20px;
      // justify-content: flex-start;
      justify-content: space-between;
      .tag_list{
        border-radius: 4px;
        background-color: #ecf5ff;
        border-color: #d9ecff;
        color: #409eff;
        padding: 20px 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
