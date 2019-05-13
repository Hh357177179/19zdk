<template>
  <div class="compony">
    <div class="title">科新简介</div>
    <div class="line"></div>
    <div v-html="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  props:['message'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .compony{
    width: 1200px;
    margin: 50px auto 0;
    .title{
      font-size: 24px;
      color: #333;
      text-align: center;
    }
    .line{
      width: 60px;
      height: 3px;
      background: #dbdbdb;
      margin: 10px auto;
    }
  }
</style>
