<template>
  <div class="member_center">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 member_center_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="姓名" prop="name" class="items">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="items">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="会员卡号" prop="card_no" class="items">
          <el-input v-model="searchForm.card_no" placeholder="请输入会员卡号" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role" class="items">
          <el-select v-model="searchForm.role" placeholder="请选择身份" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时段" prop="times" class="items">
          <el-date-picker
            v-model="searchForm.times"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="items">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
          >查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
          <!-- <el-button type="primary" icon="el-icon-download">导 出</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column align="center" type="selection"></el-table-column> -->
        <el-table-column align="center" label="会员昵称" width="130" prop="nickname"></el-table-column>
        <el-table-column align="center" prop="card_no" label="会员卡号" width="220"></el-table-column>
        <el-table-column align="center" prop="name" label="会员姓名" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号" width="200"></el-table-column>
        <el-table-column align="center" prop="create_time" label="注册时间" width="220"></el-table-column>
        <!-- <el-table-column align="center" prop="name" label="性别"></el-table-column> -->
        <!-- <el-table-column align="center" prop="role" label="会员等级"></el-table-column> -->
        <el-table-column align="center" prop="role" label="会员身份">
          <template slot-scope="scope">
            <span>{{scope.row.role == 1 ? '会员' : '钓场主'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="name" label="会员生日"></el-table-column> -->
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick('编辑','refEdit',scope.row)" size="small" type="warning">编辑</el-button>
            <el-button v-if="scope.row.role == 2" @click="handleAdd(scope.row)" size="small" type="primary">添加钓场</el-button>
            <el-button v-if="scope.row.role == 2" @click="searchFish(scope.row)" size="small" type="primary">查看钓场</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="showPage"
        class="pagination"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
      <div class="clear"></div>
    </el-card>
    <EditDialog
      ref="refEdit"
      :visible.sync="dialogVisible"
      :title="ModalTitle"
      @updateAll="updateAll"
    ></EditDialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { userList } from '@/api/vip/vip.js'
import EditDialog from './components/editDialog'
export default {
  data () {
    return {
      dialogVisible: false,
      ModalTitle: '',
      showPage: false,
      count: 0,
      loading: false,
      page: 1,
      pagesize: 10,
      options: [
        {
          value: "1",
          label: "会员"
        },
        {
          value: "2",
          label: "钓场主"
        }
      ],
      tableData: [],
      searchForm: {
        name: '',
        times: [],
        phone: '',
        card_no: '',
        role: ''
      },
      create_time_start: '',
      create_time_end: ''
    }
  },
  created () {
    this.loading = true
    this.getList()
  },
  methods: {
    searchFish (row) {
      this.$router.push({
        name: 'Sportfishing',
        params: {
          phone: row.phone
        }
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    updateAll () {
      this.page = 1
      this.count = 0
      this.getList()
    },
    handleClick (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row)
      }
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
      // 新增钓场
    handleAdd (row) {
      this.$router.push(`/competition/add-fish/${row.id}`)
    },
    submitForm () {
      this.page = 1
      this.getList()
    },
    getList () {
      console.log(this.searchForm.times)
      if (this.searchForm.times != null && this.searchForm.times.length != 0) {
        this.create_time_start = (this.searchForm.times[0] / 1000) 
        this.create_time_end = (this.searchForm.times[1] / 1000) 
      } else {
        this.create_time_start = ''
        this.create_time_end = ''
      }
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        name: this.searchForm.name,
        phone: this.searchForm.phone,
        card_no: this.searchForm.card_no,
        role: this.searchForm.role,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        token: sessionStorage.getItem('token')
      }
      console.log(params)
      userList(params).then(res => {
        console.log(res)
        if (res.count > 10) {
          this.showPage = true
        } else {
          this.showPage = false
        }
        this.tableData = [...res.list]
        this.count = res.count
        this.loading = false
      })
    },
    resetForm(formName) {
      this.searchForm.page = 1
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.getList()
      })
    },
    handleSelectionChange () {

    }
  },
  components: { Breadcrumb, EditDialog }
}
</script>

<style lang="less">
  .member_center{
    width: 100%;
    height: 100%;
    .member_center_main {
      border-top: 5px solid #f68b0e;
      .el-card__body {
        padding-bottom: 0;
      }
    }
    .el-table td,
    .el-table th {
      padding: 8px 0;
    }
    .pagination {
      margin-top: 10px;
      float: right;
    }
  }
</style>
