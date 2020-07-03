<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 待发货 -->
		<view class="user_info">
			<view class="user">
				<image style="width: 161rpx;height: 157rpx;" src="../../../static/mine/avatar.jpg" mode=""></image>
				<view class="info">
					<view class="item">
						<text class="tit_txt">姓名:</text>
						<text class="con_text">李森森(市级代理)</text>
					</view>
					<view class="item">
						<text class="tit_txt">订单编号:</text>
						<text class="con_text">1233456567722</text>
					</view>
					<view class="phone_box">
						<image style="width: 23rpx;height: 26rpx;" src="../../../static/mine/dianhua@2x.png" mode=""></image>
						<text class="con_text" style="margin-right: 20rpx;">123456789</text>
						<image style="width: 30rpx;height: 25rpx;" src="../../../static/mine/weixin@2x.png" mode=""></image>
						<text class="con_text">123456789</text>
					</view>
				</view>
			</view>
			<view class="address">
				<image style="width: 19rpx;height: 25rpx;" src="../../../static/mine/dizhi@2x.png" mode=""></image>
				<text>四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸</text>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="shop_list">
			<view class="item"
			v-for="(item, index) in shopList"
			:key="index"
			>
				<image :src="item.img" mode=""></image>
				<view class="shop_info">
					<view class="title_box">
						<view class="title">
							{{item.title}}
						</view>
						<view class="r_price">
							<view>
								<text style="font-size: 24rpx;">￥</text>
								<text style="font-size: 32rpx;">{{item.price}}</text>
							</view>
							<view class="num">
								x{{item.num}}
							</view>
						</view>
					</view>
					<view class="color_type">
						颜色分类:{{item.colorType}}
					</view>
				</view>
			</view>
			<view class="bom_info">
				<view class="all_price">
					<text>商品总价</text>
					<text>￥660.00</text>
				</view>
				<view class="price_box">
					<text>实付款</text>
					<text style="color: #FF7528;">￥660.00</text>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order_info">
			<view class="top_bars">
				<view class="shu"></view>
				<text>订单信息</text>
			</view>
			<view class="item">
				<text class="name">订单编号</text>
				<text>20023409497987349873</text>
			</view>
			<view class="item">
				<text class="name">下单时间</text>
				<text>2020-04-20 14:24:28</text>
			</view>
			<view class="item">
				<text class="name">订单状态</text>
				<text>待发货...</text>
			</view>
			
		</view>
		<!-- 确认发货按钮 -->
		<view<!-- class="bom_btn">
			确认发货
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				shopList: [
					{
						img: '../../../static/mine/avatar.jpg',
						title: 'Dior迪奥烈焰蓝金红管经典 口红唇Dior迪奥烈焰蓝金红管',
						colorType: '126WNG',
						price: 330.00,
						num: 1
					},
					{
						img: '../../../static/mine/avatar.jpg',
						title: 'Dior迪奥烈焰蓝金红管经典 口红唇Dior迪奥烈焰蓝金红管',
						colorType: '126WNG',
						price: 330.00,
						num: 1
					},
					{
						img: '../../../static/mine/avatar.jpg',
						title: 'Dior迪奥烈焰蓝金红管经典 口红唇Dior迪奥烈焰蓝金红管',
						colorType: '126WNG',
						price: 330.00,
						num: 1
					},
					{
						img: '../../../static/mine/avatar.jpg',
						title: 'Dior迪奥烈焰蓝金红管经典 口红唇Dior迪奥烈焰蓝金红管',
						colorType: '126WNG',
						price: 330.00,
						num: 1
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
			.user_info{
				width: 100%;
				height: 300rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				box-sizing: border-box;
				padding: 24rpx 30rpx;
				.user{
					display: flex;
					margin-bottom: 15rpx;
					.info{
						margin-left: 24rpx;
						.item{
							
						}
						.phone_box{
							image{
								margin-right: 15rpx;
							}
						}
						.tit_txt{
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
							margin-right: 15rpx;
						}
						.con_text{
							font-size: 24rpx;
							font-weight: 500;
							color: #8F8F8F;
						}
					}
				}
				.address{
					image{
						margin-right: 20rpx;
					}
					text{
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						
					}
				}
			}
			.shop_list{
				width: 100%;
				box-sizing: border-box;
				padding: 17rpx 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.bom_info{
					.all_price{
						display: flex;
						justify-content: space-between;
						text{
							color: #A1A1A1;
							font-size: 24rpx;
							// font-weight: 500;
							
							
							
						}
					}
					.price_box{
						display: flex;
						justify-content: space-between;
						margin-top: 20rpx;
						text{
							color: #333333;
							font-size: 25rpx;
							font-weight: 500;
						}
					}
				}
				.item{
					width: 100%;
					margin-bottom: 24rpx;
					display: flex;
					image{
						width: 170rpx;
						height: 166rpx;
						margin-right: 25rpx;
					}
					.shop_info{
						width: 100%;
						font-size: 26rpx;
						
						.title_box{
							width: 100%;
							display: flex;
							justify-content: space-between;
							margin-bottom: 33rpx;
							.title{
								width: 400rpx;
								color: #3E3E3E;
								font-weight: 500;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2; //行数
								-webkit-box-orient: vertical;
							}
							.r_price{
								text{
									font-weight: 500;
								}
								.num{
									text-align: right;
									color: #9F9F9F;
									font-size: 24rpx;
								}
							}
						}
						.color_type{
							width:252rpx;
							height:42rpx;
							line-height: 42rpx;
							text-align: center;
							background:rgba(250,250,250,1);
							color: #9F9F9F;
							font-size: 24rpx;
						}
					}
				}
			}
			.order_info{
				width: 100%;
				box-sizing: border-box;
				padding: 15rpx 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					margin-bottom: 30rpx;
					font-size: 24rpx;
					// font-weight: 500;
					color: #646464;
					.name{
						margin: 0 98rpx 0 20rpx;
					}
				}
				.top_bars{
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #111111;
					font-weight: 500;
					box-sizing: border-box;
					padding: 15rpx 15rpx 15rpx 0;
					margin-bottom: 15rpx;
					.shu{
						width:3rpx;
						height:28rpx;
						background:rgba(229,112,55,1);
						margin-right: 15rpx;
					}
				}
			}
			.bom_btn{
				width:540rpx;
				height:90rpx;
				line-height: 90rpx;
				text-align: center;
				color: #FFFFFF;
				font-size: 500;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				margin: 50rpx 0 50rpx 105rpx;
				
			}
		}
	}
</style>
