<template>
  <div class="elevator_mainte">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-weixiuguanli"></span>
          <span>日常维保</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline">
        <el-form-item label="项目名称" class="inputs">
          <el-input v-model="formInline.name" clearable placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="success" icon="el-icon-download">导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="warning" icon="el-icon-printer">批量打印</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size type="danger" icon="el-icon-folder-opened">导出保养图片</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div class="mt10">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="保养单" name="first"></el-tab-pane>
          <el-tab-pane label="计划超期" name="second"></el-tab-pane>
          <el-tab-pane label="超期处理" name="third"></el-tab-pane>
          <el-tab-pane label="补录处理" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="date" label="保养单编号"></el-table-column>
          <el-table-column align="center" prop="name" label="项目名称"></el-table-column>
          <el-table-column align="center" prop="address" label="梯号"></el-table-column>
          <el-table-column align="center" prop="address" label="注册代码"></el-table-column>
          <el-table-column align="center" prop="address" label="计划日期"></el-table-column>
          <el-table-column align="center" prop="address" label="执行日期"></el-table-column>
          <el-table-column align="center" prop="address" label="保养类型"></el-table-column>
          <el-table-column align="center" prop="address" label="评价状态"></el-table-column>
          <el-table-column align="center" prop="address" label="保养建议"></el-table-column>
          <el-table-column align="center" prop="address" label="维保工"></el-table-column>
          <el-table-column align="center" prop="address" label="签到地址"></el-table-column>
          <el-table-column align="center" prop="address" label="保养时长"></el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="searchDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix mt10">
        <el-pagination
          class="pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
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
      tableData: [],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    searchDetail(row) {
      console.log(row);
    },
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
.elevator_mainte {
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
