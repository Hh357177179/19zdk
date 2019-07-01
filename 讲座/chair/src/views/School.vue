<template>
  <div class="school">
    <div class="school_main">
      <div
        class="list_card"
        v-for="(item, index) in schoolArr"
        :key="index"
        @click="classList(item.channel_id)"
      >
        <p class="titles">{{item.title}}</p>
        <p class="desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="foot_btn" @click="searchMe">查看我报名的讲座</div>
  </div>
</template>

<script>
import { getSchool, applySuccess } from "@/api/index";
export default {
  data() {
    return {
      schoolArr: []
    };
  },
  created () {
    
  },
  methods: {
    searchMe () {
      this.$router.push('/myapply')
    },
    classList(id) {
      console.log(id);
      // this.$router.push(`/enter/${id}`);
      window.location.href= `http://ymmweb.zhaodaka.vip/enter/${id}`
    },
    schoolList() {
      let params = {
        token: localStorage.getItem("tokenns")
      };
      getSchool(params).then(res => {
        console.log(res);
        this.schoolArr = res;
      });
    }
  },
  mounted() {
    let params = {
      token: localStorage.getItem('tokenns')
    }
    applySuccess(params).then(res => {
      if (res.is_new == 1) {
        this.$router.push('/user')
      } else {
        this.schoolList();
      }
    })
  }
};
</script>

<style lang="less">
.school {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  .school_main {
    padding-bottom: 55px;
    .list_card {
      padding: 15px 20px;
      background: #fff;
      margin-bottom: 10px;
      .titles {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      .desc {
        font-size: 15px;
        color: #666;
        margin-top: 5px;
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
}
</style>
