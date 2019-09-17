<template>
  <div class="add_edit">
    <el-dialog :title="title" :visible.sync="visible" width="600px" :before-close="handleClose">
      <div class="dialog_main">
        <el-form ref="addGroupForm" :model="addGroupForm" :rules="rules" label-width="120px">
          <el-form-item label="用户组名称:" prop="name">
            <el-input v-model="addGroupForm.name" placeholder="请输入用户组名称"></el-input>
          </el-form-item>
          <el-form-item label="用户组描述:" prop="desc">
            <el-input v-model="addGroupForm.desc" type="textarea" placeholder="请输入用户组描述"></el-input>
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
import { getGroup, addGroups } from '@/api/user/user.js'
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
    return {
      addGroupForm: {
        name: "",
        desc: ''
      },
       rules: {
          name: [
            { required: true, message: '请输入用户组名称', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入用户组描述', trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
    // 关闭弹窗，直接修改父组件的属性
    handleClose() {
      this.$refs.addGroupForm.resetFields();
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    },
    // 确认添加或修改
    submitAddEdit() {
      this.$refs.addGroupForm.validate(valid => {
        if (valid) {
          let params = {
            title: this.addGroupForm.name,
            desc: this.addGroupForm.desc,
            token: sessionStorage.getItem('token')
          }
          addGroups(params).then(res => {
            if (res) {
              this.$message({
                message: '添加用户组成功！',
                type: 'success',
                duration: 2000
              });
              this.$emit('updateAll')
              this.handleClose()
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
  }
}
</style>
