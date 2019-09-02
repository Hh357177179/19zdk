<template>
	<view class="content"></view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			console.log('判断是否有token，没有登录，有进首页')
			uni.redirectTo({
				url: '../login/login'
			})
		}
	}
</script>

<style>
	
</style>
