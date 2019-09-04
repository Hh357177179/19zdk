<template>
  <div class="order_manger">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 order_manger_main"></el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  data () {
    return{

    }
  },
  components: { Breadcrumb }
}
</script>

<style lang="less">
  .order_manger{
    width: 100%;
    height: 100%;
    .order_manger_main {
      border-top: 5px solid #f68b0e;
      .el-card__body {
        padding-bottom: 0;
      }
      .items {
        margin-right: 20px;
      }
    }
    .el-table td, .el-table th{
      padding: 8px 0;
    }
    .pagination{
      margin-top: 10px;
      float: right;
    }
  }
</style>

