<template>
	<view class="content"
	@touchmove.stop.prevent="moveHandle" 
	>
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 广告等待页面 -->
		<view class="con_box">
			<image :src="img" mode=""></image>
			<view class="yuan">
				{{num}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				img: '../../../static/public/guanggao.png',
				num: 0, // 倒计时时间
				timer: null, // 计时器
			}
		},
		onLoad(){
			this.daojishi()
		},
		onShow(){
			
		},
		methods:{
			moveHandle(){},
			// 倒计时
			daojishi(){
				let _this = this
				this.timer = setInterval(() =>{
					if(_this.num === 0 ){
						uni.redirectTo({
							url: './login'
						})
						clearInterval(_this.timer)
						return
					}
					_this.num--
				},1000)
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.con_box{
				width: 100%;
				height: 100%;
				// background-color: green;
				position: relative;
				.yuan{
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					background: rgba(0,0,0,.7);
					border-radius: 50%;
					position: absolute;
					top: 80rpx;
					right: 20rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: 500;
					text-align: center;
				
				}
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
