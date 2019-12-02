<template>
  <div class="home">
    <el-card>
      <el-alert title="报名列表" type="warning" :closable="false"></el-alert>
      <el-tabs v-model="activeName" class="mt20">
        <el-tab-pane label="用户基本信息" name="1">
          <el-table v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column show-overflow-tooltip label="填写时间" width="150">
              <template slot-scope="scope">
                <div>{{scope.row.create_time | fromDate}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" show-overflow-tooltip label="姓名" width="100"></el-table-column>
            <el-table-column prop="before_name" show-overflow-tooltip label="曾用名" width="100"></el-table-column>
            <el-table-column prop="sex" show-overflow-tooltip label="性别" width="100"></el-table-column>
            <el-table-column prop="lunar_date" show-overflow-tooltip label="阴历出生日期" width="130"></el-table-column>
            <el-table-column prop="solar_date" show-overflow-tooltip label="阳历出生日期" width="130"></el-table-column>
            <el-table-column prop="birth_time" show-overflow-tooltip label="出生时间" width="130"></el-table-column>
            <el-table-column prop="phones" show-overflow-tooltip label="手机号以及使用时长" width="180"></el-table-column>
            <el-table-column prop="height" show-overflow-tooltip label="身高(cm)" width="90"></el-table-column>
            <el-table-column prop="weight" show-overflow-tooltip label="体重(kg)" width="90"></el-table-column>
            <el-table-column prop="idcard" show-overflow-tooltip label="身份证号" width="150"></el-table-column>
            <el-table-column prop="number_plate" show-overflow-tooltip label="车牌号" width="120"></el-table-column>
            <el-table-column show-overflow-tooltip label="现住址" width="180">
              <template slot-scope="scope">
                <div>{{scope.row.now_province}}-{{scope.row.now_city}}-{{scope.row.now_area}}</div>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="出生地" width="180">
              <template slot-scope="scope">
                <div>{{scope.row.birth_province}}-{{scope.row.birth_city}}-{{scope.row.birth_area}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="job" show-overflow-tooltip label="从事行业" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="handleExport(scope.row)">导出</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="用户图片信息" name="2">
          <el-table v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column prop="face_left" show-overflow-tooltip label="面部左侧">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.face_left" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="face_front" show-overflow-tooltip label="面部正面">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.face_front" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="face_right" show-overflow-tooltip label="面部右侧">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.face_right" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="hand_left" show-overflow-tooltip label="左手照片">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.hand_left" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="hand_right" show-overflow-tooltip label="右手照片">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.hand_right" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="body_img" show-overflow-tooltip label="全身照片">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.body_img" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="tongue_img" show-overflow-tooltip label="舌诊照片">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.tongue_img" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="home_house_plan" show-overflow-tooltip label="家宅房型图">
              <template slot-scope="scope">
                <div class="imgs_list">
                  <img style="width: 30px; height: 30px" :src="scope.row.home_house_plan1" alt="">
                  <img style="width: 30px; height: 30px" :src="scope.row.home_house_plan2" alt="">
                  <img style="width: 30px; height: 30px" :src="scope.row.home_house_plan3" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="company_house_plan" show-overflow-tooltip label="办公室房型图">
              <template slot-scope="scope">
                <img style="width: 30px; height: 30px" :src="scope.row.company_house_plan" alt="">
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="handleExport(scope.row)">导出</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="clearfix mt20">
         <el-pagination
         style="float: right;"
         background 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </el-card>
    <!-- <div class="row" id="pdfDom" style="padding-top: 55px;background-color:#fff;">
    </div> -->
  </div>
</template>

<script>
import { getOrderList, searchOrder } from "@/api/index.js";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pagesize: 10,
      loading: false,
      count: 0,
      activeName: "1",
      currentPage: 1,
      srcList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange (val) {
      this.page = 1
      this.currentPage = 1
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    },
    handleClick (row) {
     let routeUrl = this.$router.resolve({
        path: "/detail",
        query: {id: `${row.id}`}
      });
      window.open(routeUrl.href, '_blank');
    },
    handleExport (row) {
      let routeUrl = this.$router.resolve({
        path: "/export",
        query: {id: `${row.id}`, state: '1'}
      });
      window.open(routeUrl.href, '_blank');
    },
    handleDetail (id) {
      let params = {
        token: sessionStorage.getItem('token'),
        order_id: id
      }
      searchOrder(params).then(res => {
        console.log(res)
      })
    },
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        token: sessionStorage.getItem("token")
      };
      getOrderList(params).then(res => {
          console.log(res);
          this.count = res.count;
          this.tableData = res.list;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
      });
    },
  }
};
</script>

<style lang="less">
  .detail_main{
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #ccc;
    min-height: 400px;
  }
  .imgs_list{
    display: flex;
    justify-content: space-around;
  }
</style>
