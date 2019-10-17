<template>
  <div class="detail">
    <p class="title">{{detail.title}}</p>
    <div class="logo">
      <img :src="detail.logo" alt="">
    </div>
    <van-divider>详细介绍</van-divider>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script>
import { getNewDetail } from '@/api/index.js'
export default {
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    getDetail (id) {
      let params = {
        id: id
      }
      getNewDetail(params).then(res => {
        console.log(res)
        this.detail = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .detail{
    padding: 0 10px;
    .title {
      font-size: 15px;
      font-weight: bold;
      color: #333;
      padding: 10px 0;
      text-align: center;
    }
    .logo{
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
