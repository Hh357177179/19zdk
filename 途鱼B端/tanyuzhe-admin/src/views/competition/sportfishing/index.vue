<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="钓场名称">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所在城市">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="场主姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/competition/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [{
        id: 1,
        timestamp: '2016-05-02',
        author: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        timestamp: '2016-05-04',
        author: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        timestamp: '2016-05-01',
        author: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        timestamp: '2016-05-03',
        author: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
        this.listLoading = false
    //   })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
