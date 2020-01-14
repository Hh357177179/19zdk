<template>
  <div class="sign_manage">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div class="back_prev" @click="backRouters">
          <i class="el-icon-back"></i>
          <span>上一页</span>
        </div>
        <div>
          <span class="iconfont icon-renwuzhongxin"></span>
          <span>维保工作管理</span>
        </div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.name" clearable placeholder="请输入使用单位"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="formInline.order" placeholder="请选择排序">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            size
            icon="el-icon-search"
            @click="onSubmit"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-button type="primary" icon="el-icon-download" size="small" @click="exportExcel">导 出</el-button>
      <div class="mt10">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{background:'#f0f0f0',color: '#666'}"
        >
          <el-table-column align="center" prop="elevator_use_unit" label="使用单位" width="240"></el-table-column>
          <el-table-column align="center" prop="elevator_use_address" label="电梯位置" width="250"></el-table-column>
          <!-- <el-table-column align="center" prop="" label="打卡位置"></el-table-column> -->
          <el-table-column align="center" prop="elevator_internal_number" label="电梯内部编号" width="200"></el-table-column>
          <el-table-column align="center" prop="handle_time" label="本次维保时间" width="130"></el-table-column>
          <!-- <el-table-column align="center" label="下次维保时间" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.next_handle_time}}</div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" prop="handle_time" label="离下次维保天数">
            <template slot-scope="scope">
              <div>{{scope.row.distance_handle_time}}</div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" prop="distance_texts" label="是否超保"></el-table-column> -->
          <el-table-column align="center" label="维保状态" prop="status_text"></el-table-column>
          <el-table-column align="center" prop="overdue" label="超期天数">
            <template slot-scope="scope">
              <div :class="scope.row.overdue == 0 ? '' : 'more_color'">{{scope.row.overdue}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="维保工作照片">
            <template slot-scope="scope">
              <i class="el-icon-document" @click="handleClick('维保工作照片', 'refPerson',scope.row)"></i>
            </template>
          </el-table-column> -->
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
          :page-size="pagesize"
          layout="total, prev, pager, next"
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
      options: [{
        value: '1',
        label: '正序'
      },{
        value: '2',
        label: '倒序'
      }],
      loading: false,
      personalShow: false,
      personalTitle: '',
      formInline: {
        name: "",
        date: '',
        order: '1'
      },
      page: 1,
      pagesize: 10,
      value: "",
      currentPage: 1,
      total: 0,
      activeName: "first",
      tableData: [],
      elevator_id: ''
    };
  },
  created () {
    this.elevator_id = this.$route.query.id
    this.getList()
  },
  methods: {

    backRouters () {
      this.$router.push({
        name: 'elevatorInfo',
        params: {
          page: sessionStorage.getItem('elevatorPage')
        }
      })
    },
    
    exportExcel () {
      let params = {
        token: sessionStorage.getItem('token'),
        page: 1,
        pagesize: 10000,
        unit: this.formInline.name,
        order: this.formInline.order,
        elevator_id: this.elevator_id
      }
      maintainList(params).then(res => {
        console.log(res)
        res.list.forEach(ele => {
          if (ele.status == 3) {
            ele.status_text = '完成'
          } else {
            ele.status_text = '进行中'
          }
          let moreDay = ''
          moreDay = this.formDate(ele.handle_time) - this.formDate(ele.claim_time)
          if (moreDay > 0) {
            ele.overdue = parseInt(moreDay / 60 / 60 / 24)
          } else {
            ele.overdue = 0
          }
        });
        let dateTime = new Date();
          let y = dateTime.getFullYear();
          let m = dateTime.getMonth() + 1;
          let d = dateTime.getDate();
          let hh = dateTime.getHours();
          let mm = dateTime.getMinutes();
          let ss = dateTime.getSeconds();
          let time = `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../excel/Export2Excel");
            const tHeader = [
              "使用单位",
              "电梯位置",
              "电梯内部编号",
              "本次维保时间",
              "维保状态",
              "超期天数"
            ];
            // 上面设置Excel的表格第一行的标题
            // const role = ''
            const filterVal = [
              "elevator_use_unit",
              "elevator_use_address",
              "elevator_internal_number",
              "handle_time",
              "status_text",
              "overdue"
            ];
            const data = this.formatJson(filterVal, res.list);
            export_json_to_excel(tHeader, data, `工作管理(${time})`);
          });
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    formDate (str) {
      let date = new Date(str).getTime() / 1000
      return date
    },


    updateAll () {
      console.log('更新筛选数据')
    },
    getList () {
      this.loading = true
      let params = {
        token: sessionStorage.getItem('token'),
        page: this.page,
        pagesize: this.pagesize,
        unit: this.formInline.name,
        order: this.formInline.order,
        elevator_id: this.elevator_id
      }
      maintainList(params).then(res => {
        console.log(res)
        res.list.forEach(item => {
          if (item.status == 3) {
            item.status_text = '完成'
          } else {
            item.status_text = '进行中'
          }
          let moreDay = ''
          moreDay = this.formDate(item.handle_time) - this.formDate(item.claim_time)
          if (moreDay > 0) {
            item.overdue = parseInt(moreDay / 60 / 60 / 24)
          } else {
            item.overdue = 0
          }
        });
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
    onSubmit() {
      this.page = 1
      this.currentPage = 1
      this.getList()
    },
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
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .iconfont {
        margin-right: 5px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
      .back_prev{
        margin-right: 10px;
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
  .more_color{
    color: #f00;
  }
}
</style>
