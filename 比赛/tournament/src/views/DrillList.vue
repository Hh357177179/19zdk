<template>
  <div class="drill">
    <div class="drill_list" v-for="(item, index) in planItem" :key="index">
      <div class="drill_name">
        <span class="label_name">训练类型：</span>
        <span>{{item.type_text}}</span>
      </div>
      <div class="drill_time">
        <span class="label_name">训练时间：</span>
        <span>{{item.start_time | dateFr}}</span>
        至
        <span>{{item.end_time | dateFr}}</span>
      </div>
      <div class="drill_note">
        <span class="label_name">备注：</span>
        <span>{{item.note}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {planList} from '@/api/index.js'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      planItem: [],
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
      planList(params).then(res => {
        console.log(res)
        this.planItem = this.planItem.concat(res.list)
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
  .drill{
    padding: 0 10px;
    padding-bottom: 60px;
    .drill_list{
      border-bottom: 1px solid #f0f0f0;
      padding: 15px 10px;
      font-size: 15px;
      .drill_name, .drill_time, .drill_note{
        line-height: 25px;
        color: #666;
        .label_name{
          color: #333;
        }
      }
    }
  }
</style>
