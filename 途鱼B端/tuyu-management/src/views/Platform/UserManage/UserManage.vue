<template>
  <div class="user_manage">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20">
      <div>
        <el-button type="primary" icon="el-icon-plus" style="margin-right:20px;" @click="addUser('新增用户', 'refAddUser')">新增管理员</el-button>
      </div>
      <div class="mt10">
        <el-table
          v-loading="loadings"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column align='center' prop="username" label="用户名"></el-table-column>
          <el-table-column align='center' label="最后登录ip">
            <template slot-scope="scope">
              <span v-if="scope.row.last_ip == ''">—</span>
              <span v-else>{{scope.row.last_ip}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label="最后登录时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.last_time == 0">—</span>
              <span v-else>{{scope.row.last_time | fromDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">{{scope.row.status == 1 ? '正常' : '禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align='center' label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" size="small" type="primary">编辑</el-button>
              <el-button size="small" :type="scope.row.status == 1 ? 'danger' : 'warning'" @click="handleBidden(scope.row)">{{scope.row.status == 1 ? '禁用' : '解除'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <AddEdit ref="refAddUser" :visible.sync="dialogVisible" :title="ModalTitle" @updateAll="updateAll"></AddEdit>
    <el-dialog title="编辑管理员" :visible.sync="visibleUser" width="600px" :before-close="handleClose">
      <div class="dialog_main">
        <el-form ref="editForm" :model="editForm" label-width="90px">
          <el-form-item label="用户账户:" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="登录密码:">
            <el-input type="password" v-model="editForm.psw" placeholder="请输入密码（不填则不修改密码）"></el-input>
            <!-- <p class="psw_text">不填则不修改密码</p> -->
          </el-form-item>
          <el-form-item label="所在用户组">
            <el-select v-model="editForm.group" placeholder="请选择用户组">
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
        <el-button type="primary" @click="editUsers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import AddEdit from './components/AddEdit'
import { adminList, forBidden, getGroup, editAdmin } from '@/api/user/user.js'
export default {
  data() {
    return {
      item: [{ desc: "超级管理员组",id: 0,title: "超级管理员"}],
      options: [],
      dialogVisible: false,
      ModalTitle: '',
      tableData: [],
      loadings: false,
      visibleUser: false,
      editForm: {
        name: '',
        psw: '',
        group: ''
      },
      row: {}
    }
  },
  created () {
    this.getList()
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
    editUsers () {
      let params = {
        id: this.row.id,
        auth_id: this.editForm.group,
        password: this.editForm.psw,
        token: sessionStorage.getItem('token')
      }
      editAdmin(params).then(res => {
        if (res) {
          this.$message({
            message: '修改成功！',
            type: 'success',
            duration: 2000
          });
          this.handleClose()
          this.getList()
        }
      })
    },
    handleClose () {
      this.editForm.name = ''
      this.editForm.psw = ''
      this.editForm.group = ''
      this.visibleUser = false
    },
    // 禁用-解除
    handleBidden (row) {
      if (row.status == 1) this.forBiddens(row.id, 'forbidden')
      else  this.forBiddens(row.id, 'relieve')
    },
    forBiddens (id, way) {
      let params = {
        id: id,
        way: way,
        token: sessionStorage.getItem('token')
      }
      forBidden(params).then(res => {
        if (res) {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 2000
          });
          this.getList()
        }
      })
    },
    // 获取管理员列表
    getList () {
      this.loadings = true
      let params = {
        token: sessionStorage.getItem('token')
      }
      adminList(params).then(res => {
        if (res) {
          console.log(res)
          this.tableData = [...res]
        }
        this.loadings = false
      })
    },
    // 添加或编辑完成重新请求
    updateAll () {
      this.getList()
    },
    // 编辑
    handleClick (row) {
      console.log(row)
      this.row = row
      this.editForm.name = row.username
      this.editForm.group = row.auth_id
      this.$nextTick(() => {
        this.visibleUser = true
      })
    },
    // 新增
    addUser (title, ref) {
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
  },
  components: { Breadcrumb, AddEdit }
};
</script>

<style lang="less">
.user_manage {
  width: 100%;
  height: 100%;
  .user_main {
    border-top: 5px solid #f68b0e;
    .el-card__body{
      padding-bottom: 0;
    }
    .items {
      margin-right: 20px;
    }
  }
  .el-table td, .el-table th{
    padding: 8px 0;
  }
  .pagination{
    margin-top: 10px;
    float: right;
  }
  .dialog_main{
    padding: 0 50px;
    .psw_text{
      color: #ccc;
      font-size: 12px;
    }
    .el-select{
      width: 100%;
    }
  }
}
</style>
