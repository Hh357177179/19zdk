<template>
  <div class="login">
    <div class="login_btn" @click="login">登录</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less">
  .login{}
</style>
