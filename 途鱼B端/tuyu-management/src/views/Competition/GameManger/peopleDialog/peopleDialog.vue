<template>
  <div class="details">
    <el-dialog :title="title" :visible.sync="visible" width="1000px" :before-close="handleClose">
      <el-card>
        <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
          <el-form-item label="比赛名称" prop="phone" class="items">
            <el-input v-model="searchForm.phone" placeholder="请输入比赛名称"></el-input>
          </el-form-item>
          <el-form-item class="items">
            <el-button type="primary" icon="el-icon-search" @click="submitForm('searchForm')">查 找</el-button>
            <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
            <el-button type="primary" icon="el-icon-download" @click="uploadExcel">导 出</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="order_no" label="订单号" width="220"></el-table-column>
          <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
          <el-table-column prop="name" label="会员姓名" width="100"></el-table-column>
          <!-- <el-table-column prop="idcard" label="身份证号" width="200"></el-table-column> -->
          <el-table-column prop="citys" label="所在城市" width="140"></el-table-column>
          <el-table-column prop="create_time" label="报名时间" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.create_time | fromDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="back" label="回鱼量（斤）">
            <template slot-scope="scope">
              <span v-if="scope.row.score_time != 0">{{scope.row.back}}</span>
              <span v-else>—</span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="比赛成绩（斤）">
            <template slot-scope="scope">
              <span v-if="scope.row.score_time != 0">{{scope.row.score}}</span>
              <span v-else>—</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          @current-change="handleCurrentChangeDialog"
          layout="prev, pager, next"
          :total="count"
        ></el-pagination>
      </el-card>

      <div class="clear"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { peopleList } from "@/api/fish/fish.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "人员名单"
    }
  },
  data() {
    return {
      tableData: [],
      rowObj: {},
      match_id: "",
      page: 1,
      pagesize: 10,
      searchForm: {
        phone: ""
      },
      count: 0,
      allList: []
    };
  },
  methods: {
    submitForm() {
      this.page = 1;
      this.getList();
    },
    getAll () {
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 1000,
        phone: this.searchForm.phone,
        match_id: this.rowObj.id
      }
      peopleList(params).then(res => {
        console.log(res);
        if (res) {
          this.allList = res.list
        }
      });
    },
    uploadExcel() {
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 1000,
        phone: this.searchForm.phone,
        match_id: this.rowObj.id
      }
      peopleList(params).then(res => {
        res.list.forEach(ele => {
          ele.citys = `${this.rowObj.pond_province}-${this.rowObj.pond_city}`
        });
        console.log(res);
        if (res) {
          this.allList = res.list
          let dateTime = new Date()
          let y = dateTime.getFullYear()
          let m = dateTime.getMonth() + 1
          let d = dateTime.getDate()
          let hh = dateTime.getHours()
          let mm = dateTime.getMinutes()
          let ss = dateTime.getSeconds()
          let time = `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../../../excel/Export2Excel');
            const tHeader = ['订单号', '手机号码', '会员姓名', '所在城市', '报名时间', '回鱼量', '比赛成绩'];
            // 上面设置Excel的表格第一行的标题
            // const role = ''
            const filterVal = ['order_no', 'phone', 'name','citys', 'create_time', 'back', 'score'];
            // 上面的index、nickName、name是tableData里对象的属性
            const list = res.list;  //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, `人员名单(${time})`);
          })
        }
      });
    },
    timeForm (times) {
      let dates = new Date(times)
      let y = dates.getFullYear()
      let m = dates.getMonth() + 1
      let d = dates.getDate()
      let hh = dates.getHours()
      let mm = dates.getMinutes()
      return `${y}-${m}-${d} ${hh}:${mm}`
    },
    formatJson(filterVal, jsonData) {
      jsonData.forEach(item => {
        if (item.score_time == 0) {
          item.back = '—'
          item.score = '—'
        }
      });
      jsonData.forEach(item => {
        item.create_time = this.timeForm((item.create_time) * 1000)
        console.log(item.create_time)
      });
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    resetForm(formName) {
      this.page = 1;
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.getList();
      });
    },
    // 调用父级方法
    getParentData(row) {
      console.log(row);
      this.rowObj = row;
      this.getList();
    },
    getList() {
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize,
        phone: this.searchForm.phone,
        match_id: this.rowObj.id
      };
      peopleList(params).then(res => {
        console.log(res);
        res.list.forEach(ele => {
          ele.citys = `${this.rowObj.pond_province}-${this.rowObj.pond_city}`
        });
        if (res) {
          this.count = res.count;
          this.tableData = res.list
        }
      });
    },
    handleCurrentChangeDialog(val) {
      this.page = val;
      this.getList();
    },
    handleClose() {
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less">
</style>
