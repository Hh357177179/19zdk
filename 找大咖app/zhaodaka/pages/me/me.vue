<template>
	<view class="me">
		<view class="me_bg">
			<view class="status_bar"></view>
			<view class="me_nav">
				<view class="me_nav_title">个人中心</view>
				<view class="set_icon">
					<image src="../../static/img/set.png" mode=""></image>
				</view>
			</view>
			<view class="user_main">
				<view class="user_avatar">
					<image src="../../static/img/avatar.png" mode=""></image>
				</view>
				<view class="user_info">
					<view class="user_name">找大咖-黄彬</view>
					<view class="user_card">
						<view class="card_list">前端开发</view>
						<view class="card_list">后端开发</view>
						<view class="card_list">UI设计</view>
					</view>
					<view class="user_tel">
						<view class="tel_pic">
							<image src="../../static/img/icon_phone.png" mode=""></image>
						</view>
						<view class="tel_number">13123232323</view>
					</view>
				</view>
			</view>
		</view>
		<view class="me_card">
			<view class="me_card_list">
				<view class="me_card_pic">
					<image src="../../static/img/kapoint.png" mode=""></image>
				</view>
				<view class="card_text">我的咖点</view>
			</view>
			<view class="me_card_list">
				<view class="me_card_pic">
					<image src="../../static/img/imgfocus.png" mode=""></image>
				</view>
				<view class="card_text">我的关注</view>
			</view>
			<view class="me_card_list">
				<view class="me_card_pic">
					<image src="../../static/img/aboutus.png" mode=""></image>
				</view>
				<view class="card_text">关于我们</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.me {
		.me_bg {
			width: 100%;
			height: 500upx;
			background: url('../../static/img/mebg.png') no-repeat;
			background-size: 100% 100%;

			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
			}

			.me_nav {
				height: 44px;
				text-align: center;
				color: #fff;
				position: relative;
				margin-bottom: 30upx;

				.me_nav_title {
					width: 100%;
					font-size: 16px;
					line-height: 44px;
				}

				.set_icon {
					width: 25px;
					height: 25px;
					position: absolute;
					right: 20px;
					top: 10px;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.user_main {
				display: flex;
				justify-content: flex-start;
				.user_avatar {
					width: 160upx;
					height: 160upx;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 60upx 0 100upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.user_info {
					.user_name{
						color: #fff;
						font-size: 32upx;
						margin-bottom: 20upx;
					}
					.user_card{
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						.card_list{
							font-size: 24upx;
							color: #fff;
							line-height: 32upx;
							padding: 4upx 16upx;
							margin-left: 20upx;
							background: #F5A623;
							border-radius: 22upx;
							margin-bottom: 10upx;
						}
						.card_list:nth-of-type(1){
							margin-left: 0;
						}
					}
					.user_tel{
						margin-top: 10upx;
						display: flex;
						justify-content: flex-start;
						.tel_pic{
							width: 30upx;
							height: 30upx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.tel_number{
							line-height: 40upx;
							font-size: 30upx;
							font-weight: 300;
							color: #fff;
							margin-left: 20upx;
						}
					}
				}
			}
		}
		.me_card{
			margin-top: 40upx;
			display: flex;
			justify-content: space-around;
			.me_card_pic{
				width: 160upx;
				height: 140upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.card_text{
				text-align: center;
				font-size: 30upx;
				line-height: 42upx;
				color: #F5A623;
				margin-top: 20upx;
			}
		}
	}
</style>
