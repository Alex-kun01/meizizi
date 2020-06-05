<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 消息 -->
		<view class="item">
			<view class="img">
				<image src="../../../static/mine/xiaoxi@3x.png" mode=""></image>
				<view class="con_text">
					<text>系统消息</text>
					<text>暂无新的通知</text>
				</view>
			</view>
			<view class="r_date">
				2020-04-28
			</view>
		</view>
		<view class="item">
			<view class="img">
				<image src="../../../static/mine/xinxi@2x.png" mode=""></image>
				<view class="con_text">
					<text>商户信息</text>
					<text>暂无新的通知</text>
				</view>
			</view>
			<view class="r_date">
				2020-04-28
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
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
			height: 100vh;
			background-color: #F4F4F4;
			.item{
				width: 100%;
				height: 151rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;
				.img{
					display: flex;
					align-items: center;
					image{
						width: 75rpx;
						height: 75rpx;
						margin-right: 20rpx;
					}
					.con_text{
						display: flex;
						flex-direction: column;
						text{
							font-size: 34rpx;
							color: #6A6A6A;
							margin-bottom: 10rpx;
						}
					}
				}
				.r_date{
					align-self: flex-start;
					color: #9A9A9A;
					font-size: 24rpx;
				}
				
			}
		}
	}
</style>
