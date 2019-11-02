<template>
  <div class="calendar">
    <el-dialog :title="title" :visible.sync="visible" width="1100px" :before-close="handleClose">
      <el-table :data="tableData" style="width: 100%" border 
          :header-cell-style="{background:'#f0f0f0',color: '#666'}">
        <!-- <el-table-column prop="date" label="日期"></el-table-column> -->
        <el-table-column align="center" prop="user_name" label="上传人员姓名" width="150"></el-table-column>
        <el-table-column align="center" prop="maintain_type" label="维保类型" width="120"></el-table-column>
        <el-table-column align="center" width="100" label="内部电梯编号">
          <template slot-scope="scope">
            <div class="demo-image__preview">
                <el-image 
                  style="width: 30px; height: 30px;"
                  :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_number"
                  :preview-src-list="srcList">
                </el-image>
              </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="电梯厢桥内使用登机牌">
          <template slot-scope="scope">
             <div class="demo-image__preview">
                <el-image 
                  style="width: 30px; height: 30px;"
                  :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_plate"
                  :preview-src-list="srcList">
                </el-image>
              </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="机房主机">
          <template slot-scope="scope">
             <div class="demo-image__preview">
                <el-image 
                  style="width: 30px; height: 30px;"
                  :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_machine"
                  :preview-src-list="srcList">
                </el-image>
              </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="桥顶环境">
          <template slot-scope="scope">
            <div class="demo-image__preview">
                <el-image 
                  style="width: 30px; height: 30px;"
                  :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_top"
                  :preview-src-list="srcList">
                </el-image>
              </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="地坑环境">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image 
                style="width: 30px; height: 30px;"
                :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_bottom"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="维保记录单">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image 
                style="width: 30px; height: 30px;"
                :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_record"
                :preview-src-list="srcList"
                placeholder="ceshi">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" prop="address" label="合照">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image 
                style="width: 30px; height: 30px;"
                :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_group_photo"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="300" prop="maintain_time" label="维保时间周期">
          <template slot-scope="scope">
            <div>{{scope.row.sign_time | fromDate}}<span v-if="scope.row.maintain_time != ''">—</span>{{scope.row.maintain_time | fromDate}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="300" label="维保时间周期（分钟）">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 3">{{scope.row.minute}}</div>
            <div v-if="scope.row.status == 1 || scope.row.status == 2">—</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "人员详情"
    }
  },
  data() {
    return {
      tableData: [],
      srcList: []
    };
  },
  methods: {
    getParentData(row) {
      console.log("人员详情接收", row);
      row.minute = parseInt((row.maintain_time - row.sign_time) / 60)
      this.tableData.push(row)
      let urls = 'http://dianti.zhaodaka.vip'
      let elevator_number = urls + row.elevator_number
      let elevator_plate = urls + row.elevator_plate
      let elevator_machine = urls + row.elevator_machine
      let elevator_top = urls + row.elevator_top
      let elevator_bottom = urls + row.elevator_bottom
      let elevator_record = urls + row.elevator_record
      let elevator_group_photo = urls + row.elevator_group_photo
      this.srcList.push(elevator_number, elevator_plate, elevator_machine, elevator_top, elevator_bottom, elevator_record, elevator_group_photo)
      
    },
    handleClose() {
      this.tableData = []
      this.srcList = []
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-dialog__body {
  padding: 0 !important;
}
.tem_pic{
  width: 30px;
  height: 30px;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
