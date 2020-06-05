<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 我的商家 详细信息  (库存) -->
		<view class="top_bar">
			<view class="top">
				<image style="width: 34rpx;height: 30rpx;" src="../../../static/mine/mendian@2x.png" mode=""></image>
				<view class="title">
					屈臣氏(成都百盛店)
				</view>
			</view>
			<view class="con_info">
				<image style="width: 180rpx;height: 180rpx;" src="../../../static/mine/avatar.jpg" mode=""></image>
				<view class="text_box">
					<view style="margin-bottom: 30rpx;">
						授信额度:<text style="font-size: 34rpx;font-weight: 500;color: ;">180000</text>
					</view>
					<view class="text">
						<image style="width: 22rpx;height: 18rpx;" src="../../../static/mine/dianhua@2x.png" mode=""></image>
						<text>1763286342</text>
					</view>
					<view class="text">
						<image style="width: 22rpx;height: 18rpx;" src="../../../static/mine/weixin@2x.png" mode=""></image>
						<text>1763286342</text>
					</view>
				</view>
			</view>
			<view class="address">
				四川省成都市金牛区西华街道茶店子客运站金耀路 18号西岸观邸
			</view>
		</view>
		<!-- 导航 -->
		<view class="navagater_box">
			<view :class="{item:true, active: isActive == 1}" @click="changeIndex(1)">
				<view class="title">
					总库存
				</view>
				<view class="info">
					<text style="color: #EB5204;">1000</text>
					<text>/2000</text>
				</view>
			</view>
			<view :class="{item:true, active: isActive == 2}" @click="changeIndex(2)">
				<view class="title">
					会员
				</view>
				<view class="info">
					<text>200</text>
				</view>
			</view>
			<view :class="{item:true, active: isActive == 3}" @click="changeIndex(3)">
				<view class="title">
					出货单
				</view>
				<view class="info">
					<text>1000</text>
				</view>
			</view>
		</view>
		<!-- 显示区域 库存 -->
		<view class="kucun_box box_i" v-if='isActive == 1' >
			<view class="title_list">
				<view class="title"
				v-for="(tit, int) in titleList"
				:key='int'
				>
					{{tit}}
				</view>
			</view>
			
			<view class="show_list">
				<view class="item"
				v-for="(item, index) in showList"
				:key='index'
				>
					<view class="item_i">{{item.storeName}}</view>
					<view class="item_i">{{item.price}}</view>
					<view class="item_i">{{item.shengyu}}</view>
					<view class="item_i">{{item.kucun}}</view>
					<view class="item_i">{{item.danger}}</view>
				</view>
			</view>
		</view>
		
		<!-- 显示区域 会员 -->
		<view class="member_box box_i" v-if='isActive == 2'>
			<view class="member_list">
				<view class="item"
				v-for="(item, index) in memberList"
				:key='index'
				>
					<view style="display: flex;">
						<image :src="item.img" mode=""></image>
						<view class="con_r">
							<view class="name">
								{{item.name}}
							</view>
							<text>复购人数：{{item.fugou}}</text>
							<text>直推人数：{{item.zhitui}}</text>
							<text>入会时间：{{item.pushTime}}</text>
						</view>
					</view>
					<view class="r_shouyi">
						收益:{{item.shouyi}}
					</view>
				</view>
			</view>
		</view>
		<!-- 显示区域 出货单 -->
		<view class="shipping_box box_i" v-if='isActive == 3'>
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
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isActive: 1, 
				titleList: ['商品名','单价','现有库存','所需库存','报警线',],
				// 总库存展示列表
				showList: [
					{
						storeName: '口红',
						price: '49.00',
						shengyu: 20,
						kucun: 30,
						danger: 10
					},
					{
						storeName: '口红',
						price: '49.00',
						shengyu: 20,
						kucun: 30,
						danger: 10
					},
					{
						storeName: '口红',
						price: '49.00',
						shengyu: 20,
						kucun: 30,
						danger: 10
					},
					{
						storeName: '口红',
						price: '49.00',
						shengyu: 20,
						kucun: 30,
						danger: 10
					},
					{
						storeName: '口红',
						price: '49.00',
						shengyu: 20,
						kucun: 30,
						danger: 10
					}
				],
				// 会员展示列表
				memberList:[
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					
				],
				chuhuoTitleList: ['商品名','单价','数量','打印时间'],
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
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeIndex(index) {
				this.isActive = index
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
		background-color: #FFFFFF; //#F4F4F4
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				height: 379rpx;
				box-sizing: border-box;
				padding: 26rpx 33rpx;
				background-color: #FFFFFF;
				.top{
					display: flex;
					align-items: center;
					margin-bottom: 17rpx;
					color: #111111;
					font-size: 34rpx;
					font-weight: 500;
					image{
						margin-right: 20rpx;
					}
				}
				.con_info{
					display: flex;
					align-items: center;
					color: #8F8F8F;
					font-size: 24rpx;
					margin-bottom: 24rpx;
					.text{
						margin-bottom: 10rpx;
					}
					image{
						margin-right: 30rpx;
					}
				}
				.address{
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}
			}
			.navagater_box{
				width: 100%;
				height: 120rpx;
				background-color: #F4F4F4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20rpx;
				font-size: 30rpx;
				font-weight: 500;
				.item{
					width: 33.333%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text{
						font-size: 24rpx;
						color: #666666;
						font-weight: 500;
					}
				}
				.item.active{
					background-color: #FFFFFF;
				}
			}
			.box_i{
				width: 100%;
				padding: 24rpx;
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
				.show_list{
					width: 100%;
					color: #666666;
					font-size: 28rpx;
					font-weight: 500;
					box-sizing: border-box;
					.item{
						
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20rpx;
						.item_i{
							width: 140rpx;
							text-align: center;
						}
					}
				}
				.member_list{
					width: 100%;
					box-sizing: border-box;
					padding: 24rpx;
					.item{
						width: 100%;
						// height: ;
						justify-content: space-between;
						display: flex;
						
						margin-bottom: 18rpx;
						image{
							width: 187rpx;
							height: 181rpx;
							margin-right: 24rpx;
						}
						.con_r{
							display: flex;
							
							flex-direction: column;
							
							.name{
								color: #2B2B2B;
								font-size: 26rpx;
								font-weight: 500;
								margin-bottom: 15rpx;
							}
							text{
								font-size: 24rpx;
								color: #BBBBBB;
								margin-bottom: 15rpx;
							}
						}
						.r_shouyi{
							font-size: 26rpx;
							font-weight: 500;
							color: #FF792C;
							margin-right: 24rpx;
						}
					}
				}
			}
			.shipping_box{
				.title_list{
					.title{
						width: 175rpx;
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
			}
			
		}
	}
</style>
