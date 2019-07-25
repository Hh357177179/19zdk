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
    <div class="foot_tab" v-if='personalType == 1'>
      <div class="tab_list" :class="indexColor == 1 ? 'addColor' : ''" @click="choSchool">学校</div>
      <div class="tab_list" :class="indexColor == 2 ? 'addColor' : ''" @click="choCommunity">社区</div>
      <div class="tab_list" :class="indexColor == 3 ? 'addColor' : ''" @click="searchMe">我的</div>
    </div>
    <div class="foot_tab" v-if='personalType == 2'>
      <!-- <div class="tab_list" :class="indexColor == 1 ? 'addColor' : ''" @click="choSchool">学校</div> -->
      <div class="tab_list" :class="indexColor == 2 ? 'addColor' : ''" @click="choCommunity">社区</div>
      <div class="tab_list" :class="indexColor == 3 ? 'addColor' : ''" @click="searchMe">我的</div>
    </div>
  </div>
</template>

<script>
import { getSchool, applySuccess, getUsers } from "@/api/index";
export default {
  data() {
    return {
      schoolArr: [],
      indexColor: 1,
      type: 1,
      personalType: 0
    };
  },
  created () {
    let params = {
      token: localStorage.getItem("tokenns")
    }
    getUsers(params).then(res => {
      console.log(res)
      localStorage.setItem('perType', res.type)
      if (res.type == 2) {
        this.type = 2
        this.indexColor = 2
      } else {
        if (this.$route.params.stateType) {
          this.type = 2
          this.indexColor = 2
        } else {
          this.type = 1
          this.indexColor = 1
        }
      }
      this.personalType = res.type
    })
  },
  methods: {
    choSchool () {
      this.indexColor = 1
      this.type = 1
      this.schoolList()
    },
    choCommunity () {
      this.indexColor = 2
      this.type = 2
      this.schoolList()
    },
    searchMe () {
      this.indexColor = 2
      this.$router.push('/myapply')
    },
    classList(id) {
      console.log(id);
      // this.$router.push(`/enter/${id}`);
      window.location.href= `http://ymmweb.zhaodaka.vip/enter/${id}`
    },
    schoolList() {
      let params = {
        token: localStorage.getItem("tokenns"),
        type: this.type
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
    padding-bottom: 105px;
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
    bottom: 50px;
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
