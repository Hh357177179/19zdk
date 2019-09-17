<template>
  <div class="add_edit">
    <el-dialog :title="title" :visible.sync="visible" width="600px" :before-close="handleClose">
      <div class="dialog_main">
        <el-form ref="addEditForm" :model="addEditForm" :rules="rules" label-width="90px">
          <el-form-item label="用户账户:" prop="name">
            <el-input v-model="addEditForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="登录密码:" prop="psw">
            <el-input type="password" v-model="addEditForm.psw" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="pswagain">
            <el-input type="password" v-model="addEditForm.pswagain" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="所在用户组" prop="group">
            <el-select v-model="addEditForm.group" placeholder="请选择用户组">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGroup, addAdmin } from '@/api/user/user.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "新增用户"
    }
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入账号名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addEditForm.pswagain !== "") {
          this.$refs.addEditForm.validateField("pswagain");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addEditForm.psw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validategGroup = (rule, value, callback) => {
      if (value.toString() == '') {
        callback(new Error('请选择用户组'))
      } else {
        callback()
      }
    }
    return {
      addEditForm: {
        name: "",
        psw: "",
        pswagain: "",
        group: ''
      },
      item: [{ desc: "超级管理员组",id: 0,title: "超级管理员"}],
      options: [],
      adminObj: {},
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        psw: [{ validator: validatePass, trigger: "blur" }],
        pswagain: [{ validator: validatePass2, trigger: "blur" }],
        group: [{ validator: validategGroup, trigger: 'change' }]
      }
    };
  },
  created () {
    this.getGroupList()
  },
  methods: {
     // 获取用户组列表
    getGroupList () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getGroup(params).then(res => {
        console.log('用户组',res)
        if (res) {
          this.options = [...this.item, ...res]
        }
      })
    },
    // 关闭弹窗，直接修改父组件的属性
    handleClose() {
      this.$refs.addEditForm.resetFields();
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    },
    // 调用父级方法
    getParentData(row) {
      console.log(row);
    },
    // 确认添加或修改
    submitAddEdit() {
      this.$refs.addEditForm.validate(valid => {
        if (valid) {
          let params = {
            username: this.addEditForm.name,
            password: this.addEditForm.psw,
            auth_id: this.addEditForm.group,
            token: sessionStorage.getItem('token')
          }
          console.log(params);
          addAdmin(params).then(res => {
            if (res) {
              this.$message({
                message: '添加管理员成功！',
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
.add_edit {
  .dialog_main {
    padding: 0 50px;
    .el-select{
      width: 100%;
    }
  }
}
</style>
