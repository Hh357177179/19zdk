<template>
  <div class="home">
    <div id="container" :style="{ width: 100 + '%', height: mapHeight + 'px' }"></div>
    <div class="status_card">
      <div class="card_list">
        <p class="four card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_normal.png" alt="">
        </p>
        <p class="card_text" style="color: #3a65e3;">正常工作</p>
      </div>
      <div class="card_list">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_warn.png" alt="">
        </p>
        <p class="card_text" style="color: #eba945;">即将维保</p>
      </div>
      <div class="card_list">
        <p class="three card_color">
          <img src="http://cdn.zhaodaka.cn/lift/lift_danger.png" alt="">
        </p>
        <p class="card_text" style="color: #e95b56;">超期维保</p>
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
      </div> -->
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
    </div> -->
  </div>
</template>

<script>
// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { areaList } from "@/minx/area.js";
import { getHomeList } from "@/api/home/home.js";
import AMap from "AMap"; // 引入高德地图
export default {
  mixins: [areaList],
  data() {
    return {
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
    };
  },
  created() {
    this.getCoordinate()
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.mapHeight = h * 0.91;
  },
  mounted() {
    this.map = new AMap.Map("container", {
      center: [109.814257,19.287232], //海口
      resizeEnable: true,
      zoom: 9
    });
  },
  methods: {
     addMarker(data) {
      const marker = new window.AMap.Marker({
        icon: data.type == 1 ? "http://cdn.zhaodaka.cn/lift/lift_normal.png" : (data.type == 2 ?  "http://cdn.zhaodaka.cn/lift/lift_warn.png" : "http://cdn.zhaodaka.cn/lift/lift_danger.png"),
        position: [data.longitude, data.latitude],
      });
      marker.setMap(this.map);
      marker.type = data.type;
      // marker.id = data.id;
      marker.on('click', (e) => this.bindEvent(e, data));
      this.markers.push(marker);
    },
    getCoordinate() {
      let params = {
        token: sessionStorage.getItem("token"),
        province: this.province,
        city: this.city,
        area: this.area
      };
      getHomeList(params).then(res => {
        console.log(res);
        res.forEach(ele => {
          this.addMarker(ele)
        });
      });
    },
    bindEvent (e,data) {
      console.log(e,data)
      this.$router.push(`/place-detail/${data.id}`)
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
  .amap-icon img{
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
      font-size: 13px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
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
        img{
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
}
</style>
