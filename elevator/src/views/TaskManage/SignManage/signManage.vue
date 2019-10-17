<template>
  <div class="sign_manage">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-renwuzhongxin"></span>
          <span>签到管理</span>
        </div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline">
        <el-form-item label="" class="inputs">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="inputs">
          <el-input v-model="formInline.name" clearable placeholder="请输入姓名或手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size icon="el-icon-search" class="search_btn" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div class="tab_text">
        <div style="margin-right: 40px;">维保人数总计：<span class="text_num">88</span> 名</div>
        <div>今日打卡人数：<span class="text_num">88</span> 名</div>
      </div>
      <div class="mt10">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="按日统计" name="first"></el-tab-pane>
          <el-tab-pane label="按月统计" name="second"></el-tab-pane>
          <el-tab-pane label="按季度统计" name="third"></el-tab-pane>
          <el-tab-pane label="按年统计" name="four"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" prop="date" label="姓名"></el-table-column>
          <el-table-column align="center" prop="name" label="打卡时间"></el-table-column>
          <el-table-column align="center" prop="address" label="打卡位置（使用单位及详细地址）" width="300px"></el-table-column>
          <el-table-column align="center" prop="address" label="打卡电梯名称及编号"></el-table-column>
          <el-table-column align="center" prop="address" label="是否人脸识别"></el-table-column>
        </el-table>
      </div>
      <div class="clearfix mt10">
        <el-pagination
          class="pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        name: ""
      },
      value: '',
      currentPage: 1,
      total: 50,
      activeName: "first",
      tableData: [],
      options: [{
          value: '1',
          label: '已打卡'
        }, {
          value: '2',
          label: '未打卡'
        }],
    };
  },
  methods: {
    onSubmit() {},
    handleSizeChange(val) {
      console.log("每页多少条", val);
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
    },
    onSubmit() {},
    handleClick(tab) {
      console.log(tab.name);
    }
  }
};
</script>

<style lang="less">
.sign_manage {
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
  .tab_text{
    display: flex;
    justify-content: center;
    font-size: 14px;
    padding: 10px 0;
    .text_num{
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
