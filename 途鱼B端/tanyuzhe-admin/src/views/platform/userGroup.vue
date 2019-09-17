<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="addUserGroup('新增用户组', 'refAddGroup')">添加用户组</el-button>
    <el-table v-loading="listLoading" :data="items" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户组名称" width="300px;">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px;">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleSearch(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddGroup ref="refAddGroup" :visible.sync="dialogVisible" :title="ModalTitle" @updateAll="updateAll"></AddGroup>
  </div>
</template>

<script>
import { getGroup, deleteGroup, authNodes } from '@/api/user.js'
import { getToken } from '@/utils/auth.js'
import AddGroup from './components/addGroup'
import { constants } from 'crypto';
export default {
  data () {
    return {
      listLoading: true,
      items: [],
      dialogVisible: false,
      ModalTitle: '',
      editVisible: false,
      editTitle: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleSearch (row) {
      console.log(row)
      this.$router.push({
        path: `/platform/editPage/${row.id}`
      })
    },
    // 删除用户组
    handleDelete (row) {
      this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          token: getToken(),
          id: row.id
        }
        deleteGroup(params).then(res => {
          console.log(res)
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          }
        })
      }).catch(() => {})
    },
    updateAll () {
      this.getList()
    },
    // 获取用户组列表
    getList () {
      let params = { token: getToken() }
      getGroup(params).then(res => {
        console.log(res)
        this.items = res
        this.listLoading = false
      })
    },
    addUserGroup (title, ref) {
      this.ModalTitle = title
      this.dialogVisible = true
    }
  },
  components: { AddGroup }
}
</script>

<style lang="sass">

</style>
