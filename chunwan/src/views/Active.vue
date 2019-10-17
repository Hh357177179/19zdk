<template>
  <div class="active">
    <div class="card" v-for="(item,index) in items" :key="index" @click="navActiveDetail(item.id)">
      <p class="title">{{item.title}}</p>
      <div class="card_img">
        <img :src="item.logo" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { activeList } from "@/api/index.js";
export default {
  data() {
    return {
      items: [],
      page: 1,
      pagesize: 10,
      count: 0
    };
  },
  created () {
    this.getList()
  },
  methods: {
    navActiveDetail () {
      
    },
    getList () {
      let params = {
        page: this.page,
        pagesize: this.pagesize
      }
      activeList(params).then(res => {
        console.log(res)
        this.count = res.count
        this.items = res.list
      })
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  padding: 20px 10px;
  .card {
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .title{
      font-size: 14px;
      color: #333;
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .card_img{
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

