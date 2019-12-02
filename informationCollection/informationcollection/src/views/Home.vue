<template>
  <div class="home">
    <div class="main">
      <p class="info_main">福主，</p>
      <p class="info_main info_text">您好！只有多维度地了解您的信息，才能更加准确地判断出您的命运、健康的状态。对于您的信息，我们承诺保密，请您认真填写。</p>
      <div style="color:#8b4513;margin-top:10px;">
        <div class="info_small_text">温馨提示： 建议先浏览表单底部的图片上传，<span><u><span style="background-color:#d3d3d3">先拍照上传&nbsp;</span></u></span>再填表，以节省您的时间。</div>
      </div>
      <div class="user_main">
        <van-cell-group>
          <van-field
            v-model="form.name"
            required
            label="姓名"
            placeholder="请输入姓名"
          />
          <van-field
            v-model="form.before_name"
            label="曾用名"
            placeholder="请输入曾用名"
          />
          <van-field
            readonly
            required
            clickable
            label="性别"
            :value="form.sex"
            placeholder="请选择性别"
            @click="showPicker = true"
          />
          <p class="tip_text">阴历、阳历二选一填写</p>
          <van-field
            readonly
            clickable
            label="阳历出生日期"
            :value="form.solar_date"
            placeholder="请选择阳历出生日期（二选一）"
            @click="showSolar = true"
          />
          <van-field
            readonly
            clickable
            label="阴历出生日期"
            v-model="form.lunar_date"
            placeholder="请选择阴历出生日期（二选一）"
            @click="showLunar = true"
          />
          <van-field
            readonly
            clickable
            label="出生时间"
            :value="form.birth_time"
            placeholder="请选择出生时间"
            @click="showBirth = true"
          />
          <p class="tip_text">如有多个手机号在使用，按启用顺序罗列填写。格式为：</p>
          <p class="text_small">1.12345666788 4年</p>
          <p class="text_small">2.13447776788 2年</p>
          <van-cell-group>
            <van-field
              v-model="phone1"
              label="手机号1"
              placeholder="请输入手机号1"
              maxlength="11"
              type="tel"
            />
            <van-field
              v-model="year1"
              label="使用年限"
              placeholder="请输入使用年限1"
            />
            <van-field
              v-model="phone2"
              label="手机号2"
              placeholder="请输入手机号2"
              maxlength="11"
              type="tel"
            />
            <van-field
              v-model="year2"
              label="使用年限"
              placeholder="请输入使用年限2"
            />
          </van-cell-group>
          <van-field
            v-model="form.height"
            label="身高（cm）"
            placeholder="请输入身高（cm）"
          />
          <van-field
            v-model="form.weight"
            label="体重（kg）"
            placeholder="请输入体重（kg）"
          />
          <van-field
            v-model="form.idcard"
            label="身份证号"
            placeholder="请输入身份证号"
          />
          <van-field
            v-model="form.number_plate"
            label="车牌号"
            placeholder="请输入车牌号"
          />
          <van-field
            readonly
            clickable
            label="现住址"
            :value="nowPlaceText"
            placeholder="请选择现住址"
            @click="showNowPlace = true"
          />
          <van-field
            readonly
            clickable
            label="出生地"
            :value="birthPlaceText"
            placeholder="请选择现住址"
            @click="showBirthPlace = true"
          />
          <van-field
            v-model="form.job"
            label="行业/岗位"
            placeholder="请输入行业/岗位"
          />
          <p class="tip_text" style="margin-top:20px;color:#8b4513">温馨提示：相学和风水图片，建议您提前准备，上传照片。</p>
          <p class="tip_text" style="margin-top:10px;">请上传您的面部照片（请按照左侧、正面、右侧的顺序上传）</p>
          <p class="face_pic">
            <img src="../assets/img/face.jpg" alt="">
          </p>
          <div class="up_load">
            <van-uploader
              @delete="deletePic1"
              :after-read="faceRead"
              v-model="faceList"
              :max-count="3"
            />
          </div>
          <p class="tip_text" style="margin-top:10px;">请上传您的手掌照片，先左后右（确保手纹清晰可见）</p>
          <p class="face_pic">
            <img src="../assets/img/hand.jpg" alt="">
          </p>
          <div class="up_load">
            <van-uploader
            @delete="deletePic2"
            :after-read="handRead"
              v-model="handList"
              :max-count="2"
            />
          </div>
          <p class="tip_text" style="margin-top:10px;">请上传全身照片</p>
          <p class="face_pic">
            <img src="../assets/img/person.jpg" alt="">
          </p>
          <div class="up_load">
            <van-uploader
            @delete="deletePic3"
            :after-read="personRead"
              v-model="personList"
              :max-count="1"
            />
          </div>
          <p class="tip_text" style="margin-top:10px;">请上传舌诊照片</p>
          <p class="small_infos">拍照前不吃有色素残留的食物，需拍摄舌头本色照片</p>
          <p class="face_pic">
            <img src="../assets/img/st.jpg" alt="">
          </p>
          <div class="up_load">
            <van-uploader
            @delete="deletePic4"
            :after-read="tongueRead"
              v-model="tongueList"
              :max-count="1"
            />
          </div>
          <p class="tip_text" style="margin-top:10px;">请上传家宅房型图</p>
          <p class="small_infos">提供户型图或示意图（没有的可以中介网站上搜索自家小区找房型图），标注出房屋朝向、大门、窗户、阳台、卧室、卫生间等位置信息及所在城市地区小区名称。</p>
          <p class="face_pic">
            <img src="../assets/img/room.jpg" alt="">
          </p>
          <div class="up_load">
            <van-uploader
            @delete="deletePic5"
              v-model="homeList"
              :after-read="homeRead"
              :max-count="3"
            />
          </div>
          <p class="tip_text" style="margin-top:10px;">请上传办公室房型图</p>
          <p class="small_infos">提供户型图或示意图，标注出办公室朝向、大门、窗户、办公桌所在位置。</p>
          <p class="face_pic">
            <img src="../assets/img/rooms.png" alt="">
          </p>
          <div class="up_load">
            <van-uploader
              @delete="deletePic6"
              v-model="officeList"
              :after-read="officeRead"
              :max-count="2"
            />
          </div>
        </van-cell-group>
      </div>
      <div class="submit_form" @click="submitForm">提 交</div>
    </div>
    <!-- 性别 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        title="性别"
        :columns="sexColumns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 阴历生日 -->
    <van-popup v-model="showLunar" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="阴历出生日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showLunar = false"
        @confirm="onConfirmLunar"
      />
    </van-popup>
    <!-- 阳历生日 -->
    <van-popup v-model="showSolar" position="bottom">
      <van-datetime-picker
        v-model="currentDateSolar"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        title="阳历出生日期"
        @cancel="showSolar = false"
        @confirm="onConfirmSolar"
      />
    </van-popup>
    <!-- 出生时间 -->
    <van-popup v-model="showBirth" position="bottom">
      <van-picker
        show-toolbar
        title="出生时间"
        :columns="birthColumns"
        @cancel="showBirth = false"
        @confirm="onConfirmBirth"
      />
    </van-popup>
    <!-- 现住址 -->
    <van-popup v-model="showNowPlace" position="bottom">
      <van-area :area-list="areaList" :value="nowPlace" @cancel="showNowPlace = false" @confirm="onConfirmNowPlace"/>
    </van-popup>
    <!-- 出生地 -->
    <van-popup v-model="showBirthPlace" position="bottom">
      <van-area :area-list="areaList" :value="birthPlace" @cancel="showBirthPlace = false" @confirm="onConfirmBirthPlace"/>
    </van-popup>
  </div>
</template>
<script>
import areaList from '../data/area.js'
import { uploadPic, routeUrl, submitForm } from '@/api/index.js' 
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      phone1: '',
      year1: '',
      phone2: '',
      year2: '',
      maxDate: new Date(),
      minDate: new Date(1919, 1, 1),
      officeList: [],
      homeList: [],
      tongueList: [],
      personList: [],
      faceList: [],
      handList: [],
      showBirthPlace: false,
      nowPlaceText: '',
      birthPlaceText: '',
      areaList: [],
      showNowPlace: false,
      nowPlace: '',
      birthPlace: '',
      currentDate: new Date(),
      currentDateSolar: new Date(),
      sexColumns: ['男', '女'],
      birthColumns: ['不知道', '23:00—01:00','01:00—03:00','03:00—05:00','05:00—07:00','07:00—09:00','09:00—11:00','11:00—13:00','13:00—15:00','15:00—17:00','17:00—19:00','19:00—21:00','21:00—23:00'],
      showPicker: false,
      showLunar: false,
      showSolar: false,
      showBirth: false,
      form: {
        name: '',
        before_name: '',
        sex: '',
        lunar_date: '',
        solar_date: '',
        birth_time: '',
        phones: '',
        height: '',
        weight: '',
        idcard: '',
        number_plate: '',
        now_province: '',
        now_city: '',
        now_area: '',
        birth_province: '',
        birth_city: '',
        birth_area: '',
        job: '',
        face_left: '',
        face_front: '',
        face_right: '',
        hand_left: '',
        hand_right: '',
        body_img: '',
        tongue_img: '',
        home_house_plan1: '',
        home_house_plan2: '',
        home_house_plan3: '',
        company_house_plan: '',
        company_house_plan2: ''
      },
      faceArr: [],
      handArr: [],
      roomArr: [],
      companyArr: [],
      url: ''
    }
  },
  created () {
    this.areaList = areaList
    this.getUrl()
  },
  methods: {
    getUrl () {
      let params = {}
      routeUrl(params).then(res => {
        console.log(res)
        this.url = res.url
      })
    },
    submitForm () {
      if (this.form.name == '') {
        this.$toast('请输入姓名');
      } else if (this.form.sex == '') {
        this.$toast('请选择性别');
      } else if (this.phone1 == "" && this.phone2 == "") {
        this.$toast('请输入手机号')
      } else if (this.phone1 != '' && this.year1 == '') {
        this.$toast('请输入使用年限')
      } else if (this.phone2 != '' && this.year2 == '') {
        this.$toast('请输入使用年限')
      } else {
        this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      if (this.faceArr.length == 3) {
        this.form.face_left = this.faceArr[0]
        this.form.face_front = this.faceArr[1]
        this.form.face_right = this.faceArr[2]
      } else if (this.faceArr.length == 2){
        this.form.face_left = this.faceArr[0]
        this.form.face_front = this.faceArr[1]
      } else if (this.faceArr.length == 1) {
        this.form.face_left = this.faceArr[0]
      }

      if (this.handArr.length == 2) {
        this.form.hand_left = this.handArr[0]
        this.form.hand_right = this.handArr[1]
      } else if (this.handArr.length == 1) {
        this.form.hand_left = this.handArr[0]
      }

      if (this.roomArr.length == 3) {
        this.form.home_house_plan1 = this.roomArr[0]
        this.form.home_house_plan2 = this.roomArr[1]
        this.form.home_house_plan3 = this.roomArr[2]
      } else if (this.roomArr.length == 2) {
        this.form.home_house_plan1 = this.roomArr[0]
        this.form.home_house_plan2 = this.roomArr[1]
      } else if (this.roomArr.length == 1) {
        this.form.home_house_plan1 = this.roomArr[0]
      }

       if (this.companyArr.length == 2) {
        this.form.company_house_plan = this.companyArr[0]
        this.form.company_house_plan2 = this.companyArr[1]
      } else if (this.companyArr.length == 1) {
        this.form.company_house_plan = this.companyArr[0]
      }

      if (this.phone2 != '' && this.phone1 != '') {
        this.form.phones = `${this.phone1}-${this.year1}年/${this.phone2}-${this.year2}年`
      } else if (this.phone1 != '' && this.phone2 == '') {
        this.form.phones = `${this.phone1}-${this.year1}年`
      } else if (this.phone2 != '' && this.phone1 == '') {
        this.form.phones = `${this.phone2}-${this.year2}年`
      }

      let params = this.form
      console.log(params)
      submitForm(params).then(res => {
        if (res) {
          this.$toast.success({
            message: '提交成功',
            forbidClick: true,
            duration: 1500
          });
          setTimeout(() => {
            window.location.href = this.url
          }, 1500)
        }
      })
      }
      
    },
    deletePic1 (file, detail) {
      this.faceArr.splice(detail.index, 1)
    },
    deletePic2 (file, detail) {
      this.handArr.splice(detail.index, 1)
    },
    deletePic3 (file, detail) {
      this.form.body_img = ''
    },
    deletePic4 (file, detail) {
      this.form.tongue_img = ''
    },
    deletePic5 (file, detail) {
      this.roomArr.splice(detail.index, 1)
    },
    deletePic6 (file, detail) {
      this.companyArr.splice(detail.index, 1)
      // this.form.company_house_plan = ''
    },
    uploadImg (file) {
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(file).then(res => {
        console.log(res)
        if (res) {
          this.faceArr.push(res.url)
          this.$toast.clear()
        }
      })
    },
    officeRead (file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(params).then(res => {
        console.log(res)
        if (res) {
          this.companyArr.push(res.url)
          this.$toast.clear()
        }
      })
    },
    homeRead (file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(params).then(res => {
        console.log(res)
        if (res) {
          // this.form.home_house_plan = res.url
          this.roomArr.push(res.url)
          this.$toast.clear()
        }
      })
    },
    tongueRead (file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(params).then(res => {
        console.log(res)
        if (res) {
          this.form.tongue_img = res.url
          this.$toast.clear()
        }
      })
    },
    personRead (file) {
      console.log(file.file)
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      console.log(params)
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(params).then(res => {
        console.log(res)
        if (res) {
          this.form.body_img = res.url
          this.$toast.clear()
        }
      })
    },
    handRead (file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      uploadPic(params).then(res => {
        console.log(res)
        if (res) {
          this.handArr.push(res.url)
          this.$toast.clear()
        }
        console.log(this.handArr)
      })
    },
    faceRead (file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      this.uploadImg(params)
    },
    onConfirmBirthPlace (val) {
      this.form.birth_province = `${val[0].name}`
      this.form.birth_city = `${val[1].name}`
      this.form.birth_area = `${val[2].name}`
      this.birthPlaceText = `${val[0].name}-${val[1].name}-${val[2].name}`
      this.birthPlace = `${val[2].code}`
      this.showBirthPlace = false
    },
    onConfirmNowPlace (val) {
      this.form.now_province = `${val[0].name}`
      this.form.now_city = `${val[1].name}`
      this.form.now_area = `${val[2].name}`
      this.nowPlaceText = `${val[0].name}-${val[1].name}-${val[2].name}`
      this.nowPlace = `${val[2].code}`
      this.showNowPlace = false
    },
    onConfirmBirth (val) {
      console.log(val)
      this.form.birth_time = val
      this.showBirth = false
    },
    onConfirmSolar (value) {
      let date = new Date(value)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      this.form.solar_date = `${Y}-${M}-${D}`
      this.showSolar = false
    },
    onConfirmLunar (value) {
      let date = new Date(value)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      this.form.lunar_date = `${Y}-${M}-${D}`
      this.showLunar = false
    },
    onConfirm(value) {
      this.form.sex = value
      this.showPicker = false;
    }
  }
}
</script>


<style lang="less">
  .home{
    width: 100%;
    min-height: 100vh;
    background: #fff;
    background: url('../assets/img/backBanner.png') no-repeat;
    background-position: top center;
    background-attachment: fixed;
    background-size: cover;
    padding: 10px;
    .main{
      width: 100%;
      min-height: 100vh;
      background: rgba(255, 255, 255, 0.9);
      padding: 15px 0;
      .info_main{
        font-size: 13px;
        color: #333;
        line-height: 1.5;
        padding: 0 10px;
      }
      .info_text{
        text-indent: 24px;
        padding: 0 10px;
      }
      .info_small_text{
        font-size: 13px;
        font-weight: bold;
        padding: 0 10px;
      }
      .user_main{
        margin-top: 20px;
        .tip_text{
          color: rgb(34, 141, 210);
          font-size: 12px;
          font-weight: bold;
          margin-left: 15px;
          margin-top: 10px;
        }
        .small_infos{
          color: #545454;
          margin-left: 15px;
        }
        .text_small{
          color: #ff8c00;
          font-size: 12px;
          margin-left: 15px;
        }
        .face_pic{
          width: 100%;
          padding: 0 15px;
          img{
            width: 100%;
          }
        }
        .up_load{
          margin-top: 10px;
          padding: 0 15px;
        }
      }
    }
    .van-cell-group{
      background: none;
      .van-cell{
        background: none;
      }
    }
    .submit_form{
      background-color: rgb(34, 141, 210);
      width: 150px;
      padding: 8px 0;
      font-weight: normal;
      color: #FFF;
      border-width: 1px;
      border-radius: 5px;
      font-size: 15px;
      text-align: center;
      margin: 40px auto 0;
    }
  }
</style>
