<template>
  <div class="user_group">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20">
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-right:20px;"
          @click="addGroup('新增用户组', 'refAddGroup')"
        >添加用户组</el-button>
      </div>
      <div class="mt10">
        <el-table
          v-loading="loadings"
          :data="items"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column align="center" prop="title" label="用户组名称"></el-table-column>
          <el-table-column align="center" prop="desc" label="用户组描述"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleSearch(scope.row)" size="small" type="primary">查看节点</el-button>
              <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <AddGroup
      ref="refAddGroup"
      :visible.sync="dialogVisible"
      :title="ModalTitle"
      @updateAll="updateAll"
    ></AddGroup>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getGroup, deleteGroups } from "@/api/user/user.js";
import AddGroup from "./components/AddGroup";
export default {
  data() {
    return {
      items: [],
      loadings: false,
      dialogVisible: false,
      ModalTitle: ""
    };
  },
  created() {
    this.loadings = true;
    this.getList();
  },
  methods: {
    handleSearch (row) {
      this.$router.push(`/platform/group-nodes/${row.id}`)
    },
    updateAll() {
      this.getList();
    },
    getList() {
      let params = {
        token: sessionStorage.getItem('token')
      };
      getGroup(params).then(res => {
        if (res) {
          this.items = [...res];
          console.log(res);
        }
        this.loadings = false;
      });
    },
    addGroup(title, ref) {
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { 
            id: row.id,
            token: sessionStorage.getItem('token') 
          };
          deleteGroups(params).then(res => {
            if (res) {
              this.$message({
                message: "删除用户组成功！",
                type: "success",
                duration: 2000
              });
              this.getList();
            }
          });
        })
        .catch(() => {});
    }
  },
  components: { Breadcrumb, AddGroup }
};
</script>

<style lang="less">
.user_group {
}
</style>
