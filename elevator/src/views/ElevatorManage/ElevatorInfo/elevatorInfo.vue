<template>
  <div class="elevator_info"
    v-loading="loadingMain"
    element-loading-text="正在导出……"
    element-loading-spinner="el-icon-loading">
    <el-card class="cards" style="padding-bottom: 15px;">
      <div class="titles">
        <div>
          <span class="iconfont icon-jieshao"></span>
          <span>电梯信息</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <!-- <el-form-item class="mb10">
          <el-select clearable v-model="formInline.maintain_state" placeholder="请选择维保状态">
            <el-option
              v-for="item in maintainOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="mb10">
          <el-select v-model="status" placeholder="请选择电梯状态">
            <el-option
              v-for="item in statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mb10">
          <el-input v-model="formInline.maintain_group_title" clearable placeholder="维保单位名称"></el-input>
        </el-form-item>
        <el-form-item class="mb10">
          <el-input v-model="formInline.use_address" clearable placeholder="请输入使用地点"></el-input>
        </el-form-item>
        <el-form-item class="mb10">
          <el-input v-model="formInline.use_unit" clearable placeholder="请输入使用单位"></el-input>
        </el-form-item>
        <el-form-item class="mb10">
          <el-input v-model="formInline.internal_number" clearable placeholder="请输入内部编号"></el-input>
        </el-form-item>
        <el-form-item class="mb10">
          <el-select clearable v-model="formInline.deadline_state" placeholder="请选择是否超期">
            <el-option
              v-for="item in deadlineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="mb10">
          <el-select clearable v-model="formInline.position_state" placeholder="请选择是否定位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-date-picker v-model="formInline.next_maintain_date" type="date" value-format="yyyy-MM-dd" placeholder="下次维保日期"></el-date-picker>
        </el-form-item>-->
        <el-form-item class="mb10">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div class="top_btn">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          v-if="identityState != 3"
          @click="addElevator('添加电梯', 'refAddEdit')"
        >添加电梯</el-button>
        <el-upload
          class="upload_demo"
          :http-request="uploadSectionFile"
          action
          :before-upload="beforeUpload"
          :limit="1"
          :show-file-list="false"
          :file-list="fileListAll"
        >
          <el-button size="small" icon="el-icon-folder-add" type="primary">批量上传</el-button>
        </el-upload>
        <el-button
          size="small"
          style="margin-left:10px;"
          icon="el-icon-download"
          type="primary"
          @click="dowmTemp"
        >下载模板</el-button>
        <el-button type="primary" icon="el-icon-download" size="small" @click="exportExcel">导出表格</el-button>
        <el-button type="primary" icon="el-icon-download" size="small" @click="exportQrCode">导出二维码</el-button>
      </div>
      <div class="mt10">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="设备使用单位情况" name="1">
            <el-table
              :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_unit"
                label="使用单位"
                width="160px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="use_leader_name"
                align="center"
                width="160px"
                label="使用单位法定代表人"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_leader_phone"
                label="使用单位法定代表人手机"
                width="150px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_contact_name"
                label="使用单位联系人"
                width="150px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_contact_phone"
                label="使用单位联系人电话"
                width="160px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_manager_name"
                label="安全管理员"
                width="160px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_manager_phone"
                label="安全管理员电话"
                width="160px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="use_department"
                label="部门名称"
                width="120px"
              ></el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="使用登记与监督管理" name="2">
            <el-table
            :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="registration_number"
                label="使用证编号"
              ></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="use_address" label="使用地点"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="internal_number"
                label="设备内部编号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="device_mechanism"
                label="注册登记机构"
              ></el-table-column>
              <el-table-column show-overflow-tooltip align="center" label="电梯所在区域">
                <template slot-scope="scope">
                  <div>{{scope.row.province}} {{scope.row.city}} {{scope.row.area}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备基本情况" name="3">
            <el-table
            :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="device_code"
                label="设备注册代码"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="elevator_model"
                label="出厂编号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="elevator_type"
                label="设备类别"
              ></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="factory" label="制造单位"></el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备检验情况" name="4">
            <el-table
            :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="check_department"
                label="检验部门"
              ></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="check_date" label="检验日期"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="next_year_check_date"
                label="下次检验日期"
              ></el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备维保单位情况" name="5">
            <el-table
            :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_group_title"
                label="维保单位名称"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_group_address"
                label="维保单位地址"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_group_credit_code"
                label="社会信用代码"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_group_license_number"
                label="许可证编号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_group_license_expire"
                label="维保许可证有效期"
              ></el-table-column>
              <!-- <el-table-column align="center" prop="agreement" label="维保许可证文件">
                <template slot-scope="scope">
                  <i
                    @click="searchPdf(scope.row)"
                    class="el-icon-tickets"
                    style="font-size: 20px; color: #409EFF;"
                  ></i>
                </template>
              </el-table-column> -->
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_start_date"
                label="合同开始时间"
                width="130px"
              ></el-table-column>-->
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_end_date"
                label="维保合同有效期"
                width="130px"
              ></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_leader_name"
                label="维保负责人"
                width="130px"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_leader_phone"
                label="维保负责人电话"
                width="130px"
              ></el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备维保情况" name="6">
            <el-table
            :row-class-name="tableRowClassName"
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column type="index" align="center" width="50"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user1_name"
                label="维保人员1"
              ></el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user1_idcard"
                label="维保人1身份证"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user1_cert_no"
                label="维保人1证书号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user1_phone"
                label="维保人员1电话"
              ></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user2_name"
                label="维保人员2"
              ></el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user2_idcard"
                label="维保人2身份证"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user2_cert_no"
                label="维保人2证书号"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user2_phone"
                label="维保人员2电话"
              ></el-table-column> -->
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
              <el-table-column show-overflow-tooltip align="center" label="下次维保时间" width="130px">
                <template slot-scope="scope">
                  <span v-if="scope.row.next_maintain_date == null">—</span>
                  <span>{{scope.row.next_maintain_date}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="250px">
                <template slot-scope="scope">
                  <el-button
                    type
                    size="small"
                    icon="el-icon-tickets"
                    circle
                    @click="searchLog(scope.row)"
                  ></el-button>
                  <el-button
                    type
                    size="small"
                    icon="el-icon-location"
                    circle
                    @click="editPlace(scope.row)"
                  ></el-button>
                  <el-button
                    v-if="identityState != 3"
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
                    v-if="identityState != 3"
                    circle
                  ></el-button>
                  <el-button type size="small" icon circle @click="erCode(scope.row)">
                    <i style="font-size:12px;" class="iconfont icon-erweima"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
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
        :style="{ width: 100 + '%', height: pdfHeight + 'px' }"
      />
    </el-dialog>

    <!-- 二维码 -->
    <el-dialog :title="qrTitle" :visible.sync="qrCodeVisible" width="30%" :before-close="closeCode">
      <div class="paycode">
        <!-- 放置二维码的容器,需要给一个ref -->
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="downQrcode">下 载</el-button>
        <el-button size="small" type="primary" @click="closeCode">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddEditDialog from "./components/addEditDialog";
import {
  getElevatorList,
  deleteElevator,
  upLoadAll
} from "@/api/elevator/elevator.js";
import pdf from "vue-pdf";
import QRCode from "qrcodejs2";

import html2canvas from "html2canvas";
import JSZIP from "jszip";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      loadingMain: false,
      qrTitle: "二维码",
      qrcode: "",
      qrCodeVisible: false,
      status: "",
      statusArr: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '即将维保'
        },
        {
          value: '3',
          label: '超期未保'
        }
      ],
      maintainOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未维保"
        },
        {
          value: "2",
          label: "已维保"
        }
      ],
      deadlineOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未超期"
        },
        {
          value: "2",
          label: "已超期"
        }
      ],
      options: [
        {
          value: "1",
          label: "已定位"
        },
        {
          value: "2",
          label: "未定位"
        }
      ],
      activeName: "1",
      identityState: sessionStorage.getItem("type"),
      pdfSrc: "",
      dialogVisible: false,
      formInline: {
        deadline_state: "",
        next_maintain_date: "",
        use_unit: "",
        internal_number: "",
        position_state: "",
        maintain_state: "",
        maintain_group_title: ''
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
      pdfHeight: 0,
      fileListAll: [],
      token: {
        token: sessionStorage.getItem("token")
      },
      clickRow: {}
    };
  },
  created() {
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.pdfHeight = h - 120;
    console.log(this.$route);
    if (this.$route.params.status) {
      this.status = `${this.$route.params.status}`
    }
    this.getList();
  },
  methods: {
    searchLog (row) {
      console.log(row)
      this.$router.push({
        path: '/task-sign',
        query: {
          id: row.id
        }
      })
    },
    exportQrCode() {
      this.loadingMain = true
      let that = this
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 10000,
        use_unit: this.formInline.use_unit,
        internal_number: this.formInline.internal_number,
        next_maintain_date: this.formInline.next_maintain_date,
        position_state: this.formInline.position_state,
        deadline_state: this.formInline.deadline_state,
        use_address: this.formInline.use_address,
        maintain_state: this.formInline.maintain_state,
        status: this.status,
        maintain_group_title: this.formInline.maintain_group_title
      };
      getElevatorList(params).then(res => {
        console.log("导出", res);
        const selectedRows = res.list;
        const zip = new JSZIP();
        const promises = [];
        selectedRows.forEach(item => {
          const qrCode = document.createElement("div");
          qrCode.classList.add("qr-code-hide");
          document.body.appendChild(qrCode);
          new QRCode(qrCode, `http://dianti.zhaodaka.vip/detail?elevator_id=${item.id}`);
          console.log(qrCode)
          // let qrCodeImg = ''
          // qrCodeImg = quCode

          promises.push(
            html2canvas(qrCode, {
              backgroundColor: null
            })
          );
        });
        console.log('返回的',promises)
        Promise.all(promises).then(canvass => {
          console.log(canvass)
          const folder = zip.folder('电梯二维码');
          canvass.forEach((canvas, index) => {
            const item = selectedRows[index];
            const baseData = canvas.toDataURL("image/png");
            const name = `${item.internal_number}`;
            folder.file(`${name}.png`, baseData.slice(22), { base64: true });
          });
          zip.generateAsync({ type: "blob" }).then(function(content) {
            FileSaver.saveAs(content, "电梯二维码"); // 生成文件，调用saveAs
            that.loadingMain = false
            Array.prototype.forEach.call(
              document.querySelectorAll(".qr-code-hide"),
              el => {
                document.body.removeChild(el);
              }
            );
          });
        });
      });
    },
    closeCode() {
      this.$refs.qrcode.innerHTML = "";
      this.$nextTick(() => {
        this.qrCodeVisible = false;
      });
    },
    downQrcode() {
      console.log(this.clickRow);
      var oQrcode = document.querySelector("#qrcode img");
      var url = oQrcode.src;
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      a.download = this.clickRow.internal_number;
      a.href = url; //合成函数，执行下载
      a.dispatchEvent(event);
    },
    // 生成二维码
    erCode(row) {
      console.log(row.id);
      this.qrTitle = `${row.internal_number}`;
      this.clickRow = row;
      this.qrCodeVisible = true;
      this.qrcode = `http://dianti.zhaodaka.vip/detail?elevator_id=${row.id}`;
      this.$nextTick(() => {
        this.crateQrcode();
      });
    },
    crateQrcode() {
      new QRCode("qrcode", {
        width: 150,
        height: 150, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      });
    },
    exportExcel() {
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 100000,
        use_unit: this.formInline.use_unit,
        internal_number: this.formInline.internal_number,
        next_maintain_date: this.formInline.next_maintain_date,
        position_state: this.formInline.position_state,
        deadline_state: this.formInline.deadline_state,
        use_address: this.formInline.use_address,
        maintain_state: this.formInline.maintain_state,
        status: this.status
      };
      getElevatorList(params).then(res => {
        if (res) {
          console.log("导出");
          res.list.forEach(list => {
            list.areaText = `${res.list.province}-${res.list.city}-${
              res.list.area
            }`;
          });
          console.log(res.list);
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
              "使用单位法定代表人",
              "使用单位法定代表人手机",
              "使用单位联系人",
              "使用单位联系人电话",
              "安全管理员",
              "安全管理员电话",
              "部门名称",
              "使用证编号",
              "设备内部编号",
              "注册登记机构",
              "电梯所在区域",
              "设备注册代码",
              "出厂编号",
              "设备类别",
              "制造单位",
              "检验部门",
              "检验日期",
              "下次检验日期",
              "维保单位名称",
              "维保单位地址",
              "社会信用代码",
              "许可证编号",
              "维保许可证有效期",
              "维保负责人",
              "维保负责人电话",
              "维保人员1",
              "维保人员2",
              "本次维保时间",
              "下次维保时间"
            ];
            const filterVal = [
              "use_unit",
              "use_leader_name",
              "use_leader_phone",
              "use_contact_name",
              "use_contact_phone",
              "use_manager_name",
              "use_manager_phone",
              "use_department",
              "registration_number",
              "internal_number",
              "device_mechanism",
              "areaText",
              "device_code",
              "elevator_model",
              "elevator_type",
              "factory",
              "check_department",
              "check_date",
              "next_year_check_date",
              "maintain_group_title",
              "maintain_group_address",
              "maintain_group_credit_code",
              "maintain_group_license_number",
              "maintain_group_license_expire",
              "maintain_leader_name",
              "maintain_leader_phone",
              "maintain_user1_name",
              "maintain_user2_name",
              "last_maintain_date",
              "next_maintain_date"
            ];
            const data = this.formatJson(filterVal, res.list);
            export_json_to_excel(tHeader, data, `电梯信息(${time})`);
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    dowmTemp() {
      location.href = "http://dianti.zhaodaka.vip/example.xlsx";
    },
    handleClick(val) {
      console.log(val);
    },
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
        window.open(this.pdfSrc);
        // this.dialogVisible = true;
      }
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
    tableRowClassName({row, rowIndex}) {
      if (row.use_unit == '' || row.maintain_group_title == '') {
        return 'info-row';
      }
      return
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize,
        use_unit: this.formInline.use_unit,
        internal_number: this.formInline.internal_number,
        next_maintain_date: this.formInline.next_maintain_date,
        position_state: this.formInline.position_state,
        deadline_state: this.formInline.deadline_state,
        use_address: this.formInline.use_address,
        maintain_state: this.formInline.maintain_state,
        status: this.status,
        maintain_group_title: this.formInline.maintain_group_title
      };
      getElevatorList(params).then(res => {
        console.log('所有数据列表',res);
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
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    },
    onSubmit() {
      this.page = 1;
      this.currentPage = 1;
      this.getList();
    },
    beforeUpload(file) {
      console.log(file);
    },
    uploadSectionFile(param) {
      console.log(param);
      let fileFormData = new FormData();
      fileFormData.append("file", param.file);
      fileFormData.append("token", sessionStorage.getItem("token"));
      upLoadAll(fileFormData).then(res => {
        console.log(res);
        if (res) {
          this.$message({
            message: "批量上传成功",
            type: "success"
          });
          this.getList();
        }
      });
    }
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
  .top_btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .upload_demo {
      margin-left: 10px;
    }
  }
}
.mb10 {
  margin-bottom: 10px !important;
}
.paycode {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.qr-code-hide {
  width: 256px;
  height: 256px;
  position: fixed;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
 <style lang="less">
  .el-table .info-row {
   background: oldlace;
 }
 </style>
 