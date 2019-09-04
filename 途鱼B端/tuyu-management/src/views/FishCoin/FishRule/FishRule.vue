<template>
  <div class="fish_coin">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 fish_coin_main">
      <div class="rule_main">获取规则</div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  data () {
    return {}
  },
  components: { Breadcrumb }
}
</script>

<style lang="less">
  .fish_coin{
    .fish_coin_main{
      border-top: 5px solid #f68b0e;
      .rule_main{
        width: 100%;
        min-height: 800px;
        background: #ccc;
      }
    }
  }
</style>
