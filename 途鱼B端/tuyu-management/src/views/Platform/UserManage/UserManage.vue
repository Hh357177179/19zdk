<template>
  <div class="user_manage">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 user_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="用户姓名" prop="name" class="items">
          <el-input v-model="searchForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="time" class="items">
          <el-date-picker v-model="searchForm.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="items">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
            style="margin-right:20px;"
          >查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div>
        <el-button type="primary" icon="el-icon-plus" style="margin-right:20px;" @click="addUser('新增用户', 'refAddUser')">新 增</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteList">删 除</el-button>
      </div>
      <div class="mt10">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column align='center' type="selection"></el-table-column>
          <el-table-column align='center' label="用户账户" prop="name"></el-table-column>
          <el-table-column align='center' prop="name" label="用户姓名"></el-table-column>
          <el-table-column align='center' prop="address" label="账号类型" show-overflow-tooltip></el-table-column>
          <el-table-column align='center' prop="name" label="创建时间"></el-table-column>
          <el-table-column align='center' prop="name" label="创建人"></el-table-column>
          <el-table-column align='center' label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick('编辑用户', 'refAddUser', scope.row)" size="small" type="warning">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        background
        layout="total, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
      <div class="clear"></div>
    </el-card>
    <AddEdit ref="refAddUser" :visible.sync="dialogVisible" :title="ModalTitle" @updateAll="updateAll"></AddEdit>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import AddEdit from './components/AddEdit'
export default {
  data() {
    return {
      dialogVisible: true,
      ModalTitle: '',
      currentPage1: 1,
      counts: 0,
      searchForm: {
        name: "",
        time: ""
      },
      multipleSelection: [],
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    }
  },
  methods: {
    // 添加或编辑完成重新请求
    updateAll () {
      console.log('添加或编辑完成重新请求')
    },
    // 编辑
    handleClick (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row)
      }
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
    // 新增
    addUser (title, ref) {
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 查询
    submitForm(searchForm) {
      console.log(this.searchForm);
    },
    // 重置
    resetForm(searchForm) {
      this.$refs[searchForm].resetFields();
    },
    // 选中赋值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除
    deleteList () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请勾选删除项');
      } else {
        console.log(this.multipleSelection)
        this.$confirm('此操作将永久删除选中项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {});
      }
    }
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
}
</style>
