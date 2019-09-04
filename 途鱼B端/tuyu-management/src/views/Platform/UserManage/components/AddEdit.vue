<template>
  <div class="add_edit">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="dialog_main">
        <el-form ref="addEditForm" :model="addEditForm" label-width="90px">
          <el-form-item label="用户姓名:" prop="name">
            <el-input v-model="addEditForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="account">
            <el-input v-model="addEditForm.account" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="登录密码:" prop="psw">
            <el-input v-model="addEditForm.psw" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="pswagain">
            <el-input v-model="addEditForm.pswagain" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型:" prop="desc">
            <el-checkbox v-model="checked">管理员</el-checkbox>
          </el-form-item>
          <el-form-item label="管理权限:" prop="desc">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              v-model="addEditForm.menus"
              :props="defaultProps">
            </el-tree>
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
      menuArr: [],
      checked: false,
      data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1'
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      addEditForm: {
        name: '',
        account: '',
        psw: '',
        pswagain: '',
        userType: '',
        menus: []
      }
    };
  },
  methods: {
    // 关闭弹窗，直接修改父组件的属性
    handleClose () {
      this.$emit('update:visible', false); // 直接修改父组件的属性
    },
    // 调用父级方法
    getParentData (row) {
      console.log(row)
    },
    // 确认添加或修改
    submitAddEdit () {
      console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
      console.log(this.addEditForm)
      // this.$emit('updateAll')
      // this.handleClose()
    },
    
  }
};
</script>

<style lang="less">
  .add_edit{
    .dialog_main{
      padding: 0 100px;
    }
  }
</style>
