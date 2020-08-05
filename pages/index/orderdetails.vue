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
				 v-if="isPayEnd && opt.type != '已完成查看订单'"
				 style="font-size: 36rpx;color: #FFFFFF;"
				 >
					买家已付款
				</view>
				<view v-if="!isPayEnd &&  opt.type != '已完成查看订单'">
					<view style="font-size: 36rpx;color: #FFFFFF;">
						等待买家付款
					</view>
					<view style="font-size: 24rpx;color: #FFFFFF;margin-top: 15rpx;"
					v-if=" opt.type != '已完成查看订单'"
					>
						<text v-if="orderIsFailure">订单已失效</text>
						<text v-else>剩{{hours}}小时{{minute}}分{{second}}秒自动关闭</text>
					</view>
				</view>
				<view v-if="opt.type == '已完成查看订单'"
				 style="font-size: 36rpx;color: #FFFFFF;"
				>
					订单已完成
				</view>
				<image style="width: 168rpx;height: 170rpx;" src="../../static/index/tupian@2x.png" mode=""></image>
			</view>
		</view>
		<!-- 内容 -->
		<view class="con_box">
			<view class="title">
				{{orderInfo.goods_name}}
			</view>
			<view class="pic_box">
				<image style="width: 190rpx;height: 186rpx;" :src="orderInfo.image" mode=""></image>
				<view class="right_con">
					<view class="title_box">
						<view class="tit_txt">
							{{orderInfo.store_info}}
						</view>
						<view class="price_box">
							<view>
								<text style="font-size: 26rpx;">￥</text>
								<text style="font-size: 32rpx;">{{orderInfo.price}}</text>
							</view>
							<view style="font-size: 20rpx;color: #9F9F9F;text-align: right;">
								x{{orderInfo.number}}
							</view>
						</view>
					</view>
					<view v-if="orderInfo.spe_name" class="color_type">
						{{orderInfo.spe_name}}
					</view>
				</view>
			</view>
			<view class="pay_num">
				<text style="font-size: 25.5rpx;color: #A1A1A1;font-weight: 500;">商品总价</text>
				<view class="btn">
					<text style="font-size: 24rpx;color: #8E8E8E;">￥</text>
					<text style="font-size: 30rpx;color: #8E8E8E;">{{orderInfo.price}}</text>
				</view>
			</view>
			<view class="pay_num">
				<text class="num_color">实付款</text>
				<view>
					<text style="font-size: 24rpx;color: #FF8721;font-weight:500;">￥</text>
					<text style="font-size: 30rpx;color: #FF8721;font-weight:500;">{{orderInfo.price}}</text>
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
				<text>{{orderInfo.master_order_sn}}</text>
				<text  @click="paste(orderInfo.master_order_sn)" style="color: #FF8E02;">复制</text>
			</view>
			<view class="item">
				<text>下单时间</text>
				<text>{{orderInfo.add_time}}</text>
				<text></text>
			</view>
		</view>
		<!-- 付款按钮 -->
		<view class="pay_btn"
		v-if="opt.type == '查看订单'"
		@click="gototuiClick"
		>
			申请退货
		</view>
		<view class="pay_btn"
		v-if="!isPayEnd && opt.type != '查看订单' && opt.type != '已完成查看订单'"
		@click="submitClick"
		>
			付款
		</view>
		
		<!-- 二维码 -->
		<view class="erweima"
		v-if="isPayEnd"
		>
			<image style="width: 252rpx;height: 252rpx;" :src="orderInfo.take_delivery" mode=""></image>
			<text>凭购物码到附近门店取货</text>
			<view class="mendian"
			@click="gotoMendian"
			>
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
				hours: '', //小时数
				minute: '', // 分钟数
				second: '', // 秒数
				orderId: '', // 接收opt的订单id
				staticpic: '../../static/index/erweima.png', //默认二维码
				times: null, // 
				opt: {},
				orderInfo: {
					master_order_sn: ''
				}, //订单信息
			}
		},
		computed:{
			// 订单是否失效
			orderIsFailure(){
				if(this.orderInfo.pay_time == 0){
					return true
				}
				if(!this.hours && !this.minute && !this.second){
					return true
				}
				else{
					return false
				}
			}
		},
		onLoad(opt){
			console.log('opt', opt)
			
			this.opt = opt
			if(opt.orderId){
				// 接收付款后页面跳转返回的订单id
				this.orderId = opt.orderId 
			}
			
			
			if(opt.type == '待付款'){
				this.isPayEnd = false
				
				this.getData()
			}
			if(opt.type == '查看购物码'){
				this.isPayEnd = true
				this.getDataComplete()
			}
			if(opt.type == '查看订单'){
				this.getDataComplete()
			}
			
			if(opt.type == '已完成查看订单'){
				// this.isPayEnd = false
				this.getDataComplete()
			}
			
			
		},
		onShow(){
		 	
		},
		methods:{
			// 付款成功查看购物码
			getDataComplete(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: '加载中...'
						})
						let datas = {
							order_id: _this.orderId,
							uid: reg.data.uid
						}
						console.log('传递参数', datas)
						uni.request({
							url: _this.$http + '/api/goods/orderCom',
							method: 'POST',
							data: datas,
							success(res){
								console.log('付款成功查看购物码', res)
								
								uni.hideLoading()
								if(res.data.status === 200){
									let info = res.data.data
									info.take_delivery = _this.$http + info.take_delivery
									_this.orderInfo = res.data.data
								}else{
									uni.showModal({
										title: '提示',
										content: res.data.msg
									})
								}
							}
						})
					}
				})
			},
			// 待付款请求数据
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: '加载中...'
						})
						let datas = {
							uid: reg.data.uid,
							order_id: _this.opt.orderId
						}
						console.log('查看待付款参数', datas)
						
						uni.request({
							url: _this.$http + '/api/goods/orderInfo',
							method:'POST',
							data: datas,
							success(res){
								console.log('订单详情返回数据',res)
								if(res.data.status == 200){
									let info = res.data.data
									info.uid = reg.data.uid
									_this.orderInfo = info
									_this.getRemTimes(res.data.data.pay_time)
									_this.countDown()
								}else{
									uni.showModal({
										title: '提示',
										content: '订单详情获取失败'
									})
								}
								uni.hideLoading()
							}
						})
					}
				})
			},
			// 获取并计算剩余时间
			// time 毫秒数
			getRemTimes(time){
				var time = time || 0
				
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
				if(this.orderIsFailure){
					uni.showModal({
						title: '提示',
						content: '该订单已失效'
					})
					return
				}
				console.log('查看存储本地之前的数据', this.orderInfo)
				this.$store.commit('setProductOrderInfo',this.orderInfo)
				uni.navigateTo({
					url: './confirmorder?store_info='+ this.orderInfo.store_info + '&image=' + this.orderInfo.image + '&danjia=' + +this.orderInfo.price / this.orderInfo.number + '&oid=' + this.opt.oid
				})
			},
			// 退款按钮
			gototuiClick(){
				let info = this.orderInfo
				console.log('info',info)
				this.$store.commit('setTuiOrderInfo', info)
				uni.navigateTo({
					url: '../shopcart/reqreturn'
				})	
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			// 跳转附近门店
			gotoMendian(){
				uni.switchTab({
					url: '../nearbystore/nearbystore'
				})
			},
			paste(value) {
				uni.setClipboardData({
					data: value,
					success(res){
						console.log('复制版', res)
					}
				})
				// uni.setClipboardData({
				// 	data: value
				// });
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
			height: 100vh;
			background-color: #F4F4F4;
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
				// height:410rpx;
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
						margin-bottom: 30rpx;
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
						border-radius: 4rpx;
						font-weight: 500;
						font-size: 24rpx;
						color: #9F9F9F;
						margin-bottom: 20rpx;
						padding: 0 20rpx;
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
