<template>
  <div class="map">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-jieshao"></span>
          <span>电梯信息</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <el-form
        class="mt40"
        :model="ruleForm"
        inline
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="所在城市" prop="valText">
          <el-cascader
              size="small"
              v-model="ruleForm.valText"
              placeholder="请选择单位区域"
              :options="areaData"
              :props="{ expandTrigger: 'hover' }"
              disabled
            @change="handleChange"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="descText">
          <el-input size="small" placeholder="请输入详细地址" v-model="ruleForm.descText"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="searchClick">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt10">
      <div id="container" :style="{ width: 100 + '%', height: mapHeight + 'px' }"></div>
      <div class="bottom_btns mt20">
        <el-button type="info" @click="backRouter">返 回</el-button>
        <el-button type="primary" @click="trueBtn">确 定</el-button>
        <div class="clear"></div>
      </div>
    </el-card>
  </div>
</template>


<script>
import { areaList } from "@/minx/area.js";
import { updataLonLat, getDetails } from '@/api/elevator/elevator.js'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import AreaJson from "../../../data/area.json"
import AMap from "AMap";
export default {
  mixins: [areaList],
  data() {
    return {
      areaData: [],
      options: regionData,
      mapHeight: 0,
      ruleForm: {
        valText: [],
        descText: ""
      },
      params: {
        latitude: '',
        longitude: '',
      },
      rules: {},
      province: "",
      city: "",
      area: "",
      cityText: "",
      midText: "",
      map: null,
      geocoder: null,
      market: null
    };
  },
  created() {
    this.areaData = AreaJson
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.mapHeight = h * 0.65;
  },
  mounted: function() {
    this.map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 10
    });
    this.map.on('click', this.handleSelectLocation);
    this.geocoder = new window.AMap.Geocoder();
    this.map.on("complete",() => {
       console.log("地图加载完成！");  
       this.getDetail()
    });
  },
  methods: {
    getDetail () {
      let params = {
        token: sessionStorage.getItem('token'),
        elevator_id: this.$route.params.id
      }
      getDetails(params).then(res => {
        console.log(res)
        let provinceArr = []
        let cityArr = []
        let areaArr = []
        let placeArrs = []
        provinceArr = this.areaData.filter(pro => res.province == pro.label)
        let provinceCode = ''
        provinceCode = provinceArr[0].value
        cityArr = provinceArr[0].children.filter(cit => res.city == cit.label)
        let cityCode = ''
        cityCode = cityArr[0].value
        if (res.area != '') {
          areaArr = cityArr[0].children.filter(are => res.area == are.label)
          let areaCode = ''
          areaCode = areaArr[0].value
          placeArrs.push(provinceCode,cityCode,areaCode)
        } else {
          placeArrs.push(provinceCode,cityCode)
        }
        this.ruleForm.valText = placeArrs
        console.log(this.ruleForm.valText);
        let address = `${res.province}${res.city}${res.area}`
        this.midText = `${res.province}${res.city}${res.area}`
        // this.geoCode(address)
        // this.refreshMap(res.longitude, res.latitude)
        this.params.longitude = res.longitude
        this.params.latitude = res.latitude
        if (Number(res.longitude) == 0) {
          if (res.city != '洋浦经济开发区') {
            this.geoCode(address)
          } else {
            this.params.longitude = 109.184706
            this.params.latitude = 19.766825
          }
        }
        this.addMarker(this.params)
      })
    },
    trueBtn () {
      let params = {
        token: sessionStorage.getItem('token'),
        elevator_id: this.$route.params.id,
        longitude: this.params.longitude,
        latitude: this.params.latitude
      }
      updataLonLat(params).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            message: '位置更新成功',
            type: 'success'
          });
          this.$router.back()
        }
      })
    },
    backRouter () {
      this.$router.back()
    },
    handleChange(value) {
      // console.log(value)
      // console.log(this.areaData)
      // let provinceArr = []
      // let cityArr = []
      // let areaArr = []
      // provinceArr = this.areaData.filter(pro => value[0] == pro.value)
      // this.aeForm.province = provinceArr[0].label
      // cityArr = provinceArr[0].children.filter(cit => value[1] == cit.value)
      // this.aeForm.city = cityArr[0].label
      // areaArr = cityArr[0].children.filter(are => value[2] == are.value)
      // this.aeForm.area = areaArr[0].label

      // console.log(this.aeForm.province, this.aeForm.city, this.aeForm.area)
      
    },
    searchClick() {
      let address = `${this.midText}${this.ruleForm.descText}`;
      this.geoCode(address)
      console.log(address);
    },
    geoCode(address) {
      this.geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          const { lat, lng } = result.geocodes[0].location;
          this.params.latitude = lat;
          this.params.longitude = lng;
          console.log(result.geocodes[0].location)
          this.refreshMap(result.geocodes[0].location);
        } else {
          this.$message.error('根据地址查询位置失败');
        }
      });
    },
    addMarker(data) {
      this.marker = new window.AMap.Marker({
        icon:"http://cdn.zhaodaka.cn/lift/lift_normal.png",
        position: [data.longitude, data.latitude],
      });
      this.marker.setMap(this.map);
      this.map.add(this.marker);
      this.map.setFitView(this.market);
    },
    refreshMap(location) {
      if (!this.market) {
        this.market = new window.AMap.Marker();
        this.map.add(this.market);
      }
      this.market.setPosition(location);
      this.map.setFitView(this.market);
    },
    handleSelectLocation(location) {
      console.log(location)
      this.params.latitude = location.lnglat.lat
      this.params.longitude = location.lnglat.lng
      this.refreshMap(location.lnglat);
    },
  }
};
</script>

<style lang="less">
  .amap-icon img{
    width: 30px;
    height: 30px;
  }
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
  .el-form-item {
    margin-bottom: 0;
  }
}
.bottom_btns{
  width: 300px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  float: right;
  .el-button{
    width: 200px;
  }
}
</style>
