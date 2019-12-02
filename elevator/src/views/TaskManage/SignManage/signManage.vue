<template>
  <div class="sign_manage">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div>
          <span class="iconfont icon-renwuzhongxin"></span>
          <span>维保工作管理</span>
        </div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.name" clearable placeholder="请输入使用单位"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.order" placeholder="请选择排序">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
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
          <el-table-column align="center" prop="elevator_use_address" label="电梯位置" width="200"></el-table-column>
          <!-- <el-table-column align="center" prop="" label="打卡位置"></el-table-column> -->
          <el-table-column align="center" prop="elevator_internal_number" label="电梯内部编号" width="200"></el-table-column>
          <el-table-column align="center" prop="handle_time" label="上次维保日期" width="130"></el-table-column>
          <el-table-column align="center" label="下次维保日期" width="130">
            <template slot-scope="scope">
              <div>{{scope.row.next_handle_time}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="handle_time" label="离下次维保天数">
            <template slot-scope="scope">
              <div>{{scope.row.distance_handle_time}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="distance_texts" label="是否超保"></el-table-column>
          <el-table-column align="center" prop="expired_day" label="已超保日期"></el-table-column>
          <el-table-column align="center" label="维保工作日志">
            <template slot-scope="scope">
              <i class="el-icon-document" @click="handleClick('维保工作详情', 'refPerson',scope.row)"></i>
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
    };
  },
  created () {
    this.getList()
  },
  methods: {
    
    exportExcel () {
      let params = {
        token: sessionStorage.getItem('token'),
        page: 1,
        pagesize: 10000,
        unit: this.formInline.name,
        order: this.formInline.order
      }
      maintainList(params).then(res => {
        console.log(res)
        res.list.forEach(ele => {
          let oldDate = new Date(ele.handle_time).getTime() / 1000
          let newDate = oldDate + (15 * 24 * 60 * 60)
          let newDates = new Date(newDate * 1000)
          let Y = newDates.getFullYear()
          let M = newDates.getMonth() + 1
          let D = newDates.getDate()
          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          ele.next_handle_time = `${Y}-${M}-${D}`
          let nowDate = parseInt(new Date().getTime()/1000)
          let distanceDate = (newDate - nowDate) / 60 / 60 / 24
          if (distanceDate > 0) {
            ele.distance_handle_time = parseInt(distanceDate)
            ele.distance_texts = '否'
            ele.expired_day = '—'
          } else {
            ele.distance_handle_time = '—'
            ele.distance_texts = '是'
            ele.expired_day = Math.abs(parseInt(distanceDate))
          }
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
              "上次维保日期",
              "下次维保日期",
              "离下次维保天数",
              "是否超保",
              "已超保日期"
            ];
            // 上面设置Excel的表格第一行的标题
            // const role = ''
            const filterVal = [
              "elevator_use_unit",
              "elevator_use_address",
              "elevator_internal_number",
              "handle_time",
              "next_handle_time",
              "distance_handle_time",
              "distance_texts",
              "expired_day"
            ];
            const data = this.formatJson(filterVal, res.list);
            export_json_to_excel(tHeader, data, `工作管理(${time})`);
          });
        });
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
        order: this.formInline.order
      }
      maintainList(params).then(res => {
        console.log(res)
        res.list.forEach(ele => {
          let oldDate = new Date(ele.handle_time).getTime() / 1000
          let newDate = oldDate + (15 * 24 * 60 * 60)
          let newDates = new Date(newDate * 1000)
          let Y = newDates.getFullYear()
          let M = newDates.getMonth() + 1
          let D = newDates.getDate()
          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          ele.next_handle_time = `${Y}-${M}-${D}`
          let nowDate = parseInt(new Date().getTime()/1000)
          let distanceDate = (newDate - nowDate) / 60 / 60 / 24
          if (distanceDate > 0) {
            ele.distance_handle_time = parseInt(distanceDate)
            ele.distance_texts = '否'
            ele.expired_day = '—'
          } else {
            ele.distance_handle_time = '—'
            ele.distance_texts = '是'
            ele.expired_day = Math.abs(parseInt(distanceDate))
          }
        });
        //   let allArr = JSON.stringify(res.list)
        //   let oldArr = JSON.parse(allArr)
        //   let newArr = JSON.parse(allArr)
        //   let arrs = []
        //   for (let a in oldArr) {
        //     for (let b in newArr) {
        //       if (oldArr[a].elevator_id == newArr[b].elevator_id && oldArr[a].handle_time == newArr[b].handle_time) {
        //         oldArr[a].ids = newArr[b].id
        //         arrs.push(oldArr[a])
        //       }
        //     }
        //   }
        //   let arrss = []
        //   for (let c in arrs) {
        //     if (arrs[c].id != arrs[c].ids) {
        //       arrss.push(arrs[c])
        //     }
        //   }
        // console.log(arrss)
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
