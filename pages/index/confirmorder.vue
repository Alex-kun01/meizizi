<template>
	<!-- 确认订单 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_bar">
			<image @click="goback" style="width: 23rpx;height: 41rpx;" src="../../static/index/fanhui@3x.png" mode=""></image>
			<view style="font-size: 36rpx;color: #3D3D3D;font-weight: 500;">
				确认订单
			</view>
		</view>
		<!-- 内容 -->
		<view class="con_box">
			<view class="title">
				{{opt.store_name}}
			</view>
			<view class="pic_box">
				<image style="width: 190rpx;height: 186rpx;" :src="opt.image" mode=""></image>
				<view class="right_con">
					<view class="title_box">
						<view class="tit_txt">
							{{opt.store_info}}
						</view>
						<view class="price_box">
							<view>
								<text style="font-size: 26rpx;">￥</text>
								<text style="font-size: 32rpx;">{{allPrice}}</text>
							</view>
							<view style="font-size: 20rpx;color: #9F9F9F;text-align: right;">
								x{{addNum}}
							</view>
						</view>
					</view>
					<view class="color_type">
						{{orderInfo.spe_name}}
					</view>
					<view class="info">
						七天无理由退换
					</view>
				</view>
			</view>
			<view class="pay_num">
				<text class="num_color">购买数量</text>
				<view class="btn">
					<view @click="addJian" class="jian">-</view>
					<view class="num">{{addNum}}</view>
					<view @click="addJia" class="jia">+</view>
				</view>
			</view>
			<view class="pay_num">
				<text class="num_color">配送方式</text>
				<text class="num_color">到店取货</text>
			</view>
			<view class="beizhu">
				<text class="num_color">订单备注</text>
				<input type="text" value="" placeholder="选填" />
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="pay_type">
			<view class="item" @click="changePayType(2)">
				<view class="left">
					<image src="../../static/index/weixin@2x.png" mode=""></image>
					<text>微信支付</text>
				</view>
				<view class="right">
					<image v-if="isPayType === 2" style="width: 25rpx;height: 25rpx;" src="../../static/index/gouxuan@2x.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="changePayType(1)">
				<view class="left">
					<image src="../../static/index/zhifubao@2x.png" mode=""></image>
					<text>支付宝支付</text>
				</view>
				<view class="right">
					<image  v-if="isPayType === 1" style="width: 25rpx;height: 25rpx;" src="../../static/index/gouxuan@2x.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="changePayType(3)">
				<view class="left">
					<image src="../../static/index/yue@2x.png" mode=""></image>
					<text>余额(99.02)</text>
				</view>
				<view class="right">
					<image v-if="isPayType === 3" style="width: 25rpx;height: 25rpx;" src="../../static/index/gouxuan@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 提交订单 -->
		<view class="submit_btn"
		@click="submitClick"
		>
			提交订单
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isPayType: 3, // 支付方式 1 支付宝 2 微信 3余额
				addNum: 1, // 数量
				orderInfo: {}, //订单信息
				opt: {}
			}
		},
		computed:{
			// 计算下单金额
			allPrice(){
			   return this.opt.danjia * this.addNum
			},
		},
		onLoad(opt){
			console.log('opt',opt)
			this.opt = opt
			console.log('下单参数', this.$store.state.productOrderInfo)
			this.orderInfo = this.$store.state.productOrderInfo
			this.addNum = this.$store.state.productOrderInfo.number
		},
		onShow(){
			
		},
		methods:{
			// 重新计算金额
			
			// 初始化支付方式存到vuex订单下单参数
			initServer(){
				this.$store.commit('setProductOrderInfoServer',this.isPayType)
			},
			changePayType(index){
				this.isPayType = index
				
			},
			goback(){
				uni.navigateBack({})
			},
			//减
			addJian(){
				if(this.addNum <= 1) return
				this.addNum--
			},
			// 加
			addJia(){
				this.addNum++
			},
			// 提交订单
			submitClick(){
				let _this = this
				this.initServer()
				// 提交订单时将用户在此页面选择的购买数量更新
				this.orderInfo.money = this.allPrice
				this.orderInfo.number = this.addNum
				console.log('查看更新后的下单参数', this.orderInfo)
				// return
				
				if(this.isPayType == 1){
					// 支付宝支付
				   uni.request({
				   	url: this.$http + '/api/goods/createOrder',
				   	method: 'POST',
				   	data: _this.orderInfo,
				   	success(res){
				   		console.log('下单返回数据', res)
				   		if(res.data.status === 200){
				   			// 创建订单成功
				   			let datas = res.data.data.alipay
							
							
				   			console.log('服务器返回的签名', datas)
							
							uni.requestPayment({
								 provider: "alipay",
								 orderInfo: datas,
								 success: (res) => {
									 console.log('支付宝返回数据', res)
									 
									 let orderIdstr = JSON.parse(res.rawdata).result
									 let orderId =  JSON.parse(orderIdstr).alipay_trade_app_pay_response.out_trade_no
									 
									 console.log('获取到订单编号', orderId)
									 // 付款成功
									 uni.showToast({
									 	title: '付款成功'
									 })
									 setTimeout(()=>{
										 uni.redirectTo({
										 	url: './orderdetails?type='+ '查看购物码' + '&orderId='+ orderId 
										 })
									 },1000)
								 },
								 fail(reh) {
								 	console.log('支付宝错误信息',reh)
								 }
							})
							
							
				   			
				   		}else{
				   			uni.showModal({
				   				title: '提示',
				   				content: res.data.msg
				   			})
				   		}
				   	}
				   })
				}
				if(this.isPayType == 2){
					// 微信支付
					uni.showModal({
						title: '提示',
						content: '微信支付尚未开通'
					})
					
				}
				if(this.isPayType == 3){
					// 余额支付跳转自己的pay页面
					uni.navigateTo({
						url: './pay'
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
		height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				align-items: center;
				image{
					margin-right: 30rpx;
				}
			}
			.con_box{
				width:700rpx;
				// height:507rpx;
				background:rgba(255,255,255,1);
				border-radius:12rpx;
				box-sizing: border-box;
				margin-left: 25rpx;
				background-color: #FFFFFF;
				padding: 20rpx;
				.title{
					font-size: 30rpx;
					color: #3E3E3E;
					font-weight: 500;
					margin-bottom: 33rpx;
					overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap
				}
				.pic_box{
					display: flex;
					image{
						margin-right: 24rpx;
					}
					.title_box{
						display: flex;
						justify-content: space-between;
						// align-items: center;
						.tit_txt{
							width: 270rpx;
							font-size: 26rpx;
							color: #3E3E3E;
							font-weight: 500;
							margin-right: 60rpx;
							 overflow: hidden;
							  text-overflow: ellipsis;
							  display: -webkit-box;
							  -webkit-line-clamp: 3;
							  -webkit-box-orient: vertical;
						}
						.price_box{
							font-weight: 500;
							margin-bottom: 15rpx;
						}
					}
					.color_type{
						// width:269rpx;
						display: inline-block;
						height:42rpx;
						line-height: 42rpx;
						text-align: center;
						background:rgba(250,250,250,1);
						font-weight: 500;
						font-size: 24rpx;
						color: #9F9F9F;
						margin-bottom: 20rpx;
						padding: 0 10rpx;
					}
					.info{
						width:166rpx;
						height:33rpx;
						line-height: 33rpx;
						text-align: center;
						background:rgba(251,243,240,1);
						font-size: 22rpx;
						color: #FF8822;
					}
					
				}
				.num_color{
					font-size: 26rpx;
					color: #333333;
					font-weight: 500;
				}
				
				.pay_num{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-top: 50rpx;
					.btn{
						display: flex;
						
						.jian,.jia{
							width:52rpx;
							height:47rpx;
							border:1rpx solid rgba(231,231,231,1);
							border-radius:0rpx 0rpx 0rpx 6rpx;
							color: #B7B7B7;
							font-size: 42rpx;
							line-height: 47rpx;
							text-align: center;
							font-weight: 400;
						}
						.num{
							width:85rpx;
							height:47rpx;
							border-top:1rpx solid rgba(231,231,231,1);
							border-bottom:1rpx solid rgba(231,231,231,1);
							font-size: 30rpx;
							color: #001111;
							line-height: 47rpx;
							text-align: center;
							font-weight: 500;
							
						}
					}
				}
				.beizhu{
					display: flex;
					align-items: center;
					input{
						margin-left: 30rpx;
						color: #9A9A9A;
						font-size: 26rpx;
					}
				}
			}
			.pay_type{
				width: 700rpx;
				height: 211rpx;
				background-color: #FFFFFF;
				margin: 24rpx 0 0 25rpx;
				border-radius:12rpx;
				box-sizing: border-box;
				padding: 23rpx 30rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 23rpx;
				}
				.left{
					display: flex;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						margin-right: 40rpx;
					}
					text{
						font-size: 26rpx;
						color: #3E3E3E;
						font-weight: 500;
					}
				}
				.right{
					width:25rpx;
					height:25rpx;
					border:2rpx solid rgba(206,206,206,1);
					border-radius:50%;
					position: relative;
					image{
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
			.submit_btn{
				width:540rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				color: #FFFFFF;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				position: absolute;
				bottom: 90rpx;
				left: 105rpx;
			}
		}
	}
</style>
