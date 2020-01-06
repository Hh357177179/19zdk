<template>
  <div class="calendar">
    <el-dialog :title="title" :visible.sync="visible" width="1200px" :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="维保类型" name="1">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{background:'#f0f0f0',color: '#666'}"
          >
            <el-table-column align="center" prop="maintain_type" label="维保类型" width="120"></el-table-column>
            <el-table-column
              align="center"
              prop="maintain_group_title"
              label="维保单位"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column align="center" prop="user_name" label="维保人员" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="是否人脸">
              <template slot-scope="scope">
                <div>{{scope.row.face_time > 0 ? '是' : '否'}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="人脸照片" width="120">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.face_url"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="maintain_type" label="维保开始时间" width="150">
              <template slot-scope="scope">
                <div>{{scope.row.sign_time | fromDate}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="maintain_type" label="维保结束时间" width="150">
              <template slot-scope="scope">
                <div>{{scope.row.maintain_time | fromDate}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" width="180" label="维保时间周期（分钟）">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 3">{{scope.row.minute}}</div>
                <div v-if="scope.row.status == 1 || scope.row.status == 2">—</div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="维保过程相片上传" name="2">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{background:'#f0f0f0',color: '#666'}"
          >
            <el-table-column align="center" label="内部电梯编号">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_number"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="电梯轿厢内使用登记牌">  
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_plate"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="机房主机">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_machine"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="轿顶环境">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_top"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="底坑环境">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_bottom"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="维保记录单">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_record"
                    :preview-src-list="srcList"
                    placeholder="ceshi"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="合照">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 30px; height: 30px;"
                    :src="'http://dianti.zhaodaka.vip' + scope.row.elevator_group_photo"
                    :preview-src-list="srcList"
                  >
                    <div slot="error" style="line-height: 30px;">暂无</div>
                  </el-image>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { detailLog } from "@/api/sign/sign.js";
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
      activeName: "1",
      tableData: [],
      srcList: [],
      row: {}
    };
  },
  methods: {
    searchImg(url) {
      window.open = url;
    },
    handleClick(val) {
      console.log(val);
    },
    getDetail() {
      let params = {
        token: sessionStorage.getItem("token"),
        elevator_id: this.row.elevator_id,
        handle_time: this.row.handle_time
      };
      detailLog(params).then(res => {
        console.log(res);
        let urls = "http://dianti.zhaodaka.vip";
        let arr = [];
        res.forEach(row => {
          row.minute = parseInt((row.maintain_time - row.sign_time) / 60);
          let elevator_number = row.elevator_number;
          let elevator_plate = row.elevator_plate;
          let elevator_machine = row.elevator_machine;
          let elevator_top = row.elevator_top;
          let elevator_bottom = row.elevator_bottom;
          let elevator_record = row.elevator_record;
          let elevator_group_photo = row.elevator_group_photo;
          let face_url = row.face_url;

          arr.push(
            face_url,
            elevator_number,
            elevator_plate,
            elevator_machine,
            elevator_top,
            elevator_bottom,
            elevator_record,
            elevator_group_photo
          );
        });
        arr.forEach(src => {
          if (src != "") {
            let str = urls + src;
            this.srcList.push(str);
          }
        });
        this.tableData = res;
      });
    },
    getParentData(row) {
      console.log("人员详情接收", row);
      this.row = row;
      this.getDetail();
    },
    handleClose() {
      this.tableData = [];
      this.srcList = [];
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
.search_img {
  cursor: pointer;
}
.tem_pic {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
