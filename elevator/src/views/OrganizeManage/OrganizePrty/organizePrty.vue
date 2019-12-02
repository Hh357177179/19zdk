<template>
  <div class="organize_prty">
    <el-card class="cards" :class="identityState != 1 ? 'padBot' : ''">
      <div class="titles">
        <div>
          <span class="iconfont icon-zuzhiguanli"></span>
          <span>组织架构</span>
        </div>
      </div>
      <el-form class="mt40" :inline="true" :model="formInline" size="small">
        <el-form-item>
          <el-input v-model="formInline.keyword" clearable placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.group_type" clearable placeholder="请选择单位类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size
            icon="el-icon-search"
            @click="onSubmit"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <el-button
        v-if="identityState == 1"
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="addDepartment('创建组织部门','refAddDep')"
      >创建组织部门</el-button>
      <el-button type="primary" icon="el-icon-download" size="small" @click="exportExcel">导 出</el-button>
      <div class="mt10">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading" :header-cell-style="{background:'#f0f0f0',color: '#666'}">
          <el-table-column align="center" prop="title" label="区域单位"></el-table-column>
          <el-table-column align="center" prop="parent_title" label="上属">
            <template slot-scope="scope">
              <p
                v-if="scope.row.parent_title == null || scope.row.parent_title == '' ||  scope.row.parent_title == 'null'"
              >—</p>
              <p v-else>{{scope.row.parent_title}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="areaText" label="所属区域">
          </el-table-column>
          <el-table-column align="center" label="单位类型">
            <template slot-scope="scope">
              <div v-if="scope.row.type == 1">监管单位</div>
              <div v-if="scope.row.type == 2">维保单位</div>
              <div v-if="scope.row.type == 3">使用单位</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-plus" circle @click="addPerson(scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-edit" v-if="identityState == 1" circle @click="editGroup('编辑组织部门', 'refAddDep', scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-delete" v-if="identityState == 1"  circle @click="deleteGroup(scope.row)"></el-button>
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
    <AddDep ref="refAddDep" :visible.sync="addDepShow" :title="addDepTitle" @updateAll="updateAll"></AddDep>
  </div>
</template>

<script>
import AddDep from "./components/addDepDialog";
import { groupList, deleteGroups } from "@/api/organize/organize.js";
export default {
  data() {
    return {
      options: [{
        value: '0',
        label: '全部'
      },{
        value: '1',
        label: '监管单位'
      },{
        value: '2',
        label: '维保单位'
      },{
        value: '3',
        label: '使用单位'
      }],
      loading: false,
      addDepTitle: "",
      addDepShow: false,
      currentPage: 1,
      total: 0,
      tableData: [],
      page: 1,
      pagesize: 10,
      identityState: sessionStorage.getItem('type'),
      formInline: {
        keyword: '',
        group_type: ''
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    exportExcel () {
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 100000,
        keyword: this.formInline.keyword,
        group_type: this.formInline.group_type
      };
      groupList(params).then(res => {
        if (res) {
          console.log('导出')
          res.list.forEach(list => {
          let arrs = []
          if (list.province != '' && list.province != "全部") {
            arrs.push(list.province)
          }
          if (list.city != '' && list.city != "全部") {
            arrs.push(list.city)
          }
          if (list.area != '' && list.area != "全部") {
            arrs.push(list.area)
          }
          list.areaText = arrs.join('—')
          if (list.province == '' && list.city == '' && list.area == '') {
            list.areaText = '—'
          }
          if (list.type == 1) {
            list.typeText = '监管单位'
          }
          if (list.type == 2) {
            list.typeText = '维保单位'
          }
          if (list.type == 3) {
            list.typeText = '使用单位'
          }
        });
          let list = []; //把data里的tableData存到list
          list = res.list.splice(1, res.list.length - 1)
          let dateTime = new Date();
          let y = dateTime.getFullYear();
          let m = dateTime.getMonth() + 1;
          let d = dateTime.getDate();
          let hh = dateTime.getHours();
          let mm = dateTime.getMinutes();
          let ss = dateTime.getSeconds();
          let time = `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../../excel/Export2Excel");
            const tHeader = [
              "区域单位",
              "上属",
              "所属区域",
              "单位类型",
            ];
            // 上面设置Excel的表格第一行的标题
            // const role = ''
            const filterVal = [
              "areaText",
              "parent_title",
              "areaText",
              "typeText"
            ];
            // 上面的index、nickName、name是tableData里对象的属性
            
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, `组织架构(${time})`);
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    onSubmit () {
      this.currentPage = 1
      this.page = 1
      this.getList()
    },
    addPerson (row) {
      console.log(row)
      this.$router.push(`/organize-person/${row.id}/${row.type}`)
    },
    deleteGroup(row) {
      this.$confirm("此操作将永久删除该组织, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: sessionStorage.getItem("token"),
            group_id: row.id
          };
          deleteGroups(params).then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500
              });
              this.page = 1;
              this.currentPage = 1;
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem("token"),
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.formInline.keyword,
        group_type: this.formInline.group_type
      };
      groupList(params).then(res => {
        console.log(213,res);
        res.list.forEach(list => {
          let arrs = []
          if (list.province != '' && list.province != "全部") {
            arrs.push(list.province)
          }
          if (list.city != '' && list.city != "全部") {
            arrs.push(list.city)
          }
          if (list.area != '' && list.area != "全部") {
            arrs.push(list.area)
          }
          list.areaText = arrs.join('—')
          if (list.province == '' && list.city == '' && list.area == '') {
            list.areaText = '—'
          }
        });
        this.total = res.count;
        this.tableData = res.list;
        this.loading = false;
      });
    },
    updateAll() {
      this.page = 1;
      this.currentPage = 1;
      this.getList();
    },
    editGroup (title, ref, row) {
      if (this.$refs[ref] && row) {
        this.$refs[ref].getParentData(row, 1);
      }
      this.addDepTitle = title;
      this.addDepShow = true;
    },
    addDepartment(title, ref) {
      this.$refs[ref].getParentData(null,2);
      this.addDepTitle = title;
      this.addDepShow = true;
    },
    handleSizeChange(val) {
      console.log("每页多少条", val);
      this.pagesize = val;
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("多少页", val);
      this.page = val;
      this.getList();
    }
  },
  components: { AddDep }
};
</script>

<style lang="less" scoped>
.organize_prty {
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
      .iconfont {
        margin-right: 10px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .padBot {
    padding-bottom: 15px;
  }
}
</style>