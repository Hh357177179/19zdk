<template>
  <div class="organize_notice">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-gonggao"></span>
          <span>组织公告</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <div class="mt40 clearfix">
      <!-- <el-form class="mt40" style="float: left;" :inline="true" :model="formInline" size="small">
          <el-form-item>
            <el-input clearable placeholder="请输入使用单位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form> -->
        <el-button
          size="small"
          style="float:right;"
          type="primary"
          icon="el-icon-message-solid"
          @click="sendNotice('发布公告', 'refSendNotice')"
        >发布公告</el-button>
      </div>
    </el-card>
    <el-card class="mt10">
      <el-table class="mt10" v-loading="loading" :data="tableData" border style="width: 100%" :header-cell-style="{background:'#f0f0f0',color: '#666'}">
        <el-table-column align="center" prop="create_time" label="公告发布日期">
          <template slot-scope="scope">
            <p>{{scope.row.create_time | fromDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="公告类型">
          <template>
            <span>系统公告</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="content"
          label="公告内容"
          width="350px"
        ></el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="address"
          label="接收人员"
          width="300px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.person}}</span>
          </template>
        </el-table-column>
      </el-table>
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
    <SendNotice
      ref="refSendNotice"
      :visible.sync="sendShow"
      :title="sendTitle"
      @updateAll="updateAll"
    ></SendNotice>
  </div>
</template>

<script>
import { bulletin } from "@/api/organize/organize.js";
import SendNotice from './components/SendNotice'
export default {
  data() {
    return {
      sendShow: false,
      sendTitle: '',
      currentPage: 1,
      tableData: [],
      page: 1,
      pagesize: 10,
      loading: false,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    updateAll () {
      this.page = 1
      this.currentPage = 1
      this.getList()
    },
    sendNotice (title, ref) {
      this.$refs[ref].getParentData();
      this.sendShow = true
      this.sendTitle = title
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize
      };
      bulletin(params)
        .then(res => {
          console.log(res.list);
          for (let i = 0; i < res.list.length; i++) {
            if (res.list[i].is_all == 0) {
              let per = JSON.parse(res.list[i].sub_users);
              let arr = [];
              per.forEach(element => {
                arr.push(element.name);
                res.list[i].person = arr.join("、");
              });
            } else {
              res.list[i].person = "该单位所有用户";
            }
          }
          this.total = res.count;
          this.tableData = res.list;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.pagesize = val;
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    }
  },
  components: { SendNotice }
};
</script>

<style lang="less">
.organize_notice {
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
  .el-card__body {
    padding: 10px;
  }
  .pagination {
    float: right;
  }
}
</style>
