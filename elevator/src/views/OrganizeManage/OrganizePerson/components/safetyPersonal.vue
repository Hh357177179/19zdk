<template>
  <div class="safety">
    <el-drawer
      size="500px"
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
    >
    <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="change_input"
        >
        <el-form-item label="安全管理员证书" prop="idcard">
          <el-upload
            class="avatar-uploader"
            action="/admin/api/common/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="token"
          >
            <img v-if="imageUrl != 'http://dianti.zhaodaka.vip/'" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { searchPerson, updataSafety } from "@/api/organize/organize.js";
export default {
   props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑安全员信息"
    }
  },
  data () {
    return {
      imageUrl: '',
      direction: 'ltr',
      ruleForm: {
        manage_cert: ''
      },
      rules: {},
      token: {
        token: sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    getDetail (id) {
      let params = {
        token: sessionStorage.getItem('token'),
        user_id: id,
      }
      searchPerson(params).then(res => {
        console.log('详细',res)
        this.ruleForm.manage_cert = `${res.manage_cert}`
        this.imageUrl = `http://dianti.zhaodaka.vip/${res.manage_cert}`
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.manage_cert = `${res.data.url}`
    },
    submitForm () {
      let params = {
        token: sessionStorage.getItem('token'),
        user_id: this.row.id,
        cert: this.ruleForm.manage_cert
      }
      updataSafety(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '修改安全管理员证书成功',
            type: 'success',
            duration: 1500
          });
          this.$emit('updateAll')
          this.handleClose()
        }
      })
    },
    getParentData (row) {
      this.row = row
      this.getDetail(row.id)
    },
     handleClose() {
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
}
</script>


<style lang="less">
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
