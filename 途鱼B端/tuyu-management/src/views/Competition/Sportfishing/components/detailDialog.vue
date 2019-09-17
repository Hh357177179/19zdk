<template>
  <div class="details">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <el-card>
        <div class="dialog_mains">
        <el-scrollbar style="height: 100%;">
          <div class="info_list">
            <span class="labels">钓场名称：</span>
            {{detailObj.title}}
          </div>
          <div class="info_list">
            <span class="labels">手机号码：</span>
            {{detailObj.phone}}
          </div>
          <div class="info_list">
            <span class="labels">场主姓名：</span>
            {{detailObj.name}}
          </div>
          <div class="info_list">
            <span class="labels">钓塘数量：</span>
            {{detailObj.number}}个
          </div>
          <div class="info_list">
            <span class="labels">所在城市：</span>
            {{detailObj.province}}-{{detailObj.city}}
          </div>
          <div class="info_list">
            <span class="labels">钓场地址：</span>
            {{detailObj.address}}
          </div>
          <div class="pic_list">
            <p class="labels">钓场图片：</p>
            <div class="pic_main">
              <div class="pic_card" v-for="(img, index) in imgArr" :key="index">
                <img :src="img" alt="">
              </div>
            </div>
          </div>
          <div class="info_list">
            <p class="labels">钓场介绍：</p>
            <p class="fish_info" v-html="detailObj.content"></p>
          </div>
        </el-scrollbar>
      </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fishDetail } from "@/api/fish/fish.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "新增用户"
    }
  },
  data() {
    return {
      detailObj: {},
      imgArr: []
    };
  },
  methods: {
    // 调用父级方法
    getParentData(row) {
      let params = {
        id: row.id,
        token: sessionStorage.getItem('token')
      };
      fishDetail(params).then(res => {
        console.log(res);
        this.imgArr = [...res.images.split(',')]
        this.detailObj = res;
      });
    },
    handleClose() {
      this.detailObj = {};
      this.imgArr = []
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less">
.dialog_mains {
  height: 450px;
  .info_list {
    padding: 10px 10px 10px 0;
    color: #333;
    .labels {
      // font-size: 16px;
      color: #666;
    }
    .fish_info {
      border-radius: 3px;
      margin-top: 10px;
      padding: 10px 20px;
    }
  }
  .pic_list{
    .pic_main{
      display: flex;
      justify-content: flex-start;
      .pic_card{
        width: 200px;
        height: 100px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
