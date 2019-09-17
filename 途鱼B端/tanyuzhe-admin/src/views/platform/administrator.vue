<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="addAdmin('新增管理员', 'refAddAdmin')">添加管理员</el-button>
    <el-table v-loading="listLoading" :data="items" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户姓名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后登录ip">
        <template slot-scope="scope">
          {{ scope.row.last_ip }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后登录时间">
        <template slot-scope="scope">
          {{ scope.row.last_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">
            {{ scope.row.status == 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button :type="scope.row.status == 1 ? 'primary' : 'danger'" size="small" @click="handleEdit(scope.row)">{{scope.row.status == 1 ? '禁用' : '解除'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddDialog ref="refAddAdmin" :visible.sync="dialogVisible" :title="ModalTitle" @updateAll="updateAll"></AddDialog>
  </div>
</template>

<script>
import { getStaff, handleForbidden } from '@/api/user.js'
import { getToken } from '@/utils/auth.js'
import AddDialog from './components/addDialog'
export default {
  data () {
    return {
      items: [],
      listLoading: true,
      way: '',
      dialogVisible: false,
      ModalTitle: ''
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    updateAll () {
      this.getStaff()
    },
    // 添加管理员
    addAdmin (title, ref) {
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
     // 获取管理员列表
    async getStaff () {
      let params = { token: getToken() }
      const res = await getStaff(params)
      this.items = res
      this.listLoading = false
    },
    // 禁用-解禁
    handleEdit (row) {
      console.log(row)
      this.id = row.id
      if (row.status == 1) this.way = 'forbidden'
      else this.way = 'relieve'
      this.handleForbidden()
    },
    // 更改账号状态
    handleForbidden () {
      let params = {
        token: getToken(),
        id: this.id,
        way: this.way
      }
      handleForbidden(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '修改状态成功',
            type: 'success',
            duration: 1500
          });
          this.getStaff()
        }
      })
    }
  },
  components: { AddDialog }
}
</script>

<style lang="scss" scoped>
  .app-container{
    
  }
</style>
