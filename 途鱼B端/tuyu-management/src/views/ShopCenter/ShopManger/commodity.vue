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
      <el-button type="primary" icon="el-icon-plus" @click="addCommodity">新增商品</el-button>
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
        <el-table-column align="center" label="商品名称" prop="title" width="500">
          <template slot-scope="scope">
            <div class="inline_card">
              <div>{{scope.row.title}}</div>
              <div>
                <p
                  style="display:flex;justify-content: space-between;"
                  v-for="(item, index) in scope.row.arr"
                  :key="index"
                >
                  <span class="span_right lists">
                    <span class>规格：</span>
                    {{item.spec_title}}
                  </span>
                  <span class="span_right lists">
                    <span>鱼币：</span>
                    {{item.price}}
                  </span>
                  <span class="span_right lists">库存：{{item.stock}}</span>
                  <span class="lists">销量：{{item.sold}}</span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品分类" prop="cate_title"></el-table-column>
        <el-table-column align="center" label="状态" prop="status">
          <template slot-scope="scope">
            <p>{{scope.row.status == 1 ? "已上架" : "已下架"}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleSearch('查看商品', 'refSearch', scope.row)" size="small" type="text">查看</el-button>
            <el-button @click="handleClick(scope.row)" size="small" type="text">编辑</el-button>
            <el-button
              v-if="scope.row.status == 0"
              @click="handleUp(scope.row)"
              size="small"
              type="text"
            >上架</el-button>
            <el-button
              v-if="scope.row.status == 1"
              @click="handleDown(scope.row)"
              size="small"
              type="text"
            >下架</el-button>
            <el-button @click="handleDelete(scope.row)" size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="showPage"
        class="pagination"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
    </el-card>
    <SearchDialog
      ref="refSearch"
      :visible.sync="searchVisible"
      :title="ModalTitleSearch"
    ></SearchDialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import SearchDialog from './components/searchDialog'
import {
  commodityList,
  downShop,
  upShop,
  deleteShop
} from "@/api/shop/shop.js";
export default {
  data() {
    return {
      ModalTitleSearch: '',
      searchVisible: false,
      showPage: false,
      count: 0,
      page: 1,
      pagesize: 10,
      searchFrom: {
        title: "",
        type: "0"
      },
      tableData: [],
      count: 0,
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSearch (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row)
      }
      this.ModalTitleSearch = title;
      this.searchVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: row.id,
            token: sessionStorage.getItem("token")
          };
          deleteShop(params).then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500
              });
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    handleUp(row) {
      let params = {
        id: row.id,
        token: sessionStorage.getItem("token")
      };
      console.log(params);
      upShop(params).then(res => {
        if (res) {
          this.$message({
            message: "成功上架",
            type: "success",
            duration: 1500
          });
          this.getList();
        }
      });
    },
    handleDown(row) {
      let params = {
        id: row.id,
        token: sessionStorage.getItem("token")
      };
      downShop(params).then(res => {
        if (res) {
          this.$message({
            message: "成功下架",
            type: "success",
            duration: 1500
          });
          this.getList();
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    classifyRoute() {
      this.$router.push("/shopcenter/shop-manger");
    },
    addCommodity() {
      this.$router.push("/shopcenter/add-shops");
    },
    handleClick (row) {
      this.$router.push(`/shopcenter/edit-shops/${row.id}`)
    },
    submitForm() {
      this.page = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        title: this.searchFrom.title,
        type: this.searchFrom.type,
        token: sessionStorage.getItem("token")
      };
      commodityList(params).then(res => {
        console.log(res);
        if (res.count > 10) {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
        res.list.forEach(element => {
          element.arr = JSON.parse(element.specs);
        });
        this.tableData = [...res.list];
        this.count = res.count;
        this.loading = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.getList();
      });
    }
  },
  components: { Breadcrumb, SearchDialog }
};
</script>

<style lang="less">
.commodity_list {
  .commodity_list_main {
    border-top: 5px solid #f68b0e;
  }
  .inline_card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .span_right {
      margin-right: 30px;
    }
    .lists {
      text-align: left;
    }
  }
}
</style>
