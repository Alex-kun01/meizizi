<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 讲师 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
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
						</view>
					</view>
					<view class="btn_r"
					@click="gotpage"
					>
						补货
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
			//跳转店铺详情
			gotpage(){
				uni.navigateTo({
					url: './storeinfo'
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
			height: 100vh;
			background-color: #F4F4F4;
			box-sizing: border-box;
			padding: 24rpx;
			.show_list{
				width: 100%;
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
		}
	}
</style>
