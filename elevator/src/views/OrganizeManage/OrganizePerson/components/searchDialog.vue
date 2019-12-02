<template>
  <div class="calendar">
    <el-dialog :title="title" :visible.sync="visible" width="1100px" :before-close="handleClose">
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.use_unit" clearable placeholder="请输入使用单位"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.internal_number" clearable placeholder="请输入内部编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="formInline.position_state" placeholder="请选择是否定位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="formInline.next_maintain_date" type="date" value-format="yyyy-MM-dd" placeholder="下次维保日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{background:'#f0f0f0',color: '#666'}"
      >
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="elevator_type"
          label="电梯类型"
          width="100px"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="device_code"
          label="设备代码"
          width="180px"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="registration_number"
          label="使用登记证编号"
          width="200px"
        ></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="brand" label="品牌" width="100px"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="factory"
          label="生产厂家"
          width="150px"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="last_maintain_date"
          label="本次维保时间"
          width="130px"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.last_maintain_date == null">—</span>
            <span>{{scope.row.last_maintain_date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="next_maintain_date"
          label="下次维保时间"
          width="130px"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.next_maintain_date == null">—</span>
            <span>{{scope.row.next_maintain_date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="use_address"
          label="所在地址"
          width="200px"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="use_unit"
          label="使用单位"
          width="150px"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="internal_number"
          label="内部编号"
          width="130px"
        ></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="使用单位负责人及联系方式" width="250px">
          <template slot-scope="scope">{{scope.row.use_leader_name}}—{{scope.row.use_leader_phone}}</template>
        </el-table-column>
        <el-table-column align="center" prop="agreement" label="维保合同">
          <template slot-scope="scope">
            <i
              @click="searchPdf(scope.row)"
              class="el-icon-tickets"
              style="font-size: 20px; color: #409EFF;"
            ></i>
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
    </el-dialog>
  </div>
</template>

<script>
import { getMyElevatorList } from "@/api/organize/organize.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "人员详情"
    }
  },
  data() {
    return {
      ids: '',
      total: 0,
      currentPage: 1,
      options: [ {
          value: '1',
          label: '已定位'
        }, {
          value: '2',
          label: '未定位'
        }],
      tableData: [],
      pdfSrc: '',
      formInline: {
        next_maintain_date: '',
        position_state: '',
        use_unit: '',
        internal_number: ''
      },
      page: 1,
      pagesize: 10
    };
  },
  methods: {
    searchPdf(row) {
      this.pdfSrc = `http://dianti.zhaodaka.vip/${row.agreement}`;
      if (!/\.(pdf|PDF)$/.test(row.agreement)) {
        // 不是pdf格式
        window.open(
          "https://view.officeapps.live.com/op/view.aspx?src=" + this.pdfSrc,
            "_blank"
        );
        return false;
      } else {
        // pdf 格式
        window.open(this.pdfSrc)
        // this.dialogVisible = true;
      }
    },
    getList() {
      let params = {
        token: sessionStorage.getItem("token"),
        user_id: this.ids,
        next_maintain_date: this.formInline.next_maintain_date,
        position_state: this.formInline.position_state,
        use_unit: this.formInline.use_unit,
        internal_number: this.formInline.internal_number,
        page: this.page,
        pagesize: this.pagesize
      };
      getMyElevatorList(params).then(res => {
        console.log(res);
        this.total = res.count
        this.tableData = res.list;
      });
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.currentPage = 1;
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    },
    onSubmit () {
      this.page = 1
      this.currentPage = 1
      this.getList()
    },
    getParentData(row) {
      console.log("人员详情接收", row);
      this.ids = row.id
      this.getList();
    },
    handleClose() {
      this.tableData = [];
      this.page = 1
      this.currentPage = 1
      this.formInline.next_maintain_date = ''
      this.formInline.position_state = ''
      this.formInline.use_unit = ''
      this.formInline.internal_number = ''
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-dialog__body {
  padding: 0 !important;
}
.tem_pic {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
