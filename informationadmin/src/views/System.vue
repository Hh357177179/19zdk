<template>
  <div class="system">
    <el-card>
      <el-alert title="系统配置" type="warning" :closable="false"></el-alert>
      <el-form class="mt20" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="跳转地址" prop="jump_url" class="inputs">
          <el-input v-model="ruleForm.jump_url" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSystem, saveSystem } from "../api/index.js";
export default {
  data() {
    return {
      ruleForm: {
        jump_url: ""
      },
      rules: {
        jump_url: [
          { required: true, message: '请输入跳转地址', trigger: 'blur' }
        ],
      }
    };
  },
  created () {
    this.getSystemSet()
  },
  methods: {
    getSystemSet () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getSystem(params).then(res => {
        console.log(res)
        this.ruleForm.jump_url = res.jump_url
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              token: sessionStorage.getItem('token'),
              jump_url: this.ruleForm.jump_url
            }
            saveSystem(params).then(res => {
              console.log(res)
              if (res) {
                this.$message({
                  message: '修改系统配置成功',
                  type: 'success'
                });
                this.getSystemSet()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
};
</script>

<style lang="less">
.inputs {
  width: 400px;
}
</style>
