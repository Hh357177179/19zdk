<template>
	<view class="register">
		<view class="status_bar"></view>
		<view class="register_nav">
			<view class="back_icon" @click="backTop">
				<image src="../../static/img/backIcon.png" mode=""></image>
			</view>
			<view class="register_title">加入找大咖</view>
		</view>
		<view class="join_tel">
			<text class="en_area">+86</text>
			<input maxlength="11" value="" class="input_tel" type="text" placeholder-style="color: #f0f0f0;font-size:30upx;font-weight:300;" placeholder="请输入11位手机号码" />
		</view>
		<view class="join_code">
			获取验证码
		</view>
		<button :disabled="disBtn" class="join_btn">
			<text>开启找大咖</text>
			<image class="join_icon" src="../../static/img/joinicon.png" mode=""></image>
		</button>
		<view class="bot_text">
			<view class="join_small_text">点击即表示同意找大咖项目需求</view>
			<view class="join_big_text">发布条款与隐私协议</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disBtn: true
			}
		},
		methods: {
			backTop () {
				uni.navigateBack(-1)
			}
		}
	}
</script>

<style lang="less">
	.register {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: url('http://project.zhaodaka.cn/static/regback.png') no-repeat;
		background-size: 100% 100%;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		.register_nav{
			width: 100%;
			position: relative;
			margin-top: 20px;
			.back_icon{
				position: absolute;
				left: 24px;
				width: 50upx;
				height: 50upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.register_title{
				font-size: 36upx;
				color: #fff;
				text-align: center;
			}
		}
		.join_tel{
			width: 380upx;
			border-bottom: 1px solid #fff;
			margin: 380upx auto 0;
			display: flex;
			justify-content: space-between;
			line-height: 50upx;
			padding: 0 40upx 20upx;
			.en_area{
				font-size: 36upx;
				color: #fff;
			}
			.input_tel{
				font-size: 32upx;
				color: #fff;
				margin-left: 40upx;
			}
		}
		.join_code{
			width: 380upx;
			border-bottom: 1px solid #fff;
			padding: 0 40upx 20upx;
			margin: 60upx auto 0;
			font-size: 38upx;
			color: #fff;
			text-align: center;
			font-weight: 300;
		}
		.join_btn{
			width: 400upx;
			height: 100upx;
			font-size: 44upx;
			color: #c3c3c3;
			line-height: 100upx;
			border-radius: 50upx;
			box-shadow:0px 1px 12px 0px rgba(0,0,0,0.17);
			background: #e1e1e1;
			margin-top: 180upx;
			.join_icon{
				width: 56upx;
				height: 56upx;
				float: right;
				margin-top: 22upx;
				margin-right: 10upx;
			}
		}
		.bot_text{
			width: 100%;
			position: fixed;
			text-align: center;
			bottom: 27px;
			.join_small_text{
				font-size: 22upx;
				color: #C7D8FE;
				margin-bottom: 18upx;
				opacity: 0.7;
			}
			.join_big_text{
				font-size: 24upx;
				color: #C7D8FE;
			}
		}
	}
</style>
