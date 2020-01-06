<template>
  <div class="home" v-loading="loadings">
    <div id="container" :style="{ width: 100 + '%', height: mapHeight + 'px' }"></div>
    <div class="status_card">
      <div class="card_list" @click="normalClick" :class="colorIndex == 1 ? 'borter1' : ''">
        <p class="four card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_normal.png" alt>
        </p>
        <p class="card_text" style="color: #3a65e3;">正常</p>
        <p style="color: #3a65e3;" class="numbers">{{oneNum}}</p>
      </div>
      <div class="card_list" @click="aboutClick" :class="colorIndex == 2 ? 'borter2' : ''">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_warn.png" alt>
        </p>
        <p class="card_text" style="color: #eba945;">即将维保</p>
        <p style="color: #eba945;" class="numbers">{{twoNum}}</p>
      </div>
      <div class="card_list" @click="overdueClick" :class="colorIndex == 3 ? 'borter3' : ''">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_danger.png" alt>
        </p>
        <p class="card_text" style="color: #e95b56;">超期未保</p>
        <p style="color: #e95b56;" class="numbers">{{threeNum}}</p>
      </div>
    </div>
    <!-- 使用单位去完善 -->
    <el-dialog
      title="完善信息"
      :visible.sync="perfectDialogVisible"
      width="600px"
      :show-close="false"
      :before-close="perfecthandleClose"
    >
      <div style="padding: 0 100px;">
        <el-form
          :model="perfectUserFrom"
          :rules="rules"
          ref="perfectUserFrom"
        >
          <el-form-item prop="use_leader_name">
            <el-input v-model="perfectUserFrom.use_leader_name" clearable placeholder="使用单位法定代表人姓名"></el-input>
          </el-form-item>
          <el-form-item prop="use_leader_phone">
            <el-input v-model.number="perfectUserFrom.use_leader_phone" clearable maxlength="11" placeholder="使用单位法定代表人电话"></el-input>
          </el-form-item>
          <el-form-item prop="use_contact_name">
            <el-input v-model="perfectUserFrom.use_contact_name" clearable placeholder="电梯联系人姓名"></el-input>
          </el-form-item>
          <el-form-item prop="use_contact_phone">
            <el-input v-model.number="perfectUserFrom.use_contact_phone" clearable maxlength="11" placeholder="电梯联系人电话"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goPerfect" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 维保单位 -->
    <el-dialog
      title="完善信息"
      :visible.sync="wbDialogVisible"
      width="600px"
      :show-close="false"
      :before-close="wbhandleClose"
    >
      <div style="padding: 0 100px;">
        <el-form
          :model="wbFrom"
          :rules="wbRules"
          ref="wbFrom"
        >
          <el-form-item prop="maintain_group_address">
            <el-input v-model="wbFrom.maintain_group_address" clearable placeholder="维保单位地址"></el-input>
          </el-form-item>
          <el-form-item prop="maintain_group_credit_code">
            <el-input v-model="wbFrom.maintain_group_credit_code" clearable placeholder="维保单位社会信用代码"></el-input>
          </el-form-item>
          <el-form-item prop="maintain_group_license_number">
            <el-input v-model="wbFrom.maintain_group_license_number" clearable placeholder="维保许可证编号"></el-input>
          </el-form-item>
          <el-form-item prop="maintain_group_license_expire">
            <el-date-picker
              class="date_picker"
              v-model="wbFrom.maintain_group_license_expire"
              type="date"
              clearable
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="维保许可证有效期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="maintain_leader_name">
            <el-input v-model.number="wbFrom.maintain_leader_name" clearable placeholder="维保单位负责人姓名"></el-input>
          </el-form-item>
          <el-form-item prop="maintain_leader_phone">
            <el-input v-model.number="wbFrom.maintain_leader_phone" clearable placeholder="维保单位负责人电话"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goWb" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { useUnitInfo, weibaoUnitInfo } from '@/api/perfect/perfect.js'
import { getInfo } from "@/api/user/user.js";
import { areaList } from "@/minx/area.js";
import { getHomeList } from "@/api/home/home.js";
import AMap from "AMap"; // 引入高德地图
import { setTimeout } from "timers";
export default {
  mixins: [areaList],
  data() {
    return {
      wbDialogVisible: false,
      wbFrom: {
        maintain_group_address: '',
        maintain_group_credit_code: '',
        maintain_group_license_number: '',
        maintain_group_license_expire: '',
        maintain_leader_name: '',
        maintain_leader_phone: ''
      },
      wbRules: {
        maintain_group_address: [
          { required: true, message: '请输入维保单位地址', trigger: 'blur' },
        ],
        maintain_group_credit_code: [
          { required: true, message: '请输入维保单位社会信用代码', trigger: 'blur' },
        ],
        maintain_group_license_number: [
          { required: true, message: '请输入维保许可证编号', trigger: 'blur' },
        ],
        maintain_group_license_expire: [
          { required: true, message: '请选择维保许可证有效期', trigger: 'blur' },
        ],
        maintain_leader_name: [
          { required: true, message: '维保单位负责人姓名', trigger: 'blur' },
        ],
        maintain_leader_phone: [
          { required: true, message: '维保单位负责人电话', trigger: 'blur' },
        ]
      },
      perfectUserFrom: {
        use_leader_name: "",
        use_leader_phone: "",
        use_contact_name: "",
        use_contact_phone: ""
      },
      rules: {
        use_leader_name: [
          { required: true, message: '请输入使用单位法定代表人姓名', trigger: 'blur' },
        ],
        use_leader_phone: [
          { required: true, message: '请输入使用单位法定代表人电话', trigger: 'blur' },
          { type: 'number', message: '请输入正确手机号码'}
        ],
        use_contact_name: [
          { required: true, message: '请输入电梯联系人姓名', trigger: 'blur' },
        ],
        use_contact_phone: [
          { required: true, message: '请输入电梯联系人电话', trigger: 'blur' },
          { type: 'number', message: '请输入正确手机号码'}
        ]
      },
      perfectDialogVisible: false,
      loadings: false,
      colorIndex: 0,
      mapHeight: 0,
      value: [],
      province: "",
      city: "",
      area: "",
      map: null,
      geocoder: null,
      overlayGroups: null,
      marker: null,
      markers: [],
      viaMarker: null,
      allElevator: [],
      cluster: null,
      oneNum: '',
      twoNum: '',
      threeNum: ''
    };
  },
  created() {
    if (sessionStorage.getItem("type") == 3) {
      console.log("信息是否完整", sessionStorage.getItem("is_complete"));
      let statePer = sessionStorage.getItem("is_complete");
      if (statePer == 0) {
        this.perfectDialogVisible = true;
      } else {
        this.perfectDialogVisible = false;
      }
    } else if (sessionStorage.getItem("type") == 2) {
      let statePer = sessionStorage.getItem("is_complete");
      if (statePer == 0) {
        this.wbDialogVisible = true;
      } else {
        this.wbDialogVisible = false;
      }
    }
    this.getCoordinate(0);
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.mapHeight = h * 0.91;
  },
  mounted() {
    this.map = new AMap.Map("container", {
      center: [109.814257, 19.287232], //海口
      resizeEnable: true,
      zoom: 9
    });
    let province = sessionStorage.getItem("province");
    let city = sessionStorage.getItem("city");
    console.log(city);
    if (province != "海南省" && province != "") {
      this.map.setCity(city);
    }
  },
  methods: {
    wbhandleClose () {},
        // 获取用户信息
    userInfo () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getInfo(params).then(res => {
        console.log('获取管理员信息',res)
        sessionStorage.setItem("is_complete", res.is_complete)
        this.perfectDialogVisible = false
        this.wbDialogVisible = false
      })
    },
    goWb () {
      this.$refs.wbFrom.validate((valid) => {
          if (valid) {
            let params = {
              token: sessionStorage.getItem('token'),
              maintain_group_address: this.wbFrom.maintain_group_address,
              maintain_group_credit_code: this.wbFrom.maintain_group_credit_code,
              maintain_group_license_number: this.wbFrom.maintain_group_license_number,
              maintain_group_license_expire: this.wbFrom.maintain_group_license_expire,
              maintain_leader_name: this.wbFrom.maintain_leader_name,
              maintain_leader_phone: this.wbFrom.maintain_leader_phone,
            }
            console.log(params)
            weibaoUnitInfo(params).then(res => {
              console.log('认证返回',res)
              if (res) {
                this.$message({
                  message: '信息填写成功',
                  type: 'success'
                });
                this.userInfo()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    goPerfect() {
      this.$refs.perfectUserFrom.validate((valid) => {
          if (valid) {
            let params = {
              token: sessionStorage.getItem('token'),
              use_leader_name: this.perfectUserFrom.use_leader_name,
              use_leader_phone: this.perfectUserFrom.use_leader_phone,
              use_contact_name: this.perfectUserFrom.use_contact_name,
              use_contact_phone: this.perfectUserFrom.use_contact_phone
            }
            console.log(params)
            useUnitInfo(params).then(res => {
              console.log('认证返回',res)
              if (res) {
                this.$message({
                  message: '信息填写成功',
                  type: 'success'
                });
                this.userInfo()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    perfecthandleClose() {},
    normalClick() {
      this.$router.push({
        name: "elevatorInfo",
        params: {
          status: 1
        }
      });
    },
    aboutClick() {
      this.$router.push({
        name: "elevatorInfo",
        params: {
          status: 2
        }
      });
    },
    overdueClick() {
      this.$router.push({
        name: "elevatorInfo",
        params: {
          status: 3
        }
      });
    },
    addMarker(data) {
      const marker = new window.AMap.Marker({
        icon:
          data.type == 1
            ? "http://cdn.zhaodaka.cn/lift/lift_normal.png"
            : data.type == 2
            ? "http://cdn.zhaodaka.cn/lift/lift_warn.png"
            : "http://cdn.zhaodaka.cn/lift/lift_danger.png",
        position: [data.longitude, data.latitude]
      });
      marker.setMap(this.map);
      marker.type = data.type;
      // marker.id = data.id;
      marker.on("click", e => this.bindEvent(e, data));
      this.markers.push(marker);
    },
    getCoordinate(state) {
      this.loadings = true;
      let params = {
        token: sessionStorage.getItem("token"),
        province: this.province,
        city: this.city,
        area: this.area
      };
      getHomeList(params).then(res => {
        this.allElevator = res;
        console.log(res)
        let oneArr = []
        let twoArr = []
        let threeArr = []
        oneArr = res.filter(x => x.type == 1)
        console.log(oneArr)
        twoArr = res.filter(x => x.type == 2)
        threeArr = res.filter(x => x.type == 3)
        this.oneNum = oneArr.length
        this.twoNum = twoArr.length
        this.threeNum = threeArr.length
        res.forEach(ele => {
          this.addMarker(ele);
        });
        this.map.plugin(["AMap.MarkerClusterer"], () => {
          this.cluster = new AMap.MarkerClusterer(
            this.map, // 地图实例
            this.markers, // 海量点组成的数组
            {
              maxZoom: 12,
              styles: [
                {
                  url: "http://cdn.zhaodaka.cn/lift/marker-bg.png",
                  size: new AMap.Size(50, 50)
                }
              ]
            }
          );
        });
        this.loadings = false;
      });
    },
    bindEvent(e, data) {
      console.log(e, data);
      this.$router.push(`/place-detail/${data.id}`);
    },
    handleChange(value) {
      this.province = value[0];
      if (value.length == 2 && value[1] != "全部") {
        this.city = value[1];
      }
      if (value.length == 3 && value[2] != "全部") {
        this.city = value[1];
        this.area = value[2];
      } else if (value.length == 3 && value[2] == "全部") {
        this.city = value[1];
      }
      console.log(value);
      console.log(1, this.province, 2, this.city, 3, this.area);
    }
  },
  components: {
    /*regionData, CodeToText, TextToCode*/
  }
};
</script>

<style lang="less">
.home {
  .amap-icon img {
    width: 30px;
    height: 30px;
  }
  position: relative;
  .status_card {
    background: #fff;
    position: fixed;
    right: 30px;
    top: 80px;
    z-index: 2;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 15px 15px 5px;
    .card_list {
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      font-size: 13px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      .card_text {
        width: 52px;
        text-align: left;
        font-weight: bold;
      }
      .card_color {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .nowa_days_card {
    z-index: 4;
    padding: 15px 20px 5px;
    position: fixed;
    left: 235px;
    top: 80px;
    background: #fff;
    z-index: 2;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .days_title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
    }
    .days_list {
      margin-bottom: 10px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      cursor: pointer;
      .list_number {
        font-size: 15px;
        font-weight: bold;
        color: #333;
      }
      .label_width {
        width: 100px;
        margin-right: 20px;
      }
    }
  }
  .top_select {
    width: 100%;
    position: absolute;
    z-index: 3;
    top: 20px;
    left: 0;
    text-align: center;
    .choose_top {
      width: 250px;
      margin: 0 auto;
      .el-cascader {
        width: 100%;
      }
    }
  }
  .borter1 {
    border-color: rgb(58, 101, 227) !important;
  }
  .borter2 {
    border-color: rgb(235, 169, 69) !important;
  }
  .borter3 {
    border-color: rgb(233, 91, 86) !important;
  }
  .amap-marker-content > div {
    background-size: 100% 100% !important;
    font-size: 13px !important;
  }
  .perfect_title {
    color: #333;
    margin-bottom: 20px;
  }
  .perfect_list {
    margin-left: 50px;
    line-height: 30px;
  }
  .numbers{
    margin-left: 20px;
    min-width: 50px;
    text-align: center;
  }
  .date_picker{
    width: 100% !important;
  }
}
</style>
