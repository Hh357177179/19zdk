<template>
  <div class="organize_person">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-yidongyunkongzhitaiicon45"></span>
          <span>角色管理</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline">
        <el-form-item label="姓名" class="inputs">
          <el-input v-model="formInline.name" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" prop="date" label="姓名"></el-table-column>
          <el-table-column align="center" prop="name" label="手机号码"></el-table-column>
          <el-table-column align="center" prop="address" label="角色"></el-table-column>
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
.organize_person {
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
