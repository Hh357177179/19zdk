<template>
  <div class="user">
    <van-cell-group>
      <p class="date_line clearfix">
        <span class="date_label">{{chekedText}}</span>
        <input type="text" style="width: 200px;float:left;" v-model="formUser.school" :placeholder="placText">
        <van-switch class="switchs" v-model="checked" @change="CheckedBox" active-color="#3b8af2" inactive-color="#07c160" size="24px"/>
      </p>
      <van-field v-model="formUser.name" label="姓名" placeholder="请输入姓名（孩子）" />
      <p class="date_line" @click="TimePick">
        <span class="date_label">出生日期</span>
        <span :class="formUser.date == '请选择出生日期（孩子）' ? 'date_data' : ''">{{formUser.date}}</span>
      </p>
      <van-field v-model="formUser.phone" label="手机" placeholder="请输入手机" maxlength="11" />
      <van-field
        class="timePick"
        v-model="formUser.code"
        center
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary" @click="sendSmm" :disabled="disBtn">{{sendText}}</van-button>
      </van-field>
    </van-cell-group>
    <p class="submit_btn" @click="Submit">提交</p>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
      @confirm='nowVal'
      @cancel='closes'
      v-model="nowDate"
      @change="changeDate"
      type="date"
      :min-date='minDate'
      :max-date='maxDate'
      />
    </van-popup>
  </div>
</template>

<script>
import { Register, getCode } from '../api/index.js'
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
  data () {
    return {
      placText: '请输入学校',
      checked: false,
      chekedText: '学校',
      sendText: '发送验证码',
      disBtn: false,
      show: false,
      nowDate: new Date(),
      minDate: new Date(1950, 10, 1),
      maxDate: new Date(),
      formUser: {
        phone: '',
        code: '',
        school: '',
        name: '',
        date: '请选择出生日期（孩子）'
      },
      types: 1,
    }
  },
  methods: {
    CheckedBox (val) {
      console.log(val)
      if (val == false) {
        this.types = 1
        this.placText = '请输入学校',
        this.chekedText = '学校'
      } else {
        this.types = 2
        this.placText = '请输入社区'
        this.chekedText = '社区'
      }
    },
    sendSmm () {
      if (!/^1[3456789]\d{9}$/.test(this.formUser.phone)) {
        this.$toast('请输入正确手机号码')
      } else {
        let params = {
          token: localStorage.getItem("tokenns"),
          phone: this.formUser.phone
        }
        getCode(params).then(res => {
          console.log(res)
          var o = 60
          var t = setInterval(() => {
            this.sendText = o + 's',
            this.disBtn = true
            if (o == 0) {
              clearInterval(t)
              this.sendText = '发送验证码'
              this.disBtn = false
            }
            o -= 1
          }, 1000)
        })
      }
    },
    nowVal (val) {
      let date = new Date(val)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      if (M < 10) M = '0' + M
      if (D < 10) D = '0' + D
      this.formUser.date = `${Y}-${M}-${D}`
      this.show = false
      console.log(this.formUser.date)
    },
    closes () {
      this.show = false
    },
    TimePick () {
      this.show = true
    },
    changeDate (val) {
      // console.log(val.getValues())
    },
    Submit () {
      if (this.formUser.school == '') {
        this.$toast('请输入学校或者社区')
      } else if (this.formUser.name == '') {
        this.$toast('请输入孩子姓名')
      } else if (this.formUser.date == '请选择出生日期') {
        this.$toast('请输入孩子出生日期')
      } else if (!/^1[3456789]\d{9}$/.test(this.formUser.phone)) {
        this.$toast('请输入正确手机号码')
      } else if (this.formUser.code == '') {
        this.$toast('请输入验证码')
      } else {
        let params = {}
        if (this.checked == false) {
          params = {
            token: localStorage.getItem("tokenns"),
            phone: this.formUser.phone,
            code: this.formUser.code,
            school: this.formUser.school,
            name: this.formUser.name,
            date: this.formUser.date,
            type: this.types,
            area: ''
          }
        } else {
          params = {
            token: localStorage.getItem("tokenns"),
            phone: this.formUser.phone,
            code: this.formUser.code,
            school: '',
            name: this.formUser.name,
            date: this.formUser.date,
            type: this.types,
            area: this.formUser.school,
          }
        }
        console.log(params)
        Register(params).then(res => {
          this.$toast('认证成功')
          setTimeout(() => {
            this.$router.push(`${localStorage.getItem('paths')}`)
          }, 2000)
        })
      }
    }
  },
  mounted () {
    this.$toast('请在报名前先完成注册')
  }
}
</script>

<style lang="less">
  .user{
    width: 100%;
    height: 100vh;
    .switch_on{
      border-bottom: 1px solid #f0f0f0;
      margin-left: 15px;
    }
    .van-switch-cell{
      padding-left: 0;
    }
    .date_line{
      line-height: 44px;
      font-size: 14px;
      color: #323233;
      // padding: 0 15px;
      margin-left: 15px;
      border-bottom: 1px solid #f0f0f0;
      .date_label{
        float: left;
        width: 90px;
      }
      .date_data{
        color: #999;
      }
      .switchs{
        float: left;
        margin-top: 10px;
      }
    }
    .submit_btn{
      width: 60%;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background: #cba787;
      border-radius: 5px;
      margin: 40px auto;
    }
  }
</style>
