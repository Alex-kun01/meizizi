<template>
	<view class="position_float">
		<view class="content"
		@touchmove.stop.prevent="moveHandle" 
		>
			<image src="../static/second/tan.png" mode=""></image>
			<view class="btn_ok">
				好的
			</view>
			<view class="float_text">
				<view class="float1">
					到店咨询！
				</view>
				<view class="float2">
					宝宝们，赶快来领取吧~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods: {
			moveHandle(){}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
	}
	.position_float{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.4);
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.content{
			width: 700rpx;
			height: 600rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			image{
				width: 700rpx;
				height: 300rpx;
			}
			.float_text{
				border: 1rpx solid #FFFFFF;
				position: absolute;
				top: 90rpx;
				.float1{
					font-size: 45rpx;
					font-weight: 500;
					text-align: center;
					color:  #fd3325;
				}
				.float2{
					font-size: 35rpx;
					font-weight: 500;
					text-align: center;
					color:  #fd3325;
					margin-top: 30rpx;
				}
			}
			.btn_ok{
				width: 270rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 50rpx;
				text-align: center;
				font-size: 38rpx;
				background-color: #fd3325;
				color: #FFFFFF;
				font-weight: 500;
				margin-top: 30rpx;
			}
		}
	}
</style>
