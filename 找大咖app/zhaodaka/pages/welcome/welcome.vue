<template>
	<view class="welcome">
		<image src="../../static/img/app-boot.png" mode=""></image>
	</view>
</template>

<script>
	import {
		postRequset
	} from '../../common/httpRequest.js'
	export default {
		data() {
			return {
				code: ''
			};
		},
		onLoad: function(option) {
			uni.getStorage({
				key: 'openid',
				success: res => {
					console.log(res)
					if (res) {
						this.code = res.data
						this.getStatus()
					}
				},
				fail: err => {
					console.log(err)
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1500)
				}
			})
		},
		methods: {
			getStatus() {
				console.log(this.code)
			}
		}
	}
</script>

<style lang="less">
	.welcome {
		width: 100%;
		height: 100vh;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
