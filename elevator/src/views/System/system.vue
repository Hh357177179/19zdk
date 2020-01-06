<template>
  <div class="system">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-liucheng"></span>
          <span>系统设置</span>
        </div>
      </div>
      <div class="form_card">
        <el-form ref="form" inline :model="form" label-width="80px">
          <el-form-item label="app版本" class="inputs">
            <el-input v-model="form.version" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getConfig, setConfig} from '@/api/system/system.js'
export default {
  data () {
    return {
      form: {
        version: ''
      }
    }
  },
  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      let params = {
        token: sessionStorage.getItem("token"),
      }
      getConfig(params).then(res => {
        this.form.version = res.app_version
      })
    },
    onSubmit () {
      let params = {
        app_version: this.form.version,
        token: sessionStorage.getItem("token")
      }
      setConfig(params).then(res => {
        if (res) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    }
  }
}
</script>


<style lang="less">
.system {
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
    .form_card{
      margin-top: 40px;
    }
  }
}
</style>
