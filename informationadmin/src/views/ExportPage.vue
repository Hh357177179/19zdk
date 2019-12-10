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
            <p class="info_user info_hw">
              <span>{{obj.height}}cm</span>
              <span>{{obj.weight}}kg</span>
            </p>
          </div>
          <div class="infos info_t">
            <p>{{strs}}</p>
          </div>
          <div class="infos info_th border_none">
            <p>{{obj.number_plate}}</p>
          </div>
        </div>
      <div class="man_pic clearfix">
        <div class="pic_list" v-if="obj.body_img != ''">
          <div class="imgCard">
            <img :src="obj.body_img" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.face_left != ''">
          <div class="imgCard">
            <img :src="obj.face_left" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.face_front != ''">
          <div class="imgCard">
            <img :src="obj.face_front" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.face_right != ''">
          <div class="imgCard">
            <img :src="obj.face_right" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.hand_left != ''">
          <div class="imgCard">
            <img :src="obj.hand_left" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.hand_right != ''">
          <div class="imgCard">
            <img :src="obj.hand_right" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.tongue_img != ''">
          <div class="imgCard">
            <img :src="obj.tongue_img" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.home_house_plan1 != ''">
          <div class="imgCard">
            <img :src="obj.home_house_plan1" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.home_house_plan2 != ''">
          <div class="imgCard">
            <img :src="obj.home_house_plan2" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.home_house_plan3 != ''">
          <div class="imgCard">
            <img :src="obj.home_house_plan3" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.company_house_plan != ''">
          <div class="imgCard">
            <img :src="obj.company_house_plan" alt>
          </div>
        </div>
        <div class="pic_list" v-if="obj.company_house_plan2 != ''">
          <div class="imgCard">
            <img :src="obj.company_house_plan" alt>
          </div>
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
      state: ""
    };
  },
  created() {
    console.log(this.$route);
    this.state = this.$route.query.state;
    this.handleDetail();
  },
  methods: {
    handleDetail() {
      let params = {
        token: sessionStorage.getItem("token"),
        order_id: this.$route.query.id
      };
      searchOrder(params).then(res => {
        this.strs = res.phones.replace(/\//g, "、");
        this.obj = res;
        if (res) {
          this.$nextTick(() => {
            window.print();
          });
        }
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
      .input_time{
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
    margin: 0 auto;
    padding-bottom: 20px;
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
        height: 40px;
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
      .info_hw{
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
    .pic_list {
      float: left;
      width: 25%;
      .imgCard {
        width: 260px;
        margin: 10px auto 0;
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
