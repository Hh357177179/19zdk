<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="addNode('添加节点', 'refAddNode')">添加节点</el-button>
    <el-table v-loading="listLoading" :data="items" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="节点名称" width="300px;">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点标识">
        <template slot-scope="scope">
          {{ scope.row.node }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px;">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddNode ref="refAddNode" :visible.sync="dialogVisible" :title="ModalTitle" @updateAll="updateAll"></AddNode>
  </div>
</template>

<script>
import { getInfo, deleteNode } from '@/api/user.js'
import { getToken } from '@/utils/auth.js'
import AddNode from './components/addNode'
export default {
  data () {
    return {
      listLoading: true,
      items: [],
      ModalTitle: '',
      dialogVisible: false
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    updateAll () {
      this.getInfo()
    },
    getInfo () {
      let params = {
        token: getToken()
      }
      getInfo(params).then(res => {
        console.log(res)
        this.items = res
        this.listLoading = false
      })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          token: getToken(),
          id: row.id
        }
        deleteNode(params).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getInfo()
          }
        })
      }).catch(() => {})
    },
    addNode (title, ref) {
      this.ModalTitle = title
      this.dialogVisible = true
    }
  },
  components: { AddNode }
}
</script>

<style lang="scss" scoped>
  
</style>

