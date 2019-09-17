<template>
  <div class="user_withdraw">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10" style='border-top: 5px solid #f68b0e;'>
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
        <el-form-item label="转账状态" prop="status" class="items">
          <el-select v-model="searchForm.status" placeholder="请选择转账状态" clearable>
            <el-option
              v-for="item in optionStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-button type="primary" icon="el-icon-search" @click="submitForm('searchForm')">查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
          <el-button type="primary" icon="el-icon-download">导 出</el-button>
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
      >
        <el-table-column align="center" label="会员姓名" width="130" prop="name"></el-table-column>
        <el-table-column align="center" prop="user_phone" label="手机号" width="140"></el-table-column>
        <el-table-column align="center" prop="user_card_no" label="会员卡号" width="200"></el-table-column>
        <el-table-column align="center" prop="user_role" label="会员身份" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.role == 1 ? '会员' : '钓场主'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="money" label="申请提现金额（元）" width="150"></el-table-column>
        <el-table-column align="center" prop="bank_code" label="提现银行卡号"  show-overflow-tooltip width="240"></el-table-column>
        <el-table-column align="center" prop="bank_name" label="所属银行" width="160"></el-table-column>
        <el-table-column align="center" prop="user_name" label="持卡人" width="140"></el-table-column>
        <el-table-column align="center" prop="status" label="转账状态" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">待转账</p>
            <p v-if="scope.row.status == 2">已转账</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick('处理','refHandle',scope.row)" size="small" type="primary" v-if="scope.row.status == 1">处理</el-button>
            <el-button @click="handleSearch('查看','refSearch',scope.row)" size="small" type="warning">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="showPage"
        class="pagination"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
      <div class="clear"></div>
    </el-card>
    <HadnleDialog ref="refHandle" :visible.sync="handleVisible" :title="HandleTitle" @updateAll="updateAll"></HadnleDialog>
    <SearchDialog ref="refSearch" :visible.sync="dialogVisible" :title="ModalTitle"></SearchDialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import SearchDialog from './components/searchDialog'
import HadnleDialog from './components/handleDialog'
import { withList } from "@/api/withdraw/withdraw.js";
export default {
  data() {
    return {
      HandleTitle: '',
      handleVisible: false,
      ModalTitle: '',
      dialogVisible: false,
      count: 0,
      loading: false,
      page: 1,
      pagesize: 10,
      optionStatus: [
        {
          value: "1",
          label: "待转账"
        },
        {
          value: "2",
          label: "已转账"
        }
      ],
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
      searchForm: {
        name: "",
        phone: "",
        card_no: "",
        role: "",
        status: ""
      },
      tableData: [],
      showPage: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    updateAll () {
      this.page = 1
      this.getList()
    },
    handleClick (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row);
      }
      this.handleVisible = true
      this.HandleTitle = title
    },
    handleSearch (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row);
      }
      this.dialogVisible = true
      this.ModalTitle = title
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    submitForm() {
      this.page = 1;
      this.getList();
      // console.log(this.searchForm)
    },
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        name: this.searchForm.name,
        phone: this.searchForm.phone,
        card_no: this.searchForm.card_no,
        role: this.searchForm.role,
        status: this.searchForm.status,
        token: sessionStorage.getItem('token')
      };
      console.log(params);
      withList(params).then(res => {
        if (res) {
          console.log(res);
          if (res.count > 10) {
            this.showPage = true;
          } else {
            this.showPage = false;
          }
          this.tableData = [...res.list];
          this.count = res.count
          this.loading = false;
        }
      });
    },
    resetForm(formName) {
      this.searchForm.page = 1;
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.getList();
      });
    }
  },
  components: { Breadcrumb, SearchDialog, HadnleDialog }
};
</script>

<style lang="less">
.user_withdraw {
   .pagination{
      margin-top: 10px;
      float: right;
    }
}
</style>
