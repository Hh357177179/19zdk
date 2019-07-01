<template>
	<view class="me_ka">
		<div class="left_card clearfix">
			<div class="left_text">
				<p>我的咖点</p>
				<p class="ka_num">200</p>
			</div>
		</div>
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
	.me_ka{
		padding: 6upx 15upx;
		.left_card{
			width: 90upx;
			border-radius: 10upx;
			background:rgba(243,246,255,1);
			padding: 2upx 8upx;
			font-size: 10upx;
			font-weight:500;
			color:rgba(118,161,255,1);
			line-height:25px;
			.left_text{
				float: left;
				width: 50%;
				text-align: center;
				.ka_num{
					color: #FFBA2A;
					font-size: 13upx;
					font-weight:600;
					color:rgba(255,186,42,1);
					line-height:37px;
				}
			}
		}
	}
</style>
