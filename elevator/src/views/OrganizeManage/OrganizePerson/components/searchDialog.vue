<template>
  <div class="calendar">
    <el-dialog :title="title" :visible.sync="visible" width="1100px" :before-close="handleClose">
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
      tableData: [],
      pdfSrc: ''
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
    getList(id) {
      let params = {
        token: sessionStorage.getItem("token"),
        user_id: id
      };
      getMyElevatorList(params).then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    getParentData(row) {
      console.log("人员详情接收", row);
      this.getList(row.id);
    },
    handleClose() {
      this.tableData = [];
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
