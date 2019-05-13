<template>
	<view class="bazaar">
		<view class="search">
			<image class="search_icon" src="../../static/img/icon-search.png" mode=""></image>
			<input class="search_input" placeholder-style="color: #C7D8FE;" type="text" v-model="searchVal" placeholder="点击搜索找大咖合作应用体验版" />
		</view>
		<view class="bazaar_main">
			<view class="bazaar_list">
				<view class="list_pic">
					<image src="../../static/img/list_pic.png" mode=""></image>
				</view>
				<view class="list_title">打出去</view>
				<view class="attention">666关注</view>
				<view class="attention_btn">{{attentionText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				attentionText: '已关注'
			};
		}
	}
</script>

<style lang="less">
	.bazaar{
		.search{
			width: 640upx;
			height: 60upx;
			border: 1px solid #C7D8FE;
			border-radius: 26px;
			margin: 15upx auto 30upx;
			display: flex;
			.search_icon{
				width: 40upx;
				height: 40upx;
				margin: 10upx 18upx 8upx 26upx;
			}
			.search_input{
				font-size: 28upx;
				color: #76A1FF;
				height: 60upx;
				width: 400upx;
			}
		}
		.bazaar_main{
			padding: 0 38upx;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.bazaar_list{
				width: 124upx;
				margin-bottom: 40upx;
				margin-right: 58upx;
				text-align: center;
				font-size: 24upx;
				.list_pic{
					width: 124upx;
					height: 124upx;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list_title{
					margin-top: 10upx;
					color: #333;
					line-height: 34upx;
				}
				.attention{
					color: #FFBA2A;
					line-height: 34upx;
					margin-top: 5upx;
				}
				.attention_btn{
					color: #fff;
					width: 100upx;
					background: #C7D8FE;
					text-align: center;
					line-height: 34upx;
					padding: 4upx 0;
					margin: 10upx auto 0;
					border-radius: 20upx;
				}
			}
			.bazaar_list:nth-of-type(4n) {
				margin-right: 0;
			}
		}
	}
</style>
