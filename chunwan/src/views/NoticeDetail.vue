<template>
  <div class="notice_etail">
    <div v-html="detail.content"></div>
  </div>
</template>

<script>
import { getNoticeDetail } from '@/api/index.js'
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
      getNoticeDetail(params).then(res => {
        console.log(res)
        document.title = res.title
        this.detail = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .notice_etail{
    padding: 20px 10px;
  }
</style>
