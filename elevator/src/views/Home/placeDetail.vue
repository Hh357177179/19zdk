<template>
  <div class="detail_place">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div>
          <span class="iconfont icon-jieshao"></span>
          <span>电梯详情</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
    </el-card>
    <el-card class="mt10" style="padding-top: 20px;">
      <div class="list_detail">
        <span class="label_text">电梯类型：</span>
        <span>{{obj.elevator_type}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">设备代码：</span>
        <span>{{obj.device_code}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">使用登记证编号：</span>
        <span>{{obj.registration_number}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">品牌：</span>
        <span>{{obj.brand}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">生产厂家：</span>
        <span>{{obj.factory}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">下次年检日期：</span>
        <span>{{obj.next_year_check_date}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">合同开始时间：</span>
        <span>{{obj.maintain_start_date}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">合同终止时间：</span>
        <span>{{obj.maintain_end_date}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">本次维保时间：</span>
        <span v-if="obj.last_maintain_date == null">—</span>
        <span v-if="obj.last_maintain_date != null">{{obj.last_maintain_date}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">下次维保时间：</span>
        <span v-if="obj.next_maintain_date == null">—</span>
        <span v-if="obj.next_maintain_date != null">{{obj.next_maintain_date}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">所在地址：</span>
        <span>{{obj.use_address}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">使用单位：</span>
        <span>{{obj.use_unit}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">内部编号：</span>
        <span>{{obj.internal_number}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">使用单位负责人：</span>
        <span>{{obj.use_leader_name}}</span>
      </div>
      <div class="list_detail">
        <span class="label_text">联系方式：</span>
        <span>{{obj.use_leader_phone}}</span>
      </div>
      <div class="bottoms">
        <el-button class="back_btn" type="info" @click="backRouter">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDetails } from "@/api/elevator/elevator.js";
export default {
  data() {
    return {
      obj: {}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    backRouter () {
      this.$router.back()
    },
    getDetail() {
      let params = {
        token: sessionStorage.getItem("token"),
        elevator_id: this.$route.params.id
      };
      getDetails(params).then(res => {
        console.log(res);
        this.obj = res;
      });
    }
  }
};
</script>

<style lang="less">
.detail_place {
  .cards {
    position: relative;
    .titles {
      width: 100%;
      padding: 0 10px;
      height: 35px;
      background: #fdf6ec;
      color: #e6a23c;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .iconfont {
        margin-right: 10px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .list_detail {
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
    .label_text {
      font-weight: bold;
    }
  }
  .bottoms {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
