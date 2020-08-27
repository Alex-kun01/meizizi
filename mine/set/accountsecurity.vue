<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 账户安全 -->
		<view class="item">
			<view class="title">
				会员名
			</view>
			<view class="text">
				{{name}}
			</view>
		</view>
		
		<view class="item"
		@click="gototarget('./changephone')"
		>
			<view class="title">
				换绑手机号
			</view>
			<image src="@/static/index/chakan@2x.png" mode=""></image>
		</view>
		
		<view class="item"
		@click="gototarget('./setpassword')"
		>
			<view class="title">
				密码设置
			</view>
			<image src="@/static/index/chakan@2x.png" mode=""></image>
		</view>
		
		<view class="item"
		@click="gototarget('./insetpassword')"
		>
			<view class="title">
				修改密码
			</view>
			<image src="@/static/index/chakan@2x.png" mode=""></image>
		</view>
		
		<view class="item"
		@click="gototarget('./bindaccount')"
		>
			<view class="title">
				第三方账号绑定
			</view>
			<image src="@/static/index/chakan@2x.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				name: ''
			}
		},
		onLoad(){
			this.init()
		},
		onShow(){
			
		},
		methods:{
			init(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('用户信息', res)
						_this.name = res.data.nickname
					}
				})
			},
			// 页面跳转
			gototarget(url){
				uni.navigateTo({
					url: url
				})
			},
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
				height: 80rpx;
				box-sizing: border-box;
				padding: 0 24rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				.title{
					font-size: 28rpx;
					color: #464646;
					font-weight: 500;
				}
				.text{
					font-size: 24rpx;
					color: #707070;
				}
				image{
					width: 12rpx;
					height: 22rpx;
				}
			}
		}
	}
</style>
