<template>
  <div class="member_center">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 member_center_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="内容" prop="name" class="items">
          <el-input v-model="searchForm.gamename" placeholder="请输入比赛名称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" class="items">
          <el-select v-model="searchForm.sex" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时段" prop="times" class="items">
          <el-date-picker
            v-model="searchForm.times"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="items">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
          >查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
          <el-button type="primary" icon="el-icon-download">导 出</el-button>
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
        <el-table-column align="center" label="会员昵称" prop="name"></el-table-column>
        <el-table-column align="center" prop="name" label="会员卡号"></el-table-column>
        <el-table-column align="center" prop="address" label="会员姓名" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="name" label="手机号"></el-table-column>
        <el-table-column align="center" prop="name" label="注册时间"></el-table-column>
        <el-table-column align="center" prop="name" label="性别"></el-table-column>
        <el-table-column align="center" prop="name" label="会员等级"></el-table-column>
        <el-table-column align="center" prop="name" label="会员生日"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="warning">编辑</el-button>
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
  data () {
    return {
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
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
      ],
      searchForm: {
        name: '',
        sex: '',
        times: ''
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  components: { Breadcrumb }
}
</script>

<style lang="less">
  .member_center{
    width: 100%;
    height: 100%;
    .member_center_main {
      border-top: 5px solid #f68b0e;
      .el-card__body {
        padding-bottom: 0;
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
