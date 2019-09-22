<template>
  <div class="vip_fish">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10" style="border-top: 5px solid #f68b0e;">
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
        <el-form-item class="items">
          <el-button type="primary" icon="el-icon-search" @click="submitForm('searchForm')">查 找</el-button>
          <el-button @click="resetForm('searchForm')" icon="el-icon-close">重 置</el-button>
          <el-button type="primary" icon="el-icon-download" @click="exportExcel">导 出</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column align="center" label="会员昵称" width="130" prop="nickname"></el-table-column>
        <el-table-column align="center" prop="card_no" label="会员卡号" width="200"></el-table-column>
        <el-table-column align="center" prop="name" label="会员姓名" width="150"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号" width="140"></el-table-column>
        <el-table-column align="center" prop="coin" label="鱼币数量"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit('编辑','refEdit',scope.row)" size="small" type="primary">编辑</el-button>
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
    <EditDialog
      ref="refEdit"
      :visible.sync="handleVisible"
      :title="HandleTitle"
      @updateAll="updateAll"
    ></EditDialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import EditDialog from "./components/editDialog";
import { getVipFish } from "@/api/fish/fish.js";
export default {
  data() {
    return {
      handleVisible: false,
      HandleTitle: "",
      searchForm: {
        name: "",
        phone: "",
        card_no: ""
      },
      page: 1,
      pagesize: 10,
      count: 0,
      loading: false,
      tableData: [],
      showPage: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    exportExcel() {
      let dateTime = new Date()
      let y = dateTime.getFullYear()
      let m = dateTime.getMonth() + 1
      let d = dateTime.getDate()
      let hh = dateTime.getHours()
      let mm = dateTime.getMinutes()
      let ss = dateTime.getSeconds()
      let time = `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../excel/Export2Excel');
        const tHeader = ['会员昵称', '会员卡号', '会员姓名', '会员手机号', '鱼币数量'];
        // 上面设置Excel的表格第一行的标题
        // const role = ''
        const filterVal = ['nickname', 'card_no', 'name', 'phone', 'coin'];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData;  //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, `会员鱼币(${time})`);
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    updateAll() {
      this.page = 1;
      this.getList();
    },
    handleEdit(title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row);
      }
      this.handleVisible = true;
      this.HandleTitle = title;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        name: this.searchForm.name,
        phone: this.searchForm.phone,
        card_no: this.searchForm.card_no,
        token: sessionStorage.getItem('token')
      };
      console.log(params);
      getVipFish(params).then(res => {
        console.log(res);
        if (res.count <= 10) {
          this.showPage = false;
        } else {
          this.showPage = true;
        }
        this.tableData = [...res.list];
        this.count = res.count;
        this.loading = false;
      });
    },
    submitForm() {
      this.page = 1;
      this.getList();
    },
    resetForm(formName) {
      this.searchForm.page = 1;
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.getList();
      });
    }
  },
  components: { Breadcrumb, EditDialog }
};
</script>

<style lang="less">
.vip_fish {
  .pagination {
    margin-top: 10px;
    float: right;
  }
}
</style>
