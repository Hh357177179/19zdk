<template>
  <div class="edit_dialog">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="edit_card">
        <p class="card_title">会员卡信息</p>
        <div class="card_main">
          <p>会员卡号：{{cardInfo.card_no}}</p>
          <p>注册时间：{{cardInfo.create_time}}</p>
        </div>
      </div>
      <div class="edit_card">
        <p class="card_title">基本信息</p>
        <div class="card_main card_two">
          <div class="card_main_list">
            <el-form ref="userForm" :model="userForm" :rules="rules" label-width="90px">
              <el-form-item label="会员昵称:" prop="nickname" class="input_item">
                <el-input v-model="userForm.nickname" placeholder="请输入会员昵称"></el-input>
              </el-form-item>
              <el-form-item label="会员姓名:" prop="name" class="input_item">
                <el-input v-model="userForm.name" placeholder="请输入会员姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:" prop="phone" class="input_item">
                <el-input maxlength="11" v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="bank">
            <el-form ref="bankFrom" :model="bankFrom" :rules="bankRule" label-width="90px">
              <el-form-item label="银行卡号:" prop="bank_code" class="input_item">
                <el-input v-model="bankFrom.bank_code" placeholder="提现银行卡"></el-input>
              </el-form-item>
              <el-form-item label="所属银行:" prop="bank_name" class="input_item">
                <el-input v-model="bankFrom.bank_name" placeholder="所属银行"></el-input>
              </el-form-item>
              <el-form-item label="持卡人:" prop="name" class="input_item">
                <el-input v-model="bankFrom.name" placeholder="持卡人"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="edit_card">
        <p class="card_title">会员身份</p>
        <div class="card_main">
          <el-radio-group v-model="userForm.role">
            <el-radio :label="1">会员</el-radio>
            <el-radio :label="2">钓场主</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <!-- <el-button type="primary" @click="submitAll">保存用户信息和银行卡信息</el-button> -->
        <el-button type="primary" @click="submitAddEdit">保存用户信息</el-button>
        <el-button type="primary" @click="submitBlank">保存银行卡信息</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userGet, userBank, userUpdate, userBankUpdate } from "@/api/vip/vip.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑用户"
    }
  },
  data() {
    return {
      row: {},
      userInfo: {},
      cardInfo: {},
      bankFrom: {
        bank_code: "",
        bank_name: "",
        name: ""
      },
      userForm: {
        nickname: "",
        name: "",
        phone: "",
        role: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入会员昵称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      bankRule: {
        name: [{ required: true, message: "请输入持卡人姓名", trigger: "blur" }],
        bank_name: [{ required: true, message: "请输入所属银行", trigger: "blur" }],
        bank_code: [{ required: true, message: "请输入银行卡号", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.userForm.resetFields();
      this.$refs.bankFrom.resetFields();
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    },
    // 获取用户信息
    userGetList(id) {
      let params = {
        id: id,
        token: sessionStorage.getItem('token')
      };
      userGet(params).then(res => {
        console.log(res);
        this.cardInfo = res;
        this.userForm.nickname = res.nickname;
        this.userForm.name = res.name;
        this.userForm.phone = res.phone;
        this.userForm.role = res.role;
      });
    },
    // 获取基本信息
    getUserInfos(id) {
      let params = {
        user_id: id,
        token: sessionStorage.getItem('token')
      };
      userBank(params).then(res => {
        this.userInfo = res;
        this.bankFrom.bank_code = res.bank_code;
        this.bankFrom.bank_name = res.bank_name;
        this.bankFrom.name = res.name;
      });
    },
    getParentData(row) {
      this.row = row;
      this.userGetList(row.id);
      this.getUserInfos(row.id);
    },
    submitBlank () {
      this.$refs.bankFrom.validate(valid => {
        if (valid) {
          let params = {
            user_id: this.row.id,
            name: this.bankFrom.name,
            bank_name: this.bankFrom.bank_name,
            bank_code: this.bankFrom.bank_code,
            token: sessionStorage.getItem('token')
          }
          console.log(params)
          userBankUpdate(params).then(res => {
            if (res) {
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: 2000
              });
              this.handleClose()
              this.$emit('updateAll')
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitAddEdit() {
      console.log(this.userForm);
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            id: this.row.id,
            nickname: this.userForm.nickname,
            name: this.userForm.name,
            phone: this.userForm.phone,
            role: this.userForm.role,
            token: sessionStorage.getItem('token')
          }
          console.log(params)
          userUpdate(params).then(res => {
            if (res) {
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: 2000
              });
              this.handleClose()
              this.$emit('updateAll')
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.edit_dialog {
  .el-dialog__body {
    padding: 10px 20px;
  }
  .edit_card {
    margin-bottom: 20px;
    .card_title {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
    .card_main {
      margin-left: 80px;
      // font-size: 16px;
      p {
        margin-top: 10px;
      }
    }
    .card_two {
      display: flex;
      justify-content: space-between;
      margin-left: 60px;
      padding-right: 30px;
      .card_main_list {
        width: 300px;
      }
      .bank {
        width: 300px;
      }
    }
  }
}
</style>
