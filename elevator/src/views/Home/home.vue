<template>
  <div class="home" v-loading="loadings">
    <div id="container" :style="{ width: 100 + '%', height: mapHeight + 'px' }"></div>
    <div class="status_card">
      <div class="card_list" @click="normalClick" :class="colorIndex == 1 ? 'borter1' : ''">
        <p class="four card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_normal.png" alt>
        </p>
        <p class="card_text" style="color: #3a65e3;">正常</p>
      </div>
      <div class="card_list" @click="aboutClick" :class="colorIndex == 2 ? 'borter2' : ''">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_warn.png" alt>
        </p>
        <p class="card_text" style="color: #eba945;">即将维保</p>
      </div>
      <div class="card_list" @click="overdueClick" :class="colorIndex == 3 ? 'borter3' : ''">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_danger.png" alt>
        </p>
        <p class="card_text" style="color: #e95b56;">超期未保</p>
      </div>
    </div>
    <!-- <div class="nowa_days_card" @click="addOverlayGroup">
      <p class="days_title">今日维保工作</p>
      <div class="days_list">
        <span class="label_width">维保电梯数量</span>
        <span class="list_number">10</span>
      </div>
      <div class="days_list">
        <span class="label_width">维保打卡人数</span>
        <span class="list_number">10</span>
      </div>
      <div class="days_list">
        <span class="label_width">总维保工时</span>
        <span class="list_number">10</span>
    </div>-->
    <!-- </div> -->
    <!-- <div class="top_select">
      <div class="choose_top">
        <el-cascader
          v-model="value"
          clearable
          placeholder="请选择地区进行筛选"
          :options="options"
          @change="handleChange"
        ></el-cascader>
      </div>
    </div>-->
  </div>
</template>

<script>
// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { areaList } from "@/minx/area.js";
import { getHomeList } from "@/api/home/home.js";
import AMap from "AMap"; // 引入高德地图
import { setTimeout } from 'timers';
export default {
  mixins: [areaList],
  data() {
    return {
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
      cluster: null
    };
  },
  created() {
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
  },
  methods: {
    normalClick () {
      this.colorIndex = 1
      this.markers = []
      this.cluster.setMap(null);
      this.getCoordinate(1)
    },
    aboutClick () {
      this.colorIndex = 2
      this.markers = []
      this.cluster.setMap(null);
      this.getCoordinate(2)
    },
    overdueClick () {
      this.colorIndex = 3
      this.markers = []
      this.cluster.setMap(null);
      this.getCoordinate(3)
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
      this.loadings = true
      let params = {
        token: sessionStorage.getItem("token"),
        province: this.province,
        city: this.city,
        area: this.area
      };
      getHomeList(params).then(res => {
        if (state == 0) {
          this.allElevator = res
          res.forEach(ele => {
            this.addMarker(ele);
          });
          this.map.plugin(["AMap.MarkerClusterer"], () => {
            this.cluster = new AMap.MarkerClusterer(
              this.map, // 地图实例
              this.markers, // 海量点组成的数组
              {
                maxZoom: 12,
                styles: [{
                  url: "http://cdn.zhaodaka.cn/lift/marker-bg.png",
                  size: new AMap.Size(50, 50)
                }]
              }
            );
          });
            this.loadings = false
          return;
        } else if (state == 1) {
          res.forEach(ele => {
            if (ele.type == 1) {
              this.addMarker(ele);
            }
          });
          this.map.plugin(["AMap.MarkerClusterer"], () => {
            this.cluster = new AMap.MarkerClusterer(
              this.map, // 地图实例
              this.markers, // 海量点组成的数组
              {
                maxZoom: 12,
                styles: [{
                  url: "http://cdn.zhaodaka.cn/lift/marker-bg.png",
                  size: new AMap.Size(50, 50)
                }]
              }
            );
          });
          this.loadings = false
          return;
        } else if (state == 2) {
          res.forEach(ele => {
            if (ele.type == 2) {
              this.addMarker(ele);
            }
          });
          this.map.plugin(["AMap.MarkerClusterer"], () => {
            this.cluster = new AMap.MarkerClusterer(
              this.map, // 地图实例
              this.markers, // 海量点组成的数组
              {
                maxZoom: 12,
                styles: [{
                  url: "http://cdn.zhaodaka.cn/lift/marker-bg.png",
                  size: new AMap.Size(50, 50)
                }]
              }
            );
          });
            this.loadings = false
          return;
        }else if (state == 3) {
          res.forEach(ele => {
            if (ele.type == 3) {
              this.addMarker(ele);
            }
          });
          this.map.plugin(["AMap.MarkerClusterer"], () => {
            this.cluster = new AMap.MarkerClusterer(
              this.map, // 地图实例
              this.markers, // 海量点组成的数组
              {
                maxZoom: 12,
                styles: [{
                  url: "http://cdn.zhaodaka.cn/lift/marker-bg.png",
                  size: new AMap.Size(50, 50)
                }]
              }
            );
          });
            this.loadings = false
          return;
        }
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
      border-bottom: 1px solid rgba(0,0,0,0);
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
  .amap-marker-content > div{
    background-size: 100% 100% !important;
    font-size: 13px !important;
  }
}
</style>
