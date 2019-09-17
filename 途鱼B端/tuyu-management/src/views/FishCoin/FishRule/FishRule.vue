<template>
  <div class="fish_coin">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 fish_coin_main">
      <el-card class="rule_main">
        <!-- <el-scrollbar style="height: 100%;"> -->
          <div v-html="rule"></div>
        <!-- </el-scrollbar> -->
      </el-card>
      <el-button type="primary" class="edit_btn" @click="editRule">编辑规则</el-button>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getRuleFish } from "@/api/fish/fish.js";
export default {
  data() {
    return {
      rule: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    editRule() {
      this.$router.push("/fishcoin/edit-fish");
    },
    getList() {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getRuleFish(params).then(res => {
        console.log(res);
        this.rule = res.article;
      });
    }
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.fish_coin {
  .fish_coin_main {
    border-top: 5px solid #f68b0e;
    .rule_main {
      width: 100%;
      min-height: 600px;
    }
    .edit_btn {
      float: right;
      margin: 20px 0;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
