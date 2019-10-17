<template>
	<view class="home">
		<view class="status_bar"></view>
		<view class="banner">
			<image src="../../static/img/banner.png" mode=""></image>
		</view>
		<view class="home_title">
			<view class="title_pic">
				<image src="../../static/img/title_icon.png" mode=""></image>
			</view>
			<view class="title_text">项目案例</view>
		</view>
		<view class="home_card">
			<view class="card_list">
				<view class="card_pic">
					<image src="../../static/img/cardPic.png" mode=""></image>
				</view>
				<view class="card_title uni-ellipsis">找大咖app开发</view>
				<view class="card_time">周期：21天</view>
			</view>
			<view class="card_list">
				<view class="card_pic">
					<image src="../../static/img/cardPic.png" mode=""></image>
				</view>
				<view class="card_title uni-ellipsis">找大咖app开发</view>
				<view class="card_time">周期：21天</view>
			</view><view class="card_list">
				<view class="card_pic">
					<image src="../../static/img/cardPic.png" mode=""></image>
				</view>
				<view class="card_title uni-ellipsis">找大咖app开发</view>
				<view class="card_time">周期：21天</view>
			</view><view class="card_list">
				<view class="card_pic">
					<image src="../../static/img/cardPic.png" mode=""></image>
				</view>
				<view class="card_title uni-ellipsis">找大咖app开发</view>
				<view class="card_time">周期：21天</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			// 检查是否已经登录
			// const token = uni.getStorageSync('launchFlag');
			// if (!token) {
			//  console.log('没登录或者没账号')
			// uni.reLaunch({
			// 	url: '/pages/login/login'
			// });
			// }
		},
		methods: {

		},
	}
</script>

<style lang="less">
	.home {
		// min-height: 100vh;
		padding: 0 16upx;
		// background: #f0f0f0;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.banner {
			padding-top: 35upx;
			width: 100%;
			height: 360upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.home_title {
			display: flex;
			margin: 40upx 0 20upx 0;

			.title_pic {
				width: 60upx;
				height: 60upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title_text {
				font-size: 28upx;
				color: rgba(210, 44, 44, 1);
				line-height: 20px;
				text-shadow: 0px 1px 0px rgba(153, 153, 153, 0.39);
				margin-top: 10upx;
				margin-left: 6upx;
			}
		}
		.home_card {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.card_list{
				width: 290upx;
				// height: 260upx;
				background: #fff;
				box-shadow:0px 2px 4px 0px rgba(255,0,0,0.23);
				border-radius:8px;
				margin-bottom: 30upx;
				padding: 24upx 30upx 15upx;
				.card_pic{
					width: 100%;
					height: 150upx;
					background: #f0f0f0;
					border-radius: 5px;
					margin-bottom: 15upx;
					image{
						width: 230upx;
						height: 130upx;
						margin: 10upx 30upx;
					}
				}
				.card_title{
					line-height: 40upx;
					font-size: 28upx;
					color: #333;
					font-weight: 500;
				}
				.card_time{
					color: #666;
					font-weight: 400;
					font-size: 28upx;
					line-height: 40upx;
					margin-top: 6upx;
				}
			}
		}
	}
</style>
