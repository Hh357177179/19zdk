<template>
  <div class="game">
    <div class="game_card" @click="RouterDetail(item.id)" v-for='(item, index) in gameItem' :key="index">
      <div class="card_title">{{item.title}}</div>
      <!-- <div class="card_text">{{item.content}}</div> -->
      <div class="contents" v-html="item.content">{{item.content}}</div>
      <div class="local_info">
        <p>地点：{{item.address}}</p>
        <p>时间：{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { gameList } from '@/api/index.js'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      gameItem: [],
      counts: 0
    }
  },
  methods: {
    RouterDetail (id) {
      console.log(id)
      window.location.href = `/detail/${id}`
    },
    // 获取比赛列表
    getLists () {
      let params = {
        page: this.page,
        pagesize: this.pagesize
      }
      gameList(params).then(res => {
        console.log(res)
        this.gameItem = this.gameItem.concat(res.list)
        this.counts = res.count
      })
    },
    handleScroll () {
   		//变量scrollTop是滚动条滚动时，距离顶部的距离
   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
   		//变量windowHeight是可视区的高度
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
   		//变量scrollHeight是滚动条的总高度
   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop + windowHeight == scrollHeight){
//         console.log('loadingMore')
        if (this.page * this.pagesize < this.counts) {
          this.page = this.page + 1
          // console.log(this.page)
          this.getLists()
        } else {
          this.$toast('没有更多了')
        }
      }
    },
  },
  
  mounted () {
    this.getLists()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less">
  .game{
    border: 1px solid rgba(0,0,0,0);
    padding: 0 20px 60px;
    .game_card{
      border-radius: 3px;
      padding: 10px;
      margin-top: 15px;
      box-shadow:0px 4px 8px 0px #76A1FF;
      .card_title{
        font-size: 16px;
        margin-bottom: 3px;
      }
      .contents{
        font-size: 14px;
        color: #333;
        img{
          width: 100%;
        }
      }
      .card_text{
        font-size: 15px;
        color: #333;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 10px;
      }
      .local_info{
        margin-top: 10px;
        color: #666;
        font-size: 14px;
        p{
          line-height: 20px;
        }
      }
    }
  }
</style>
