<template>
  <div class="about">
    <div class="about_banner">
      <img src="../../assets/img/gsjjbanner.jpg" alt>
    </div>
    <div class="nav_bar">
      <div class="nav_list clearfix">
        <p
          v-for="(path,index) in this.titleArr"
          :key="index"
          class="nav_li"
          @click="smallNav(index,path.class_id)"
          :class="num == index ? 'activeColor' : ''"
        >{{path.name}}</p>
      </div>
    </div>
    <Compony v-if='isShow == 0' :message='message'></Compony>
    <Case v-if='isShow == 1' :message='message'></Case>
    <Tel v-if='isShow == 2'></Tel>
  </div>
</template>

<script>
import { getColumn, getPages } from '@/api/index.js'
import Compony from '@/components/compony.vue'
import Case from '@/components/case.vue'
import Tel from '@/components/tel.vue'
export default {
  data() {
    return {
      titleArr: [],
      num: 0,
      isShow: 0,
      class_id: '',
      message: ''
    };
  },
  methods: {
    getOnly () {
      getPages(this.class_id).then(res => {
        console.log(res)
        this.message = res.content
      })
    },
    smallNav (index,id) {
      this.num = index
      this.isShow = index
      this.class_id = id
      this.getOnly()
    },
    getNavBar() {
      getColumn().then(res => {
        this.titleArr = res[this.$route.params.id - 1].sub
        this.class_id = res[this.$route.params.id - 1].sub[0].class_id
        this.getOnly()
      })
    }
  },
  mounted() {
    this.getNavBar();
  },
  components: { Compony, Case, Tel }
};
</script>

<style lang="less">
.about {
  width: 100%;
  height: 100%;
  .about_banner {
    width: 100%;
    height: 475px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nav_bar {
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    height: 70px;
    .nav_list {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .nav_li {
        float: left;
        border-right: 1px solid #f0f0f0;
        color: #333;
        margin-top: 20px;
        padding: 0 80px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .activeColor {
    color: @fontColor !important;
  }
}
</style>
