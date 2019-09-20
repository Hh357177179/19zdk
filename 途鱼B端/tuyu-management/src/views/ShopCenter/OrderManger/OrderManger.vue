<template>
  <div class="order_manger">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 order_manger_main">
      <el-form ref="searchForm" inline :model="searchForm" label-width="80px">
        <el-form-item label="订单编号" class="items" prop="order_no">
          <el-input v-model="searchForm.order_no" placeholder="请输入订单编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" class="items" prop="goods_title">
          <el-input v-model="searchForm.goods_title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="express_phone" class="items">
          <el-input v-model="searchForm.express_phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="type" class="items">
          <el-select v-model="searchForm.type" placeholder="请选择订单状态" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间类型" prop="timeType" class="items">
          <el-select v-model="searchForm.timeType" placeholder="请选择时间类型" clearable>
            <el-option
              v-for="item in optionsTime"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="times" class="items">
          <el-date-picker
            v-model="searchForm.times"
            type="daterange"
            align="right"
            unlink-panels
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column align="center" label="订单编号" width="220" prop="order_no"></el-table-column>
        <el-table-column align="center" prop="goods_title" label="商品名称" width="220"></el-table-column>
        <el-table-column align="center" prop="create_time" label="下单时间" width="200">
          <template slot-scope="scope">
            <p>{{scope.row.create_time | fromDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="express_send_time" label="发货时间" width="200">
          <template slot-scope="scope">
            <p v-if="scope.row.express_send_time != ''">{{scope.row.express_send_time | fromDate}}</p>
            <p v-else>—</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="express_phone" label="手机号" width="150"></el-table-column>
        <el-table-column align="center" prop="coin_total" label="商品鱼币" width="120"></el-table-column>
        <el-table-column align="center" prop="express_state" label="订单状态">
          <template slot-scope="scope">
            <p>{{scope.row.express_state == 1 ? '已经货' : '未发货'}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.express_state == 1"
              @click="handleSearch('查看','refSearch',scope.row)"
              size="small"
              type="warning"
            >查看</el-button>
            <el-button
              v-else
              @click="handleSend('发货','refSend',scope.row)"
              size="small"
              type="primary"
            >发货</el-button>
            <el-button
              v-if="scope.row.role == 2"
              @click="handleAdd(scope.row)"
              size="small"
              type="primary"
            >添加钓场</el-button>
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
      <div class="clear"></div>
    </el-card>
    <SendDialog
      ref="refSend"
      :visible.sync="dialogVisible"
      :title="ModalTitle"
      @updateAll="updateAll"
    ></SendDialog>
    <SearchDialog
      ref="refSearch"
      :visible.sync="searchVisible"
      :title="ModalTitleSearch"
      @updateAll="updateAll"
    ></SearchDialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import SendDialog from "./components/sendDialog";
import SearchDialog from './components/searchDialog'
import { getOrderList } from "@/api/shop/shop.js";
export default {
  data() {
    return {
      ModalTitleSearch: '',
      searchVisible: false,
      ModalTitle: '',
      dialogVisible: false,
      tableData: [],
      count: 0,
      loading: false,
      page: 1,
      pagesize: 10,
      searchForm: {
        timeType: "",
        order_no: "",
        goods_title: "",
        express_phone: "",
        type: "",
        times: []
      },
      create_start_time: "",
      create_end_time: "",
      send_start_time: "",
      send_end_time: "",
      options: [
        {
          value: "1",
          label: "已发货"
        },
        {
          value: "2",
          label: "未发货"
        }
      ],
      optionsTime: [
        {
          value: "1",
          label: "下单时间"
        },
        {
          value: "2",
          label: "发货时间"
        }
      ],
      showPage: false
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
    handleSend (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row)
      }
      this.ModalTitle = title;
      this.dialogVisible = true;
    },
    updateAll () {
      this.getList()
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
        order_no: this.searchForm.order_no,
        goods_title: this.searchForm.goods_title,
        express_phone: this.searchForm.express_phone,
        type: this.searchForm.type,
        create_start_time: this.create_start_time,
        create_end_time: this.create_end_time,
        send_start_time: this.send_start_time,
        send_end_time: this.send_end_time,
        token: sessionStorage.getItem('token')
      };
      getOrderList(params)
        .then(res => {
          console.log(res);
          if (res.count > 10) {
            this.showPage = true;
          } else {
            this.showPage = false;
          }
          this.tableData = [...res.list];
          this.count = res.count;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submitForm() {
      this.page = 1;
      if (this.searchForm.times != null && this.searchForm.times.length != 0) {
        if (this.searchForm.timeType == 1) {
          this.create_start_time = this.searchForm.times[0];
          this.create_end_time = this.searchForm.times[1];
        } else if (this.searchForm.timeType == 2) {
          this.send_start_time = this.searchForm.times[0];
          this.send_end_time = this.searchForm.times[1];
        }
      } else {
        this.create_start_time = "";
        this.create_end_time = "";
        this.send_start_time = "";
        this.send_end_time = "";
      }
      console.log(this.searchForm.timeType);
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
  components: { Breadcrumb, SendDialog, SearchDialog }
};
</script>

<style lang="less">
.order_manger {
  width: 100%;
  height: 100%;
  .order_manger_main {
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

