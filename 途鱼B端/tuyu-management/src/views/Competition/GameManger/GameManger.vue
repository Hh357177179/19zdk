<template>
  <div class="game_manger">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 game_manger_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="比赛名称" prop="name" class="items">
          <el-input v-model="searchForm.gamename" placeholder="请输入比赛名称"></el-input>
        </el-form-item>
        <el-form-item label="赛事状态" prop="location" class="items">
          <el-select v-model="searchForm.gamestatus" placeholder="请选择赛事状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛时间" prop="time" class="items">
          <el-date-picker v-model="searchForm.time" type="date" placeholder="请选择比赛时间"></el-date-picker>
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
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="赛事名称" prop="name"></el-table-column>
        <el-table-column align="center" prop="name" label="渔场名称"></el-table-column>
        <el-table-column align="center" prop="address" label="比赛时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="name" label="所在城市"></el-table-column>
        <el-table-column align="center" prop="name" label="参赛人数"></el-table-column>
        <el-table-column align="center" prop="name" label="赛事状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="warning">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        gamename: "",
        gamestatus: "",
        time: ''
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange () {

    },
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.game_manger {
  width: 100%;
  height: 100%;
  .game_manger_main {
    border-top: 5px solid #f68b0e;
    .el-card__body {
      padding-bottom: 0;
    }
    .items {
      margin-right: 20px;
    }
  }
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
}
</style>
