<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 团队管理-我的商家 -->
		<view class="top_bar">
			<view class="img" @click="goback">
				<image style="width: 23rpx;height: 36rpx;" src="../../../static/index/fanhui@2x.png" mode=""></image>
			</view>
			<view @click="changeIndex(1)" :class="{item:true,active: isActive === 1}">
				市级代理（50）
			</view>
			<view @click="changeIndex(2)" :class="{item:true,active: isActive === 2}">
				加盟店（50）
			</view>
		</view>
		<!-- 市级代理 -->
		<!-- <view class="show_list" v-if="isActive === 1"> -->
			<!-- 暂无设计图 -->
			<!-- <view class="item"
			v-for="(item, index) in joinList"
			:key='index'
			>
				<view class="title">
					{{item.store}}
				</view>
				<view class="con_box">
					<image :src="item.img" mode=""></image>
					<view class="con_con">
						<view class="address">
							{{item.address}}
						</view>
						<view class="item_box">
							<view class="item">
								<image src="../../../static/mine/dianhua@2x.png" mode=""></image>
								<text>{{item.phone}}</text>
							</view>
							<view class="item">
								<image src="../../../static/mine/weixin@2x.png" mode=""></image>
								<text>{{item.weixin}}</text>
							</view>
						</view>
					</view>
					<view class="btn_r"
					@click="gotpage"
					>
						查看收益
					</view>
				</view>
			</view> -->
		<!-- </view> -->
		
		<!-- 加盟店 -->
		<view class="shows_list">
			<view class="item"
			v-for="(item, index) in tuijianList"
			:key='index'
			>
				<view class="title">
					{{item.store}}
				</view>
				<view class="con_box">
					<image :src="item.img" mode=""></image>
					<view class="con_con">
						<view class="address">
							{{item.address}}
						</view>
						<view class="item_box">
							<view class="item">
								<image src="../../../static/mine/dianhua@2x.png" mode=""></image>
								<text>{{item.phone}}</text>
							</view>
							<view class="item">
								<image src="../../../static/mine/weixin@2x.png" mode=""></image>
								<text>{{item.weixin}}</text>
							</view>
						</view>
						<view class="num_box">
							总库存:
							<text style="color: #EB5204;">{{item.shengyu}}/</text>
							<text>{{item.kucun}}</text>
							<image style="width: 20rpx;height: 20rpx;margin-left: 10px;" src="../../../static/mine/baojing@2x.png" mode=""></image>
						</view>
					</view>
					<view class="btn_r">
						
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
				isActive: 1, 
				joinList: [
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					},
					{
						img: '../../../static/index/item4.png',
						address: ' 四川省成都市金牛区西华街道茶店子客运站金耀路18号西岸观邸',
						phone: 123456678,
						weixin: 12345678
					}
				],
				tuijianList: [
					{
						store: '屈臣氏(成都百盛店)',
						img: '../../../static/index/item4.png',
						address: '四川省成都市金牛区西华街道茶店子 客运站金耀路18号西岸观邸',
						phone: 15435127231,
						weixin: 1537586351,
						kucun: 2000,
						shengyu: 1000
					},
					{
						store: '屈臣氏(成都百盛店)',
						img: '../../../static/index/item4.png',
						address: '四川省成都市金牛区西华街道茶店子 客运站金耀路18号西岸观邸',
						phone: 15435127231,
						weixin: 1537586351,
						kucun: 2000,
						shengyu: 1000
					},
					{
						store: '屈臣氏(成都百盛店)',
						img: '../../../static/index/item4.png',
						address: '四川省成都市金牛区西华街道茶店子 客运站金耀路18号西岸观邸',
						phone: 15435127231,
						weixin: 1537586351,
						kucun: 2000,
						shengyu: 1000
					},
					{
						store: '屈臣氏(成都百盛店)',
						img: '../../../static/index/item4.png',
						address: '四川省成都市金牛区西华街道茶店子 客运站金耀路18号西岸观邸',
						phone: 15435127231,
						weixin: 1537586351,
						kucun: 2000,
						shengyu: 1000
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeIndex(index){
				this.isActive = index
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
		background: #FFFFFF;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			.top_bar{
				width: 100%;
				height: 100rpx;
				box-sizing: border-box;
				padding: 0 15%;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				.img{
					position: absolute;
					top: 24rpx;
					left: 24rpx;
				}
				.item{
					height: 50%;
					font-size: 32rpx;
					font-weight: 500;
					border-bottom: 6rpx solid #FFFFFF;
				}
				.item.active{
					border-bottom: 6rpx solid #FF7E00;
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding: 25rpx 15rpx;
					margin-bottom: 24rpx;
					.title{
						font-size: 34rpx;
						font-weight: 500;
						color: #111111;
						margin-bottom: 24rpx;
					}
					.con_box{
						display: flex;
						justify-content: space-between;
						align-items: center;
						image{
							width: 180rpx;
							height: 180rpx;
							margin-right: 24rpx;
						}
						.con_con{
							font-size: 24rpx;
							.address{
								width: 390rpx;
								font-weight: 500;
								margin-bottom: 20rpx;
							}
							.item_box{
								// display: flex;
								// margin-bottom: 15rpx;
								.item{
									margin: 0;
									padding: 0;
									margin-bottom: 15rpx;
									image{
										width: 28rpx;
										height: 23rpx;
										margin: 0 5rpx;
									}
								}
							}
							.num_box{
								font-weight: 500;
							}
							
						}
						.btn_r{
							width:105rpx;
							height:31rpx;
							line-height: 31rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 22rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:16rpx;
							align-self: flex-end;
						}
					}
				}
			}
			.shows_list{
				width: 100%;
				margin-top: 24rpx;
				.item{
					width: 100%;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding: 25rpx 15rpx;
					margin-bottom: 24rpx;
					.title{
						font-size: 34rpx;
						font-weight: 500;
						color: #111111;
						margin-bottom: 24rpx;
					}
					.con_box{
						display: flex;
						justify-content: space-between;
						align-items: center;
						image{
							width: 180rpx;
							height: 180rpx;
							margin-right: 24rpx;
						}
						.con_con{
							font-size: 24rpx;
							.address{
								width: 390rpx;
								font-weight: 500;
								margin-bottom: 20rpx;
							}
							.item_box{
								display: flex;
								margin-bottom: 15rpx;
								.item{
									margin: 0;
									padding: 0;
									image{
										width: 28rpx;
										height: 23rpx;
										margin: 0 5rpx;
									}
								}
							}
							.num_box{
								font-weight: 500;
							}
							
						}
						.btn_r{
							width:70rpx;
							height:31rpx;
						}
					}
				}
			}
			
		}
	}
</style>
