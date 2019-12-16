<template>
  <div class="detail">
    <div class="detail_mains">
      <div class="titles clearfix">
        <div>五优采集</div>
        <span class="input_time">{{obj.create_time | fromDate}}</span>
      </div>
      <div class="d_body">
        <div class="d_main">
          <div class="infos info_o">
            <p class="info_user">
              <span>{{obj.name}}（{{obj.sex}}）</span>
            </p>
            <p>
              <span>{{obj.before_name}}</span>
            </p>
            <p>
              <span>{{obj.idcard}}</span>
            </p>
          </div>
          <div class="infos info_t">
            <p>
              <span>{{obj.solar_date}}</span>
            </p>
            <p>
              <span>{{obj.lunar_date}}</span>
            </p>
            <p>
              <span>{{obj.birth_time}}</span>
            </p>
          </div>
          <div class="infos info_th border_none">
            <p>
              <span>{{obj.job}}</span>
            </p>
            <p>
              <span>{{obj.now_province}}-{{obj.now_city}}-{{obj.now_area}}</span>
            </p>
            <p>
              <span>{{obj.birth_province}}-{{obj.birth_city}}-{{obj.birth_area}}</span>
            </p>
          </div>
        </div>
        <div class="d_main">
          <div class="infos info_o">
            <p class="info_user info_wh">
              <span>{{obj.height}}cm</span>
              <span>{{obj.weight}}kg</span>
            </p>
          </div>
          <div class="infos info_t">
            <p>{{obj.phones}}</p>
          </div>
          <div class="infos info_th border_none">
            <p>{{obj.number_plate}}</p>
          </div>
        </div>
        <div class="man_pic clearfix">
          <div class="pic_list" v-if="obj.body_img != ''">
            <el-image style="width: 100%;" :src="obj.body_img" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.face_left != ''">
            <el-image style="width: 100%;" :src="obj.face_left" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.face_front != ''">
            <el-image style="width: 100%;" :src="obj.face_front" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.face_right != ''">
            <el-image style="width: 100%;" :src="obj.face_right" :preview-src-list="srcList"></el-image>
          </div>
        </div>
        <div class="man_pic clearfix">
          <div class="pic_list" v-if="obj.hand_left != ''">
            <el-image style="width: 100%;" :src="obj.hand_left" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.hand_right != ''">
            <el-image style="width: 100%;" :src="obj.hand_right" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.tongue_img != ''">
            <el-image style="width: 100%;" :src="obj.tongue_img" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.home_house_plan1 != ''">
            <el-image style="width: 100%;" :src="obj.home_house_plan1" :preview-src-list="srcList"></el-image>
          </div>
        </div>
        <div class="man_pic clearfix">
          <div class="pic_list" v-if="obj.home_house_plan2 != ''">
            <el-image style="width: 100%;" :src="obj.home_house_plan2" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.home_house_plan3 != ''">
            <el-image style="width: 100%;" :src="obj.home_house_plan3" :preview-src-list="srcList"></el-image>
          </div>
          <div class="pic_list" v-if="obj.company_house_plan != ''">
            <el-image
              style="width: 100%;"
              :src="obj.company_house_plan"
              :preview-src-list="srcList"
            ></el-image>
          </div>
          <div class="pic_list" v-if="obj.company_house_plan2 != ''">
            <el-image
              style="width: 100%;"
              :src="obj.company_house_plan2"
              :preview-src-list="srcList"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchOrder } from "../api/index.js";
export default {
  data() {
    return {
      obj: {},
      strs: "",
      srcList: []
    };
  },
  created() {
    this.handleDetail();
  },
  methods: {
    handleDetail() {
      let params = {
        token: sessionStorage.getItem("token"),
        order_id: this.$route.query.id
      };
      searchOrder(params).then(res => {
        console.log(res);
        this.strs = res.phones.replace(/\//g, "、");
        let imgArr = [];
        imgArr.push(
          res.body_img,
          res.face_left,
          res.face_front,
          res.face_right,
          res.hand_left,
          res.hand_right,
          res.tongue_img,
          res.home_house_plan1,
          res.home_house_plan2,
          res.home_house_plan3,
          res.company_house_plan,
          res.company_house_plan2
        );
        imgArr.forEach(img => {
          if (img != "") {
            this.srcList.push(img);
          }
        });
        this.obj = res;
        console.log(this.srcList);
      });
    }
  }
};
</script>

<style lang="less">
.detail {
  width: 100%;
  min-height: 100vh;
  background: #f0f0f0;
  .detail_mains {
    width: 1100px;
    margin: 0 auto;
    .titles {
      padding: 20px 0 10px 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      .input_time {
        font-weight: normal;
        float: right;
        font-size: 15px;
      }
    }
  }
  .d_body {
    width: 1100px;
    border: 1px solid #000;
    background: #fff;
    padding-bottom: 30px;
  }
  .d_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .infos {
      width: 33.33333%;
      border-right: 1px solid #999;
      text-align: center;
      p {
        line-height: 40px;
        min-height: 40px;
        font-size: 15px;
        color: #000;
        // font-weight: 600;
        border-bottom: 1px solid #999;
        .label {
          display: inline-block;
          width: 110px;
          text-align: right;
          color: #333;
          font-weight: normal;
        }
      }
      .info_t{
        display: flex;
        align-items: center;
        line-height: 0;
      }
      .info_wh {
        display: flex;
        justify-content: space-around;
      }
    }
  }
  .info_text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #999;
    .person_wh {
      width: 33.33333%;
      border-right: 1px solid #999;
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      color: #000;
      // font-weight: 600;
      min-height: 40px;
      align-items: center;
      padding: 0 40px;
      .label {
        font-weight: normal;
      }
    }
    .person_phone {
      min-height: 40px;
      font-size: 15px;
      color: #000;
      padding: 0 10px;
      // font-weight: 600;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .label {
        font-weight: normal;
        color: #333;
      }
      .label_text {
        display: inline-block;
        width: 600px;
      }
    }
  }
  .man_pic {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    .pic_list {
      width: 25%;
      margin-bottom: 10px;
      background: #f0f0f0;
      .imgCard {
        width: 280px;
        height: 280px;
        margin: 5px auto 0;
        img {
          width: 100%;
          border: 1px solid #ccc;
          height: 100%;
        }
      }
      .label_pic {
        width: 100px;
        font-size: 13px;
        font-weight: bold;
        margin-left: -10px;
      }
    }
  }
  .border_none {
    border-right: none !important;
  }
}
</style>
