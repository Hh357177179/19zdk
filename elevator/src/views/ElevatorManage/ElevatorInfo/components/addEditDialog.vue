<template>
  <div class="add_edit">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
      size="560px"
    >
      <div class="add_edit_main">
        <!-- <el-scrollbar style="height: 100%;"> -->
          <el-form
            :model="aeForm"
            :rules="rules"
            ref="aeForm"
            label-width="180px"
            class="demo_ruleForm"
          >
            <div class="draw_titles">设备基本情况</div>
            <el-form-item label="设备注册代码" prop="device_code" class="change_input">
              <el-input v-model="aeForm.device_code" size="small" placeholder="请输入设备注册代码"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号" prop="elevator_model" class="change_input">
              <el-input v-model="aeForm.elevator_model" size="small" placeholder="请输入出厂编号"></el-input>
            </el-form-item>
            <el-form-item label="设备类别" prop="elevator_type" class="change_input">
              <el-input v-model="aeForm.elevator_type" size="small" placeholder="请输入设备类别"></el-input>
            </el-form-item>
            <el-form-item label="制造单位" prop="factory" class="change_input">
              <el-input v-model="aeForm.factory" size="small" placeholder="请输入制造单位"></el-input>
            </el-form-item>

            <div class="draw_titles">使用登记与监督管理</div>
            <el-form-item label="使用证编号" prop="registration_number" class="change_input">
              <el-input v-model="aeForm.registration_number" size="small" placeholder="请输入使用证编号"></el-input>
            </el-form-item>
            <el-form-item label="使用地点" prop="use_address" class="change_input">
              <el-input v-model="aeForm.use_address" size="small" placeholder="请输入使用地点"></el-input>
            </el-form-item>
            <el-form-item label="设备内部编号" prop="internal_number" class="change_input">
              <el-input v-model="aeForm.internal_number" size="small" placeholder="请输入设备内部编号"></el-input>
            </el-form-item>
            <el-form-item label="注册登记机构" prop="device_mechanism" class="change_input">
              <el-input v-model="aeForm.device_mechanism" size="small" placeholder="请输入注册登记机构"></el-input>
            </el-form-item>
             <el-form-item label="电梯所在区域" prop="valText" class="change_input">
               <el-cascader
                  size="small"
                  v-model="aeForm.valText"
                  placeholder="请选择电梯所在区域"
                  :props="{ checkStrictly: true }"
                  :options="areaData"
                  clearable
                @change="handleChange"
                >
              </el-cascader>
            </el-form-item>

            <div class="draw_titles">设备使用单位情况</div>
            <el-form-item label="使用单位" prop="use_group_id" class="change_input">
              <el-select @change="chanUseGroup" filterable size="small" v-model="aeForm.use_group_id" placeholder="请选择使用单位">
                <el-option
                  v-for="item in userUnit"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用单位法定代表人" prop="use_leader_name" class="change_input">
              <el-input v-model="aeForm.use_leader_name" size="small" placeholder="请输入使用单位法定代表人"></el-input>
            </el-form-item>
            <el-form-item label="使用单位法定代表人手机" prop="use_leader_phone" class="change_input">
              <el-input
                v-model="aeForm.use_leader_phone"
                maxlength="11"
                size="small"
                placeholder="请输入使用单位法定代表人手机"
              ></el-input>
            </el-form-item>
            <el-form-item label="使用单位联系人" prop="use_contact_name" class="change_input">
              <el-input v-model="aeForm.use_contact_name" size="small" placeholder="请输入使用单位联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="use_contact_phone" class="change_input">
              <el-input
                v-model="aeForm.use_contact_phone"
                maxlength="11"
                size="small"
                placeholder="请输入联系电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="安全管理员姓名" prop="use_manager_name" class="change_input">
               <el-select @change="changeSafety" size="small" v-model="aeForm.use_manager_name" placeholder="请选择安全管理员姓名">
                <el-option
                  v-for="item in safetyArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安全管理员电话" prop="use_manager_phone" class="change_input">
              <el-input
                v-model="aeForm.use_manager_phone"
                maxlength="11"
                size="small"
                placeholder="请输入管理员电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="use_department" class="change_input">
              <el-input v-model="aeForm.use_department" size="small" placeholder="请输入部门名称"></el-input>
            </el-form-item>

            <div class="draw_titles">设备检验情况</div>
            <el-form-item label="检验部门" prop="check_department" class="change_input">
              <el-input v-model="aeForm.check_department" size="small" placeholder="请输入检验部门"></el-input>
            </el-form-item>
            <el-form-item label="检验日期" prop="check_date" class="change_input">
              <el-date-picker
                v-model="aeForm.check_date"
                type="date"
                size="small"
                placeholder="选择检验日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="下检日期" prop="next_year_check_date" class="change_input">
              <el-date-picker
                v-model="aeForm.next_year_check_date"
                type="date"
                size="small"
                placeholder="选择下检日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
           
            <div class="draw_titles">设备维保单位情况</div>
            <el-form-item label="维保单位名称" prop="maintain_group_id" class="change_input">
              <el-select @change="chanmaintainGroup" filterable size="small" v-model="aeForm.maintain_group_id" placeholder="请选择维保单位">
                <el-option
                  v-for="item in maintainGroup"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保单位详细地址" prop="maintain_group_address" class="change_input">
              <el-input v-model="aeForm.maintain_group_address" size="small" placeholder="请输入维保单位详细地址"></el-input>
            </el-form-item>
            <el-form-item label="维保单位社会信用代码" prop="maintain_group_credit_code" class="change_input">
              <el-input v-model="aeForm.maintain_group_credit_code" size="small" placeholder="请输入维保单位社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="维保许可证编号" prop="maintain_group_license_number" class="change_input">
              <el-input v-model="aeForm.maintain_group_license_number" size="small" placeholder="请输入维保许可证编号"></el-input>
            </el-form-item>
            <el-form-item label="维保许可证有效期" prop="maintain_group_license_expire" class="change_input">
               <el-date-picker
                v-model="aeForm.maintain_group_license_expire"
                size="small"
                type="date"
                placeholder="维保许可证有效期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="维保合同" prop="agreement" class="change_input">
              <el-upload
                class="upload-demo"
                action="/admin/api/common/upload"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :limit="1"
                :on-exceed="uploadError"
                accept=".pdf, .PDF, .doc, .docx"
                ref="my-upload"
                :data="token"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="维保合同有效期" prop="maintain_end_date" class="change_input">
              <el-date-picker
                v-model="aeForm.maintain_end_date"
                type="date"
                size="small"
                placeholder="维保终止时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="维保单位负责人" prop="maintain_leader_name" class="change_input">
              <el-input v-model="aeForm.maintain_leader_name" size="small" placeholder="请输入维保单位负责人"></el-input>
            </el-form-item>
            <el-form-item label="维保单位负责人电话" prop="maintain_leader_phone" class="change_input">
              <el-input v-model="aeForm.maintain_leader_phone" size="small" placeholder="请输入维保单位负责人电话"></el-input>
            </el-form-item>
            <el-form-item label="维保人员1姓名" prop="maintain_user1_id" class="change_input">
              <el-select @change="chanmaintainUsero" size="small" v-model="aeForm.maintain_user1_id" placeholder="请选择维保人员">
                <el-option
                  v-for="item in maintainUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保人员1电话" prop="maintain_user1_phone" class="change_input">
              <el-input v-model="aeForm.maintain_user1_phone" size="small" placeholder="请输入维保人员1电话"></el-input>
            </el-form-item>
            <el-form-item label="维保人员1身份证号" prop="maintain_user1_idcard" class="change_input">
              <el-input v-model="aeForm.maintain_user1_idcard" size="small" placeholder="请输入维保人员1身份证号"></el-input>
            </el-form-item>
            <el-form-item label="维保人员1证书号" prop="maintain_user1_cert_no" class="change_input">
              <el-input v-model="aeForm.maintain_user1_cert_no" size="small" placeholder="请输入维保人员1证书号"></el-input>
            </el-form-item>
            <el-form-item label="维保人员2姓名" prop="maintain_user2_id" class="change_input">
              <el-select @change="chanmaintainUserT" size="small" v-model="aeForm.maintain_user2_id" placeholder="请选择维保人员">
                <el-option
                  v-for="item in maintainUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保人员2电话" prop="maintain_user2_phone" class="change_input">
              <el-input v-model="aeForm.maintain_user2_phone" size="small" placeholder="请输入维保人员2电话"></el-input>
            </el-form-item>
            <el-form-item label="维保人员2身份证号" prop="maintain_user2_idcard" class="change_input">
              <el-input v-model="aeForm.maintain_user2_idcard" size="small" placeholder="请输入维保人员2身份证号"></el-input>
            </el-form-item>
            <el-form-item label="维保人员2证书号" prop="maintain_user2_cert_no" class="change_input">
              <el-input v-model="aeForm.maintain_user2_cert_no" size="small" placeholder="请输入维保人员2证书号"></el-input>
            </el-form-item>
            <!-- <el-form-item label="上次维保时间" prop="last_maintain_date" class="change_input">
              <el-date-picker
                v-model="aeForm.last_maintain_date"
                type="date"
                size="small"
                placeholder="请选择上次维保时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="下次维保时间" prop="next_maintain_date" class="change_input">
              <el-date-picker
                v-model="aeForm.next_maintain_date"
                type="date"
                size="small"
                placeholder="请选择下次维保时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item> -->
            
          </el-form>
        <!-- </el-scrollbar>  -->
      </div>
      <div class="bottom_btn">
        <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
        <el-button class="list_btn" type="primary" @click="submitForm" v-if="state == 0">立即创建</el-button>
        <el-button class="list_btn" type="primary" @click="submitEdit" v-if="state == 1">立即修改</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import { areaList } from "@/minx/area.js";
import {
  createdElevator,
  getDetails,
  editElevator,
  getMaintenance,
  getBaseUnitList
} from "@/api/elevator/elevator.js";
import { getUserList, searchPerson } from '@/api/organize/organize.js'
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import AreaJson from "../../../../data/area.json"
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
      rules: {
        check_date:[
          { required: true, message: "请填写检验日期", trigger: "blur" }
        ],
        check_department:[
          { required: true, message: "请填写检验部门", trigger: "blur" }
        ],
        elevator_model: [
          { required: true, message: "请填写出厂编号", trigger: "blur" }
        ],
        device_mechanism: [
          { required: true, message: "请填写注册登记机构", trigger: "blur" }
        ],
        maintain_user1_id:[
          { required: true, message: "请选择维保人员1", trigger: "change" }
        ],
         maintain_user2_id:[
          { required: true, message: "请选择维保人员2", trigger: "change" }
        ],
        maintain_user1_cert_no: [
          { required: true, message: "请填写维保人员1证书号", trigger: "blur" }
        ],
        maintain_user2_cert_no: [
          { required: true, message: "请填写维保人员2证书号", trigger: "blur" }
        ],
        maintain_user1_phone: [
          { required: true, message: "请填写维保人员1电话", trigger: "blur" }
        ],
        maintain_user2_phone: [
          { required: true, message: "请填写维保人员2电话", trigger: "blur" }
        ],
        maintain_user1_idcard: [
          { required: true, message: "请填写维保人员1身份证号", trigger: "blur" }
        ],
        maintain_user2_idcard: [
          { required: true, message: "请填写维保人员2身份证号", trigger: "blur" }
        ],
        valText: [
          {
            type: "array",
            required: true,
            message: "请选择单位区域",
            trigger: "change"
          }
        ],
        maintain_group_id: [
          {
            required: true,
            message: "请选择维保单位",
            trigger: "change"
          }
        ],
        maintain_leader_phone: [
          { required: true, message: "请填写维保单位负责人电话", trigger: "blur" }
        ],
        maintain_leader_name: [
          { required: true, message: "请填写维保单位负责人姓名", trigger: "blur" }
        ],
        maintain_group_license_expire: [
          { required: true, message: "请填写维保许可证有效期", trigger: "blur" }
        ],
        maintain_group_license_number: [
          { required: true, message: "请填写维保许可证编号", trigger: "blur" }
        ],
        maintain_group_credit_code: [
          { required: true, message: "请填写维保单位社会信用代码", trigger: "blur" }
        ],
        maintain_group_address: [
          { required: true, message: "请填写维保单位地址", trigger: "blur" }
        ],
        use_department: [
          { required: true, message: "请填写部门名称", trigger: "blur" }
        ],
        use_contact_name: [
          { required: true, message: "请填写联系人姓名", trigger: "blur" }
        ],
        use_contact_phone: [
          { required: true, message: "请填写联系人电话", trigger: "blur" }
        ],
        use_group_id: [
          { required: true, message: "请选择使用单位", trigger: "change" }
        ],
        internal_number: [
          { required: true, message: "请填写内部编号", trigger: "blur" }
        ],
        use_address: [
          { required: true, message: "请填写电梯地址", trigger: "blur" }
        ],
        use_leader_name: [
          { required: true, message: "请填写负责人姓名", trigger: "blur" }
        ],
        use_leader_phone: [
          { required: true, message: "请填写负责人电话", trigger: "blur" }
        ],
        use_manager_name: [
          { required: true, message: "请填写管理员姓名", trigger: "blur" }
        ],
        use_manager_phone: [
          { required: true, message: "请填写管理员电话", trigger: "blur" }
        ],
        agreement: [
          { required: true, message: "请上传维保合同", trigger: "blur" }
        ],
        elevator_type: [
          { required: true, message: "请填写设备类别", trigger: "blur" }
        ],
        device_code: [
          { required: true, message: "请填写设备代码", trigger: "blur" }
        ],
        registration_number: [
          { required: true, message: "请填写登记编号", trigger: "blur" }
        ],
        brand: [{ required: true, message: "请填写电梯品牌", trigger: "blur" }],
        factory: [
          { required: true, message: "请填写生产厂家", trigger: "blur" }
        ],
        next_year_check_date: [
          { required: true, message: "请选择下次年检日期", trigger: "blur" }
        ],
        maintain_start_date: [
          { required: true, message: "请选择合同起始日期", trigger: "blur" }
        ],
        maintain_end_date: [
          { required: true, message: "请选择合同终止日期", trigger: "blur" }
        ],
        last_maintain_date: [
          { required: true, message: "请选择上次维保时间", trigger: "blur" }
        ],
        next_maintain_date: [
          { required: true, message: "请选择下次维保时间", trigger: "blur" }
        ]
      },
      token: {
        token: sessionStorage.getItem("token")
      },
      maintainGroup: [],
      maintainUser: [],
      direction: "ltr",
      options: regionData,
      aeForm: {
        last_maintain_date: '',
        next_maintain_date: '',
        use_user_id: '',
        use_group_id: '',
        maintain_user1_name: '',
        maintain_user1_phone: '',
        maintain_user1_idcard: '',
        maintain_user1_cert_no: '',
        maintain_user2_name: '',
        maintain_user2_phone: '',
        maintain_user2_idcard: '',
        maintain_user2_cert_no: '',
        maintain_leader_name: '',
        maintain_leader_phone: '',
        maintain_group_license_expire: '',
        maintain_group_license_number: '',
        maintain_group_credit_code: '',
        maintain_group_address: '',
        check_date: '',
        check_department: '',
        use_department: '',
        use_contact_name: '',
        use_contact_phone: '',
        device_mechanism: '',
        elevator_model: '',
    
        maintain_group_id: '',
        maintain_group_title: '',
        maintain_user1_id: '',
        maintain_user2_id: '',
        province: "",
        city: "",
        area: "",
        use_unit: "",
        internal_number: "",
        use_address: "",
        use_leader_name: "",
        use_leader_phone: "",
        use_manager_name: "",
        use_manager_phone: "",
        agreement: "",
        elevator_type: "",
        device_code: "",
        registration_number: "",
        brand: "1",
        factory: "",
        next_year_check_date: "",
        maintain_start_date: "",
        maintain_end_date: "",
        valText: []
      },
      uploadFile: [],
      row: {},
      state: 0,
      fileList: [],
      areaData: [],
      userUnit: [],
      personalDetail: {},
      safetyArr: []
    };
  },
  created () {
    this.areaData = AreaJson
    this.getMaintenanceList()
    this.getBaseUnitLists()
  },
  methods: {

    changeSafety (val) {
      let arrs = this.safetyArr.filter(x => x.id == val)
      console.log(arrs)
      this.aeForm.use_manager_phone = arrs[0].phone
      this.aeForm.use_manager_name =  arrs[0].name
      this.aeForm.use_user_id =  arrs[0].id
    },
    chanmaintainUserT (val) {
      console.log(val)
      console.log('维保人员2',val)
      let arr = []
      arr = this.maintainUser.filter(x => x.id == val)
      console.log(arr)
      this.getWbPersonal(val)
      this.aeForm.maintain_user2_name = arr[0].name
      this.aeForm.maintain_user2_phone = arr[0].phone
      this.aeForm.maintain_user2_idcard = arr[0].maintain_user_idcard
      this.aeForm.maintain_user2_cert_no = arr[0].maintain_user_cert_no
    },
    chanmaintainUsero (val) {
      console.log('维保人员1',val)
      let arr = []
      arr = this.maintainUser.filter(x => x.id == val)
      console.log(arr)
      this.getWbPersonal(val)
      this.aeForm.maintain_user1_name = arr[0].name
      this.aeForm.maintain_user1_phone = arr[0].phone
      this.aeForm.maintain_user1_idcard = arr[0].maintain_user_idcard
      this.aeForm.maintain_user1_cert_no = arr[0].maintain_user_cert_no
    },
    // 查看人员信息
    // getPersonDetail (id) {
    //   let params = {
    //     token: sessionStorage.getItem('token'),
    //     user_id: id
    //   }
    //   searchPerson(params).then(res => {
    //     console.log('人员详情',res)
    //     this.personalDetail = res
    //     this.aeForm.use_manager_name = res.name
    //     this.aeForm.use_manager_phone = res.phone
    //     this.aeForm.use_user_id = res.id
    //   })
    // },
    getWbPersonal (id) {
       let params = {
        token: sessionStorage.getItem('token'),
        user_id: id
      }
      searchPerson(params).then(res => {
        console.log('维保详情',res)
      })
    },

    // 获取组织下人员列表
    getPersonalList (val) {
      let params = {
        token: sessionStorage.getItem('token'),
        page: 1,
        pagesize: 1000,
        group_id: val,
        role: 2,
        keyword: ''
      }
      getUserList(params).then(res => {
        console.log('组织下人员列表',res)
        this.safetyArr = res.list
      })
    },
    chanUseGroup (val) {
      console.log('使用单位', val)
      this.aeForm.use_manager_phone = ''
      this.aeForm.use_manager_name = ''
      this.aeForm.use_user_id = ''
      let arr = []
      arr = this.userUnit.filter(x => x.id == val)
      console.log(arr)
      this.aeForm.use_unit = arr[0].title
      this.getPersonalList(val)
      // this.getPersonDetail(val)
    },
    chanmaintainGroup (val) {
      console.log(val)
      this.maintainUser = []
      this.aeForm.maintain_user1_id = ''
      this.aeForm.maintain_user2_id = ''
      this.aeForm.maintain_user1_name = ''
      this.aeForm.maintain_user2_name = ''
      this.getUserList(val)
      let arr = []
      arr = this.maintainGroup.filter(x => x.id == val)
      console.log(arr)
      if (arr[0].area != '') {
        this.aeForm.maintain_group_address = `${arr[0].province}/${arr[0].city}/${arr[0].area}`
      } else {
        this.aeForm.maintain_group_address = `${arr[0].province}/${arr[0].city}`
      }
      this.aeForm.maintain_group_title = arr[0].title
    },
    getUserList (id) {
      let params = {
        token: sessionStorage.getItem('token'),
        group_id: id,
        page: 1,
        pagesize: 10000,
        role: '1',
        keyword: ''
      }
      getUserList(params).then(res => {
        console.log(res)
        this.maintainUser = res.list
      })
    },
    getMaintenanceList () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getMaintenance(params).then(res => {
        console.log('维保单位',res)
        this.maintainGroup = res
      })
    },
    getBaseUnitLists () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getBaseUnitList(params).then(res => {
        console.log('使用单位',res)
        this.userUnit = res
      })
    },
    uploadError(file) {
      this.$message.error("最多可以上传一个维保合同");
    },
    errorText(err) {
      console.log(err);
    },
    handleSuccess(res, file) {
      console.log(res, file);
      if (res.code == 200) {
        this.aeForm.agreement = res.data.url;
      } else {
        this.$message.error("上传合同文件格式错误");
        this.$refs["my-upload"].clearFiles();
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.aeForm.agreement = ''
    },
  handleChange(value) {
      console.log(value)
      let provinceArr = []
      let cityArr = []
      let areaArr = []
      if (value.length == 3) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value)
        this.aeForm.province = provinceArr[0].label
        cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value)
        this.aeForm.city = cityArr[0].label
        areaArr = cityArr[0].children.filter(are => value[2] == are.value)
        this.aeForm.area = areaArr[0].label
      } else if (value.length == 2) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value)
        this.aeForm.province = provinceArr[0].label
        cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value)
        this.aeForm.city = cityArr[0].label
        this.aeForm.area = ''
      } else if (value.length == 1) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value)
        this.aeForm.province = provinceArr[0].label
        this.aeForm.city = ''
        this.aeForm.area = ''
      }

      console.log(this.aeForm.province, this.aeForm.city, this.aeForm.area)
  },
    submitEdit() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          let params = {
            elevator_id: this.row.id,
            token: sessionStorage.getItem("token"),
            province: this.aeForm.province,
            city: this.aeForm.city,
            area: this.aeForm.area,
            use_unit: this.aeForm.use_unit,
            internal_number: this.aeForm.internal_number,
            use_address: this.aeForm.use_address,
            use_leader_name: this.aeForm.use_leader_name,
            use_leader_phone: this.aeForm.use_leader_phone,
            use_manager_name: this.aeForm.use_manager_name,
            use_manager_phone: this.aeForm.use_manager_phone,
            agreement: this.aeForm.agreement,
            elevator_type: this.aeForm.elevator_type,
            device_code: this.aeForm.device_code,
            registration_number: this.aeForm.registration_number,
            brand: this.aeForm.brand,
            factory: this.aeForm.factory,
            next_year_check_date: this.aeForm.next_year_check_date,
            maintain_start_date: this.aeForm.maintain_start_date,
            maintain_end_date: this.aeForm.maintain_end_date,
            maintain_group_id: this.aeForm.maintain_group_id,
            maintain_group_title: this.aeForm.maintain_group_title,
            maintain_user1_id: this.aeForm.maintain_user1_id,
            maintain_user1_name: this.aeForm.maintain_user1_name,
            maintain_user2_id: this.aeForm.maintain_user2_id,
            maintain_user2_name: this.aeForm.maintain_user2_name,

            use_user_id: this.aeForm.use_user_id,
            use_group_id: this.aeForm.use_group_id,
            maintain_user1_phone: this.aeForm.maintain_user1_phone,
            maintain_user1_idcard: this.aeForm.maintain_user1_idcard,
            maintain_user1_cert_no: this.aeForm.maintain_user1_cert_no,
            maintain_user2_phone: this.aeForm.maintain_user2_phone,
            maintain_user2_idcard: this.aeForm.maintain_user2_idcard,
            maintain_user2_cert_no: this.aeForm.maintain_user2_cert_no,
            maintain_leader_name: this.aeForm.maintain_leader_name,
            maintain_leader_phone: this.aeForm.maintain_leader_phone,
            maintain_group_license_expire: this.aeForm.maintain_group_license_expire,
            maintain_group_license_number: this.aeForm.maintain_group_license_number,
            maintain_group_credit_code: this.aeForm.maintain_group_credit_code,
            maintain_group_address: this.aeForm.maintain_group_address,
            check_date: this.aeForm.check_date,
            check_department: this.aeForm.check_department,
            use_department: this.aeForm.use_department,
            use_contact_name: this.aeForm.use_contact_name,
            use_contact_phone: this.aeForm.use_contact_phone,
            device_mechanism: this.aeForm.device_mechanism,
            elevator_model: this.aeForm.elevator_model,
            // last_maintain_date: this.aeForm.last_maintain_date,
            // next_maintain_date: this.aeForm.next_maintain_date,
          };
          console.log(params);
          editElevator(params).then(res => {
            console.log(res);
            if (res) {
              this.$message({
                message: "编辑成功",
                type: "success",
                duration: 1500
              });
              this.$emit("updateAll");
              this.handleClose();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          let params = {
            token: sessionStorage.getItem("token"),
            province: this.aeForm.province,
            city: this.aeForm.city,
            area: this.aeForm.area,
            use_unit: this.aeForm.use_unit,
            internal_number: this.aeForm.internal_number,
            use_address: this.aeForm.use_address,
            use_leader_name: this.aeForm.use_leader_name,
            use_leader_phone: this.aeForm.use_leader_phone,
            use_manager_name: this.aeForm.use_manager_name,
            use_manager_phone: this.aeForm.use_manager_phone,
            agreement: this.aeForm.agreement,
            elevator_type: this.aeForm.elevator_type,
            device_code: this.aeForm.device_code,
            registration_number: this.aeForm.registration_number,
            brand: this.aeForm.brand,
            factory: this.aeForm.factory,
            next_year_check_date: this.aeForm.next_year_check_date,
            maintain_start_date: this.aeForm.maintain_start_date,
            maintain_end_date: this.aeForm.maintain_end_date,
            maintain_group_id: this.aeForm.maintain_group_id,
            maintain_group_title: this.aeForm.maintain_group_title,
            maintain_user1_id: this.aeForm.maintain_user1_id,
            maintain_user1_name: this.aeForm.maintain_user1_name,
            maintain_user2_id: this.aeForm.maintain_user2_id,
            maintain_user2_name: this.aeForm.maintain_user2_name,

            use_user_id: this.aeForm.use_user_id,
            use_group_id: this.aeForm.use_group_id,
            maintain_user1_phone: this.aeForm.maintain_user1_phone,
            maintain_user1_idcard: this.aeForm.maintain_user1_idcard,
            maintain_user1_cert_no: this.aeForm.maintain_user1_cert_no,
            maintain_user2_phone: this.aeForm.maintain_user2_phone,
            maintain_user2_idcard: this.aeForm.maintain_user2_idcard,
            maintain_user2_cert_no: this.aeForm.maintain_user2_cert_no,
            maintain_leader_name: this.aeForm.maintain_leader_name,
            maintain_leader_phone: this.aeForm.maintain_leader_phone,
            maintain_group_license_expire: this.aeForm.maintain_group_license_expire,
            maintain_group_license_number: this.aeForm.maintain_group_license_number,
            maintain_group_credit_code: this.aeForm.maintain_group_credit_code,
            maintain_group_address: this.aeForm.maintain_group_address,
            check_date: this.aeForm.check_date,
            check_department: this.aeForm.check_department,
            use_department: this.aeForm.use_department,
            use_contact_name: this.aeForm.use_contact_name,
            use_contact_phone: this.aeForm.use_contact_phone,
            device_mechanism: this.aeForm.device_mechanism,
            elevator_model: this.aeForm.elevator_model,
            // last_maintain_date: this.aeForm.last_maintain_date,
            // next_maintain_date: this.aeForm.next_maintain_date,
            
          };
          console.log(params);
          createdElevator(params).then(res => {
            console.log(res);
            if (res) {
              this.$message({
                message: "添加成功",
                type: "success",
                duration: 1500
              });
              this.$emit("updateAll");
              this.handleClose();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取电梯详情
    getDetail() {
      let params = {
        token: sessionStorage.getItem("token"),
        elevator_id: this.row.id
      };
      getDetails(params).then(res => {
        console.log(res);
        if (res) {
          this.getUserList(res.maintain_group_id)
          this.aeForm.province = res.province;
          this.aeForm.city = res.city;
          this.aeForm.area = res.area;
          this.aeForm.use_unit = res.use_unit;
          this.aeForm.internal_number = res.internal_number;
          this.aeForm.use_address = res.use_address;
          this.aeForm.use_leader_name = res.use_leader_name;
          this.aeForm.use_leader_phone = res.use_leader_phone;
          this.aeForm.use_manager_name = res.use_manager_name;
          this.aeForm.use_manager_phone = res.use_manager_phone;
          this.aeForm.agreement = res.agreement;
          this.aeForm.elevator_type = res.elevator_type;
          this.aeForm.device_code = res.device_code;
          this.aeForm.registration_number = res.registration_number;
          this.aeForm.brand = '1';
          this.aeForm.factory = res.factory;
          this.aeForm.next_year_check_date = res.next_year_check_date;
          this.aeForm.maintain_start_date = res.maintain_start_date;
          this.aeForm.maintain_end_date = res.maintain_end_date;
          this.aeForm.maintain_group_id = res.maintain_group_id
          this.aeForm.maintain_group_title = res.maintain_group_title
          this.aeForm.maintain_user1_name = res.maintain_user1_name
          this.aeForm.maintain_user2_name = res.maintain_user2_name
          if (res.maintain_user1_id != 0) {
            this.aeForm.maintain_user1_id = res.maintain_user1_id
          }
          if (res.maintain_user2_id != 0) {
            this.aeForm.maintain_user2_id = res.maintain_user2_id
          }

          this.aeForm.use_user_id = res.use_user_id

          if (res.use_group_id != 0) {
            this.aeForm.use_group_id = res.use_group_id
          }
          this.aeForm.maintain_user1_phone = res.maintain_user1_phone
          this.aeForm.maintain_user1_idcard = res.maintain_user1_idcard
          this.aeForm.maintain_user1_cert_no = res.maintain_user1_cert_no
          this.aeForm.maintain_user2_phone = res.maintain_user2_phone
          this.aeForm.maintain_user2_idcard = res.maintain_user2_idcard
          this.aeForm.maintain_user2_cert_no = res.maintain_user2_cert_no
          this.aeForm.maintain_leader_name = res.maintain_leader_name
          this.aeForm.maintain_leader_phone = res.maintain_leader_phone
          this.aeForm.maintain_group_license_expire = res.maintain_group_license_expire
          this.aeForm.maintain_group_license_number = res.maintain_group_license_number
          this.aeForm.maintain_group_credit_code = res.maintain_group_credit_code
          this.aeForm.maintain_group_address = res.maintain_group_address
          this.aeForm.check_date = res.check_date
          this.aeForm.check_department = res.check_department
          this.aeForm.use_department = res.use_department
          this.aeForm.use_contact_name = res.use_contact_name
          this.aeForm.use_contact_phone = res.use_contact_phone
          this.aeForm.device_mechanism = res.device_mechanism
          this.aeForm.elevator_model = res.elevator_model

          // this.aeForm.last_maintain_date = res.last_maintain_date
          // this.aeForm.next_maintain_date = res.next_maintain_date


          let obj = {}
          obj.name = '维保合同'
          obj.url = res.agreement
          if (res.agreement != '') {
            this.fileList.push(obj)
          }
          let provinceArr = []
          let cityArr = []
          let areaArr = []
          let placeArrs = []
          provinceArr = this.areaData.filter(pro => res.province == pro.label)
          let provinceCode = ''
          provinceCode = provinceArr[0].value
          cityArr = provinceArr[0].children.filter(cit => res.city == cit.label)
          let cityCode = ''
          cityCode = cityArr[0].value
          if (res.area != '') {
            areaArr = cityArr[0].children.filter(are => res.area == are.label)
            let areaCode = ''
            areaCode = areaArr[0].value
            placeArrs.push(provinceCode,cityCode,areaCode)
          } else {
            placeArrs.push(provinceCode,cityCode)
          }
          this.aeForm.valText = placeArrs
          console.log(provinceCode)
          console.log(this.aeForm.valText);
        }
      });
    },
    getParentData(row, state) {
      this.row = row;
      this.state = state;
      this.groupState = 1
      this.getDetail();
    },
    handleClose() {
      this.$refs.aeForm.resetFields();
      (this.aeForm.province = ""),
        (this.aeForm.city = ""),
        (this.aeForm.area = ""),
        (this.use_unit = ""),
        (this.internal_number = ""),
        (this.use_address = ""),
        (this.use_leader_name = ""),
        (this.use_leader_phone = ""),
        (this.use_manager_name = ""),
        (this.use_manager_phone = ""),
        (this.agreement = ""),
        (this.elevator_type = ""),
        (this.device_code = ""),
        (this.registration_number = ""),
        (this.brand = ""),
        (this.factory = ""),
        (this.next_year_check_date = ""),
        (this.maintain_start_date = ""),
        (this.maintain_end_date = ""),
        (this.aeForm.valText = []),
        (this.state = 0);
        this.fileList = []
        this.maintain_group_id = ''
        this.maintain_group_title = ''
        this.maintain_user1_id = ''
        this.maintain_user1_name = ''
        this.maintain_user2_id = ''
        this.maintain_user2_name = ''
        this.groupState = 0

        this.aeForm.use_user_id = ''
        this.aeForm.use_group_id = ''
        this.aeForm.maintain_user1_phone = ''
        this.aeForm.maintain_user1_idcard = ''
        this.aeForm.maintain_user1_cert_no = ''
        this.aeForm.maintain_user2_phone = ''
        this.aeForm.maintain_user2_idcard = ''
        this.aeForm.maintain_user2_cert_no = ''
        this.aeForm.maintain_leader_name = ''
        this.aeForm.maintain_leader_phone = ''
        this.aeForm.maintain_group_license_expire = ''
        this.aeForm.maintain_group_license_number = ''
        this.aeForm.maintain_group_credit_code = ''
        this.aeForm.maintain_group_address = ''
        this.aeForm.check_date = ''
        this.aeForm.check_department = ''
        this.aeForm.use_department = ''
        this.aeForm.use_contact_name = ''
        this.aeForm.use_contact_phone = ''
        this.aeForm.device_mechanism = ''
        this.aeForm.elevator_model = ''
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less" scoped>
.add_edit_main {
  height: 550px;
  overflow-y: auto;
  .draw_titles{
    margin-left: 20px;
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
}
.change_input {
  width: 500px;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
.bottom_btn {
  border-top: 1px dashed #f0f0f0;
  background: #fff;
  position: absolute;
  padding: 40px 0 20px 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .list_btn {
    width: 35%;
  }
}
</style>
<style lang="less">
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
</style>

