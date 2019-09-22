<template>
  <div class="add_shop">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20 sport_main">
      <div class="dialog_main">
        <el-form ref="addFrom" :model="addFrom" :rules="rules" label-width="90px">
          <el-form-item label="商品名称:" prop="title" class="input_item">
            <el-input v-model="addFrom.title" placeholder="请输入商品名称"></el-input>
          </el-form-item>
           <el-form-item label="商品Logo:">
            <el-upload
              action="/admin/project/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreviewlogo"
              :on-remove="handleRemovelogo"
              :on-success="handleSuccesslogo"
              :limit="1"
              :on-exceed="handleExceedlogo"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <p style="color:#f00;font-size: 13px;">建议5M以内，比例2:1</p>
            <el-dialog :visible.sync="dialogVisiblelogo">
              <img width="100%" :src="dialogImageUrllogo" alt>
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品图片:">
            <el-upload
              action="/admin/project/upload"
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
          <el-form-item label="规格:" >
            <div class="rules_tetle">
              <p>规格名称</p>
              <p>所需鱼币</p>
              <p>库存</p>
              <el-button type="primary" size="small" @click="addRule">添加</el-button>
            </div>
            <div v-for="(item, index) in specsFrom" :key="index">
              <div class="rules_input">
                <el-input class="inputss" v-model="item.spec_title" placeholder="请输入规格名称"></el-input>
                <el-input class="inputss" v-model="item.price" placeholder="请输入所需鱼币"></el-input>
                <el-input class="inputss" v-model="item.stock" placeholder="请输入库存"></el-input>
                <el-button type="text" v-if="index != 0" @click="deleteRule(index)">删除</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品分类:" class="input_item">
            <el-select v-model="addFrom.cate_id" placeholder="请选择商品分类">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单人限购:" prop="quota" class="input_item">
            <el-input v-model="addFrom.quota" placeholder="请输入限购数量"></el-input>
          </el-form-item>
          <el-form-item label="排列顺序:" prop="sort" class="input_item">
            <el-input v-model="addFrom.sort" placeholder="请输入排列顺序"></el-input>
          </el-form-item>
          <el-form-item label="商品介绍:" prop="content">
            <tinymce v-model="addFrom.content" :height="300"/>
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
import Breadcrumb from "@/components/Breadcrumb";
import Tinymce from "@/components/Tinymce";
import { shopList, goodsAdd } from '@/api/shop/shop.js'
export default {
  data() {
    return {
      specsFrom: [
        {
          spec_no: Date.parse(new Date()),
          spec_title: '',
          price: '',
          stock: '',
          sold: '0'
        }
      ],
      addFrom: {
        cate_id: "",
        title: "",
        content: "",
        logo: "",
        image: "",
        specs: '',
        quota: "0",
        sort: ""
      },
      rules: {},
      imgArr: [],
      dialogVisible: false,
      dialogImageUrl: "",
      dialogVisiblelogo: false,
      dialogImageUrllogo: "",
      options: [],
    };
  },
  created () {
    this.getType()
  },
  methods: {
    cancel () {
      this.$router.back()
    },
    submitAdd () {
      let num = 0
      for (let i = 0; i < this.specsFrom.length; i++) {
        if (this.specsFrom[i].spec_title == '' || this.specsFrom[i].price == '' || this.specsFrom[i].stock == '') {
          num = 0
          break;
        } else {
          num = 1
        }
      }
      let imgs = [];
      this.imgArr.forEach(element => {
        let img = element.response.data.url;
        imgs.push(img);
      });
      let params = {
        cate_id: this.addFrom.cate_id,
        title: this.addFrom.title,
        content: this.addFrom.content,
        logo: this.addFrom.logo,
        image: imgs.join(','),
        specs: JSON.stringify(this.specsFrom),
        quota: this.addFrom.quota,
        sort: this.addFrom.sort,
        token: sessionStorage.getItem('token')
      }
      // console.log(params)
      if (params.title == '') {
        this.$message.error('请输入商品名称');
      } else if (params.logo == '') {
        this.$message.error('请上传商品Logo');
      } else if (params.images == '') {
        this.$message.error('请上传商品图片');
      } else if (num == 0) {
        this.$message.error('请输入规格');
      } else if (params.cate_id == '') {
        this.$message.error('请选择商品分类');
      } else if (params.quota == '') {
        this.$message.error('请输入限购数量');
      } else if (params.content == '') {
        this.$message.error('请输入商品描述');
      } else {
        console.log(params)
        goodsAdd(params).then(res => {
          console.log(res)
          if (res) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.back()
          }
        })
      }
    },
    addRule () {
      let obj = {
        spec_no: Date.parse(new Date()),
        spec_title: '',
        price: '',
        stock: '',
        sold: '0'
      }
      this.specsFrom.push(obj)
      console.log(this.specsFrom)
    },
    deleteRule (i) {
      console.log(i)
      this.specsFrom.splice(i,1)
      console.log(this.specsFrom)
    },
    getType () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      shopList(params).then(res => {
        this.options = res
      })
    },
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
    handleExceedlogo(files, fileList) {
      // console.log(files, fileList)
      this.$message.error("最多只可以上传1张图片哦~");
    },
    handleSuccesslogo(response, file, fileList) {
      console.log("已经上传的", fileList);
      this.addFrom.logo= fileList[0].response.data.url
    },
    handleRemovelogo(file, fileList) {
      this.addFrom.logo= ''
    },
    handlePictureCardPreviewlogo(file) {
      this.dialogImageUrllogo = file.url;
      this.dialogVisiblelogo = true;
    }
  },
  components: { Breadcrumb, Tinymce }
};
</script>

<style lang="less" scoped>
.add_shop {
  .sport_main {
    border-top: 5px solid #f68b0e;
    .dialog_main {
      .input_item {
        width: 400px;
        .el-cascader {
          width: 100%;
        }
        .el-select{
          width: 100%;
        }
      }
      .rules_tetle{
        display: flex;
        justify-content: flex-start;
        p{
          margin-right: 40px;
          width: 200px;
          text-align: center;
        }
      }
      .rules_input{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        .inputss{
          margin-right: 40px;
          width: 200px;
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
}
</style>