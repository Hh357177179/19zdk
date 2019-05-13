<template>
	<view class="login">
			<view class="status_bar"></view>
			<view class="en_name f_weight">找 大 咖</view>
			<view class="eg_name f_weight">ZhaoDaKa</view>
			<view class="login_pic">
				<image src="../../static/img/img-login.png" mode=""></image>
			</view>
			<view class="login_text f_weight">与创业者一起 改变世界</view>
			<view class="login_btn" @click="loginRoute">登录/注册</view>
			<view class="login_info">登录即代表已阅读并同意“隐私条款”和“用户协议”</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			loginRoute () {
				uni.navigateTo({
					url:'/pages/register/register'
				})
			}
		}
	}
</script>

<style lang="less">
	.login{
		background: #7a8fed;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: url('http://project.zhaodaka.cn/static/loginback.png') no-repeat;
		background-size: 100% 100%;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		.en_name{
			text-align: center;
			font-size: 72upx;
			color: #fff;
			margin-top: 48px;
		}
		.eg_name{
			text-align: center;
			font-size: 44upx;
			color: #fff;
		}
		.login_pic{
			width: 100%;
			margin: 0 auto 60upx;
			image{
				width: 100%;
			}
		}
		.login_text{
			text-align: center;
			color: #fff;
			font-size: 36upx;
			margin-bottom: 80upx;
		}
		.login_btn{
			width: 360upx;
			height: 100upx;
			font-size: 36upx;
			color: #fff;
			text-align: center;
			line-height: 100upx;
			border-radius: 50upx;
			background:rgba(255,186,42,1);
			box-shadow:0px 2px 6px 0px rgba(245,166,35,0.35);
			margin: 0 auto;
		}
		.login_info{
			width: 100%;
			font-size: 24upx;
			color: #9CBBFF;
			text-align: center;
			position: fixed;
			bottom: 20px;
		}
	}
</style>
