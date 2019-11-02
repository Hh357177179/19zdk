<template>
  <div class="sign_manage">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div>
          <span class="iconfont icon-renwuzhongxin"></span>
          <span>维保工作管理</span>
        </div>
      </div>
      <!-- <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.name" clearable placeholder="请输入姓名或手机号"></el-input>
        </el-form-item>
        <el-form-item>
           <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size
            icon="el-icon-search"
            @click="onSubmit"
          >搜索</el-button>
        </el-form-item>
      </el-form> -->
    </el-card>
    <el-card class="mt10">
      <!-- <div class="tab_text">
        <div style="margin-right: 40px;">
          维保人数总计：
          <span class="text_num">88</span> 名
        </div>
        <div>
          今日打卡人数：
          <span class="text_num">88</span> 名
        </div>
      </div> -->
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{background:'#f0f0f0',color: '#666'}"
        >
          <el-table-column align="center" prop="user_name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="sign_time" label="打卡时间">
            <template slot-scope="scope">
              <div>{{scope.row.sign_time|fromDate}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="打卡位置（使用单位及详细地址）" width="300px">
            <template slot-scope="scope">
              {{scope.row.elevator_use_unit}}/{{scope.row.elevator_use_address}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="elevator_internal_number" label="打卡电梯名称及编号"></el-table-column>
          <el-table-column align="center" prop="date" label="是否人脸识别">
            <template slot-scope="scope">
              <div>{{scope.row.face_time > 0 ? '否' : '是'}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="维保工作日志">
            <template slot-scope="scope">
              <!-- <el-button  type="primary" size="mini">查看</el-button> -->
              <i class="el-icon-document" @click="handleClick('维保工作详情', 'refPerson',scope.row)"></i>
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
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <PersonalDialog
      ref="refPerson"
      :visible.sync="personalShow"
      :title="personalTitle"
      @updateAll="updateAll"
    ></PersonalDialog>
  </div>
</template>

<script>
import { maintainList } from '@/api/sign/sign.js'
import PersonalDialog from "./components/personalDialog";
export default {
  data() {
    return {
      loading: false,
      personalShow: false,
      personalTitle: '',
      formInline: {
        name: "",
        date: ''
      },
      page: 1,
      pagesize: 10,
      value: "",
      currentPage: 1,
      total: 0,
      activeName: "first",
      tableData: [],
    };
  },
  created () {
    this.getList()
  },
  methods: {
    updateAll () {
      console.log('更新筛选数据')
    },
    getList () {
      this.loading = true
      let params = {
        token: sessionStorage.getItem('token'),
        page: this.page,
        pagesize: this.pagesize
      }
      maintainList(params).then(res => {
        console.log(res)
        this.tableData = res.list
        this.total = res.count
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
    },
    // 查看
    handleClick(title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row);
      }
      this.personalShow = true
      this.personalTitle = title
    },
    onSubmit() {},
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.pagesize = val
      this.page = 1
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val
      this.getList()
    },
  },
  components: { PersonalDialog }
};
</script>

<style lang="less">
.sign_manage {
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
  .tab_text {
    display: flex;
    justify-content: center;
    font-size: 14px;
    padding: 10px 0;
    .text_num {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
