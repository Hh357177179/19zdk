<template>
  <div class="handlelog">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-yidongyunkongzhitaiicon45"></span>
          <span>操作记录</span>
        </div>
        <!-- <div class="rush el-icon-refresh-right"></div> -->
      </div>
      <el-form class="mt40" :inline="true" :model="formInline">
        <el-form-item label="" class="inputs">
          <el-select v-model="formInline.name" placeholder="请选择操作类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size icon="el-icon-search" class="search_btn" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="mt40">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" prop="date" label="操作类型"></el-table-column>
          <el-table-column align="center" prop="name" label="操作内容"></el-table-column>
          <el-table-column align="center" prop="name" label="操作人"></el-table-column>
          <el-table-column align="center" prop="address" label="操作时间"></el-table-column>
          <!-- <el-table-column align="center" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="searchDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>-->
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
      currentPage: 1,
      total: 50,
      tableData: [
        
      ],
      formInline: {
        name: ""
      }
    };
  },
  methods: {
    onSubmit () {

    },
    searchDetail(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
    }
  }
};
</script>

<style lang="less">
.handlelog {
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
}
</style>
