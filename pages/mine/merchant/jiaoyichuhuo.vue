<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 交易记录 -->
		<view class="show_list"
		v-if="showList.length != 0">
		
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			@click="gotoinfo(item)"
			>
				
				<view class="left">
					<image :src="item.shop_logo" mode=""></image>
					<view class="con_text">
						<view class="name">
							{{item.shop_company}}
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
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				showList: [],
				page: 1,
				limit:10,
				isLoading: false,
				opt: {},
			}
		},
		onLoad(opt){
			this.opt = opt
		},
		onShow(){
			this.showList = []
			this.getData()
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.request({
							url: _this.$http + '/api/user/getShopOrderList',
							method:'GET',
							data:{
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit,
								shop_id: _this.opt.id
							},
							success(res){
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
					url: './receiptchu?id='+ item.order_id+ '&type=' + item.order_status
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
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				// background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #FFFFFF;
					box-shadow: #EEEEEE 0 0 10rpx 5rpx;
					margin-bottom: 10rpx;
					box-sizing: border-box;
					padding: 24rpx;
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
							background-color:  #FF7A2D;;
							font-size: 22rpx;
							border-radius:17rpx;
						}
					}
				}
			}
		}
	}
</style>
