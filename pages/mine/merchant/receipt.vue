<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 收货单 -->
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
		<!-- 展示列表 -->
		<view class="show_list">
			<view class="title_list">
				<view class="title"
				v-for="(tit, int) in chuhuoTitleList"
				:key='int'
				>
					{{tit}}
				</view>
			</view>
			
			<view class="item"
			v-for="(item, index) in chuhuoList"
			:key='index'
			>
				<view class="item_i">{{item.storeName}}</view>
				<view class="item_i">{{item.price}}</view>
				<view class="item_i">{{item.num}}</view>
				<view class="item_i">{{item.pushTime}}</view>
				
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bom_btn"
		@click="confirmClick"
		v-if="!isConfirm"
		>
			确认收货
		</view>
	</view>
		
</template>

<script>
	export default {
		data () {
			return {
				isConfirm: false, // 是否确认收货
				chuhuoTitleList: ['商品名','单价','数量','时间'],
				// 出货单展示列表
				chuhuoList: [
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
					{
						storeName: '口红',
						price: '49.00',
						num: 20,
						pushTime: '2020.04.23'
					},
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 确认收货
			confirmClick(){
				this.isConfirm = true
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
			.show_list{
				width: 100%;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 24rpx;
				margin-top: 24rpx;
				.title_list{
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					.title{
						width: 140rpx;
						text-align: center;
					}
				}
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #919191;
					font-size: 24rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
					.item_i{
						width: 175rpx;
						text-align: center;
					}
				}
				.title_list{
					.title{
						width: 175rpx;
						text-align: center;
					}
				}
			}
			.bom_btn{
				width:540rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				color: #FFFFFF;
				font-weight: 500;
				font-size: 36rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				margin: 50rpx 0 50rpx 105rpx;
			}
		}
	}
</style>
