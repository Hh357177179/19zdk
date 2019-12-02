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
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item class="mb10">
          <el-select clearable v-model="formInline.maintain_state" placeholder="请选择维保状态">
            <el-option
              v-for="item in maintainOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mb10">
          <el-select clearable v-model="formInline.position_state" placeholder="请选择是否定位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-date-picker v-model="formInline.next_maintain_date" type="date" value-format="yyyy-MM-dd" placeholder="下次维保日期"></el-date-picker>
        </el-form-item> -->
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
          action=""
          :before-upload="beforeUpload"
          :limit="1"
          :show-file-list="false"
          :file-list="fileListAll">
          <el-button size="small" icon="el-icon-folder-add" type="primary">批量上传</el-button>
        </el-upload>
        <el-button size="small" style="margin-left:10px;" icon="el-icon-download" type="primary" @click="dowmTemp">下载模板</el-button>
        <el-button type="primary" icon="el-icon-download" size="small" @click="exportExcel">导 出</el-button>
      </div>
      <div class="mt10">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="设备使用单位情况" name="1">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
            <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
            <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
                label="下检日期"
              ></el-table-column>
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
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
            <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
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
              <el-table-column align="center" prop="agreement" label="维保许可证文件">
                <template slot-scope="scope">
                  <i
                    @click="searchPdf(scope.row)"
                    class="el-icon-tickets"
                    style="font-size: 20px; color: #409EFF;"
                  ></i>
                </template>
              </el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_start_date"
                label="合同开始时间"
                width="130px"
              ></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_end_date"
                label="维保合同有效期"
                width="130px"
              ></el-table-column>
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
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              :header-cell-style="{background:'#f0f0f0',color: '#666'}"
            >
            <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user1_name"
                label="维保人员1"
              ></el-table-column>
              <el-table-column
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
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="maintain_user2_name"
                label="维保人员2"
              ></el-table-column>
              <el-table-column
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
                label="下次维保时间"
                width="130px"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.next_maintain_date == null">—</span>
                  <span>{{scope.row.next_maintain_date}}</span>
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
  </div>
</template>

<script>
import AddEditDialog from "./components/addEditDialog";
import { getElevatorList, deleteElevator, upLoadAll } from "@/api/elevator/elevator.js";
import pdf from "vue-pdf";
export default {
  data() {
    return {
      maintainOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '未维保'
      }, {
        value: '2',
        label: '已维保'
      }],
      deadlineOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '未超期'
      }, {
        value: '2',
        label: '已超期'
      }],
      options: [{
        value: '1',
        label: '已定位'
      }, {
        value: '2',
        label: '未定位'
      }],
      activeName: "1",
      identityState: sessionStorage.getItem("type"),
      pdfSrc: "",
      dialogVisible: false,
      formInline: {
        deadline_state: '',
        next_maintain_date: '',
        use_unit: "",
        internal_number: "",
        position_state: "",
        maintain_state: ''
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
    };
  },
  created() {
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.pdfHeight = h - 120;
    this.getList();
  },
  methods: {
    exportExcel () {
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
        maintain_state: this.formInline.maintain_state
      };
      getElevatorList(params).then(res => {
        if (res) {
          console.log('导出')
          res.list.forEach(list => {
            list.areaText = `${res.list.province}-${res.list.city}-${res.list.area}`
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
              "设备注册代码",
              "出厂编号",
              "设备类别",
              "制造单位",
              "使用证编号",
              "使用地点",
              "设备内部编号",
              "注册登记机构",
              "电梯所在区域",
              "使用单位",
              "使用单位法定代表人",
              "使用单位法定代表人手机",
              "使用单位联系人",
              "联系电话",
              "安全管理员",
              "安全管理员手机",
              "部门名称",
              "检验部门",
              "检验日期",
              "下检日期",
              "维保单位名称",
              "维保单位详细地址",
              "维保单位社会信用代码",
              "维保许可证编号",
              "维保许可证有效期",
              "维保合同有效期",
              "维保单位负责人",
              "维保单位负责人联系手机",
              "维保人员1姓名",
              "维保人员1身份证号",
              "维保人员1操作人员证书号",
              "维保人员1联系手机",
              "维保人员2姓名",
              "维保人员2身份证号",
              "维保人员2操作人员证书号",
              "维保人员2联系手机",
              "上次维保日期",
              "下次维保日期"
            ];
            const filterVal = [
              "device_code",
              "elevator_model",
              "elevator_type",
              "factory",
              "registration_number",
              "use_address",
              "internal_number",
              "device_mechanism",
              "areaText",
              "use_unit",
              "use_leader_name",
              "use_leader_phone",
              "use_contact_name",
              "use_contact_phone",
              "use_manager_name",
              "use_manager_phone",
              "use_department",
              "check_department",
              "check_date",
              "next_year_check_date",
              "maintain_group_title",
              "maintain_group_address",
              "maintain_group_credit_code",
              "maintain_group_license_number",
              "maintain_group_license_expire",
              "maintain_end_date",
              "maintain_leader_name",
              "maintain_leader_phone",
              "maintain_user1_name",
              "maintain_user1_idcard",
              "maintain_user1_cert_no",
              "maintain_user1_phone",
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
    dowmTemp () {
      location.href = 'http://dianti.zhaodaka.vip/example.xls'
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
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize,
        use_unit: this.formInline.use_unit,
        internal_number: this.formInline.internal_number,
        next_maintain_date: this.formInline.next_maintain_date,
        position_state: this.formInline.position_state,
        deadline_state: this.formInline.deadline_state,
        use_address: this.formInline.use_address,
        maintain_state: this.formInline.maintain_state
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
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    },
    onSubmit() {
      this.page = 1
      this.currentPage = 1
      this.getList()
    },
    beforeUpload (file) {
      console.log(file)
    },
    uploadSectionFile (param) {
      console.log(param)
      let fileFormData = new FormData();
      fileFormData.append('file', param.file);
      fileFormData.append('token', sessionStorage.getItem('token'));
      upLoadAll(fileFormData).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '批量上传成功',
            type: 'success'
          });
          this.getList()
        }
      })
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
  .top_btn{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .upload_demo{
      margin-left: 10px;
    }
  }
}
.mb10 {
  margin-bottom: 10px !important;
}
</style>
