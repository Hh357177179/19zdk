<template>
  <div class="organize_prty">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-zuzhiguanli"></span>
          <span>组织架构</span>
        </div>
      </div>
      <el-button
        class="mt40"
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="addDepartment('创建组织部门','refAddDep')"
      >创建组织部门</el-button>
    </el-card>
    <el-card class="mt10">
      <div class="mt10">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="{background:'#f0f0f0',color: '#666'}">
          <el-table-column align="center" prop="title" label="区域单位"></el-table-column>
          <el-table-column align="center" prop="parent_title" label="上属">
            <template slot-scope="scope">
              <p
                v-if="scope.row.parent_title == null || scope.row.parent_title == '' ||  scope.row.parent_title == 'null'"
              >—</p>
              <p v-else>{{scope.row.parent_title}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="areaText" label="所属区域">
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-plus" circle @click="addPerson(scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-edit" circle @click="editGroup('编辑组织部门', 'refAddDep', scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-delete" circle @click="deleteGroup(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix mt10">
        <el-pagination
          class="pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <AddDep ref="refAddDep" :visible.sync="addDepShow" :title="addDepTitle" @updateAll="updateAll"></AddDep>
  </div>
</template>

<script>
import AddDep from "./components/addDepDialog";
import { groupList, deleteGroups } from "@/api/organize/organize.js";
export default {
  data() {
    return {
      loading: false,
      addDepTitle: "",
      addDepShow: false,
      currentPage: 1,
      total: 0,
      tableData: [],
      page: 1,
      pagesize: 10
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addPerson (row) {
      console.log(row)
      this.$router.push(`/organize-person/${row.id}/${row.type}`)
    },
    deleteGroup(row) {
      this.$confirm("此操作将永久删除该组织, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: sessionStorage.getItem("token"),
            group_id: row.id
          };
          deleteGroups(params).then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500
              });
              this.page = 1;
              this.currentPage = 1;
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize
      };
      groupList(params).then(res => {
        console.log(res);
        res.list.forEach(list => {
          let arrs = []
          if (list.province != '' && list.province != "全部") {
            arrs.push(list.province)
          }
          if (list.city != '' && list.city != "全部") {
            arrs.push(list.city)
          }
          if (list.area != '' && list.area != "全部") {
            arrs.push(list.area)
          }
          list.areaText = arrs.join('—')
          if (list.province == '' && list.city == '' && list.area == '') {
            list.areaText = '—'
          }
        });
        this.total = res.count;
        this.tableData = res.list;
        this.loading = false;
      });
    },
    updateAll() {
      this.page = 1;
      this.currentPage = 1;
      this.getList();
    },
    editGroup (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row, 1);
      }
      this.addDepTitle = title;
      this.addDepShow = true;
    },
    addDepartment(title, ref) {
      this.addDepTitle = title;
      this.addDepShow = true;
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.pagesize = val;
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    }
  },
  components: { AddDep }
};
</script>

<style lang="less" scoped>
.organize_prty {
  .cards {
    position: relative;
    .titles {
      width: 100%;
      padding: 0 10px;
      height: 35px;
      background: #fdf6ec;
      color: #e6a23c;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .iconfont {
        margin-right: 10px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
