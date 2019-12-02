<template>
  <div class="add_personal">
    <el-drawer
      size="500px"
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <!-- <el-form-item label="所属单位" prop="region" class="change_input">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item> -->
         <el-form-item label="角色姓名" prop="name" class="change_input">
          <el-input placeholder="请填写角色姓名" v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="phone" class="change_input">
          <el-input maxlength="11" show-word-limit placeholder="请填写手机号码" v-model="ruleForm.phone" clearable></el-input>
        </el-form-item> 
        <el-form-item label="密码" prop="password" class="change_input">
          <el-input type="password" placeholder="请填写密码" v-model="ruleForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" v-if="groupType != 1">
          <el-switch
            v-model="switchVal"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div class="bottom_btn">
        <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
        <el-button class="list_btn" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addPersonal } from '@/api/organize/organize.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "添加角色"
    }
  },
  data() {
    return {
      switchVal: false,
      direction: "ltr",
      ruleForm: {
        name: '',
        phone: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写角色姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      },
      groupId: '',
      groupType: ''
    };
  },
  methods: {
    addPersonals () {
      let isAdmin = ''
      if (this.switchVal == false) {
        isAdmin = 0
      } else {
        isAdmin = 1
      }
      let params = {
        token: sessionStorage.getItem('token'),
        group_id: this.groupId,
        name: this.ruleForm.name,
        phone: this.ruleForm.phone,
        password: this.ruleForm.password,
        is_admin: isAdmin
      }
      console.log(params)
      addPersonal(params).then(res => {
        if (res) {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1500
          });
          this.$confirm("继续添加角色, 是否继续?", "提示", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.ruleForm.name = ''
              this.ruleForm.phone = ''
            })
            .catch(() => {
              this.$emit('updateAll')
             this.handleClose()
            });
          
        }
      })
    },
    getParentData (id, types) {
      console.log(types)
      this.groupId = id
      this.groupType = types
      if (this.groupType == 1) {
        this.switchVal = true
      } else {
        this.switchVal = false
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPersonals()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .change_input {
    width: 450px;
    .el-input {
      width: 100%;
    }
    .el-select {
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

