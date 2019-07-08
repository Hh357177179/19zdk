<template>
  <div class="approve_info">
    <van-cell-group>
      <van-field label="姓名" label-width='120px' v-model="approveFrom.name" placeholder="请输入姓名(Name)" />
      <van-field
        label-width='120px'
        readonly
        clickable
        label="性别"
        :value="valueSex"
        placeholder="请输入性别(Sex)"
        @click="showPicker = true"
      />
      <van-field
        label-width='120px'
        readonly
        clickable
        label="生日"
        :value="approveFrom.birthday"
        placeholder="请输入生日(BirthDay)"
        @click="birthPicker = true"
      />
      <van-field label="身份证号" label-width='120px' v-model="approveFrom.idcard" placeholder="请输入身份证号(IdCard)" />
      <van-field label="电话号码" maxlength='11' label-width='120px' v-model="approveFrom.phone" placeholder="请输入电话号码(TelPhone)" />
      <van-field label="护照" label-width='120px' v-model="approveFrom.passport" placeholder="请输入护照(PassPort)" />
      <van-field label="国际壁联注册号码" label-width='120px' v-model="approveFrom.spin_no" placeholder="请输入国际壁联注册号码(Spin No.)" />
      <van-field label="教练" label-width='120px' v-model="approveFrom.coach" placeholder="请输入教练(Coach)" />
      <van-field label="俱乐部" label-width='120px' v-model="approveFrom.club" placeholder="请输入俱乐部(Club)" />
    </van-cell-group>
    <div class="submit_btn" @click="SubmitInfo">提交信息</div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup v-model="birthPicker" position="bottom">
      <van-datetime-picker
        type="date"
        @cancel='closes'
        v-model="nowDate"
        :min-date='minDate'
        :max-date='maxDate'
        @confirm='nowVal'
      />
    </van-popup>
  </div>
</template>

<script>
import { upDateUser, getUserInfo} from '@/api/index.js'
export default {
  data () {
    return {
      nowDate: new Date(),
      minDate: new Date(1950, 10, 1),
      maxDate: new Date(),
      birthPicker: false,
      columns: ['男', '女'],
      valueSex: '',
      showPicker: false,
      approveFrom: {
        name: '',
        sex: '',
        birthday: '',
        idcard: '',
        phone: '',
        passport: '',
        spin_no: '',
        coach: '',
        club: ''
      },
      userObj: {}
    }
  },
  methods: {
    nowVal (val) {
      console.log(val)
      let date = new Date(val)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      if (M < 10) M = '0' + M
      if (D < 10) D = '0' + D
      this.approveFrom.birthday = `${Y}-${M}-${D}`
      this.birthPicker = false
    },
    closes () {
      this.show = false
    },
    onConfirm (value) {
      this.valueSex = value
      if (value == '男') {
        this.approveFrom.sex = 1
      } else {
        this.approveFrom.sex = 2
      }
      this.showPicker = false
    },
    getUser () {
      let params = {
        token: localStorage.getItem('tokenns')
      }
      getUserInfo(params).then(res => {
        console.log(res)
        this.userObj = res
        this.approveFrom.name = res.name
        this.approveFrom.sex = res.sex
        this.approveFrom.idcard = res.idcard
        this.approveFrom.phone = res.phone
        this.approveFrom.birthday = res.birthday
        this.approveFrom.passport = res.passport
        this.approveFrom.spin_no = res.spin_no
        this.approveFrom.coach = res.coach
        this.approveFrom.club = res.club
        if (res.sex == 1) this.valueSex = '男'
        else if (res.sex == 2) this.valueSex = '女'
      })
    },
    SubmitInfo () {
      this.upDateInfo()
    },
    upDateInfo () {
      if (this.approveFrom.name == '') {
        this.$toast({
          message: '请输入姓名',
          duration: 1000
        })
      } else if (this.approveFrom.sex.toString() == '') {
        this.$toast({
          message: '请选择性别',
          duration: 1000
        })
      } else if (this.approveFrom.idcard == '') {
        this.$toast({
          message: '请输入身份证号',
          duration: 1000
        })
      } else if (!/^1[3456789]\d{9}$/.test(this.approveFrom.phone)) {
        this.$toast({
          message: '请输入正确电话号码',
          duration: 1000
        })
      } else {
        let params = {
          token: localStorage.getItem('tokenns'),
          name: this.approveFrom.name,
          sex: this.approveFrom.sex,
          idcard: this.approveFrom.idcard,
          phone:this.approveFrom.phone,
          birthday: this.approveFrom.birthday,
          passport:this.approveFrom.passport,
          spin_no:this.approveFrom.spin_no,
          coach:this.approveFrom.coach,
          club:this.approveFrom.club
        }
        console.log(params)
        upDateUser(params).then(res => {
          console.log(res)
          this.$toast.success('提交成功')
          this.$router.back(-1)
        })
      }
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>

<style lang="less">
  .approve_info{
    width: 100%;
    height: 100%;
    .submit_btn{
      width: 200px;
      line-height: 45px;
      background: #76A1FF;
      color: #fff;
      border-radius: 5px;
      font-size: 15px;
      text-align: center;
      margin: 40px auto;
    }
  }
</style>
