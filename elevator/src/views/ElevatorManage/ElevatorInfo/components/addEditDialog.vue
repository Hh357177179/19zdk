<template>
  <div class="add_edit">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
      size="500px"
    >
      <div class="add_edit_main">
        <!-- <el-scrollbar style="height: 100%;"> -->
          <el-form
            :model="aeForm"
            :rules="rules"
            ref="aeForm"
            label-width="120px"
            class="demo_ruleForm"
          >
            <el-form-item label="单位区域" prop="valText" class="change_input">
              <el-cascader
                  size="small"
                  v-model="aeForm.valText"
                  placeholder="请选择单位区域"
                  :options="areaData"
                  :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                >
              </el-cascader>
            </el-form-item>
            <el-form-item label="使用单位" prop="use_unit" class="change_input">
              <el-input v-model="aeForm.use_unit" size="small" placeholder="请输入使用单位"></el-input>
            </el-form-item>
            <el-form-item label="维保单位" prop="maintain_group_id" class="change_input">
              <el-select @change="chanmaintainGroup" size="small" v-model="aeForm.maintain_group_id" placeholder="请选择维保单位">
                <el-option
                  v-for="item in maintainGroup"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保人员" prop="maintain_user1_id" class="change_input">
              <el-select @change="chanmaintainUsero" size="small" v-model="aeForm.maintain_user1_id" placeholder="请选择维保人员">
                <el-option
                  v-for="item in maintainUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保人员" prop="maintain_user2_id" class="change_input">
              <el-select @change="chanmaintainUserT" size="small" v-model="aeForm.maintain_user2_id" placeholder="请选择维保人员">
                <el-option
                  v-for="item in maintainUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内部编号" prop="internal_number" class="change_input">
              <el-input v-model="aeForm.internal_number" size="small" placeholder="请输入内部编号"></el-input>
            </el-form-item>
            <el-form-item label="电梯地址" prop="use_address" class="change_input">
              <el-input v-model="aeForm.use_address" size="small" placeholder="请输入电梯地址"></el-input>
            </el-form-item>
            <el-form-item label="负责人姓名" prop="use_leader_name" class="change_input">
              <el-input v-model="aeForm.use_leader_name" size="small" placeholder="请输入负责人姓名"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" prop="use_leader_phone" class="change_input">
              <el-input
                v-model="aeForm.use_leader_phone"
                maxlength="11"
                size="small"
                placeholder="请输入负责人电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="安全管理员姓名" prop="use_manager_name" class="change_input">
              <el-input v-model="aeForm.use_manager_name" size="small" placeholder="请输入安全管理员姓名"></el-input>
            </el-form-item>
            <el-form-item label="安全管理员电话" prop="use_manager_phone" class="change_input">
              <el-input
                v-model="aeForm.use_manager_phone"
                maxlength="11"
                size="small"
                placeholder="请输入管理员电话"
              ></el-input>
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
            <el-form-item label="电梯类型" prop="elevator_type" class="change_input">
              <el-input v-model="aeForm.elevator_type" size="small" placeholder="请输入电梯类型"></el-input>
            </el-form-item>
            <el-form-item label="设备代码" prop="device_code" class="change_input">
              <el-input v-model="aeForm.device_code" size="small" placeholder="请输入设备代码"></el-input>
            </el-form-item>
            <el-form-item label="登记编号" prop="registration_number" class="change_input">
              <el-input v-model="aeForm.registration_number" size="small" placeholder="请输入登记编号"></el-input>
            </el-form-item>
            <el-form-item label="电梯品牌" prop="brand" class="change_input">
              <el-input v-model="aeForm.brand" size="small" placeholder="请输入品牌"></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="factory" class="change_input">
              <el-input v-model="aeForm.factory" size="small" placeholder="请输入生产厂家"></el-input>
            </el-form-item>
            <el-form-item label="下次年检日期" prop="next_year_check_date" class="change_input">
              <el-date-picker
                v-model="aeForm.next_year_check_date"
                type="date"
                size="small"
                placeholder="选择下次年检日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同起始时间" prop="maintain_start_date" class="change_input">
              <el-date-picker
                v-model="aeForm.maintain_start_date"
                type="date"
                size="small"
                placeholder="维保开始时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同终止时间" prop="maintain_end_date" class="change_input">
              <el-date-picker
                v-model="aeForm.maintain_end_date"
                type="date"
                size="small"
                placeholder="维保终止时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
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
  getMaintenance
} from "@/api/elevator/elevator.js";
import { getUserList } from '@/api/organize/organize.js'
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
        valText: [
          {
            type: "array",
            required: true,
            message: "请选择单位区域",
            trigger: "change"
          }
        ],
        use_unit: [
          { required: true, message: "请填写使用单位", trigger: "blur" }
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
          { required: true, message: "请填写elevator_type", trigger: "blur" }
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
        maintain_group_id: '',
        maintain_group_title: '',
        maintain_user1_id: '',
        maintain_user1_name: '',
        maintain_user2_id: '',
        maintain_user2_name: '',
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
        brand: "",
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
      areaData: []
    };
  },
  created () {
    this.areaData = AreaJson
    this.getMaintenanceList()
  },
  methods: {
    chanmaintainUserT (val) {
      console.log(val)
      let arr = []
      arr = this.maintainUser.filter(x => x.id == val)
      console.log(arr)
      this.aeForm.maintain_user1_name = arr[0].name
    },
    chanmaintainUsero (val) {
      console.log(val)
      let arr = []
      arr = this.maintainUser.filter(x => x.id == val)
      console.log(arr)
      this.aeForm.maintain_user2_name = arr[0].name
    },
    chanmaintainGroup (val) {
      this.maintainUser = []
      this.aeForm.maintain_user1_id = ''
      this.aeForm.maintain_user2_id = ''
      this.aeForm.maintain_user1_name = ''
      this.aeForm.maintain_user2_name = ''
      this.getUserList(val)
      let arr = []
      arr = this.maintainGroup.filter(x => x.id == val)
      console.log(arr)
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
        console.log(res)
        this.maintainGroup = res
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
      console.log(this.areaData)
      let provinceArr = []
      let cityArr = []
      let areaArr = []
      provinceArr = this.areaData.filter(pro => value[0] == pro.value)
      this.aeForm.province = provinceArr[0].label
      cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value)
      this.aeForm.city = cityArr[0].label
      areaArr = cityArr[0].children.filter(are => value[2] == are.value)
      this.aeForm.area = areaArr[0].label

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
            maintain_user2_name: this.aeForm.maintain_user2_name
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
            maintain_user2_name: this.aeForm.maintain_user2_name
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
          this.aeForm.brand = res.brand;
          this.aeForm.factory = res.factory;
          this.aeForm.next_year_check_date = res.next_year_check_date;
          this.aeForm.maintain_start_date = res.maintain_start_date;
          this.aeForm.maintain_end_date = res.maintain_end_date;
          this.aeForm.maintain_group_id = res.maintain_group_id
          this.aeForm.maintain_group_title = res.maintain_group_title
          this.aeForm.maintain_user1_name = res.maintain_user1_name
          this.aeForm.maintain_user2_name = res.maintain_user2_name
          this.aeForm.maintain_user1_id = res.maintain_user1_id
          this.aeForm.maintain_user2_id = res.maintain_user2_id
          let obj = {}
          obj.name = '维保合同'
          obj.url = res.agreement
          this.fileList.push(obj)
          let provinceArr = []
          let cityArr = []
          let areaArr = []
          provinceArr = this.areaData.filter(pro => res.province == pro.label)
          let provinceCode = ''
          provinceCode = provinceArr[0].value
          cityArr = provinceArr[0].children.filter(cit => res.city == cit.label)
          let cityCode = ''
          cityCode = cityArr[0].value
          areaArr = cityArr[0].children.filter(are => res.area == are.label)
          let areaCode = ''
          areaCode = areaArr[0].value
          let placeArrs = []
          placeArrs.push(provinceCode,cityCode,areaCode)
          this.aeForm.valText = placeArrs
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
}
.change_input {
  width: 430px;
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

