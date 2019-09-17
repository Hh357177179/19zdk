<template>
  <div class="add_admin_dialog">
    <el-dialog :title="title" :visible.sync="visible" width="400px;" :before-close="handleClose" :close-on-click-modal="false">
      <div class="dialog_main">
        <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="管理员账号" prop="username">
            <el-input type="text" v-model="addForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="addForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="addForm.authId" @change="changeGroup" placeholder="请选择用户组">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGroup, addAdmin } from '@/api/user.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "新增管理员"
    }
  },
  
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入管理员账号'));
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.addForm.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      item: [{ desc: "超级管理员组",id: 0,title: "超级管理员"}],
      addForm: {
        username: '',
        password: '',
        checkPass: '',
        authId: ''
      },
      groups: [],
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGroupList()
  },
  methods: {
    changeGroup (e) {
      console.log(this.addForm)
    },
    // 获取用户组
    getGroupList () {
      let params = {}
      getGroup(params).then(res => {
        console.log(res)
        this.groups = [...this.item, ...res]
      })
    },
    // 关闭弹窗，直接修改父组件的属性
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$nextTick(() => {
        this.$emit('update:visible', false); // 直接修改父组件的属性
      })
      
    },
    // 调用父级方法
    getParentData (row) {
      console.log(row)
    },
    // 确认添加或修改
    submitAddEdit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          let params = {
            username: this.addForm.username,
            password: this.addForm.password,
            auth_id: this.addForm.authId
          }
          addAdmin(params).then(res => {
            console.log(res)
            if (res) {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.handleClose()
              this.$emit('updateAll')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .add_admin_dialog{
    .dialog_main{
      width: 500px;
      margin: 0 auto;
      .el-select{
        width: 100%;
      }
    }
  }
</style>