<template>
  <div class="details">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20 sport_main">
      <div class="dialog_main">
        <el-form ref="addFishFrom" :model="addFishFrom" :rules="rules" label-width="120px">
          <el-form-item label="钓场名称:" prop="title" class="input_item">
            <el-input v-model="addFishFrom.title" placeholder="请输入钓场名称"></el-input>
          </el-form-item>
          <el-form-item label="钓场图片:" prop>
            <el-upload
              action="/api/project/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :limit="4"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <p style="color:#f00;font-size: 13px;">建议5M以内，比例2:1</p>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
          <el-form-item label="钓塘数量:" class="small_input">
            <el-input-number
              v-model="addFishFrom.number"
              controls-position="right"
              @change="handleChangeNum"
              :min="1"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="所在城市:" prop="province" class="input_item">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="钓场地址:" prop="address" class="input_item">
            <el-input v-model="addFishFrom.address" placeholder="请输入钓场地址"></el-input>
          </el-form-item>
          <el-form-item label="钓场介绍:" prop="content">
            <tinymce v-model="addFishFrom.content" :height="300"/>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button @click="cancel" type="danger">取 消</el-button>
            <el-button @click="submitAdd" type="primary">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addfishMixin } from "@/mixin/addFishMix";
import Breadcrumb from "@/components/Breadcrumb";
import { addFish } from "@/api/fish/fish.js";
import {
  provinceAndCityDataPlus,
  CodeToText,
  provinceAndCityData
} from "element-china-area-data";
import Tinymce from "@/components/Tinymce";
export default {
  mixins: [addfishMixin],
  data() {
    return {
      // options: provinceAndCityDataPlus,
      options: provinceAndCityData,
      selectedOptions: [],
      imgArr: [],
      addFishFrom: {
        title: "",
        images: "",
        number: "",
        province: "",
        city: "",
        address: "",
        content: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      showUpload: true
    };
  },
  methods: {
    handleExceed(files, fileList) {
      // console.log(files, fileList)
      this.$message.error("最多只可以上传4张图片哦~");
    },
    handleSuccess(response, file, fileList) {
      console.log("已经上传的", fileList);
      this.imgArr = [...fileList];
      console.log("上传列表", this.imgArr);
    },
    handleRemove(file, fileList) {
      this.imgArr = [...fileList];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(value) {
      let arr = [];
      value.forEach(element => {
        arr.push(CodeToText[element]);
      });
      this.addFishFrom.province = arr[0];
      this.addFishFrom.city = arr[1];
    },
    // 添加
    submitAdd() {
      this.$refs.addFishFrom.validate(valid => {
        if (valid) {
          let imgs = [];
          this.imgArr.forEach(element => {
            let img = element.response.data.url;
            imgs.push(img);
          });
          let params = {
            user_id: this.$route.params.id,
            title: this.addFishFrom.title,
            images: imgs.join(','),
            number: this.addFishFrom.number,
            province: this.addFishFrom.province,
            city: this.addFishFrom.city,
            address: this.addFishFrom.address,
            content: this.addFishFrom.content,
            token: sessionStorage.getItem('token')
          };
          console.log(params);
          addFish(params).then(res => {
            if (res) {
              console.log(res);
              this.$message({
                showClose: true,
                message: "添加钓塘成功！",
                type: "success",
                duration: 2000
              });
              this.$router.push("/competition/sport-fishing");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$router.back();
    },
    handleChangeNum(value) {
      console.log(value);
    }
  },
  components: { Tinymce, Breadcrumb }
};
</script>

<style lang="less" scoped>
.sport_main {
  border-top: 5px solid #f68b0e;
  .dialog_main {
    .input_item {
      width: 400px;
      .el-cascader {
        width: 100%;
      }
    }
    .small_input {
      width: 200px;
      .el-input__inner {
        float: left;
      }
    }
  }
}
</style>
