<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 关注店铺 -->
		<view class="show_list">
			<view class="item"
			v-for="(item,index) in showList"
			:key="index"
			>
				<image class="storeavtar" :src="item.img" mode=""></image>
				<view class="con_text">
					<view class="title">
						{{item.storeName}}
					</view>
					<view class="price_box">
						<view class="left_p">
							<view class="t_price">
								<view class="member">
									<text style="font-size: 26rpx;">￥</text>
									<text>{{item.memberPrice}}</text>
								</view>
								<view class="no_member">
									非会员 {{item.price}}
								</view>
							</view>
							<view class="b_price">
								<image style="width: 21rpx;height: 21rpx;" src="../../static/index/huiyuan@3x(3).png" mode=""></image>
								<text>会员省￥{{item.sheng}}</text>
							</view>
						</view>
						<view class="look">
							去看看
						</view>
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
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					},
					{
						img: '../../static/shopcart/tup@2x.png',
						storeName: '金甲虫化妆品店（ifs国际金融店）',
						memberPrice: 218,
						price: 298,
						sheng: 80.00 
					}
				],
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
			height: 100%;
			background-color: #F4F4F4;
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 700rpx;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding: 24rpx;
					border-radius: 18rpx;
					display: flex;
					margin-bottom: 24rpx;
					.storeavtar{
						width: 130rpx;
						height: 130rpx;
						margin-right: 37rpx;
					}
					.con_text{
						.title{
							font-size:30rpx;
							// font-family:PingFang SC;
							font-weight:500;
							color:rgba(17,17,17,1);
							margin-bottom: 15rpx;
						}
						.price_box{
							display: flex;
							justify-content: space-between;
							.left_p{
								.t_price{
									display: flex;
									align-items: center;
									.member{
										font-size: 34rpx;
										font-weight: 500;
										color: #FD6936;
										margin-right: 15rpx;
									}
									.no_member{
										font-size:24rpx;
										color:rgba(204,201,200,1);
									}
								}
								.b_price{
									image{
										margin-right: 10rpx;
									}
									text{
										font-size:24rpx;
										color:rgba(204,201,200,1);
									}
								}
							}
							.look{
								width:137rpx;
								height:40rpx;
								line-height: 40rpx;
								color: #FFFFFF;
								text-align: center;
								font-size: 24rpx;
								background:rgba(248,107,37,1);
								border-radius:20rpx;
								align-self: flex-end;
							}
						}
					}
				}
			}
		}
	}
</style>
