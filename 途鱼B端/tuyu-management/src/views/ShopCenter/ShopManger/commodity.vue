<template>
  <div class="commodity_list">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 commodity_list_main">
      <el-form :model="searchFrom" ref="searchFrom" inline>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="searchFrom.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-select v-model="searchFrom.type" placeholder="请选择商品状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已上架" value="1"></el-option>
            <el-option label="已下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查 找</el-button>
          <el-button @click="resetForm('searchFrom')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-button type="primary" icon="el-icon-plus" @click="addCommodity">新 增</el-button>
      <el-button type="primary" @click="classifyRoute">分类管理</el-button>
      <el-table
        class="mt10"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column align="center" label="排序列表" prop="sort"></el-table-column>
        <el-table-column align="center" label="商品名称" prop="title"></el-table-column>
        <el-table-column align="center" label="商品分类" prop="cate_title"></el-table-column>
        <el-table-column align="center" label="状态" prop="status"></el-table-column>
        <el-table-column align="center" label="原价（元）" prop="title"></el-table-column>
        <el-table-column align="center" label="现价（元）" prop="title"></el-table-column>
        <el-table-column align="center" label="库存" prop="title"></el-table-column>
        <el-table-column align="center" label="销量" prop="title"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="text">查看</el-button>
            <el-button @click="handleClick(scope.row)" size="small" type="text">编辑</el-button>
            <el-button @click="handleClick(scope.row)" size="small" type="text">上架</el-button>
            <el-button @click="handleClick(scope.row)" size="small" type="text">下架</el-button>
            <el-button @click="handleDelete(scope.row)" size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { commodityList } from "@/api/shop/shop.js";
export default {
  data() {
    return {
      page: 1,
      pagesize: 10,
      searchFrom: {
        title: "",
        type: "0"
      },
      tableData: [],
      count: 0,
      loading: false,
    };
  },
  created () {
    this.getList()
  },
  methods: {
    classifyRoute () {
      this.$router.push('/shopcenter/shop-manger')
    },
    addCommodity () {

    },
    submitForm () {
      this.page = 1
      this.getList()
    },
    getList () {
      this.loading = true
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        title: this.searchFrom.title,
        type: this.searchFrom.type,
        token: sessionStorage.getItem('token')
      }
      commodityList(params).then(res => {
        console.log(res)
        if (res) {
          this.count = res.count
          this.tableData = [...res.list]
        }
        this.loading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.commodity_list {
  .commodity_list_main {
    border-top: 5px solid #f68b0e;
  }
}
</style>
