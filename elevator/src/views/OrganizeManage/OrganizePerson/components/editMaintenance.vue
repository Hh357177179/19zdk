<template>
  <div class="edit_personal">
    <el-drawer
      size="500px"
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="edit_main">
        <el-scrollbar style="height: 100%;">
          <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="change_input"
        >
          <el-form-item label="身份证号码" prop="idcard">
            <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面" prop="idcard">
            <el-upload
              class="avatar-uploader"
              action="/admin/api/common/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="errorMessage"
              :data="token"
            >
              <img v-if="imageUrl != 'http://dianti.zhaodaka.vip/'" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证反面" prop="idcard">
            <el-upload
              class="avatar-uploader"
              action="/admin/api/common/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessT"
              :data="token">
              <img v-if="imageUrlT != 'http://dianti.zhaodaka.vip/'" :src="imageUrlT" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="维保资格证编号" prop="cert_no">
            <el-input v-model="ruleForm.cert_no" placeholder="请输入维保资格证编号"></el-input>
          </el-form-item>
          <el-form-item label="发证机关" prop="cert_unit">
            <el-input v-model="ruleForm.cert_unit" placeholder="请输入发证机关"></el-input>
          </el-form-item>
           <el-form-item label="维保资格证书" prop="cert">
            <el-upload
              class="avatar-uploader"
              action="/admin/api/common/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessW"
              :data="token">
              <img v-if="imageUrlW != 'http://dianti.zhaodaka.vip/'" :src="imageUrlW" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="2寸免冠照片" prop="photo">
            <el-upload
              class="avatar-uploader photo_pic"
              action="/admin/api/common/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessP"
              :data="token">
              <img v-if="imageUrlP != 'http://dianti.zhaodaka.vip/'" :src="imageUrlP" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        </el-scrollbar>
      </div>
      <div class="bottom_btn">
        <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
        <el-button class="list_btn" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { searchPerson, updataMaintenance } from "@/api/organize/organize.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑维保信息"
    }
  },
  data() {
    return {
      ruleForm: {
        idcard: "", // 身份证号码
        idcard_front: "", // 身份证正面照片地址
        idcard_back: "", // 身份证反面照片地址
        cert_no: "", //维保人员资格证书号码
        cert_unit: "", //发证机关
        cert: "", // 资格证书图片地址
        photo: "" //2寸人像照
      },
      rules: {},
      direction: "ltr",
      row: {},
      imageUrl: "",
      imageUrlT: "",
      imageUrlW: "",
      imageUrlP: "",
      detailObj: {},
      token: {
        token: sessionStorage.getItem('token')
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.idcard_front = `${res.data.url}`
    },
    handleAvatarSuccessT(res, file) {
      console.log(res)
      this.imageUrlT = URL.createObjectURL(file.raw);
      this.ruleForm.idcard_back = `${res.data.url}`
    },
     handleAvatarSuccessW(res, file) {
      console.log(res)
      this.imageUrlW = URL.createObjectURL(file.raw);
      this.ruleForm.cert = `${res.data.url}`
    },
    handleAvatarSuccessP(res, file) {
      this.imageUrlP = URL.createObjectURL(file.raw);
      this.ruleForm.photo = `${res.data.url}`
    },
    errorMessage (err) {
      console.log(err)
    },
    beforeAvatarUpload(file) {},
    submitForm() {
      let params = {
        token: sessionStorage.getItem("token"),
        user_id: this.row.id,
        idcard: this.ruleForm.idcard, // 身份证号码
        idcard_front: this.ruleForm.idcard_front, // 身份证正面照片地址
        idcard_back: this.ruleForm.idcard_back, // 身份证正面照片地址
        cert_no: this.ruleForm.cert_no, //维保人员资格证书号码
        cert_unit: this.ruleForm.cert_unit, //发证机关
        cert: this.ruleForm.cert, // 资格证书图片地址
        photo: this.ruleForm.photo //2寸人像照
      };
      console.log(params)
      updataMaintenance(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '维保人员信息修改成功',
            type: 'success',
            duration: 1500
          });
          this.$emit('updateAll')
          this.handleClose()
        }
      })
    },
    getDetail() {
      let params = {
        token: sessionStorage.getItem('token'),
        user_id: this.row.id
      }
      searchPerson(params).then(res => {
        console.log(res)
        this.ruleForm.idcard = res.maintain_idcard
        this.ruleForm.idcard_front = `${res.maintain_idcard_front}`
        this.ruleForm.idcard_back = `${res.maintain_idcard_back}`
        this.ruleForm.cert = `${res.maintain_cert}`
        this.ruleForm.photo = `${res.maintain_photo}`
        this.imageUrl = `http://dianti.zhaodaka.vip/${res.maintain_idcard_front}`
        this.imageUrlT = `http://dianti.zhaodaka.vip/${res.maintain_idcard_back}`
        this.imageUrlW = `http://dianti.zhaodaka.vip/${res.maintain_cert}`
        this.imageUrlP = `http://dianti.zhaodaka.vip/${res.maintain_photo}`
        this.ruleForm.cert_no = res.maintain_cert_no
        this.ruleForm.cert_unit = res.maintain_cert_unit
        this.detailObj = res
      })
    },
    getParentData(row) {
      console.log("接收", row);
      this.row = row;
      this.getDetail()
    },
    handleClose() {
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less">
.edit_main{
  height: 700px;
}
.change_input {
  width: 450px;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
.el-upload{
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 180px;
  display: block;
}
.photo_pic .el-upload{
  width: 50%;
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
