<template>
  <div class="edit_rule">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20">
      <tinymce v-model="content" :height="300"/>
      <div class="edit_btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addRule">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import Tinymce from "@/components/Tinymce";
import { rushRuleFish, getRuleFish } from '@/api/fish/fish.js'
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.getContent()
  },
  methods: {
    getContent () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getRuleFish(params).then(res => {
        console.log(res)
        if (res) {
          this.content = res.article
        }
      })
    },
    addRule () {
      let params = {
        article: this.content,
        token: sessionStorage.getItem('token')
      }
      rushRuleFish(params).then(res => {
        console.log(res)
        if (res) {
          this.$router.back()
        }
      })
    },
    cancel () {
      this.$router.back()
    }
  },
  components: { Tinymce, Breadcrumb }
}
</script>

<style lang="less" scoped>
  .edit_rule{
    .edit_btn{
      float: right;
      margin: 20px 0;
    }
  }
</style>
