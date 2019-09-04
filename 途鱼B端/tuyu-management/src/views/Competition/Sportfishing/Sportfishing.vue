<template>
  <div class="sport_fishing">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 sport_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="钓场名称" prop="name" class="items">
          <el-input v-model="searchForm.name" placeholder="请输入钓场名称"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="location" class="items">
          <el-select v-model="searchForm.location" placeholder="请选择所在城市">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
            style="margin-right:20px;"
          >查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div>
        <el-button type="primary" icon="el-icon-plus" style="margin-right:20px;">新 增</el-button>
        <el-button type="primary" icon="el-icon-delete">删 除</el-button>
      </div>
      <div class="mt10">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column align='center' type="selection"></el-table-column>
          <el-table-column align='center' label="钓场名称" prop="name"></el-table-column>
          <el-table-column align='center' prop="name" label="所在城市"></el-table-column>
          <el-table-column align='center' prop="address" label="场主姓名" show-overflow-tooltip></el-table-column>
          <el-table-column align='center' prop="name" label="联系方式"></el-table-column>
          <el-table-column align='center' label="操作">
             <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small" type="warning">编辑</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      <div class="clear"></div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  data() {
    return {
      searchForm: {
        name: "",
        location: ""
      },
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
    };
  },
  methods: {
    handleSelectionChange () {

    }
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.sport_fishing {
  width: 100%;
  height: 100%;
  .sport_main {
    border-top: 5px solid #f68b0e;
    .el-card__body {
      padding-bottom: 0;
    }
    .items {
      margin-right: 20px;
    }
  }
  .el-table td, .el-table th{
    padding: 8px 0;
  }
  .pagination{
    margin-top: 10px;
    float: right;
  }
}
</style>

