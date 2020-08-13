<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 物流商 交易记录 -->
		<view class="show_list"
		v-if="showList.length != 0"
		>
		<!-- <view class="">
			物流商交易记录
		</view> -->
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			@click="gotoinfo(item)"
			
			>
				
				<view class="left">
					<image :src="item.logo" mode=""></image>
					<view class="con_text">
						<view class="name">
							{{item.company}}
						</view>
						<view class="order">
							订单编号：{{item.order_code}}
						</view>
					</view>
				</view>
				<view class="right">
					<view class="time">
						{{item.need_time.substring(0,10)}}
					</view>
					<view class="tap_type">
						<!-- <text>{{statusList[+item.order_status].name}}</text> -->
						<text v-if="item.order_status == 1.">未发货</text>
						<text v-if="item.order_status == 2.">已发货</text>
						<text v-if="item.order_status == 3.">已收货</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="loading" v-if="isLoading">
			加载中...
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				showList: [],
				page: 1,
				limit:10,
				isLoading: false,
				opt: {},
				// statusList: [{name:'数据错误'},{name:'未发货'},{name:'已发货'},{name:'已收货'}]
			}
		},
		onShow() {
			this.showList = []
			this.page = 1
			this.getData()
		},
		onLoad(opt){
			this.opt = opt
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.showList = []
			this.page = 1
			this.getData()
			 setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							page: _this.page,
							limit: _this.limit,
							shop_id: _this.opt.id
						}
						console.log('交易记录参数', datas)
						// uni.showLoading({
						// 	title: ''
						// })
						uni.request({
							url: _this.$http + '/api/user/getShopOrderList',
							method:'GET',
							data:datas,
							success(res){
								// uni.hideLoading()
								_this.isLoading = false
								console.log('交易记录返回数据',res)
								if(res.data.status === 200){
									_this.showList = [..._this.showList,...res.data.data]
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
			gotoinfo(item){
				console.log('item', item)
				// return
				uni.navigateTo({
					url: './receiptwl?id='+item.order_id + '&type=' + item.order_status
				})
			},
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData()
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
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					image{
						width: 107rpx;
						height: 106rpx;
						margin-right: 24rpx;
					}
					.left{
						display: flex;
						font-size: 28rpx;
						// font-weight: 500;
						color: #333333;
						.name{
							font-weight: 500;
							margin-bottom: 24rpx;
						}
						.order{
							color: #8B8B8B;
							font-size: 24rpx;
						}
					}
					.right{
						color: #8B8B8B;
						font-size: 22rpx;
						.tap_type{
							margin-top: 24rpx;
							width:97rpx;
							height:34rpx;
							line-height: 34rpx;
							text-align: center;
							color: #FFFFFF;
							background-color: #FF7A2D;
							font-size: 22rpx;
							border-radius:17rpx;
						}
					}
				}
			}
		}
	}
</style>
