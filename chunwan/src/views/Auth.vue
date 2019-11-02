<template>
  <div class="auth"></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$route)
    localStorage.setItem('tokenns',this.$route.query.token)
    const tokenns = localStorage.getItem('tokenns')
    if (tokenns) {
      // this.$router.push('/home');
      this.$router.push(`${localStorage.getItem('paths')}`)
      console.log('跳转地址',localStorage.getItem('paths'))
    } else {
      this.$toast.fail({
        position: 'bottom',
        message: '获取用户信息失败, 请稍后再试',
      })
    }
  }
}
</script>