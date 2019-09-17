<template>
  <div class="add_group">
     <el-dialog :title="title" :visible.sync="visible" width="400px;" :before-close="handleClose" :close-on-click-modal="false">
      <div class="dialog_main">
        <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="60px" class="demo-ruleForm">
           <el-form-item label="名称" prop="title">
            <el-input type="text" v-model="addForm.title" autocomplete="off" placeholder="请输入用户组名称"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="addForm.desc" autocomplete="off" placeholder="请选择用户组描述"></el-input>
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
import { addGroup } from '@/api/user.js'
import { getToken } from '@/utils/auth.js'
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
    return {
      addForm: {
        title: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入用户组名称', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请选择用户组描述', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    // 关闭弹窗，直接修改父组件的属性
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$nextTick(() => {
        this.$emit('update:visible', false); // 直接修改父组件的属性
      })
    },
    // 确认添加或修改
    submitAddEdit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let params = {
            token: getToken(),
            title: this.addForm.title,
            desc: this.addForm.desc
          }
          addGroup(params).then(res => {
            console.log(res)
            if (res) {
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
  }
}
</script>

<style lang="scss" scoped>
  .add_group{
    .dialog_main{
      width: 500px;
      margin: 0 auto;
    }
  }
</style>

