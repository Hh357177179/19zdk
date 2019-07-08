<template>
  <div class="apply_record">
    <div class="apply_list" v-for="(item,index) in items" :key="index">
      <p class="apply_name"><span class="label_name">标题：</span>{{item.match_title}}</p>
      <p class="apply_time"><span class="label_name">报名时间：</span>{{item.order_time | dateFr}}</p>
    </div>
  </div>
</template>

<script>
import { applyList } from '@/api/index.js'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      items: [],
      counts: 0
    }
  },
  methods: {
    getList () {
      let params = {
        token: localStorage.getItem('tokenns'),
        page: this.page,
        pagesize: this.pagesize
      }
      applyList(params).then(res => {
        console.log(res)
        this.items = this.items.concat(res.list)
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
          this.$toast({
            duration: 1000,
            message: '没有更多了'
          })
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
  .apply_record{
    .apply_list{
      padding: 15px 10px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 15px;
      .apply_name{
        color: #666;
        margin-bottom: 10px;
        .label_name{
          color: #333;
        }
      }
      .apply_time{
        color: #666;
        .label_name{
          color: #333;
        }
      }
    }
  }
</style>
