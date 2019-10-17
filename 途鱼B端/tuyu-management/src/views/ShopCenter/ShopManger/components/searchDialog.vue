<template>
  <div class="search">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="mains">
        <div class="display_main">
          <div>商品名称：{{searchObj.title}}</div>
          <div>
            <p v-for="(item, index) in searchObj.specs" :key="index">
            <span class="label_right">规格：{{item.spec_title}}</span>
            <span class="label_right">鱼币：{{item.price}}</span>
            <span class="label_right">库存：{{item.stock}}</span>
            <span class="label_right">销量：{{item.sold}}</span>
          </p>
          </div>
          <div v-if="searchObj.status == 1">上架时间：{{searchObj.update_time}}</div>
          <div v-else>下架时间：{{searchObj.update_time}}</div>
          <div>商品状态：{{searchObj.status == 0 ? '已下架' : '已上架'}}</div>
          <div>排列顺序：{{searchObj.sort}}</div>
          <div v-if="searchObj.quota == 0">单人限购：不限购</div>
          <div v-else>单人限购：{{searchObj.quota}}</div>
        </div>
        <div class="pics">
          <img :src="searchObj.logo" alt="">
        </div>
      </div>
      <el-card class="mt10">
        <div class="detialshow" v-html="searchObj.content"></div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchShop } from "@/api/shop/shop.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "查看详情"
    }
  },
  data() {
    return {
      rowObj: {},
      searchObj: {}
    };
  },
  methods: {
    getParentData(row) {
      console.log(row);
      this.rowObj = row;
      this.getDetail(row.id)
    },
    getDetail (id) {
      let params = {
        id: id,
        token: sessionStorage.getItem('token')
      }
      searchShop(params).then(res => {
        console.log(res.content)
        this.searchObj = res
      })
    },
    // 关闭弹窗，直接修改父组件的属性
    handleClose() {
      this.searchObj = {}
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less">
  .search{
    .mains{
      display: flex;
      justify-content: space-around;
      .label_right{
        margin-right: 20px;
      }
    }
    .display_main{
      font-size: 15px;
      div{
        margin-bottom: 20px;
      }
    }
    .pics{
      width: 200px;
      height: 100px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .detialshow{
      width: 100%;
      height: 100%;
      .wscnph{
        width: 100% !important;
      }
    }
  }
</style>
