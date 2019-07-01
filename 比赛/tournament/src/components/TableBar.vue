<template>
  <div class="table">
    <router-link tag="li" v-for="(li, index) in barArr" :key="index" :to='li.uri'>
      <p class="iconfont icon_img" :class="li.icons"></p>
      <p>{{li.text}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataIndex: -1,
      barArr: [
        { uri: '/home', text: '首页', icons: 'icon-shouye' },
        { uri: '/game', text: '比赛', icons: 'icon-bisai' },
        { uri: '/me', text: '我的', icons: 'icon-wode' }
      ]
    }
  },
  watch:{
    $route(to,from){
      if (to.path == '/userInfo') this.dataIndex = 2
    }
  },
  methods: {
    routerNav(url,index) {
      this.dataIndex = index
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
  .table{
    background: #fff;
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #f0f0f0;
    li{
      width: 33.33%;
      text-align: center;
      .icon_img{
        font-size: 20px;
        margin: 3px 0;
      }
    }
    .router-link-active{
      color: #76A1FF;
    }
  }
</style>
