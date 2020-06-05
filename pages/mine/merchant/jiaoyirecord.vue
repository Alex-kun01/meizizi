<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 交易记录 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			>
				
				<view class="left">
					<image :src="item.img" mode=""></image>
					<view class="con_text">
						<view class="name">
							{{item.storename}}
						</view>
						<view class="order">
							订单编号：{{item.ordernum}}
						</view>
					</view>
				</view>
				<view class="right">
					<view class="time">
						{{item.pushtime}}
					</view>
					<view class="tap_type">
						{{item.type}}
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
				showList: [
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '待发货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '已出货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '已出货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '待发货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '已出货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '已出货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '待发货'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						storename: '成都美妆店',
						ordernum: '2345676545678',
						pushtime: '2020-04-08',
						type: '已出货'
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			
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
							color: #FF7A2D;
							font-size: 22rpx;
							border:1rpx solid rgba(255,122,45,1);
							border-radius:17rpx;
						}
					}
				}
			}
		}
	}
</style>
