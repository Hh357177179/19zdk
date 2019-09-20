<template>
  <div class="game_manger">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 game_manger_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="比赛名称" prop="title" class="items">
          <el-input v-model="searchForm.title" placeholder="请输入比赛名称"></el-input>
        </el-form-item>
         <el-form-item label="钓场名称" prop="pond_title" class="items">
          <el-input v-model="searchForm.pond_title" placeholder="请输入比赛名称"></el-input>
        </el-form-item>
        <el-form-item label="赛事状态" prop="type" class="items">
          <el-select v-model="searchForm.type" clearable placeholder="请选择赛事状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛时间" prop="times" class="items">
          <el-date-picker
            v-model="searchForm.times"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="items">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
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
        v-loading="loading"
        border
      >
        <el-table-column align="center" label="赛事名称" prop="title" width="150"></el-table-column>
        <el-table-column align="center" prop="pond_title" label="渔场名称"></el-table-column>
        <el-table-column align="center" prop="address" label="比赛时间" width="300">
          <template slot-scope="scope">
            <p>{{scope.row.start_time | fromDate}}—{{scope.row.end_time | fromDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="所在城市">
          <template slot-scope="scope">
            <p>{{scope.row.pond_province}}-{{scope.row.pond_city}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="参赛人数" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.order_num}}/{{scope.row.participant_max}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="赛事状态" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">招募中</p>
            <p v-if="scope.row.status == 2">即将开赛</p>
            <p v-if="scope.row.status == 3">进行中</p>
            <p v-if="scope.row.status == 4">已结束</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="primary">查看</el-button>
            <el-button v-if="scope.row.status == 1 || scope.row.status == 2" @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
      <div class="clear"></div>
    </el-card>
    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose">
      <div class="detail_main">
        <p>赛事名称：{{detailObj.title}}</p>
        <p>赛事性质：{{detailObj.type_title}}</p>
        <p>赛事时间：{{detailObj.draw_start_time}}—{{detailObj.draw_end_time}}</p>
        <p>比赛钓场：{{detailObj.pond_province}}-{{detailObj.pond_city}}  {{detailObj.pond_title}}（可用钓台{{detailObj.position_number}}）</p>
        <p>赛事地址：{{detailObj.pond_address}}</p>
        <!-- <p>抽签制：</p> -->
        <p>报名人数：{{detailObj.order_num}}/{{detailObj.participant_max}}</p>
        <p>回鱼价格：{{detailObj.return_price}}元/{{detailObj.unit}}</p>
        <p>奖品情况：{{detailObj.awards}}</p>
        <p>其他说明：{{detailObj.note}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { matchList, matchDetail, matchDelete } from '@/api/fish/fish.js'
export default {
  data() {
    return {
      dialogVisible: false,
      count: 0,
      loading: false,
      page: 1,
      pagesize: 10,
      searchForm: {
        title: "",
        pond_title: "",
        type: '',
        times: []
      },
      create_time_start: '',
      create_time_end: '',
      options: [
        {
          value: "1",
          label: "招募中"
        },
        {
          value: "2",
          label: "即将开赛"
        },
        {
          value: "3",
          label: "进行中"
        },
        {
          value: "4",
          label: "已结束"
        }
      ],
      tableData: [],
      detailObj: {}
    };
  },
  created () {
    this.getList()
  },
  methods: {
    handleDelete (row) {
      this.$confirm('报名中、即将开赛状态下课进行删除，删除后赛事状态变为已结束, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let params = {
            id: row.id,
            token: sessionStorage.getItem('token')
          }
          matchDelete(params).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
            }
          })
        }).catch(() => {});
    },
    handleClick (row) {
      console.log(row)
      this.getDetail(row.id)
    },
    getDetail (id) {
      let params = {
        id: id,
        token: sessionStorage.getItem('token')
      }
      matchDetail(params).then(res => {
        console.log(res)
        this.detailObj = res
        this.$nextTick(() => {
          this.dialogVisible = true
        })
      })
    },
    handleClose () {
      this.detailObj = {}
      this.$nextTick(() => {
        this.dialogVisible = false
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    submitForm () {
      this.page = 1
      this.getList()
    },
    resetForm(formName) {
      this.searchForm.page = 1
      this.$refs[formName].resetFields(); 
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList () {
      if (this.searchForm.times != null && this.searchForm.times.length != 0) {
        this.create_time_start = (this.searchForm.times[0] / 1000) 
        this.create_time_end = (this.searchForm.times[1] / 1000) 
      } else {
        this.create_time_start = ''
        this.create_time_end = ''
      }
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        title: this.searchForm.title,
        pond_title: this.searchForm.pond_title,
        type: this.searchForm.type,
        start_start_time: this.start_start_time,
        start_end_time: this.start_end_time,
        token: sessionStorage.getItem('token')
      }
      console.log(params)
      matchList(params).then(res => {
        console.log(res)
        this.count = res.count
        this.tableData = res.list
        this.loading = false
      })
    }
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
  }
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
  .detail_main{
    font-size: 15px;
    p{
      margin-bottom: 30px;
    }
  }
}
</style>
