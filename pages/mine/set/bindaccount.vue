<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 绑定新手机号 -->
		<view class="item"
		@click="targetClick(1)"
		>
			<view class="left_icon">
				<image style="width: 27rpx;height: 27rpx;" src="../../../static/mine/weixin@2y.png" mode=""></image>
				<text>微信</text>
			</view>
			<view class="right_go">
				<text v-if="isbandweixin">已绑定</text>
				<text v-else>去绑定</text>
				<image style="width: 12rpx;height: 22rpx;" src="../../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item"
		@click="targetClick(2)"
		>
			<view class="left_icon">
				<image style="width: 27rpx;height: 27rpx;" src="../../../static/mine/zhifubao@2x.png" mode=""></image>
				<text>支付宝</text>
			</view>
			<view class="right_go">
				<text v-if="isbandzhifu">已绑定</text>
				<text v-else>去绑定</text>
				<image style="width: 12rpx;height: 22rpx;" src="../../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		<!-- 解绑弹窗 -->
		<view class="float_box"
		@touchmove.stop.prevent="moveHandle" 
		v-if="isShowFloat"
		>
			<view class="box">
				<view class="top_txt">
					<view class="title">
						您是否要解除绑定	
					</view>
					<view class="text"
					v-if="showType === 1"
					>
						解除绑定后将不能提现到微信
					</view>
					<view class="text"
					v-else
					>
						解除绑定后将不能提现到支付宝
					</view>
				</view>
				<view class="bom_btn">
					<view class="noClick"
					@click="onClick"
					>
						取消
					</view>
					<view class="okClick"
					@click="okClick"
					>
						解除绑定
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isbandweixin: true, // 微信是否绑定
				isbandzhifu: false, // 支付宝是否绑定
				isShowFloat: false, //控制解绑弹窗
				showType: 1, // 1微信 2 支付宝
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 按钮点击事件
			targetClick(index){
				if(index == 1){
					// 微信
					if(this.isbandweixin){
						//已绑定
						this.isShowFloat = true
						this.showType = 1
					}else{
						// 跳转绑定
					}
					
				}else{
					// 支付宝
					if(this.isbandzhifu){
						// 已绑定
						this.isShowFloat = true
						this.showType = 2
					}else{
						// 跳转绑定
					}
					
				}
			},
			moveHandle(){},
			onClick(){
				this.isShowFloat = false
			},
			okClick(){
				this.isShowFloat = false
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
			background-color: #FFFFFF;
			.item{
				width: 100%;
				height: 80rpx;
				border-bottom: 1rpx solid #eee;
				box-sizing: border-box;
				padding: 0 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 24rpx;
				.left_icon{
					display: flex;
					align-items: center;
					text{
						font-size:28rpx;
						font-weight:500;
						color:rgba(51,51,51,1);
						margin-left: 13rpx;
					}
				}
				.right_go{
					display: flex;
					align-items: center;
					text{
						font-size:24rpx;
						font-weight:500;
						color:rgba(112,112,112,1);
						margin-right: 13rpx;
					}
				}
			}
			.float_box{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.box{
					width:690rpx;
					height:353rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					position: absolute;
					top: calc(50% - 176rpx);
					left: calc(50% - 345rpx);
					box-sizing: border-box;
					padding: 48rpx 24rpx;
					.top_txt{
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						.title{
							font-size:32rpx;
							font-weight:500;
							color:rgba(0,0,0,1);
						}
						.text{
							font-size:32rpx;
							font-weight:500;
							color:rgba(102,102,102,1);
							margin-top: 15rpx;
						}
					}
					.bom_btn{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 50rpx;
						.noClick{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;
							font-size:32rpx;
							font-weight:500;
							color:rgba(0,0,0,1);
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:53rpx;
						}
						.okClick{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;	
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:53rpx;
							font-size:32rpx;
							font-weight:500;
							color:rgba(255,254,254,1);
						}
					}
				}
			}
		}
	}
</style>
