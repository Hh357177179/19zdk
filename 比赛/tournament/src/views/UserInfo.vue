<template>
  <div class="user_info">
    <div class="user_list clearfix">
      <p class="user_label">姓名：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">性别：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">生日：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div><div class="user_list clearfix">
      <p class="user_label">身份证号：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">电话号码：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">护照：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">国际壁联号码：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div><div class="user_list clearfix">
      <p class="user_label">教练：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>
    <div class="user_list clearfix">
      <p class="user_label">俱乐部：</p>
      <p class="user_desc">哈哈哈哈</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .user_info{
    border: 1px solid rgba(0,0,0,0);
    padding: 0 30px 60px 30px;
    .user_list{
      border-bottom: 1px solid #f0f0f0;
      font-size: 15px;
      margin-top: 20px;
      padding-bottom: 10px;
      color: #333;
      .user_label{
        float: left;
        width: 120px;
      }
      .user_desc{
        float: left;
        color: #666;
        margin-left: 5px;
      }
    }
  }
</style>
