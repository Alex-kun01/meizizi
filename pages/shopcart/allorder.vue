<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 全部订单 -->
		<view class="top_bar">
			<image @click="goback" class="back" src="../../static/index/fanhui@3x.png" mode=""></image>
			<view class="search_box">
				<image @click="search" src="../../static/index/sosuo.png" mode=""></image>
				<input type="text" v-model="content" placeholder="搜索我的订单" />
			</view>
		</view>
		<!-- 赛选菜单 -->
		<view class="menu_list">
			<view
			:class="{item:true,active: isActive === 11}"
			@click='changeIndex(11)'
			>
				全部
			</view>
			<view
			:class="{item:true,active: isActive === 1}"
			@click='changeIndex(1)'
			>
				待付款
			</view>
			<view
			:class="{item:true,active: isActive === 2}"
			@click='changeIndex(2)'
			>
				待发货
			</view>
			<!-- <view
			:class="{item:true,active: isActive === 4}"
			@click='changeIndex(4)'
			>
				待收货
			</view> -->
			<view
			:class="{item:true,active: isActive === 5}"
			@click='changeIndex(5)'
			>
				待评价
			</view>
		</view>
		
		<!-- 没有订单数据显示 -->
		<view class="on_order"
		v-if="isOrderHave"
		>
			您还没有相关的订单
		</view>
		<!-- 订单列表 -->
		<view class="order_list"
		v-else
		>
			<view class="item"
			v-for="(item,index) in showList"
			:key='index'
			
			>
				<view class="title">
					<view class="l_box">
						<!-- <view class="yuan"> -->
							
						<!-- </view> -->
						<text>{{item.storeName}}</text>
					</view>
					<!-- 订单状态判断显示 -->
					<view class="r_info">
						<text v-if="item.type === 1">待付款</text>
						<text v-if="item.type === 2">待取货</text>
						<text v-if="item.type === 3">已拿货</text>
						<text v-if="item.type === 4">已完成</text>
						<text v-if="item.type === 5">待评价</text>
						<text v-if="item.type === 8">退款中</text>
						<text v-if="item.type === 9">退款成功</text>
						<text v-if="item.type === 10">退款失败</text>
					</view>
					
				</view>
				<view class="con_info">
					<view class="img">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="r_info">
						<view class="title_box">
							<view class="l_title">
								{{item.goods_name}}
							</view>
							<view class="r_title">
								<view class="price">
									<text style="font-size: 26rpx;">￥</text>
									<text>{{item.price}}</text>
								</view>
								<view class="num">
									x{{item.number}}
								</view>
							</view>
						</view>
						<view class="xing_type"
						v-if="item.spe_name"
						>
							{{item.spe_name}}
						</view>
						<view class="tap_color">
							三天无理由退换
						</view>
					</view>
				</view>
				<!-- 按钮  根据type显示不同按钮 -->
				<view class="bom_btn"
				@click="btnClick(item)"
				v-if="item.type != 4"
				>
					<text v-if="item.type === 1">去付款</text>
					<text v-if="item.type === 2">查看购物码</text>
					<text v-if="item.type === 3">查看订单</text>
					<text v-if="item.type === 5">去评价</text>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				orderInfo: '', // 搜索我的订单值
				isActive: 11,  // 订单类型
				content: '', // 搜索
				page: 1,
				limit: 10,
				showList: [],
				opt: {},
				state: 0, // 状态判断
			}
		},
		computed:{
			//是否有订单数据
		isOrderHave(){
			if(this.showList.length == 0){
				return true
			}else{
				return false
			}
		}	
		},
		onLoad(opt){
			console.log('opt', opt)
			this.opt = opt
			if(this.opt.type){
				this.state = this.opt.type
				if(this.state == 2){
					this.isActive = 2
				}
			} 
			
		},
		onShow(){
			this.getData()
		},
		methods:{
			//获取订单列表
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/goods/orderList',
							method: 'POST',
							data: {
								uid: reg.data.uid,
								type: _this.isActive,
								content: _this.content,
								page: _this.page,
								limit: _this.limit,
							},
							success(res){
								uni.hideLoading()
								console.log('订单列表返回数据',res)
								if(res.data.status === 200){
									_this.showList = res.data.data
									console.log('长度', _this.showList.length)
								}else{
									uni.showModal({
										title: '提示',
										content: '订单列表获取失败'
									})
								}
							}
						})
					}
				})
			},
			// 搜索
			search(){
				this.getData()
			},
			// 跳转订单详情
			gotoOrderDetauls(item){
				console.log('item', item)
				uni.navigateTo({
					url: '../index/orderdetails?id=' + item.id
				})
			},
			changeIndex(index){
				this.isActive = index
				// 模拟 请求数据时 待付款/待发货/待评价没有数据展示效果
				// if(index != 1){
				// 	this.isOrderHave = true
				// }else{
				// 	this.isOrderHave = false
				// }
				this.getData()
			},
			// 付款 查看购物码 再次购买 去评价 按钮点击事件
			// 1 去付款 2查看购物码 3再次购买 4 去评价
			btnClick(item){
				console.log('item',item)
				if(item.type === 1){
					//去付款
					uni.navigateTo({
						url: '../index/orderdetails?type=' + '待付款' + '&orderId=' + item.order_sn + '&oid=' + item.id
					})
				}
				if(item.type === 2){
					//查看购物码
					uni.navigateTo({
						url: '../index/orderdetails?type=' + '查看购物码' + '&orderId=' + item.order_sn
					})
				}
				if(item.type === 3){
					// 退款
					uni.navigateTo({
						url: '../index/orderdetails?type=' + '查看订单' + '&orderId=' + item.order_sn
					})
				}
				if(item.type === 5){
					//去评价
					uni.navigateTo({
						url: './comment?id=' + item.master_order_sn + "&gid=" + item.goods_id
					})
				}
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
		background: #F4F4F4;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			min-height: 100vh;
			background-color: #F4F4F4;
			box-sizing: border-box;
			padding: 24rpx;
			.top_bar{
				width: 100%;
				display: flex;
				justify-content: center;
				position: relative;
				.back{
					width: 23rpx;
					height: 41rpx;
					position: absolute;
					top: 15rpx;
					left: 24rpx;
				}
				.search_box{
					width:543rpx;
					height:72rpx;
					border:2rpx solid rgba(233,70,12,1);
					border-radius:36rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding: 0 30rpx;
					image{
						width: 33rpx;
						height: 34rpx;
						margin-right: 30rpx;
					}
					input{
						font-size:28rpx;
						color:rgba(155,155,155,1);
					}
				}
			}
			.menu_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				.item{
					font-size:28rpx;
					font-weight:bold;
					color:rgba(105,104,108,1);
					border-bottom: 4rpx solid #F4F4F4;
				}
				.item.active{
					color: #FF792C;
					border-bottom: 4rpx solid #FF792C;
				}
			}
			.order_list{
				margin-top: 24rpx;
				.item{
					width:702rpx;
					height:369rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					box-sizing: border-box;
					padding: 24rpx 35rpx;
					display: flex;
					flex-direction: column;
					margin-bottom: 24rpx;
					.title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.l_box{
							display: flex;
							align-items: center;
							.yuan{
								width:35rpx;
								height:35rpx;
								border:2rpx solid rgba(206,206,206,1);
								border-radius:50%;
								margin-right: 20rpx;
							}
							text{
								font-size:34rpx;
								font-weight:500;
								color:rgba(48,48,48,1);
							}
						}
						.r_info{
							font-size:26rpx;
							font-weight:500;
							color:rgba(255,124,0,1);
						}
						
					}
					.con_info{
						display: flex;
						margin-top: 24rpx;
						.img{
							width:182rpx;
							height:182rpx;
							min-width: 182rpx;
							min-height: 182rpx;
							background:rgba(250,250,250,1);
							border-radius:6rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 24rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.r_info{
							width: 100%;
							.title_box{
								width: 100%;
								display: flex;
								justify-content: space-between;
								.l_title{
									width:280rpx;
									height:60rpx;
									font-size:26rpx;
									font-weight:500;
									color:rgba(62,62,62,1);
									line-height:32rpx;
									 overflow: hidden;
									  text-overflow: ellipsis;
									  display: -webkit-box;
									  -webkit-line-clamp: 2; //行数
									  -webkit-box-orient: vertical;
								}
								.r_title{
									text-align: right;
									.price{
										font-size:32rpx;
										font-weight:800;
										color:rgba(66,66,66,1);
									}
									.num{
										font-size:20rpx;
										font-weight:bold;
										color:rgba(159,159,159,1);
									}
								}
							}
							.xing_type{
								display: inline-block;
								height:42rpx;
								line-height: 42rpx;
								border-radius: 2rpx;
								padding: 0 15rpx;
								background:rgba(250,250,250,1);
								font-size:24rpx;
								font-weight:bold;
								color:rgba(159,159,159,1);
								margin-top: 15rpx;
							}
							.tap_color{
								width:166rpx;
								height:33rpx;
								background:rgba(251,243,240,1);
								font-size:22rpx;
								font-weight:500;
								color:rgba(255,136,34,1);
								margin-top: 15rpx;
							}
							
						}
					}
					.bom_btn{
						width:165rpx;
						height:57rpx;
						border:2rpx solid rgba(255,123,0,1);
						border-radius:29rpx;
						font-size:26rpx;
						font-weight:500;
						color:rgba(255,126,0,1);
						line-height: 57rpx;
						text-align: center;
						align-self: flex-end;
						margin-top: 10rpx;
					}
				}
			}
			.on_order{
				width: 400rpx;
				text-align: center;
				margin: 100rpx 0 0 175rpx;
				font-size: 32rpx;
				color: #999999;
			}
		}
	}
</style>
