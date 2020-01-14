<template>
  <div class="organize_person">
    <el-card class="cards">
      <div class="titles">
        <div class="small_titles">
          <div class="back_prev" @click="backRouters">
            <i class="el-icon-back"></i>
            <span>上一页</span>
          </div>
          <span class="iconfont icon-yidongyunkongzhitaiicon45"></span>
          <span>角色管理</span>
        </div>
        <!-- <div class="rush el-icon-refresh-right"></div> -->
      </div>
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.keyword" clearable placeholder="请输入姓名或手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.role" placeholder="请选择角色" clearable>
            <el-option
              v-for="item in roleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="addPersonal('添加角色', 'refAddPer')"
      >添加角色</el-button>
      <div class="mt10">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="{background:'#f0f0f0',color: '#666'}">
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号码"></el-table-column>
          <!-- <el-table-column align="center" prop="date" label="所属单位"></el-table-column> -->
          <el-table-column align="center" prop="role" label="角色">
            <template slot-scope="scope">
              <div v-if="scope.row.role == 1">维保人员</div>
              <div v-if="scope.row.role == 2">安全员</div>
              <div v-if="scope.row.role == 3">管理员</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="资料">
            <template slot-scope="scope">
              <div class="card_list_person">
                <p v-if="scope.row.role == 3">—</p>
                <p v-if="scope.row.role == 2" @click="editSecurity('编辑安全员信息', 'refSecurity', scope.row)">
                  <i class="el-icon-document-add"></i>
                </p>
                <p v-if="scope.row.role == 1" @click="editMaintenance('编辑维保人员信息', 'refMaintenance', scope.row)">
                  <i class="el-icon-document-add"></i>
                </p>
                <p v-if="scope.row.role == 1" @click="personElevator('负责的电梯', 'refPersonElevator', scope.row)">
                  <i class="el-icon-s-platform"></i>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <!-- <el-button
                @click="searchDetail(scope.row)"
                type="primary"
                icon="el-icon-search"
                size="mini"
              >详情</el-button> -->
              <el-button circle size="mini" icon="el-icon-edit" @click="editPerson('编辑基本信息', 'refEditPer', scope.row)"></el-button>
              <el-button
                circle
                size="mini"
                icon="el-icon-delete"
                @click="deletePersonal(scope.row)"
              ></el-button>
              <el-button
                type
                size="small"
                icon="el-icon-refresh-left"
                @click="rushPerson(scope.row)"
                circle
              ></el-button>
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
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <AddPersonal
      ref="refAddPer"
      :visible.sync="addPerShow"
      :title="addPerTitle"
      @updateAll="updateAll"
    ></AddPersonal>
    <EditPersonal
      ref="refEditPer"
      :visible.sync="editPerShow"
      :title="editPerTitle"
      @updateAll="updateAll"
    ></EditPersonal>
    <EditMaintenance
      ref="refMaintenance"
      :visible.sync="editMainteShow"
      :title="editMainteTitle"
      @updateAll="updateAll"
    ></EditMaintenance>
    <SafetyPersonal
      ref="refSecurity"
      :visible.sync="safetyShow"
      :title="safetyTitle"
      @updateAll="updateAll"
    ></SafetyPersonal>
    <searchDialogPersonal
      ref="refPersonElevator"
      :visible.sync="personDialogShow"
      :title="personDialogTitle"
      @updateAll="updateAll"
    ></searchDialogPersonal>
  </div>
</template>

<script>
import AddPersonal from "./components/addPersonal";
import EditPersonal from "./components/editPersonal";
import EditMaintenance from './components/editMaintenance'
import SafetyPersonal from './components/safetyPersonal'
import searchDialogPersonal from './components/searchDialog'
import { getUserList, deletePerson, rushFeace } from "@/api/organize/organize.js";
export default {
  data() {
    return {
      safetyShow: false,
      safetyTitle: '',
      editMainteShow: false,
      editMainteTitle: '',
      editPerShow: false,
      editPerTitle: '',
      loading: false,
      addPerTitle: "",
      addPerShow: false,
      formInline: {
        role: "",
        keyword: ""
      },
      roleArr: [
        {
          value: "1",
          label: "维保人员"
        },
        {
          value: "2",
          label: "安全员"
        },
        {
          value: "3",
          label: "管理员"
        }
      ],
      currentPage: 1,
      total: 0,
      tableData: [],
      page: 1,
      pagesize: 10,
      groupId: "",
      types: '',
      personDialogShow: false,
      personDialogTitle: '',
      identityState: sessionStorage.getItem('type')
    };
  },
  created() {
    this.types = this.$route.params.type
    this.groupId = this.$route.params.id;
    this.getList();
  },
  methods: {
    backRouters () {
      this.$router.push({
        name: 'organizePrty',
        params: {
          page: sessionStorage.getItem('organizePage')
        }
      })
    },
    rushPerson (row) {
      console.log(row)
      let params = {
        token: sessionStorage.getItem('token'),
        user_id: row.id
      }
      rushFeace(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '清除人脸成功',
            type: 'success'
          });
        }
      })
    },
    personElevator (title, ref, row) {
      this.$refs[ref].getParentData(row);
      this.personDialogTitle = title;
      this.personDialogShow = true;
    },
    editMaintenance (title, ref, row) {
      this.$refs[ref].getParentData(row);
      this.editMainteTitle = title;
      this.editMainteShow = true;
    },
    editSecurity (title, ref, row) {
      this.$refs[ref].getParentData(row);
      this.safetyTitle = title;
      this.safetyShow = true;
    },
    editPerson (title, ref, row, ) {
      this.$refs[ref].getParentData(row);
      this.editPerTitle = title;
      this.editPerShow = true;
    },
    deletePersonal(row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: sessionStorage.getItem("token"),
            user_id: row.id
          };
          deletePerson(params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.page = 1;
              this.currentPage = 1
              this.getList();
            }
          }).catch(() => {});
        }).catch(() => {});
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize,
        group_id: this.$route.params.id,
        role: this.formInline.role,
        keyword: this.formInline.keyword
      };
      getUserList(params).then(res => {
        console.log(res);
        this.total = res.count;
        this.tableData = res.list;
        this.loading = false;
      });
    },
    addPersonal(title, ref) {
      this.$refs[ref].getParentData(this.groupId, this.types);
      this.addPerTitle = title;
      this.addPerShow = true;
    },
    updateAll() {
      this.page = 1;
      this.getList();
    },
    searchDetail(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.currentPage = 1;
      this.page = 1;
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = 1;
      this.getList();
    },
    onSubmit() {
      this.page = 1;
      this.currentPage = 1;
      this.getList();
    },
    handleClick(tab) {
      console.log(tab.name);
    }
  },
  components: { AddPersonal, EditPersonal, EditMaintenance, SafetyPersonal, searchDialogPersonal }
};
</script>

<style lang="less">
.organize_person {
  .card_list_person{
    display: flex;
    justify-content: space-around;
  }
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
      .small_titles{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .back_prev{
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .iconfont {
        margin-right: 10px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
    // .inputs{
    //   height: 32px;
    //   .el-input{
    //     height: 32px;
    //   }
    //   .el-input__inner{
    //     height: 100%;
    //   }
    //   .el-form-item__label{
    //     font-size: 12px;
    //   }
    // }
  }
  .el-card__body {
    padding: 10px;
  }
  .pagination {
    float: right;
  }
}
</style>
