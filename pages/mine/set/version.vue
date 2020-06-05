<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 版本更新 -->
		<view class="version">
			<image src="../../../static/mine/avatar.jpg" mode=""></image>
			<view class="name">
				美孜孜
			</view>
			<view class="num">
				V1.0.0
			</view>
		</view>
		<view class="btn">
			{{versioninfo}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				versioninfo: '已是最新版本'
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #FFFFFF;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			.version{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 137rpx;
				image{
					width: 267rpx;
					height: 265rpx;
					margin-bottom: 71rpx;
				}
				.name{
					margin-bottom: 27rpx;
					font-size: 32rpx;
					color: #000000;
					font-weight: 500;
				}
				.num{
					font-size: 24.5rpx;
					color: #000000;
					font-weight: 500;
				}
			}
			.btn{
				width:543rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				color: #FFFFFF;
				margin: 198rpx 0 0 104rpx;
			}
		}
	}
</style>
