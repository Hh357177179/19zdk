<template>
  <div class="elevator_info">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-jieshao"></span>
          <span>电梯信息</span>
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
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div class="mt10">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="在保电梯" name="first"></el-tab-pane>
          <el-tab-pane label="停保电梯" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" prop="date" label="电梯类型"></el-table-column>
          <el-table-column align="center" prop="name" label="设备代码"></el-table-column>
          <el-table-column align="center" prop="address" label="使用登记证编号"></el-table-column>
          <el-table-column align="center" prop="address" label="品牌"></el-table-column>
          <el-table-column align="center" prop="address" label="生产厂家"></el-table-column>
          <el-table-column align="center" prop="address" label="下次年检日期"></el-table-column>
          <el-table-column align="center" prop="address" label="上次维保日期"></el-table-column>
          <el-table-column align="center" prop="address" label="下次维保日期"></el-table-column>
          <el-table-column align="center" prop="address" label="所在地址"></el-table-column>
          <el-table-column align="center" prop="address" label="使用单位"></el-table-column>
          <el-table-column align="center" prop="address" label="内部编号"></el-table-column>
          <el-table-column align="center" prop="address" label="使用单位负责人及联系方式"></el-table-column>
          <el-table-column align="center" prop="address" label="维保合同"></el-table-column>
          <el-table-column align="center" prop="address" label="合同起止"></el-table-column>
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
  data () {
    return {
      formInline: {
        name: ''
      },
      currentPage: 1,
      total: 50,
      activeName: "first",
      tableData: []
    }
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
}
</script>

<style lang="less">
  .elevator_info{
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
