<template>
  <div class="flow_manage">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-liucheng"></span>
          <span>任务流程管理</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline">
        <el-form-item label="搜索" class="inputs">
          <el-input v-model="formInline.name" clearable placeholder="请输入搜索条件"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="warning" icon="el-icon-plus">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="info" icon="el-icon-upload2">导入</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="success" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div class="mt10">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未签到" name="first"></el-tab-pane>
          <el-tab-pane label="未拍照" name="second"></el-tab-pane>
          <el-tab-pane label="正在维保" name="third"></el-tab-pane>
          <el-tab-pane label="完成维保" name="fourth"></el-tab-pane>
          <el-tab-pane label="超期维保" name="five"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" prop="date" label="维保单位"></el-table-column>
          <el-table-column align="center" prop="name" label="相关单位"></el-table-column>
          <el-table-column align="center" prop="address" label="地址"></el-table-column>
          <el-table-column align="center" prop="address" label="相关人员"></el-table-column>
          <el-table-column align="center" prop="address" label="开始时间"></el-table-column>
          <el-table-column align="center" prop="address" label="结束时间"></el-table-column>
          <el-table-column align="center" prop="address" label="阶段"></el-table-column>
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
      currentPage: 1,
      total: 50,
      activeName: "first",
      tableData: []
    };
  },
  methods: {
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
.flow_manage {
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
      .rush{
        font-size: 20px;
        cursor: pointer;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
    // .inputs{
    //   height: 32px;
    //   .el-input{
    //     height: 32px;
    //   }
    //   .el-input__inner{
    //     height: 100%;
    //   }
    //   .el-form-item__label{
    //     font-size: 12px;
    //   }
    // }
  }
  .el-card__body {
    padding: 10px;
  }
  .pagination {
    float: right;
  }
}
</style>
