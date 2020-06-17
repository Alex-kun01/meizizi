<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 设置 -->
		<view class="box">
			<view
			 @click="gototarget('./personalinfo')"
			 class="item hen">
				<view class="title">
					个人信息
				</view>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
			<view
			 @click="gototarget('./accountsecurity')"
			 class="item">
				<view class="title">
					账号与安全
				</view>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="box">
			<view
			 @click="gototarget('./version')"
			 class="item hen">
				<view class="title">
					版本更新
				</view>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
			<view
			 @click="clearCache"
			 class="item hen">
				<view class="title">
					清除缓存
				</view>
				<view class="text">
					立即清理
				</view>
				<!-- <image src="../../../static/index/chakan@2x.png" mode=""></image> -->
			</view>
			<view
			 @click="gototarget()"
			 class="item">
				<view class="title">
					关于我们
				</view>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="btn_box" @click="logOut">
			<view class="btn">
				退出账号
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
			// 页面跳转
			gototarget(url){
				uni.navigateTo({
					url: url
				})
			},
			// 退出账号
			logOut(){
				uni.showModal({
					title: '提示',
					content: '是否退出当前账号？',
					success(res) {
						
						if(res.confirm){
							console.log('已退出')
							uni.removeStorage({
								key: 'userInfo'
							})
							uni.navigateTo({
								url: '../login/login'
							})
						}else{
							console.log('已取消')
						}
					}
					
				})
			},
			// 清除缓存
			clearCache(){
				
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
		height: 100%;
		background: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background: #F4F4F4;
			.box{
				width: 100%;
				margin-bottom: 24rpx;
				.item{
					width: 100%;
					height: 102rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 24rpx;
					.title{
						font-size: 32rpx;
						color: #0C1418;
						font-weight: 500;
					}
					.text{
						font-size: 26rpx;
						color: #959595;
					}
					image{
						width: 16rpx;
						height: 27rpx;
					}
				}
				.item.hen{
					border-bottom: 1rpx solid #eee;
				}
			}
			.btn_box{
				width: 100%;
				height: 102rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FF7E00;
				font-size: 34rpx;
				font-weight: 500;
			}
		}
	}
</style>
