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
          :error-message="errorName"
        />
        <van-field
          required
          v-model="age"
          label="年龄"
          placeholder="请输入年龄"
          type="tel"
          :error-message="errorAge"
        />
        <van-field
          required
          v-model="height"
          label="身高"
          placeholder="请输入您的身高，单位 cm"
          type="tel"
          :error-message="errorHeight"
        />
        <van-field
          required
          v-model="weight"
          label="体重"
          placeholder="请输入您的体重，单位 kg"
          type="tel"
          :error-message="errorWeight"
        />
        <div class="cho_place" @click="choosePlace">
          <p><span class="label_icon">*</span><span class="label_text">地址</span><span class="place_text">{{place}}</span></p>
          <p class="error_text">{{errorPlace}}</p>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      errorName: "",
      age: "",
      errorAge: "",
      height: "",
      errorHeight: "",
      weight: "",
      errorWeight: "",
      place: "请选择地址",
      errorPlace: ""
    };
  },
  methods: {
    choosePlace () {
      console.log('请选择地址')
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
    .cho_place{
      padding: 10px 0 10px 8px;
      font-size: 14px;
      color: #323233;
      .label_icon{
        margin-right: 3px;
        color: #ee0a24;
      }
      .label_text{
        width: 90px;
        display: inline-block;
      }
      .place_text{
        color: #999;
      }
    }
    .error_text{
      color: #ee0a24;
      font-size: 12px;
      line-height: 24px;
      margin-left: 98px;
    }
  }
}
</style>

