<template>
  <div class="elevator_info">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div>
          <span class="iconfont icon-jieshao"></span>
          <span>电梯信息</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <!-- <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.name" clearable placeholder="根据内部编号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>-->
    </el-card>
    <el-card class="mt10">
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addElevator('添加电梯', 'refAddEdit')"
        >添加电梯</el-button>
        <!-- <el-button type="primary" icon="el-icon-folder-add" size="small">批量上传</el-button> -->
      </div>
      <div class="mt10">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
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
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="brand"
            label="品牌"
            width="100px"
          ></el-table-column>
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
            prop="next_year_check_date"
            label="下次年检日期"
            width="130px"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="maintain_start_date"
            label="合同开始时间"
            width="130px"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="maintain_end_date"
            label="合同终止时间"
            width="130px"
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
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="维保单位"
            width="150px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.maintain_group_id != 0">{{scope.row.maintain_group_title}}</div>
              <div v-else>—</div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="维保人员"
            width="200px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.maintain_user1_id != 0 && scope.row.maintain_user2_id == 0">{{scope.row.maintain_user1_name}}</div>
              <div v-if="scope.row.maintain_user1_id == 0 && scope.row.maintain_user2_id != 0">{{scope.row.maintain_user2_name}}</div>
              <div v-if="scope.row.maintain_user1_id != 0 && scope.row.maintain_user2_id != 0">{{scope.row.maintain_user1_name}}、{{scope.row.maintain_user2_name}}</div>
              <div v-if="scope.row.maintain_user1_id == 0 && scope.row.maintain_user2_id == 0">—</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="使用单位负责人及联系方式" width="250px">
            <template
              slot-scope="scope"
            >{{scope.row.use_leader_name}}—{{scope.row.use_leader_phone}}</template>
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
          <el-table-column align="center" label="操作" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button
                type
                size="small"
                icon="el-icon-location"
                circle
                @click="editPlace(scope.row)"
              ></el-button>
              <el-button
                type
                size="small"
                icon="el-icon-edit"
                circle
                @click="editElevator('编辑电梯', 'refAddEdit', scope.row)"
              ></el-button>
              <el-button
                type
                size="small"
                icon="el-icon-delete-solid"
                @click="deleteEve(scope.row)"
                circle
              ></el-button>
              <el-button type size="small" icon circle @click="erCode(scope.row)">
                <i style="font-size:12px;" class="iconfont icon-erweima"></i>
              </el-button>
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
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <AddEditDialog
      ref="refAddEdit"
      :visible.sync="addEditShow"
      :title="addEditlTitle"
      @updateAll="updateAll"
    ></AddEditDialog>
    
    <el-dialog title="合同预览" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
      <!-- <pdf :src="pdfSrc"></pdf> -->
      <iframe
      :src="pdfSrc"
      type="application/x-google-chrome-pdf"
      :style="{ width: 100 + '%', height: pdfHeight + 'px' }" />
    </el-dialog>
  </div>
</template>

<script>
import AddEditDialog from "./components/addEditDialog";
import { getElevatorList, deleteElevator } from "@/api/elevator/elevator.js";
import pdf from "vue-pdf";
export default {
  data() {
    return {
      pdfSrc: "",
      dialogVisible: false,
      formInline: {
        name: "",
        date: ""
      },
      addEditShow: false,
      addEditlTitle: "",
      currentPage: 1,
      page: 1,
      pagesize: 10,
      total: 0,
      tableData: [],
      loading: false,
      editMapShow: false,
      editMapTitle: "",
      pdfHeight: 0
    };
  },
  created() {
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
      this.pdfHeight = h - 120
    this.getList();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    searchPdf(row) {
      console.log(row.agreement);
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
    erCode(row) {
      console.log(row.id);
      window.open(
        `https://cli.im/api/qrcode/code?text=http%3A%2F%2Fdianti.zhaodaka.vip%2Fdetail%3Felevator_id%3D${
          row.id
        }`
      );
    },
    deleteEve(row) {
      this.$confirm("此操作将删除该电梯, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row);
          let params = {
            token: sessionStorage.getItem("token"),
            elevator_id: row.id
          };
          deleteElevator(params).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.page = 1;
            this.currentPage = 1;
            this.getList();
          });
        })
        .catch(() => {});
    },
    editPlace(row) {
      console.log(row);
      this.$router.push(`/elevator-map/${row.id}`);
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token")
      };
      getElevatorList(params).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
    addElevator(title, ref) {
      this.addEditShow = true;
      this.addEditlTitle = title;
    },
    editElevator(title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row, 1);
      }
      this.addEditShow = true;
      this.addEditlTitle = title;
    },
    updateAll() {
      console.log("更新数据");
      this.currentPage = 1;
      this.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.currentPage = 1;
      this.pagesize = 10;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    },
    onSubmit() {}
  },
  components: { AddEditDialog, pdf }
};
</script>

<style lang="less" scoped>
.elevator_info {
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
}
</style>
