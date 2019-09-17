<template>
  <div class="node_list">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20">
       <div>
        <el-button type="primary" icon="el-icon-plus" style="margin-right:20px;" @click="addNode">添加节点</el-button>
      </div>
      <div class="mt10">
        <el-table
          v-loading="loadings"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column align='center' prop="title" label="节点名称"></el-table-column>
          <el-table-column align='center' prop="node" label="节点标识"></el-table-column>
          <el-table-column align='center' label="操作">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.row)" size="small" type="primary">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="dialog_main">
        <el-form ref="addEditForm" :model="addEditForm" label-width="90px">
          <el-form-item label="节点名称:">
            <el-input v-model="addEditForm.name" placeholder="请输入节点名称"></el-input>
          </el-form-item>
          <el-form-item label="节点标识:">
            <el-input v-model="addEditForm.node" placeholder="请输入标识"></el-input>
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
import Breadcrumb from "@/components/Breadcrumb";
import { getNodeList, addNodes, deleteNodes } from '@/api/user/user.js'
export default {
  data () {
    return {
      loadings: false,
      tableData: [],
      visible: false,
      addEditForm: {
        name: '',
        node: ''
      }
    }
  },
  created () {
    this.loadings = true
    this.getList()
  },
  methods: {
    handleDelete (row) {
      let params = {
        id: row.id,
        token: sessionStorage.getItem('token')
      }
      deleteNodes(params).then(res => {
        console.log(res)
        this.getList()
      })
    },
    handleClose () {
      this.addEditForm.name = '',
      this.addEditForm.node = ''
      this.$nextTick(() => {
        this.visible = false
      });
    },
    getList () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getNodeList(params).then(res => {
        if (res) {
          console.log(res)
          this.tableData = [...res]
        }
        this.loadings = false
      })
    },
    addNode () {
      this.visible = true
    },
    submitAddEdit () {
      console.log(this.addEditForm)
      let params = {
        title: this.addEditForm.name,
        node: this.addEditForm.node,
        token: sessionStorage.getItem('token')
      }
      addNodes(params).then(res => {
        console.log(res)
        if (res) {
          this.getList()
        }
      })
    }
  },

  components: { Breadcrumb }
}
</script>
