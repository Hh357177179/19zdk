<template>
  <div class="organize_notice">
    <el-card class="cards">
      <div class="titles">
        <div>
          <span class="iconfont icon-gonggao"></span>
          <span>组织公告</span>
        </div>
        <div class="rush el-icon-refresh-right"></div>
      </div>
      <div class="mt40 clearfix">
        <el-button style="float:right;" type="primary" icon="el-icon-message-solid">发布公告</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
.organize_notice {
  .cards {
    position: relative;
    .titles {
      width: 100%;
      padding: 0 10px;
      height: 35px;
      background: #fdf6ec;
      color: #e6a23c;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .iconfont {
        margin-right: 10px;
      }
      .rush {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
    // .inputs{
    //   height: 32px;
    //   .el-input{
    //     height: 32px;
    //   }
    //   .el-input__inner{
    //     height: 100%;
    //   }
    //   .el-form-item__label{
    //     font-size: 12px;
    //   }
    // }
  }
  .el-card__body {
    padding: 10px;
  }
  .pagination {
    float: right;
  }
}
</style>
