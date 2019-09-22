<template>
  <div class="sport_fishing">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 sport_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="钓场名称" class="items" prop="title">
          <el-input v-model="searchForm.title" placeholder="请输入钓场名称"></el-input>
        </el-form-item>
        <el-form-item label="所在地" class="items" prop="province">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="场主姓名" class="items" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入场主姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" class="items">
          <el-input v-model="searchForm.phone" placeholder="请输入联系方式"></el-input>
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
      <div class="mt10">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          v-loading="loading"
        >
          <!-- <el-table-column align='center' type="selection"></el-table-column> -->
          <el-table-column align="center" label="钓场名称" prop="title"></el-table-column>
          <el-table-column align="center" prop="name" label="所在城市">
            <template slot-scope="scope">
              <span>{{scope.row.province}}-{{scope.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="场主姓名"></el-table-column>
          <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleSearch('refSearch',scope.row)" size="small" type="primary">查看</el-button>
              <el-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="showPage"
        class="pagination"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
      <div class="clear"></div>
    </el-card>
    <SearchDialog ref="refSearch" :visible.sync="dialogVisible" title="钓场详情"></SearchDialog>
  </div>
</template>

<script>
import { fishList, deleteFish } from "@/api/fish/fish.js";
import Breadcrumb from "@/components/Breadcrumb";
import SearchDialog from "./components/detailDialog";
import {
  provinceAndCityDataPlus,
  CodeToText,
  provinceAndCityData
} from "element-china-area-data";
export default {
  data() {
    return {
      options: provinceAndCityData,
      selectedOptions: [],
      showPage: false,
      total: 0,
      page: 1,
      pagesize: 10,
      searchForm: {
        title: "",
        province: "",
        city: "",
        name: "",
        phone: ""
      },
      tableData: [],
      dialogVisible: false,
      titles: "",
      addVisible: true
    };
  },
  created() {
    if (this.$route.params.phone) {
      this.searchForm.phone = this.$route.params.phone
    }
    this.getList();
  },
  methods: {
    handleEdit (row) {
      this.$router.push(`/competition/edit-fish/${row.id}`)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该钓场, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        let params = {
          id: row.id,
          token: sessionStorage.getItem('token')
        }
        deleteFish(params).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          }
        })
      })
      .catch(() => {});
    },
    handleChange(value) {
      let arr = [];
      value.forEach(element => {
        arr.push(CodeToText[element]);
      });
      this.searchForm.province = arr[0];
      this.searchForm.city = arr[1];
    },
    handleSearch(ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row);
      }
      this.dialogVisible = true;
    },
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        title: this.searchForm.title,
        province: this.searchForm.province,
        city: this.searchForm.city,
        name: this.searchForm.name,
        phone: this.searchForm.phone,
        token: sessionStorage.getItem('token')
      };
      console.log(params);
      fishList(params).then(res => {
        if (res) {
          console.log(res);
          if (res.count <= 10) {
            this.showPage = false;
          } else {
            this.showPage = true;
          }
          this.total = res.count;
          this.tableData = [...res.list];
        }
        this.loading = false;
      });
    },
    submitForm() {
      console.log(this.searchForm);
      this.searchForm.page = 1;
      this.getList();
    },
    resetForm(formName) {
      this.selectedOptions = [];
      this.searchForm.city = "";
      this.$refs[formName].resetFields();
      this.searchForm.phone = '';
      this.searchForm.page = 1;
      this.$nextTick(() => {
        this.getList();
      });
    }
  },
  components: { Breadcrumb, SearchDialog }
};
</script>

<style lang="less">
.sport_fishing {
  width: 100%;
  height: 100%;
  .sport_main {
    border-top: 5px solid #f68b0e;
    .el-card__body {
      padding-bottom: 0;
    }
    .items {
      margin-right: 20px;
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

