<template>
  <div class="home">
    <p class="top_title">今日有
      <span style="color: #0fc37c;font-weight:600;">{{planNumber}}</span>
      条计划</p>
    <Calendar v-on:choseDay="clickDay" :markDate="arr" v-on:changeMonth="changeDate"></Calendar>

    <!-- 弹出层 -->
    <van-popup v-model="showDay" position="right" :overlay="false" :style="{ width: '100%', height: '100%' }">
      <div class="prop_mains">
        <van-nav-bar :title="nowDate" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <van-icon name="plus" slot="right" />
        </van-nav-bar>
        <div class="drill_main">
          <div class="drill_list" v-for="(item,index) in nowList" :key="index">
            <div class="label_list">
              <span>{{item.type_text}}</span>
            </div>
            <div class="label_time">
              <span>{{item.start_time | dateFr}}</span>
              ——
              <span>{{item.end_time | dateFr}}</span>
            </div>
            <div class="label_note">
              <!-- <p class="label_name">备注：</p> -->
              <p>{{item.note}}</p>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 添加弹窗 -->
    <van-popup v-model="addShow" position="top" :style="{ width: '100%' }">
      <div class="addType">
        <van-field
          readonly
          clickable
          label="训练类型"
          :value="drillTypeVal"
          placeholder="请选择训练类型"
          @click="DrillType"
        />
        <van-field
          readonly
          clickable
          label="开始时间"
          :value="start_time"
          placeholder="请选择开始时间"
          @click="StartTime"
        />
        <van-field
          readonly
          clickable
          label="结束时间"
          :value="end_time"
          placeholder="请选择结束时间"
          @click="EndTime"
        />
        <van-field
          v-model="note"
          label="训练备注"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
        <div class="foot_btn">
          <div class="foot_btns calc_submit" @click="canlSubmit">取消</div>
          <div class="foot_btns add_submit" @click="addSubmit">确认添加</div>
        </div>
      </div>
    </van-popup>

    <!-- 训练类型 -->
    <van-popup v-model="typeShow" position="bottom">
      <van-picker
        show-toolbar
        title="训练类型"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- 选择开始时间 -->
    <van-popup v-model="startShow" position="bottom">
      <van-datetime-picker
        v-model="start_times"
        type="time"
        @cancel="startCancel"
        @confirm="startConfirm"
      />
    </van-popup>

    <!-- 结束时间 -->
    <van-popup v-model="endShow" position="bottom">
      <van-datetime-picker
        v-model="end_times"
        type="time"
        @cancel="endCancel"
        @confirm="endConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getCalenderList, addCalender } from '@/api/index.js'
import Calendar from 'vue-calendar-component';
export default {
  data () {
    return {
      start_times: '',
      end_times: '',
      note: '',
      sendEndTime: '',
      sendStartTime: '',
      startShow: false,
      endShow: false,
      end_time: '',
      start_time: '',
      typeShow: false,
      drillTypeVal: '',
      addShow: false,
      showDay: false,
      nowDate: '',
      year: '',
      month: '',
      day: '',
      calenderItem: [],
      planNumber: 0,
      columns: ['大课', '私教', '体能', '自主练习', '比赛'],
      types: '',
      nowList: [],
      arr:[],
      statusNum: 0
    }
  },
  methods: {
    canlSubmit () {
      this.addShow = false
      this.types = ''
      this.drillTypeVal = ''
      this.sendStartTime = '' 
      this.sendEndTime = ''
      this.note = ''
      this.start_time = ''
      this.end_time = ''
    },
    getNowDate () {
      var nowDates = new Date()
      let hh = nowDates.getHours()
      let mm = nowDates.getMinutes()
      console.log(hh,mm)
      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      this.start_times = `${hh}:${mm}`
      this.end_times = `${hh}:${mm}`
    },
    addSubmit () {
      if (this.drillTypeVal == '') {
        this.$toast({
          duration: 1000,
          message: '请选择训练类型'
        })
        
      } else if (this.start_time == '') {
        this.$toast({
          duration: 1000,
          message: '请选择开始时间'
        })
      } else if (this.end_time == '') {
        this.$toast({
          duration: 1000,
          message: '请选择结束时间'
        })
      } else {
        if (this.drillTypeVal == '大课') {
          this.types = 1
        } else if (this.drillTypeVal == '私教') {
          this.types = 2
        } else if (this.drillTypeVal == '体能') {
          this.types = 3
        } else if (this.drillTypeVal == '自主练习') {
          this.types = 4
        } else if (this.drillTypeVal == '比赛') {
          this.types = 5
        }
        let params = {
          token: localStorage.getItem('tokenns'),
          type: this.types,
          type_text: this.drillTypeVal,
          start_time: this.sendStartTime,
          end_time: this.sendEndTime,
          note: this.note
        }
        console.log(params)
        addCalender(params).then(res => {
          console.log(res)
          this.$toast.success('添加成功');
          this.types = ''
          this.drillTypeVal = ''
          this.sendStartTime = '' 
          this.sendEndTime = ''
          this.note = ''
          this.start_time = ''
          this.end_time = ''
          this.addShow = false
          this.showDay = false
          this.day = ''
          this.getList()
        })
      }
    },
    endConfirm () {
      // if (this.end_time == '')  this.end_time = '00:00'
      this.end_time = this.end_times
      let startStr = `${this.nowDate} ${this.end_time}:00`
      this.sendEndTime = Date.parse(new Date(startStr))  / 1000
      console.log(this.sendEndTime)
      this.endShow = false
    },
    endCancel () {
      this.endShow = false
    },
    startCancel () {
      this.startShow = false
    },
    startConfirm () {
      // if (this.start_time == '')  this.start_time = '00:00'
      this.start_time = this.start_times
      let startStr = `${this.nowDate} ${this.start_time}:00`
      console.log(startStr)
      this.sendStartTime = Date.parse(new Date(startStr))  / 1000
      console.log(this.sendStartTime)
      this.startShow = false
    },
    EndTime () {
      this.endShow = true
    },
    StartTime () {
      this.startShow = true
    },
    onCancel () {
      this.typeShow = false
    },
    onConfirm(value) {
      console.log(value)
      this.typeShow = false
      this.drillTypeVal = value
    },
    DrillType () {
      this.typeShow = true
    },
    onClickLeft () {
      this.statusNum = 0
      this.day = ''
      this.getList()
      this.nowList = []
      this.showDay = false
    },
    onClickRight () {
      this.addShow = true
      this.getNowDate()
      console.log(this.nowDate)
    },
    clickDay (data) {
      this.nowList = []
      this.nowDate = data
      this.statusNum = 1
      console.log('时间',data)
      let indexArrs = data.split('/')
      this.year = indexArrs[0]
      this.month = indexArrs[1]
      this.day = indexArrs[2]
      this.getList()
      this.showDay = true
    },
    changeDate (data) {
      console.log(data)
      let indexArrs = data.split('/')
      this.year = indexArrs[0]
      this.month = indexArrs[1]
      // this.day = indexArrs[2]
      this.getList()
    },
    dataTime (time) {
      var myDate = new Date(time * 1000)
      let y = myDate.getFullYear()
      let m = myDate.getMonth() + 1
      let d = myDate.getDate()
      return `${y}/${m}/${d}`
    },
    getList () {
      let params = {
        token: localStorage.getItem('tokenns'),
        year: this.year,
        month: this.month,
        day: this.day
      }
      getCalenderList(params).then(res => {
        if (res.list.length == 0 && this.statusNum == 1) {
          this.$toast({
            duration: 1000,
            message: '今日暂无计划'
          })
        } else {
          this.calenderItem = res.list
          this.planNumber = res.today
          this.nowList = res.list
          console.log(res.list)
          let arrs = []
          res.list.forEach(item => {
            // console.log(this.dataTime(item.start_time))
            arrs.push(this.dataTime(item.start_time))
          });
          this.arr = arrs
        }
      })
    }
  },
  mounted () {
    var myDate = new Date()
    this.year = myDate.getFullYear()
    this.month = myDate.getMonth() + 1
    console.log(this.year,this.month,this.day)
    this.getList()
  },
  components: {
    Calendar
  }
}
</script>

<style lang="less">
  .home{
    .top_title{
      color: #76A1FF;
      font-size: 18px;
      padding: 18px 10px;
    }
    .wh_content_all{
      background: #76A1FF !important;
    }
    .wh_content_item .wh_isToday{
      background: #0fc37c !important;
    }
    .addType{
      padding: 20px;
      .drill_type{
        font-size: 15px;
        color: #333;
        border-bottom: 1px solid #f0f0f0;
        line-height: 40px;
        .drill_type_val{
          color: #ccc;
          margin-left: 10px;
        }
        .chooseText{
          color: #666;
        }
      }
    }
    .foot_btn{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .foot_btns{
        width: 50%;
        font-size: 15px;
        line-height: 40px;
        text-align: center;
      }
      .calc_submit{
        color: #666;
      }
      .add_submit {
        color: #76A1FF;
        border-left: 1px solid #f0f0f0;
      }
    }
    .drill_main{
      padding: 0 20px;
      .drill_list{
        border-radius: 3px;
        padding: 10px;
        margin-top: 15px;
        box-shadow: 0px 4px 8px 0px #76A1FF;
        font-size: 15px;
        color: #333;
        .label_list{
          font-size: 16px;
          font-weight: 600;
          color: #76A1FF;
        }
        .label_time{
          margin-top: 5px;
        }
        .label_note{
          margin-top: 5px;
        }
      }
    }
    .wh_content_item>.wh_isMark{
      background: chocolate;
      border-radius: 50%;
    }
  }
</style>
