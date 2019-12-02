<template>
  <div class="home">
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="name"
          required
          clearable
          label="姓名"
          placeholder="请输入姓名"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style lang="less">
  .home{
    width: 100%;
    min-height: 100vh;
    background: #F5F7F9;
    .main{
      width: 96%;
      background: #fff;
    }
  }
</style>
