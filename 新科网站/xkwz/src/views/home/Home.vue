<template>
  <div class="home">
    <Head></Head>
    <router-view></router-view>
    <!-- <div class="fixed_btn">
      <el-popover
        placement="left"
        popper-class='prop_tel'
        trigger="hover"
        content="400-4004-400">
        <p class="back_list" slot="reference">
          <span class="iconfont icon-phone"></span>
        </p>
      </el-popover>
      
      <p class="back_list">
        <span class="iconfont icon-weixin"></span>
      </p>
      <p class="back_list">
        <span class="iconfont icon-icon"></span>
      </p>
    </div> -->
    <!-- <Foot></Foot> -->
  </div>
</template>

<script>
import Head from '@/components/headCom.vue'
import Foot from '@/components/foootBar.vue'
export default {
  data () {
    return {
    }
  },
  components: { Head, Foot }
}
</script>


<style lang="less">
  .home{
    width: 100%;
    .fixed_btn{
      width: 50px;
      height: 153px;
      position: fixed;
      right: 0;
      top: 50%;
      color: #fff;
      z-index: 11111;
      .back_list{
        width: 50px;
        height: 50px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: #222;
        margin-bottom: 1px;
        text-align: center;
        line-height: 50px;
        span{
          font-size: 23px;
          cursor: pointer;
        }
      }
      .back_list:hover{
        background: @fontColor;
      }
    }
  }
  .prop_tel{
    background: #222 !important;
    color: #fff !important;
    font-size: 16px !important;
    border-color: #222 !important;
  }
  .el-popper[x-placement^=left] .popper__arrow{
    border-left-color: #222 !important;
  }
  .el-popper[x-placement^=left] .popper__arrow::after{
    border-left-color: #222 !important;
  }
</style>
