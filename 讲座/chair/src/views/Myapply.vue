<template>
  <div class="my_apply">
    <div class="apply_main">
      <div class="card_list" v-for="(item, index) in myList" :key="index">
        <div @click="lookDetail(item.channel_id)">
          <p class="titles">{{item.title}}</p>
          <p class="teacher">讲座/辅导老师：{{item.teacher_name}}</p>
          <p class="teacher">讲座/辅导时间：{{item.start_time}}</p>
          <p class="teacher">讲座/辅导地点：{{item.address}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="foot_btn" @click="searchClass">{{searchText}}</div> -->
    <div class="foot_tab">
      <div class="tab_list" @click="searchClass">学校</div>
      <div class="tab_list" @click="searchCommunity">社区</div>
      <div class="tab_list addColor">我的</div>
    </div>
  </div>
</template>

<script>
import { getMyList } from '@/api/index'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      myList: [],
      page: 1,
      pagesize: 10,
      counts: 0,
      searchText: ''
    }
  },
  methods: {
    searchCommunity () {
      this.$router.push({
        name: 'school',
        params: {
          stateType: 1
        }
      })
    },
    searchClass () {
      this.$router.push('/school')
    },
    lookDetail (id) {
      console.log(id)
      this.$router.push(`/medetail/${id}`)
    },
    getList () {
      let params = {
        token: localStorage.getItem('tokenns'),
        page: this.page,
        pagesize: this.pagesize
      }
      getMyList(params).then(res => {
        console.log(res)
        this.loading = false
        this.finished = true
        this.myList = this.myList.concat(res.list)
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
          this.getList()
        } else {
          this.$toast('没有更多了')
        }
      }
    },
  },
  mounted () {
    this.getList()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less">
  .my_apply{
    width: 100%;
    min-height: 100vh;
    background: #f6f6f6;
    .apply_main{
      padding-bottom: 60px;
      .card_list{
        padding: 15px 0px 5px;
        background: #fff;
        margin-bottom: 10px;
        .titles{
          font-size: 16px;
          color: #333;
          font-weight: 600;
          padding: 0 20px;
        }
        .teacher{
          font-size: 15px;
          color: #666;
          line-height: 25px;
          padding: 0 20px;
        }
        .sign_in_btn{
          width: 60%;
          font-size: 15px;
          background: #cba787;
          text-align: center;
          line-height: 35px;
          color: #fff;
          border-radius: 5px;
          margin: 10px auto;
        }
      }
    }
    .foot_btn {
      width: 100%;
      height: 50px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #cba787;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      font-weight: 600;
      border-top: 1px solid #f0f0f0;
    }
    .foot_tab{
      display: flex;
      justify-content:space-between;
      text-align: center;
      position: fixed;
      bottom: 0px;
      left: 0;
      width: 100%;
      .tab_list{
        width: 50%;
        background: #fff;
        font-size: 16px;
        line-height: 50px;
        color: #ccc;
      }
      .addColor {
        color: #cba787;
        font-weight: 600;
      }
    }
  }
</style>
