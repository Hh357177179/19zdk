<template>
  <div class="systemUser">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="应用名称" prop="app_name" class="inputs">
          <el-input v-model="ruleForm.app_name" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用版本号" prop="app_version" class="inputs">
          <el-input v-model="ruleForm.app_version" placeholder="请输入应用版本号"></el-input>
        </el-form-item>
        <el-form-item label="发放鱼币数量" prop="fish_coin" class="inputs">
          <el-input v-model="ruleForm.fish_coin" placeholder="请输入发放鱼币数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修 改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getSystem, setSystem } from "@/api/user/user.js";
export default {
  data() {
    return {
      ruleForm: {
        app_name: '',
        app_version: '',
        fish_coin: ''
      }
    };
  },
  created() {
    this.getSys();
  },
  methods: {
    getSys() {
      let params = {
        token: sessionStorage.getItem("token")
      };
      getSystem(params).then(res => {
        console.log(res);
        if (res) {
          this.ruleForm.app_name = res.app_name
          this.ruleForm.app_version = res.app_version,
          this.ruleForm.fish_coin = res.fish_coin
        }
      });
    },
    submitForm () {
      let params = {
        app_name: this.ruleForm.app_name,
        app_version: this.ruleForm.app_version,
        fish_coin: this.ruleForm.fish_coin,
        token: sessionStorage.getItem('token')
      }
      setSystem(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.getSys()
        }
      })
    }
  },
  components: { Breadcrumb }
};
</script>

<style lang="less" scoped>
  .inputs{
    width: 400px;
  }
</style>
