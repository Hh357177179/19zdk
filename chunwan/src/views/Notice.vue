<template>
  <div class="notice">
    <div v-for="(item,index) in items" :key="index">
      <div class="card_list" @click="navDetail(item.id)">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from "@/api/index.js";
export default {
  data() {
    return {
      page: 1,
      pagesize: 10,
      items: [],
      count: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    navDetail (id) {
      this.$router.push({
        path: `/notice-detail/${id}`
      })
    },
    getList() {
      let params = {
        page: this.page,
        pagesize: this.pagesize
      };
      getNoticeList(params).then(res => {
        console.log(res);
        this.count = res.count;
        this.items = res.list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.notice {
  padding: 40px 40px 0;
  .card_list {
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0 auto 20px;
    letter-spacing: 5px;
  }
}
</style>
