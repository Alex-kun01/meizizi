<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 选择注册类型 -->
		<view class="logo">
			<image src="@/static/mine/tub.png" mode=""></image>
		</view>
		<view class="btn_box">
			<view class="title_box">
				<view class="hen"></view>
				<view class="title">
					注册
				</view>
				<view class="hen"></view>
			</view>
			<view class="item"
			@click="gotoTarget(1)"
			>
				<image src="@/static/nearbystore/dianpu@2xx.png" mode=""></image>
				<text>我是商家</text>
			</view>
			<view class="item"
			@click="gotoTarget(2)"
			>
				<image src="@/static/mine/yonghu@2x.png" mode=""></image>
				<text>我是用户</text>
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
			gotoTarget(index){
				if(index === 1){
					// 商家注册
					uni.navigateTo({
						url: './storeregin'
					})
				}else{
					// 个人注册
					uni.navigateTo({
						url: './register'
					})
				}
			}
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
		background-color: #FFFFFF;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #FFFFFF;
			.logo{
				width: 100%;
				display: flex;
				justify-content: center;
				margin: 160rpx 0 100rpx 0;
				image{
					width: 227rpx;
					height: 227rpx;
				}
			}
			.btn_box{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				.title_box{
					// margin-bottom: 42rpx;
					width: 100%;
					box-sizing: border-box;
					padding: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.title{
						margin: 0 24rpx;
					}
					.hen{
						width:51rpx;
						height:1rpx;
						border:1rpx solid rgba(153,153,153,1);
					}
				}
				.item{
					display: flex;
					justify-content: center;
					align-items: center;
					width:690rpx;
					height:91rpx;
					line-height: 91rpx;
					border:1rpx solid rgba(255,92,7,1);
					// background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
					border-radius:46rpx;
					margin-bottom: 42rpx;
					text{
						font-size:36rpx;
						// font-weight:500;
						color:rgba(102,102,102,1);
					}
					image{
						width: 37rpx;
						height: 34rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
