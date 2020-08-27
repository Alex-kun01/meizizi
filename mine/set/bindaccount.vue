<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 绑定新手机号 -->
		<view class="item"
		@click="targetClick(1)"
		>
			<view class="left_icon">
				<image style="width: 27rpx;height: 27rpx;" src="@/static/mine/weixin@2y.png" mode=""></image>
				<text>微信</text>
			</view>
			<view class="right_go">
				<text v-if="isbandweixin">已绑定</text>
				<text v-else>去绑定</text>
				<image style="width: 12rpx;height: 22rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item"
		@click="targetClick(2)"
		>
			<view class="left_icon">
				<image style="width: 27rpx;height: 27rpx;" src="@/static/mine/zhifubao@2x.png" mode=""></image>
				<text>支付宝</text>
			</view>
			<view class="right_go">
				<text v-if="isbandzhifu">已绑定</text>
				<text v-else>去绑定</text>
				<image style="width: 12rpx;height: 22rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
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
		<!-- 绑定账号弹窗 -->
		<view class="band_box"
		v-if="isFloatShow"
		>
			<view class="box">
				<view class="title">
					请填写您的支付宝账号（非支付宝名）
				</view>
				<input type="text" v-model="zhifuValue" placeholder="请输入支付宝账号" />
				<view class="btn_box">
					<view class="items on" @click="isFloatShow = false">
						取消
					</view>
					<view class="items ok"
					@click="bandOkClick"
					>
						绑定
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
				isbandweixin: false, // 微信是否绑定
				isbandzhifu: false, // 支付宝是否绑定
				isShowFloat: false, //控制解绑弹窗
				showType: 1, // 1微信 2 支付宝
				isFloatShow: false, // 绑定账号弹窗
				zhifuValue: '', // 支付宝账号
			}
		},
		onLoad(){
			//alipay_name
			
		},
		onShow(){
			this.init()
		},
		methods:{
			init(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						_this.zhifuValue = res.data.alipay_name
						// 支付宝已经绑定
						if(_this.zhifuValue){
							_this.isbandzhifu = true
						}
					}
				})
			},
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
						uni.showModal({
							title: '提示',
							content: '敬请期待...'
						})
					}
					
				}else{
					// 支付宝
					if(this.isbandzhifu){
						// 已绑定
						this.isShowFloat = true
						this.showType = 2
					}else{
						// 跳转绑定
						this.isFloatShow = true
					}
					
				}
			},
			moveHandle(){},
			onClick(){
				this.isShowFloat = false
			},
			okClick(){
				
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let userInfo = reg.data
						uni.request({
							url: _this.$http + '/api/index/alipayName',
							method: 'POST',
							data: {
								token: reg.data.token,
								number: ''
							},
							success(res){
								console.log('解除绑定返回数据', res)
								if(res.data.status === 200){
									uni.showToast({
										title: '解绑成功'
									})
									// _this.isFloatShow = false
									// _this.isbandzhifu = true
									_this.isShowFloat = false
									_this.isbandzhifu = false
									userInfo.alipay_name = ''
									uni.setStorage({
										key: 'userInfo',
										data: userInfo
									})
									uni.getStorage({
										key: 'userInfo',
										success(rrr){
											console.log('查看更新后的userInfo数据', rrr)
										}
									})
								}else{
									uni.showModal({
										title: "提示",
										content: '解绑失败'
									})
								}
							}
						})
					}
				})
				
				
			},
			// 确认绑定账号
			bandOkClick(){
				let _this = this
				if(!this.zhifuValue){
					uni.showModal({
						title: '提示',
						content: '请输入您的支付宝账号'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: '请确认' + this.zhifuValue + '是您的支付宝账号',
					success(reg){
						console.log('reg',reg)
						if(reg.confirm){
							// 确认绑定
							uni.getStorage({
								key: 'userInfo',
								success(ree){
									let userInfo = ree.data
									uni.request({
										url: _this.$http + '/api/index/alipayName',
										method: 'POST',
										data: {
											token: ree.data.token,
											number: _this.zhifuValue
										},
										success(res){
											console.log('绑定支付宝账号返回数据', res)
											if(res.data.status === 200){
												uni.showToast({
													title: '绑定成功'
												})
												_this.isFloatShow = false
												_this.isbandzhifu = true
												userInfo.alipay_name = _this.zhifuValue
												uni.setStorage({
													key: 'userInfo',
													data: userInfo
												})
												uni.getStorage({
													key: 'userInfo',
													success(rrr){
														console.log('查看更新后的userInfo数据', rrr)
													}
												})
											}else{
												uni.showModal({
													title: "提示",
													content: '绑定失败'
												})
											}
										}
									})
								}
							})
						}else{
							this.isShowFloat = false
						}
					}
				})
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
			height: 100%;
			min-height: 100vh;
			background-color: #FFFFFF;
			.band_box{
				width: 100%;
				height: 100vh;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.box{
					width: 650rpx;
					height: 450rpx;
					background-color: #FFFFFF;
					border-radius: 5rpx;
					position: absolute;
					top: calc(50% - 400rpx);
					left: calc(50% - 325rpx);
					box-sizing: border-box;
					padding: 24rpx;
					.btn_box{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 100rpx;
						.items{
							width: 200rpx;
							height: 80rpx;
							border: 1rpx solid #eee;
							border-radius: 35rpx;
							text-align: center;
							line-height: 80rpx;
							font-size: 36rpx;
						}
						.items.on{
							background-color: #eee;
						}
						.items.ok{
							background-color: #4CD964;
						}
						
					}
					.title{
						font-size: 32rpx;
						font-weight: 500;
						margin: 50rpx 0;
					}
					input{
						background-color: #eee;
						font-size: 30rpx;
						padding: 10rpx 15rpx;
					}
				}
			}
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
