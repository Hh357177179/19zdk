<template>
	<view class="login">
		<view class="logo"></view>
		<view class="content">
			<view class="login_phone">
				<img src="/static/images/me.png" alt="" class="icon-input-phone" />
				<view class="login_phone_input">
					<input type="number" placeholder-style="color: #e3bfbd;" value="" maxlength="11" placeholder="手机号" />
				</view>
			</view>
			<view class="login_code">
				<img src="/static/images/phone.png" alt="" class="icon-input-phone" />
				<view class="login_phone_input">
					<input type="number" placeholder-style="color: #e3bfbd;" value="" placeholder="手机验证码" />
					<button class="get_code">获取验证码</button>
				</view>
			</view>
		</view>
		<view class="login_btn" @click="loginIn">登陆</view>
		<view class="login_question">
			<!-- <text class="login_q_text">遇到问题</text> -->
			<view class="bottom_card">
				<view @click="connectUs">
					<view class="tel_me first_card"></view>
					<view class="card_text">联系客服</view>
				</view>
				<view>
					<view class="tel_me second_card"></view>
					<view class="card_text">CAA会员赛事</view>
				</view>
			</view>
		</view>
		<view class="bottom_text">
			<text class="en_text">CAA</text>
			<text class="ch_text">中国钓鱼运动协会官方指定合作伙伴</text>
		</view>
		<error-dialog v-if="showError" @hideError="hideDialogError" :errorText="errorText"></error-dialog>
	</view>
</template>

<script>
	import errorDialog from '../../components/error-dialog.vue'
	export default {
		data() {
			return {
				showError: false,
				errorText: '测试错误信息'
			}
		},
		methods: {
			// 联系我们
			connectUs () {
				uni.navigateTo({
					url: "/pages/connect-us/connect-us"
				})
			},
			
			// 登陆
			loginIn () {
				console.log('登录')
				this.showError = true
			},
			
			// 关闭错误提示
			hideDialogError () {
				console.log(123)
				this.showError = false
				// this.errorText = ''
			}
		},
		components: { errorDialog }
	}
</script>

<style lang="scss">
	.login {
		min-height: 100vh;
		background: linear-gradient(to bottom, #d18289 0%, #df7261 20%, #642c36 100%);
		.logo {
			width: 100%;
			height: 300upx;
		}
		.content {
			padding: 0 100upx;
			.login_phone,
			.login_code {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				margin-bottom: 40upx;

				.icon-input-phone {
					width: 40upx;
					height: 40upx;
					margin-top: 15upx;
				}

				.login_phone_input {
					width: 100%;
					height: 60upx;
					border-bottom: 1px solid #fff;
					margin-left: 30upx;
					display: flex;
					justify-content: space-between;

					input {
						height: 100%;
						color: #fff;
						padding-left: 10upx;
						font-size: 32upx;
					}

					.get_code {
						font-size: 24upx;
						text-align: center;
						border-radius: 0;
						background: #e65542;
						color: #fff;
						width: 200upx;
					}

					uni-button:after {
						border: none !important;
						border-radius: 0 !important;
					}
				}
			}
		}

		.login_btn {
			font-size: 36upx;
			color: #fff;
			background: #e65542;
			width: 400upx;
			margin: 60upx auto 20upx;
			padding: 20upx 0;
			text-align: center;
		}

		.login_question {
			color: #d5b7ba;
			font-size: 26upx;
			text-align: center;

			.login_q_text {
				border-bottom: 1px solid #d5b7ba;
				padding: 5upx;
			}
		}

		.bottom_card {
			display: flex;
			justify-content: center;
			margin-top: 30upx;

			.tel_me {
				width: 190upx;
				height: 90upx;
			}

			.first_card {
				background: #cb7264;
				margin-right: 10upx;
			}

			.second_card {
				background: #5760a9;
				margin-left: 10upx;
			}

			.card_text {
				font-size: 26upx;
				color: #d5b7ba;
				margin-top: 5upx;
			}
		}
		.bottom_text{
			// margin-top: 100upx;
			position: absolute;
			width: 100%;
			bottom: 100upx;
			text-align: center;
			font-size: 28upx;
			.en_text{
				color: #e65542;
			}
			.ch_text{
				color: #fff;
			}
		}
	}
</style>
