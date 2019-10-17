<template>
  <div class="apply">
    <div class="title">注意：请根据个人信息填写真是资料</div>
    <div class="apply_main">
      <van-cell-group>
        <van-field
          required
          v-model="name"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          required
          v-model="age"
          label="年龄"
          placeholder="请输入年龄"
          type="tel"
        />
        <van-field
          required
          v-model="height"
          label="身高"
          placeholder="请输入您的身高，单位 cm"
          type="tel"
        />
        <van-field
          required
          v-model="weight"
          label="体重"
          placeholder="请输入您的体重，单位 kg"
          type="tel"
        />
        <div class="cho_place" @click="choosePlace">
          <p>
            <span class="label_icon">*</span>
            <span class="label_text">地址</span>
            <span class="places" :class="place == '请选择地址' ? 'place_text' : ''">{{place}}</span>
          </p>
          <p class="down">
            <img src="../assets/img/down.png" alt="">
          </p>
        </div>
        <div class="cho_place" @click="chooseType">
          <p>
            <span class="label_icon">*</span>
            <span class="label_text">节目类型</span>
            <span :class="formText == '请选择节目类型' ? 'place_text' : ''">{{formText}}</span>
          </p>
          <p class="down">
            <img src="../assets/img/down.png" alt="">
          </p>
        </div>
        <van-field
          required
          v-model="organization"
          label="机构名称"
          placeholder="请输入机构名称"
        />
        <van-field
          required
          v-model="parent_name"
          label="家长姓名"
          placeholder="请输入家长姓名"
        />
        <van-field
          required
          v-model="parent_phone"
          label="家长电话"
          placeholder="请输入家长电话"
          type="tel"
        />
         <van-field
          v-model="teacher_name"
          label="老师姓名"
          placeholder="请输入老师姓名"
        />
         <van-field
          v-model="teacher_phone"
          label="老师电话"
          placeholder="请输入老师电话"
          type="tel"
        />
        <van-field
          required
          v-model="program_title"
          label="节目名称"
          placeholder="请输入节目名称"
        />
        <div class="cho_place" @click="chooseDance">
          <p>
            <span class="label_icon">*</span>
            <span class="label_text">参选专业</span>
            <span :class="danceText == '请选择参选专业' ? 'place_text' : ''">{{danceText}}</span>
          </p>
          <p class="down">
            <img src="../assets/img/down.png" alt="">
          </p>
        </div>
        <van-field
          v-model="dance_requirement"
          label="舞美要求"
          placeholder="请输入舞美要求"
        />
        <van-field
          v-model="led_requirement"
          label="LED要求"
          placeholder="请输入LED要求"
        />
        <van-field
          v-model="music"
          label="音乐"
          placeholder="请输入需要准备的音乐"
        />
        <van-field
          v-model="note"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="apply_btn" @click="applyBtn">报名</div>
    </div>
    <van-popup v-model="showForm" position="bottom">
      <van-picker
        show-toolbar
        :columns="formType"
        @cancel="onCancelForm"
        @confirm="onChangeForm"
      />
    </van-popup>
     <van-popup v-model="showDance" position="bottom">
      <van-picker
        show-toolbar
        :columns="danceArr"
        @cancel="onCancelDange"
        @confirm="onChangeDance"
      />
    </van-popup>
    <van-popup v-model="show" position="bottom">
      <van-area :area-list="areaList" @cancel="closeArea" @confirm="choPlace"/>
    </van-popup>
  </div>
</template>

<script>
import areaList from "../assets/utils/area.js";
import { applyOnline } from "@/api/index.js";
import { setTimeout } from 'timers';
export default {
  components: { areaList },
  data() {
    return {
      music: '',
      note: '',
      led_requirement: '',
      dance_requirement: '',
      danceText: '请选择参选专业',
      showDance: false,
      danceArr: ['舞蹈', '声乐', '戏曲', '乐器', '杂技', '语言'],
      program_title: '',
      teacher_phone: '',
      teacher_name: '',
      parent_phone: '',
      parent_name: '',
      showForm: false,
      formText: "请选择节目类型",
      formType: ["团队节目", "个人节目"],
      areaPlace: [],
      areaList: null,
      show: false,
      name: "",
      age: "",
      height: "",
      weight: "",
      place: "请选择地址",
      organization: '',
      province: '',
      city: '',
      area: ''
    };
  },
  created() {
    this.init();
  },
  methods: {
    applyBtn () {
      if (this.name == '') {
        this.$toast('请输入姓名')
      } else if (this.age == '') {
        this.$toast('请输入年龄')
      } else if (this.height == '') {
        this.$toast('请输入身高')
      } else if (this.weight == '') {
        this.$toast('请输入体重')
      } else if (this.place == '请选择地址') {
        this.$toast('请选择地址')
      } else if (this.parent_name == '') {
        this.$toast('请输入家长姓名')
      } else if (this.parent_phone == '') {
        this.$toast('请输入家长电话')
      } else if (this.program_title == '') {
        this.$toast('请输入节目名称')
      } else {
        let params = {
          token: localStorage.getItem('tokenns'),
          name: this.name,
          age: this.age,
          height: this.height,
          weight: this.weight,
          province: this.province,
          city: this.city,
          area: this.area,
          type: this.formText,
          organization: this.organization,
          parent_name: this.parent_name,
          parent_phone: this.parent_phone,
          teacher_name: this.teacher_name,
          teacher_phone: this.teacher_phone,
          program_title: this.program_title,
          speciality: this.danceText,
          dance_requirement: this.dance_requirement,
          led_requirement: this.led_requirement,
          music: this.music,
          note: this.note
        }
        console.log(params)
        applyOnline(params).then(res => {
          if (res) {
            this.$toast('报名成功')
            setTimeout(() => {
              this.$router.back()
            }, 2000)
          }
        })
      }
    },
    chooseDance () {
      this.showDance = true
    },
    onCancelDange () {
      this.showDance = false
    },
    onChangeDance (e) {
      this.danceText = e
      this.showDance = false
    },
    onCancelForm () {
      this.showForm = false
    },
    chooseType() {
      this.showForm = true;
    },
    onChangeForm(e) {
      this.formText = e
      this.showForm = false
    },
    init() {
      this.areaList = areaList;
    },
    choosePlace() {
      this.show = true;
    },
    closeArea() {
      this.show = false;
    },
    choPlace(e) {
      console.log(e);
      this.areaPlace = e
      this.province = e[0].name
      this.city = e[1].name
      this.area = e[2].name
      this.place = `${e[0].name}-${e[1].name}-${e[2].name}`;
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.apply {
  .title {
    font-size: 13px;
    text-align: center;
    padding: 10px 0;
    color: #f29c38;
    font-weight: bold;
  }
  .apply_main {
    margin-top: 10px;
    .cho_place {
      padding: 10px 0 10px 8px;
      font-size: 14px;
      color: #323233;
      border-bottom: 1px solid rgba(235,237,240, .5);
      position: relative;
      .label_icon {
        margin-right: 3px;
        color: #ee0a24;
      }
      .label_text {
        width: 90px;
        display: inline-block;
      }
      .place_text {
        color: #999;
      }
      .down{
        width: 15px;
        height: 15px;
        position: absolute;
        right: 20px;
        top: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .places{
        display: inline-block;
        width: 200px;
      }
    }
    .error_text {
      color: #ee0a24;
      font-size: 12px;
      line-height: 24px;
      margin-left: 98px;
    }
    .apply_btn{
      width: 200px;
      color: #fff;
      background: #ee0a24;
      font-size: 18px;
      padding: 10px 0;
      border-radius: 15px;
      margin: 20px auto;
      text-align: center;
    }
  }
}
</style>

