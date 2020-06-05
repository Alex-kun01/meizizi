<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 我的商家 -->
		<view class="top_bar">
			<view class="top">
				<image style="width: 34rpx;height: 30rpx;" src="../../../static/mine/mendian@2x.png" mode=""></image>
				<view class="title">
					屈臣氏(成都百盛店)
				</view>
			</view>
			<view class="con_info">
				<view style="display: flex;">
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
				<view class="img_box">
					<image style="width: 55rpx;height: 55rpx;" src="../../../static/mine/saoma@4x.png" mode=""></image>
					扫码出货
				</view>
			</view>
			<view class="address">
				四川省成都市金牛区西华街道茶店子客运站金耀路 18号西岸观邸
			</view>
		</view>
		<!-- 补货 -->
		<view class="buhuo_box">
			<view class="item" @click="changeIndex(1)">
				<view class="yuan">
					<image v-if="isActive === 1" style="width: 31rpx;height: 31rpx;" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
				</view>
				<view class="text_box">
					<text class="title">自动补货</text>
					<text class="kun">库存报警自动补货</text>
				</view>
			</view>
			<view class="shu"></view>
			
			<view class="item" @click="changeIndex(2)">
				<view class="yuan">
					<image v-if="isActive === 2" style="width: 31rpx;height: 31rpx;" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
				</view>
				<view class="text_box">
					<text class="title">手动补货</text>
					<text class="kun">可对所需库存进行修改</text>
				</view>
			</view>
		</view>
		<!-- 总库存展示 -->
		<view class="kun_box">
			<view class="title">
				总库存: 
				<text style="color: #EB5204;">1000</text>
				<text>/2000</text>
			</view>
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
		
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isActive: 1, // 1自动补货 2手动补货 
				titleList: ['商品名','单价','现有库存','所需库存','报警线',],
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
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeIndex(index){
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
		background-color: #F4F4F4;
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
					justify-content: space-between;
					align-items: center;
					color: #8F8F8F;
					font-size: 24rpx;
					margin-bottom: 24rpx;
					.img_box{
						text-align: center;
						// background-color: pink;
						display: flex;
						flex-direction: column;
						align-items: center;
						align-self: flex-start;
						image{
							margin-bottom: 15rpx;
							margin-left: 20rpx;
						}
					}
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
			.buhuo_box{
				width: 100%;
				height: 108rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.shu{
					width:1rpx;
					height:41rpx;
					border:1rpx solid rgba(204,204,204,1);
					margin: 0 54rpx;
				}
				.item{
					display: flex;
					align-items: center;
					.yuan{
						width:32rpx;
						height:32rpx;
						border:1rpx solid rgba(204,204,204,1);
						border-radius:50%;
						margin-right: 24rpx;
						position: relative;
						image{
							position: absolute;
							top: 0;
						}
					}
					.text_box{
						display: flex;
						flex-direction: column;
					}
					.title{
						font-size: 26rpx;
						font-weight: 500;
						color: #303030;
					}
					.kun{
						font-size: 18rpx;
						font-weight: 500;
						color: #666666;
					}
				}
			}
			.kun_box{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				.title{
					color: #666666;
					font-size: 30rpx;
					font-weight: 500;
					
				}
				.title_list{
					margin-top: 20rpx;
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
			}
		}
	}
</style>
