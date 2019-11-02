<template>
  <div class="home">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index" @click="navPath(item.url)">
          <img :src="item.image" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home_main">
      <div class="main_list" @click="navApply">
        <div class="list_back">少</div>
        <div class="list_text">在线报名</div>
      </div>
      <div class="main_list" @click="navNotice">
        <div class="list_back">儿</div>
        <div class="list_text">赛事通知</div>
      </div>
      <div class="main_list" @click="navDesc">
        <div class="list_back">春</div>
        <div class="list_text">晚会介绍</div>
      </div>
      <div class="main_list" @click="navActive">
        <div class="list_back">晚</div>
        <div class="list_text">活动图片</div>
      </div>
    </div>
    <div class="entrance">
      <div class="entrance_card">现场直播</div>
      <div class="entrance_card" @click="navVote">直通少儿春晚</div>
    </div>
    <div class="advertising">
      <div class="advertising_list">
        <van-divider>独家冠名</van-divider>
        <div class="advertising_pic">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in naming" :key="index" @click="navPath(item.url)">
              <img :src="item.image" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="advertising_list">
        <van-divider>特约赞助</van-divider>
        <div class="advertising_pic">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in sponsor" :key="index" @click="navPath(item.url)">
              <img :src="item.image" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="advertising_list">
        <van-divider>新闻动态</van-divider>
        <div class="advertising_pic" v-for="(item, index) in newList" :key="index" @click="newDetail(item.id)">
          <img :src="item.logo" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPicList, getNewList } from '@/api/index.js'
export default {
  data() {
    return {
      banner: [],
      naming: [],
      sponsor: [],
      page: 1,
      pagesize: 5,
      newList: [],
      count: 0
    };
  },
  created () {
    this.getBanner()
    this.getNaming()
    this.getSponsor()
    this.getNews()
    console.log(this.$route.params.id)
  },
  methods: {
    navVote () {
      this.$router.push('/vote')
    },
    navActive () {
      this.$router.push('/active')
    },
    newDetail (id) {
      console.log(id)
      this.$router.push({
        path: `/new-detail/${id}`,
      })
    },
    navDesc () {
      window.location.href  = 'https://mp.weixin.qq.com/s/KrBn2wbdCsjsDPru191eTw'
    },
    // 获取轮播
    getBanner () {
      let address = ''
      if (this.$route.params.id == 1) {
        address = '新疆'
      } else if (this.$route.params.id ==  2) {
        address = '江西'
      } else if (this.$route.params.id ==  3) {
        address = '辽宁'
      } else if (this.$route.params.id ==  4) {
        address = '上海'
      } else if (this.$route.params.id ==  5) {
        address = '浙江'
      }
      let params = {
        type: 1,
        address: address
      }
      getPicList(params).then(res => {
        this.banner = res
      })
    },
    // 获取独家冠名
    getNaming () {
      let address = ''
      if (this.$route.params.id == 1) {
        address = '新疆'
      } else if (this.$route.params.id ==  2) {
        address = '江西'
      } else if (this.$route.params.id ==  3) {
        address = '辽宁'
      } else if (this.$route.params.id ==  4) {
        address = '上海'
      } else if (this.$route.params.id ==  5) {
        address = '浙江'
      }
      let params = {
        type: 2,
        address: address
      }
      getPicList(params).then(res => {
        console.log(res)
        this.naming = res
      })
    },
     // 获取赞助
    getSponsor () {
      let address = ''
      if (this.$route.params.id == 1) {
        address = '新疆'
      } else if (this.$route.params.id ==  2) {
        address = '江西'
      } else if (this.$route.params.id ==  3) {
        address = '辽宁'
      } else if (this.$route.params.id ==  4) {
        address = '上海'
      } else if (this.$route.params.id ==  5) {
        address = '浙江'
      }
      let params = {
        type: 3,
        address: address
      }
      getPicList(params).then(res => {
        console.log(res)
        this.sponsor = res
      })
    },
    getNews () {
      let params = {
        page: this.page,
        pagesize: this.pagesize
      }
      getNewList(params).then(res => {
        console.log(res)
        this.count = res.count
        this.newList = res.list
      })
    },
    navPath (url) {
      console.log(url)
      window.location.href  = url
    },
    navApply () {
      this.$router.push('/apply')
    },
    navNotice () {
      this.$router.push('/notice')
    },
  }
};
</script>

<style lang="less">
.home {
  .banner {
    width: 100%;
    height: 200px;
    .van-swipe{
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .home_main {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .main_list {
      width: 20%;
      text-align: center;
      .list_back {
        width: 60px;
        height: 60px;
        background: #d33630;
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto 5px;
        font-size: 20px;
        font-weight: bold;
      }
      .list_text {
        font-size: 13px;
        color: #d33630;
      }
    }
  }
  .entrance {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .entrance_card {
      width: 150px;
      text-align: center;
      padding: 15px 0;
      font-size: 18px;
      color: #fff;
      background: #d33630;
      border-radius: 5px;
    }
  }
  .advertising {
    margin-top: 20px;
    padding: 0 10px 20px;
    .advertising_list {
      margin-top: 40px;
      .advertising_pic {
        width: 100%;
        height: 200px;
        .van-swipe{
          width: 100%;
          height: 100%;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

