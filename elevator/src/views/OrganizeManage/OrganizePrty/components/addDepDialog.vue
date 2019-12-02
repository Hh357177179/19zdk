<template>
  <div class="add_dep">
    <el-drawer
      size="500px"
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="add_dep_main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="单位区域" prop="valText" class="change_input">
            <el-cascader
              v-if="states == 0"
              :disabled="states == 1"
              v-model="ruleForm.valText"
              placeholder="请选择单位区域"
              :props="{ checkStrictly: true }"
              :options="areaData"
              clearable
              @change="handleChange"
            ></el-cascader>
            <el-input v-if="states == 1" disabled v-model="ruleForm.placeText"></el-input>
          </el-form-item>
          <el-form-item label="单位类型" prop="type" class="change_input">
            <el-select
              v-model="ruleForm.type"
              placeholder="请选择单位类型"
              clearable
              :disabled="states == 1"
            >
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称" prop="title" class="change_input">
            <el-input placeholder="请填写单位名称" v-model="ruleForm.title" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom_btn">
          <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
          <el-button
            class="list_btn"
            type="primary"
            :loading="createLoading"
            v-if="states == 0"
            @click="submitForm('ruleForm')"
          >立即创建</el-button>
          <el-button
            class="list_btn"
            type="primary"
            :loading="createLoading"
            v-if="states == 1"
            @click="editForm('ruleForm')"
          >确认修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { addGroups, editGroups } from "@/api/organize/organize.js";
import AreaJson from "../../../../data/area.json";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "添加组织部门"
    }
  },
  data() {
    return {
      radio: "1",
      createLoading: false,
      direction: "ltr",
      typeArr: [
        { value: 1, label: "监管局" },
        { value: 2, label: "维保单位" },
        { value: 3, label: "使用单位" }
      ],
      ruleForm: {
        title: "",
        type: "",
        valText: [],
        placeText: ""
      },
      province: "",
      city: "",
      area: "",
      rules: {
        valText: [
          { required: true, message: "请选择单位区域", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择单位类型", trigger: "change" }
        ],
        title: [{ required: true, message: "请填写单位名称", trigger: "blur" }]
      },
      rowObj: {},
      states: 0,
      areaData: [],

      provinceSession: sessionStorage.getItem("province"),
      citySession: sessionStorage.getItem("city"),
      areaSession: sessionStorage.getItem("area")
    };
  },
  created() {
    this.areaData = AreaJson;
  },

  methods: {
    changeNav(val) {
      console.log(val);
    },
    editForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.createLoading = true;
          let params = {
            token: sessionStorage.getItem("token"),
            group_id: this.rowObj.id,
            title: this.ruleForm.title
          };
          editGroups(params)
            .then(res => {
              if (res) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1500
                });
                this.$emit("updateAll");
                this.handleClose();
              }
              this.createLoading = false;
            })
            .catch(() => {
              this.createLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getParentData(row, states) {
      if (states == 1) {
        console.log(row, states);
        let arr = [];
        let place = [];
        arr = arr.concat(row.province, row.city, row.area);
        this.ruleForm.valText = arr;
        if (row.province != "") {
          place.push(row.province);
        }
        if (row.city != "") {
          place.push(row.city);
        }
        if (row.area != "") {
          place.push(row.area);
        }
        this.ruleForm.placeText = place.join(" / ");
        this.ruleForm.title = row.title;
        this.ruleForm.type = row.type;
        this.rowObj = row;
        this.states = states;
      } else {
        this.province = this.provinceSession;
        this.city = this.citySession;
        this.area = this.areaSession;
        let provinceArr = [];
        let cityArr = [];
        let areaArr = [];
        let placeArrs = [];
        provinceArr = this.areaData.filter(
          pro => this.provinceSession == pro.label
        );
        let provinceCode = "";
        let cityCode = "";
        let areaCode = "";
        if (
          this.provinceSession != "" &&
          this.citySession == "" &&
          this.areaSession == ""
        ) {
          provinceCode = provinceArr[0].value;
          placeArrs.push(provinceCode);
        } else if (
          this.provinceSession != "" &&
          this.citySession != "" &&
          this.areaSession == ""
        ) {
          provinceCode = provinceArr[0].value;
          cityArr = provinceArr[0].children.filter(
            cit => this.citySession == cit.label
          );
          cityCode = cityArr[0].value;
          placeArrs.push(provinceCode, cityCode);
        } else if (
          this.provinceSession != "" &&
          this.citySession != "" &&
          this.areaSession != ""
        ) {
          provinceCode = provinceArr[0].value;
          cityCode = cityArr[0].value;
          areaArr = cityArr[0].children.filter(
            are => this.areaSession == are.label
          );
          areaCode = areaArr[0].value;
          placeArrs.push(provinceCode, cityCode, areaCode);
        } else {
          return false;
        }

        this.ruleForm.valText = placeArrs;
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.createLoading = true;
          let params = {
            token: sessionStorage.getItem("token"),
            province: this.province,
            city: this.city,
            area: this.area,
            type: this.ruleForm.type,
            title: this.ruleForm.title
          };
          console.log(params);
          addGroups(params)
            .then(res => {
              if (res) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 1500
                });
                this.$confirm("继续创建组织部门, 是否继续?", "提示", {
                  confirmButtonText: "继续",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.ruleForm.title = ''
                  })
                  .catch(() => {
                    this.$emit("updateAll");
                    this.handleClose();
                  });
              }
              this.createLoading = false;
            })
            .catch(() => {
              this.createLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.states = 0;
      this.ruleForm.title = "";
      this.ruleForm.type = "";
      this.ruleForm.valText = [];
      this.createLoading = false;
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    },
    handleChange(value) {
      console.log(value);
      let provinceArr = [];
      let cityArr = [];
      let areaArr = [];
      if (value.length == 3) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value);
        this.province = provinceArr[0].label;
        cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value);
        this.city = cityArr[0].label;
        areaArr = cityArr[0].children.filter(are => value[2] == are.value);
        this.area = areaArr[0].label;
      } else if (value.length == 2) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value);
        this.province = provinceArr[0].label;
        cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value);
        this.city = cityArr[0].label;
        this.area = "";
      } else if (value.length == 1) {
        provinceArr = this.areaData.filter(pro => value[0] == pro.value);
        this.province = provinceArr[0].label;
        this.city = "";
        this.area = "";
      }

      console.log(this.province, this.city, this.area);
    }
  }
};
</script>

<style lang="less" scoped>
.dep_nav {
  display: flex;
  justify-content: center;
  .top_nav {
    margin: 0 auto 20px;
  }
}
.change_input {
  width: 450px;
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
  position: absolute;
  padding: 40px 0 20px 0;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .list_btn {
    width: 35%;
  }
}
</style>
