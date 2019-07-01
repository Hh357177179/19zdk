<template>
  <div class="author"></div>
</template>

<script>
import { applySuccess } from '../api/index.js'
export default {
  data () {
    return {}
  },
  created () {
    console.log(123)
    console.log(this.$route.query.token)
    localStorage.setItem('tokenns',this.$route.query.token)
    const tokenns = localStorage.getItem('tokenns')
    if (tokenns) {
      let params = {
        token: tokenns
      }
      applySuccess(params).then(res => {
        console.log(res)
        if (res.is_new == 1) {
          this.$router.push('/user')
        } else {
          this.$router.push(`${localStorage.getItem('paths')}`)
        }
      })
    } else {
      this.$toast.fail({
        position: 'bottom',
        message: '获取用户信息失败, 请稍后再试',
      })
    }
  }
}
</script>
