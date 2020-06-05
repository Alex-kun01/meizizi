<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 订单详情 -->
		<view class="top_con">
			<view class="top_bar">
				<image @click="goback" style="width: 19rpx;height: 33rpx;" src="../../static/index/fanhui@4x.png" mode=""></image>
				<view style="font-size: 36rpx;font-weight: 500;color: #FFFFFF;">
					订单详情
				</view>
				<text></text>
			</view>
			<view class="top_text">
				<view
				 v-if="isPayEnd"
				 style="font-size: 36rpx;color: #FFFFFF;"
				 >
					买家已付款
				</view>
				<view v-if="!isPayEnd">
					<view style="font-size: 36rpx;color: #FFFFFF;">
						等待买家付款
					</view>
					<view style="font-size: 24rpx;color: #FFFFFF;margin-top: 15rpx;">
						剩{{hours}}小时{{minute}}分{{second}}秒自动关闭
					</view>
				</view>
				<image style="width: 168rpx;height: 170rpx;" src="../../static/index/tupian@2x.png" mode=""></image>
			</view>
		</view>
		<!-- 内容 -->
		<view class="con_box">
			<view class="title">
				Dior迪奥烈焰蓝金红管经典口红唇膏
			</view>
			<view class="pic_box">
				<image style="width: 190rpx;height: 186rpx;" src="../../static/index/2233.png" mode=""></image>
				<view class="right_con">
					<view class="title_box">
						<view class="tit_txt">
							Dior迪奥烈焰蓝金红管 经典口红唇膏
						</view>
						<view class="price_box">
							<view>
								<text style="font-size: 26rpx;">￥</text>
								<text style="font-size: 32rpx;">330.00</text>
							</view>
							<view style="font-size: 20rpx;color: #9F9F9F;text-align: right;">
								x1
							</view>
						</view>
					</view>
					<view class="color_type">
						颜色分类：126SWING
					</view>
				</view>
			</view>
			<view class="pay_num">
				<text style="font-size: 25.5rpx;color: #A1A1A1;font-weight: 500;">商品总价</text>
				<view class="btn">
					<text style="font-size: 24rpx;color: #8E8E8E;">￥</text>
					<text style="font-size: 30rpx;color: #8E8E8E;">330.00</text>
				</view>
			</view>
			<view class="pay_num">
				<text class="num_color">实付款</text>
				<view>
					<text style="font-size: 24rpx;color: #FF8721;font-weight:500;">￥</text>
					<text style="font-size: 30rpx;color: #FF8721;font-weight:500;">330.00</text>
				</view>
			</view>
		</view>
		<!-- i订单信息 -->
		<view class="order_info">
			<view class="top">
				<view class="shu"></view>
				<text>订单信息</text>
			</view>
			<view class="item">
				<text>订单编号</text>
				<text>2004201422518222818</text>
				<text style="color: #FF8E02;">复制</text>
			</view>
			<view class="item">
				<text>下单时间</text>
				<text>2020-04-20  14:24:28</text>
				<text></text>
			</view>
		</view>
		<!-- 付款按钮 -->
		<view class="pay_btn"
		v-if="!isPayEnd"
		@click="submitClick"
		>
			付款
		</view>
		<!-- 二维码 -->
		<view class="erweima"
		v-if="isPayEnd"
		>
			<image style="width: 252rpx;height: 252rpx;" src="../../static/index/erweima.png" mode=""></image>
			<text>凭购物码到附近门店取货</text>
			<view class="mendian">
				附近门店
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isPayEnd: false, // 是否已付款
				ddd: 36000000, // 临时毫秒数 24小时
				hours: '', //小时数
				minute: '', // 分钟数
				second: '', // 秒数
				times: null, // 
			}
		},
		onLoad(opt){
			console.log('opt', opt)
			if(opt.type == '待付款'){
				this.isPayEnd = false
			}
			if(opt.type == '查看购物码'){
				this.isPayEnd = true
			}
			this.getRemTimes(this.ddd)
			this.countDown()
		},
		onShow(){
		 	
		},
		methods:{
			// 获取并计算剩余时间
			// time 毫秒数
			getRemTimes(time){
				
				let allSecond = time / 1000  // 总共的秒数
				console.log('总共的秒数',allSecond)
				let hours = allSecond / 3600 // 总的小时数
				console.log('总的小时数',hours)
				let targetHours = parseInt(hours)  //目标小时数
				console.log('目标小时数',targetHours)
				let syhours = hours - targetHours
				
				console.log('余下小时数',syhours)
				// return
				let minute = +syhours * 3600 / 60 //分钟数
				console.log('分钟数',minute)
				let targetMinute = parseInt(minute)  //目标分钟数
				console.log('目标分钟数',targetMinute)
				let syMinute = '0.' + minute.toString().replace(/\d+\.(\d*)/,"$1") //剩余秒数
				console.log('剩余秒数',syMinute)
				let targetSecond = Math.ceil(+syMinute * 60) //目标秒数
				console.log('目标秒数',targetSecond)
				this.hours = targetHours
				this.minute = targetMinute
				this.second = targetSecond
			},
			// 倒计时
			countDown(){
				let _this = this
				this.times = setInterval(() => {
					if(_this.second === 0){
						if(_this.minute === 0){
							if(_this.hours === 0){
								console.log('我进来了')
								clearInterval(_this.times)
								return
							}else{
								_this.hours--
								_this.minute = 59
								_this.second = 60
							}
						}else{
							_this.minute--
							_this.second = 60
						}
					}
					// 累减
					_this.second--
					
				}, 1000)
				
			},
			// 付款按钮
			submitClick(){
				uni.navigateTo({
					url: './pay'
				})
			},
			goback(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,143,2,1));
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			.top_con{
				width:750rpx;
				height:298rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,143,2,1));
				box-sizing: border-box;
				padding: 24rpx;
				.top_bar{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 40rpx;
				}
				.top_text{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
			.con_box{
				width:750rpx;
				height:410rpx;
				background:rgba(255,255,255,1);
				border-radius:12rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				margin-top: 18rpx;
				padding: 20rpx;
				.title{
					font-size: 30rpx;
					color: #3E3E3E;
					font-weight: 500;
					margin-bottom: 33rpx;
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
						}
						.price_box{
							font-weight: 500;
							margin-bottom: 15rpx;
						}
					}
					.color_type{
						width:269rpx;
						height:42rpx;
						line-height: 42rpx;
						text-align: center;
						background:rgba(250,250,250,1);
						font-weight: 500;
						font-size: 24rpx;
						color: #9F9F9F;
						margin-bottom: 20rpx;
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
					margin-top: 20rpx;
					.btn{
						display: flex;
						align-items: center;
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
			.order_info{
				width: 100%;
				height: 199rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
				box-sizing: border-box;
				padding: 24rpx;
				.top{
					height: 28rpx;
					font-size: 27.3rpx;
					font-weight: 500;
					color: #3C3C3C;
					display: flex;
					align-items: center;
					.shu{
						width:3rpx;
						height:28rpx;
						background:rgba(229,112,55,1);
						margin-right: 12rpx;
					}
				}
				.item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					
					text{
						font-size: 24rpx;
						color: #646464;
					}
				}
			}
			.erweima{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 36rpx;
				text{
					font-size: 27rpx;
					color: #3C3C3C;
					font-weight: 500;
					margin-top: 26rpx;
				}
				.mendian{
					width:138rpx;
					height:37rpx;
					line-height: 37rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 24rpx;
					font-weight: 500;
					background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
					border-radius:19rpx;
					margin: 26rpx 0;
				}
			}
			.pay_btn{
				width:543rpx;
				height:91rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				line-height: 91rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				color:#FFFFFF;
				margin: 161rpx 0 89rpx 104rpx;
			}
			
			
		}
	}
</style>
