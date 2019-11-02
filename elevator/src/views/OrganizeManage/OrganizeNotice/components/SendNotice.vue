<template>
  <div class="sennd_notice">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      :direction="direction"
      :before-close="handleClose"
      size="500px"
    >
      <div class="sennd_notice_main">
        <el-form
          :model="aeForm"
          :rules="rules"
          ref="aeForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="接收单位" prop="name" class="change_input">
            <el-select v-model="aeForm.name" placeholder="请选择接收单位" @change="getPersonDesc">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="0" class="change_input">
            <div class="list_main" v-if="noData == 1">
              <el-scrollbar style="height: 100%;">
                <!-- <div class="check_all" @click="checkAll">全选</div> -->
                <div v-for="(item, index) in userArr" :key="index" class="lists clearfix" @click="clickList(index)">
                  <p class="choose_pic">
                    <img v-if="item.status == true" src="../../../../assets/img/choose.png" alt="">
                    <img v-if="item.status == false" src="../../../../assets/img/nochoose.png" alt="">
                  </p>
                  <p class="cho_name" :class="item.status == true ? 'ckeck_color' : ''">{{item.name}}</p>
                  <p class="cho_iden" :class="item.status == true ? 'ckeck_color' : ''" v-if="item.role == 1">维保人员</p>
                  <p class="cho_iden" :class="item.status == true ? 'ckeck_color' : ''" v-if="item.role == 2">安全员</p>
                  <p class="cho_iden" :class="item.status == true ? 'ckeck_color' : ''" v-if="item.role == 3">管理员</p>
                  <p class="cho_phone" :class="item.status == true ? 'ckeck_color' : ''">{{item.phone}}</p>
                </div>
              </el-scrollbar>
            </div>
            <div class="clear"></div>
            <div class="no_text" v-if="noData == 2">该单位，暂无人员可选~</div>
          </el-form-item>
          <el-form-item class="change_input" label="公告内容" prop="content">
            <el-input placeholder="请输入公告内容" type="textarea" class="textareas" v-model="aeForm.content"></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom_btn">
          <el-button class="list_btn" @click="handleClose" type="info">取 消</el-button>
          <el-button class="list_btn" type="primary" @click="submitForm">立即发布</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { unitList, getUserList, sendNotices } from "@/api/organize/organize.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "发布公告"
    }
  },
  data() {
    return {
      noData: 0,
      direction: "ltr",
      aeForm: {
        name: "",
        content: '',
        is_all: ''
      },
      options: [],
      rules: {
        name: [
          { required: true, message: '请选择接收单位', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请选输入公告内容', trigger: 'blur' }
        ]
      },
      userArr: [],
      checkUser: [],
      checkArr: []
    };
  },
  methods: {
    submitForm () {
      this.$refs.aeForm.validate((valid) => {
        if (valid) {
          if (this.checkUser.length != 0) {
            if (this.checkUser.length == this.userArr.length) {
              this.aeForm.is_all = 1
            } else {
              this.aeForm.is_all = 0
            }
            let params = {
              token: sessionStorage.getItem('token'),
              sub_group_id: this.aeForm.name,
              is_all: this.aeForm.is_all,
              sub_users: JSON.stringify(this.checkUser),
              content: this.aeForm.content
            }
            console.log(params)
            sendNotices(params).then(res => {
              console.log(res)
              if (res) {
                this.$message({
                  message: '公告发布成功',
                  type: 'success'
                });
                this.$emit('updateAll')
                this.handleClose()
              }
            })
          } else {
            this.$message.error('请选择接收公告人员');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clickList (index) {
      console.log(index)
      this.userArr[index].status = !this.userArr[index].status
      let arr = []
      this.userArr.forEach(element => {
        let obj = {}
        if (element.status == true) {
          obj.user_id = element.id
          obj.name = element.name
          arr.push(obj)
        }
      });
      this.checkUser = arr
    },
    checkAll () {

    },
    getUserList(id) {
      let params = {
        token: sessionStorage.getItem("token"),
        page: 1,
        pagesize: 1000,
        group_id: id,
        role: "",
        keyword: ""
      };
      getUserList(params).then(res => {
        console.log("组织下人员", res);
        console.log(res.list);
        res.list.forEach(element => {
          element.status = false
        });
        if (res.list.length == 0) {
          this.noData = 2
        } else {
          this.noData = 1
        }
        this.userArr = res.list;
      });
    },
    getUnitList() {
      let params = {
        token: sessionStorage.getItem("token")
      };
      unitList(params).then(res => {
        console.log(res);
        this.options = res;
      });
    },
    getPersonDesc() {
      console.log(this.aeForm.name);
      this.getUserList(this.aeForm.name);
    },
    getParentData() {
      this.getUnitList();
    },
    handleClose() {
      this.$refs.aeForm.resetFields()
      this.noData = 0
      this.aeForm.name = ''
      this.aeForm.content = ''
      this.aeForm.is_all = ''
      this.userArr = []
      this.checkUser = []
      this.checkArr = []
      this.options = []
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less">
.change_input {
  width: 450px;
  .textareas{
    textarea{
      min-height: 150px !important;
    }
  }
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-textarea{
    width: 100%;
  }
}
.bottom_btn {
  border-top: 1px dashed #f0f0f0;
  position: absolute;
  padding: 40px 0 20px 0;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .list_btn {
    width: 35%;
  }
}
.list_main{
  width: 420px;
  height: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: right;
  padding: 0 20px;
  .el-scrollbar__wrap {
    overflow-x: hidden;
   }
  .choose_pic{
    width: 20px;
    height: 20px;
    img{
      float: left;
      width: 100%;
      height: 100%;
    }
  }
  .lists{
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .cho_name {
    width: 130px;
    font-weight: bold;
  }
  .cho_iden {
    width: 100px;
    color:#666;
  }
  .cho_phone{
    color: #999;
  }
  .ckeck_color {
    color: #409EFF;
  }
}
 .no_text{
    width: 100%;
    text-align: center;
    color: #666;
    line-height: 50px;
  }
</style>

