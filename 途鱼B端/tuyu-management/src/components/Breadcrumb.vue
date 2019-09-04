<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="navTitle.bigTitle">{{navTitle.bigTitle}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{navTitle.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navTitle: {}
    }
  },
  created () {
    this.navTitle = this.$route.meta
  }
}
</script>
