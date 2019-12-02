<template>
  <div class="edit_personal">
    <el-drawer
      size="500px"
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
         <el-form-item label="角色姓名" prop="name" class="change_input">
          <el-input placeholder="请填写角色姓名" v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="phone" class="change_input">
          <el-input disabled maxlength="11" show-word-limit placeholder="请填写手机号码" v-model="ruleForm.phone" clearable></el-input>
        </el-form-item> 
        <el-form-item label="密码" prop="password" class="change_input">
          <el-input type="password" placeholder="不填写则为不修改" v-model="ruleForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员">
          <el-switch
            @change="changeAdmin"
            v-model="isAdmin"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div class="bottom_btn">
        <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
        <el-button class="list_btn" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { searchPerson, updataUser } from '@/api/organize/organize.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑基本信息"
    }
  },
  data() {
    return {
      isAdmin: false,
      row: {},
      direction: "ltr",
      ruleForm: {
        name: '',
        phone: '',
        password: '',
        is_admin: ''
      },
      identity: sessionStorage.getItem('type'),
      rules: {
        name: [
          { required: true, message: '请填写角色姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    changeAdmin () {
      console.log(this.isAdmin)
      if (this.isAdmin == true) {
        this.ruleForm.is_admin = 1
      } else {
        this.ruleForm.is_admin = 0
      }
    },
    getDetail (id) {
      let params = {
        token: sessionStorage.getItem('token'),
        user_id: id,
      }
      searchPerson(params).then(res => {
        console.log('详细',res)
        if (res) {
          this.ruleForm.name = res.name
          this.ruleForm.phone = res.phone
          if (res.role == 3) {
            this.isAdmin = true
            this.ruleForm.is_admin = 1
          } else {
            this.isAdmin = false
            this.ruleForm.is_admin = 0
          }
        }
      })
    },
    getParentData (row) {
      this.row = row
      this.getDetail(row.id)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            token: sessionStorage.getItem('token'),
            user_id: this.row.id,
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            is_admin: this.ruleForm.is_admin
          }
          updataUser(params).then(res => {
            if (res) {
              this.$message({
                message: '基本信息修改成功',
                type: 'success',
                duration: 1500
              });
              this.$emit('updateAll')
              this.handleClose()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      // this.$refs.ruleForm.resetFields()
      this.isAdmin = false
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

