<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 支付 -->
		<view class="top_bar">
			<image @click="closethis" style="width: 28rpx;height: 29rpx;" src="../../static/index/closeX2.png" mode=""></image>
			<text style="font-size: 36rpx;color: #3D3D3D;font-weight: 500;">支付</text>
		</view>
		<!-- 内容 -->
		<view class="con_box">
			<view class="title_box">
				<view class="title">
					美孜孜商品
				</view>
				<view class="price">
					<text>￥</text>
					<text style="font-size: 73rpx;">{{money}}</text>
				</view>
			</view>
			<view class="bom">
				<text>收款方</text>
				<text style="color: #030303;font-weight: 500;">美孜孜商品</text>
			</view>
		</view>
		
		<!-- 立即支付 -->
		<view @click="topay" class="pay_btn">
			立即支付
		</view>
		
		<!-- 支付付款弹窗 -->
		<view class="pay_float"
		v-if="isShowOkpay"
		>
			<view class="pya_box">
				<view class="close_box">
					<image @click="closePay" style="width: 23rpx;height: 23rpx;" src="../../static/index/closeX2.png" mode=""></image>
					<text>使用密码</text>
				</view>
				<view class="title_box">
					<view class="title">
						美孜孜商品
					</view>
					<view class="price">
						<text>￥</text>
						<text style="font-size: 73rpx;">330.00</text>
					</view>
				</view>
				<view class="pay_type">
					<text>支付方式</text>
					<text class="price">零钱(剩余99.02)</text>
				</view>
				<view class="ok_pay"
				@click="submitClick"
				>
					确认支付
				</view>
			</view>
			
		</view>
		<!-- 关闭提示弹窗 -->
		<view class="close_prompt"
		v-if="isShowClose"
		>
			<view class="close_p_box">
				<view class="text">
					是否放弃本次付款
				</view>
				<view class="bom_btn">
					<view class="fangqi"
					@click="goback"
					>
						放弃
					</view>
					<view class="jixu"
					@click="juxuPay"
					>
						继续付款
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
				isShowOkpay: false, // 控制确认支付弹窗
				isShowClose: false, // 控制确认关闭弹窗
				productOrderInfo: {}, //下单参数
				money: 0, //支付金额
			}
		},
		onLoad(){
			this.productOrderInfo = this.$store.state.productOrderInfo
			console.log('初始化下单参数',this.productOrderInfo)
			console.log('下单参数', this.$store.state.productOrderInfo)
			this.money = this.$store.state.productOrderInfo.money
		},
		onShow(){
			
		},
		methods:{
			
			// 余额请求下单接口
			getcreatOrder(){
				
			},
			// 关闭当前页面
			closethis(){
				this.isShowClose = true
			},
			topay(){
				this.isShowOkpay = true
			},
			closePay(){
				this.isShowOkpay = false
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			juxuPay(){
				this.isShowClose = false
			},
			submitClick(){
				// 请求下单接口
				this.getcreatOrder()
				
				// this.isShowOkpay = false
				// uni.showModal({
				// 	title: '提示',
				// 	content: '支付失败！'
				// })
				// setTimeout(()=>{
				// 	uni.navigateTo({
				// 		url: '../shopcart/allorder'
				// 	})
				// 	// uni.navigateBack({
				// 	// 	delta: 2
				// 	// })
				// },1000)
				
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			.top_bar{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				image{
					margin-right: 25rpx;
				}
			}
			.con_box{
				width: 100%;
				height: 250rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding-top: 40rpx;
				.title_box{
					display: flex;
					flex-direction: column;
					align-items: center;
					.title{
							font-size: 32rpx;
							color: #080808;
							font-weight: 500;
					}
					.price{
						color: #080808;
						font-weight: 500;
					}
				}
				.bom{
					width:750rpx;
					height:98rpx;
					background:rgba(255,255,255,1);
					border:2rpx solid rgba(105, 105, 105, 0.15);
					box-sizing: border-box;
					padding:  0 41rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #727272;
					}
				}
			}
			.pay_btn{
				width:702rpx;
				height:90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 34rpx;
				font-weight: 500;
				color: #FFFFFF;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,127,0,1));
				border-radius:45rpx;
				margin: 80rpx 0 0 24rpx;
			}
			.pay_float,.close_prompt{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.close_p_box{
					width: 690rpx;
					height: 324rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					position: absolute;
					top: calc(50% - 162rpx);
					left: calc(50% - 345rpx);
					box-sizing: border-box;
					padding: 30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					.text{
						font-size: 30rpx;
						font-weight: 500;
						color: #000000;
						margin-top: 40rpx;
					}
					.bom_btn{
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin-top: 65rpx;
						.fangqi{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;
							font-size: 32rpx;
							color: #000000;
							font-weight: 500;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:53rpx;
						}
						.jixu{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;
							font-size: 32rpx;
							color: #FFFFFF;
							font-weight: 500;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:53rpx;
						}
						
					}
				}
				.pya_box{
					width: 	605rpx;
					// height: 571rpx;
					background-color: #FFFFFF;
					border-radius:12rpx;
					position: absolute;
					top: calc(50% - 285.5rpx);
					left: calc(50% - 302.5rpx);
					box-sizing: border-box;
					padding: 30rpx;
					.close_box{
						display: flex;
						justify-content: space-between;
						align-items: center;
						text{
							color: #586781;
							font-size: 32rpx;
						}
					}
					.title_box{
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-top: 56rpx;
						.title{
							font-size: 32rpx;
							color: #080808;
							font-weight: 500;
						}
						.price{
							font-weight: 500;
							margin-top: 10rpx;
						}
					}
					.pay_type{
						margin-top: 85rpx;
						display: flex;
						justify-content: space-between;
						text{
							font-size: 28rpx;
							color: #727272;
						}
						text.price{
							color: #030303;
							font-weight: 500;
						}
					}
					.ok_pay{
						width:346rpx;
						height:74rpx;
						line-height:74rpx;
						text-align: center;
						font-weight: 500;
						font-size: 32rpx;
						color: #FFFFFF;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,127,0,1));
						border-radius:37rpx;
						margin: 65rpx 0 0 100rpx;
					}
				}
			}
			
		}
	}
</style>
