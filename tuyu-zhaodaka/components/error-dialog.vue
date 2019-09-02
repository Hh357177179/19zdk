<template>
	<view class="error_dialog">
		<view class="mask_mian">
			<view class="mask_text">{{errorText}}</view>
			<view class="mask_btn" @click="hideDialog">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			errorText: {
				type: String,
				default: '未知错误' 	
			}
		},
		data() {
			return {}
		},
		methods: {
			hideDialog () {
				this.$emit('hideError')
			}
		}
	}
</script>

<style lang="less">
	.error_dialog{
		position: fixed;
		width: 100%;
		min-height: 100%;
		background: rgba(0,0,0,.6);
		top: 0;
		left: 0;
		z-index: 11;
		.mask_mian{
			text-align: center;
			box-shadow:0 0 40upx rgba(255,255,255,.4);
			// padding: 30upx;
			// background: rgba(255, 255, 255, .1);
			position: absolute;
			left: calc(50% - 40%);
			top: calc(50% - 80upx);
			width: 80%;
			.mask_text{
				background: #fff;
				border: 1px solid #d45f4b;
				line-height: 80upx;
				color: #333;
				font-size: 32upx;
				margin-bottom: 10upx;
			}
			.mask_btn{
				color: #fff;
				background: #d45f4b;
				font-size: 32upx;
				line-height: 80upx;
			}
		}
	}
</style>
