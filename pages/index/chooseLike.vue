<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="weixin-wx"></view>
		<!-- #endif -->
		<view class="topbar">
			<view class="btn" @click="nextOne">
				跳过
			</view>
		</view>
		<view class="title">
			<view class="title1">
				选择你的兴趣
			</view>
			<view class="title2">
				根选择为您提供精准服务
			</view>
		</view>
		<view class="chooseBox">
			<view v-for="(item, index) in showList" :key="index" @click="changeIndex(index)" :class="{item: true, active: actives.includes(index)}">{{item.text}}</view>
		</view>
		<view class="bom_btn" @click="submitClick">
			我选好了
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				showList: [
					{
						text: '彩妆'
					},
					{
						text: '洁面'
					},
					{
						text: '假发'
					},
					{
						text: '控油'
					},
					{
						text: '彩妆'
					},
					{
						text: '混油皮'
					},
					{
						text: '美白'
					},
					{
						text: '香水'
					},
					{
						text: '男士'
					}
				],
				actives: []
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeIndex(index){
				if(this.actives.includes(index)){
					const i = this.actives.findIndex(item => item === index)
					this.actives.splice(i,1)
					return
				}
				this.actives.push(index)
			},
			// 跳过
			nextOne(){
				uni.switchTab({
					url: './index'
				})
			},
			// 我选好了
			submitClick(){
				if(this.actives.length === 0){
					return uni.showModal({
						title: '提示',
						content: '您没有选择任何项'
					})
				}
				uni.switchTab({
					url: './index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #1c1e1f;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #1c1e1f;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #1c1e1f;
			color: #fffcfb;
			padding: 24rpx;
			box-sizing: border-box;
			.topbar{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: right;
				.btn{
					font-size: 30rpx;
				}
			}
			.title{
				.title1{
					font-size: 50rpx;
				}
				.title2{
					font-size: 28rpx;
					color: #6d6f6f;
					margin-top: 10rpx;
				}
			}
			.chooseBox{
				margin-top: 30rpx;
				width: 100%;
				height: 700rpx;
				// background-color: pink;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content: space-between;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 175rpx;
					height: 175rpx;
					line-height: 175rpx;
					border: 6rpx solid #fffcfb;
					border-radius: 15rpx;
					text-align: center;
					font-weight: 500;
					background-color: #595b5c;
				}
				.item.active{
					border: 6rpx solid #ff996d;
					color: #ff996d;
				}
			}
			.bom_btn{
				width: 600rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #fffcfb;
				color: #000000;
				font-weight: 500;
				border-radius: 50rpx;
				margin-left: 63rpx;
				margin-top: 100rpx;
			}
			
		}
	}
</style>
