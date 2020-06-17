<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 彩妆会场 -->
		<!-- 轮播图区域 -->
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item
				v-for="(item, index) in imgList"
				:key="index"
				>
					<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品列表 -->
		<view class="shop_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key="index"
			>
			<view class="img">
				<image style="width: 103rpx;height: 153rpx;" :src="item.img" mode=""></image>
			</view>	
			<view class="title">
				{{item.title}}
			</view>
			<view class="old_price">
				原价{{item.oldPrice}}
			</view>
			<view class="price">
				￥<text>{{item.price}}</text>
			</view>
			<view class="bom-btn">
				立即抢购
			</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 1000,
				imgList:[
					'../../../static/index/shop66.png',
					'../../../static/index/shop66.png',
					'../../../static/index/shop66.png'
				],
				showList: [
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
					},
					{
						img: '../../../static/index/shop99.png',
						title: '百雀羚水乳护肤百雀羚水乳护肤',
						oldPrice: 299,
						price: 18.00
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
			height: 100%;
			background-color: #F4F4F4;
			.lunbo{
				width: 100%;
				height: 312rpx;
				border-radius: 12rpx;
				margin-left: 25rpx;
				image{
					width: 700rpx;
					// height: 312rpx;
				}
			}
			.shop_list{
				width: 100%;
				padding: 0 24rpx;
				box-sizing: border-box;
				margin-top: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				
				.item{
					width: 222rpx;
					// height: 368rpx;
					background-color: #FFFFFF;
					margin-bottom: 24rpx;
					box-sizing: border-box;
					padding: 20rpx 15rpx 0 20rpx;
					.img{
						text-align: center;
					}
					.title{
						font-size: 23.3rpx;
						font-weight: 500;
						color: #272727;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.old_price{
						font-size: 23.3rpx;
						font-weight: 500;
						color: #939393;
						text-decoration: line-through;
						margin: 17rpx 0;
					}
					.price{
						font-size: 20rpx;
						font-weight: 500;
						color: #333333;
						text{
							font-size: 28rpx;
						}
					}
					.bom-btn{
						width:222rpx;
						height:47rpx;
						line-height: 47rpx;
						text-align: center;
						background:linear-gradient(270deg,rgba(255,88,65,1),rgba(255,32,51,1));
						border-radius:0rpx 0rpx 12rpx 12rpx;
						color: #FFFFFF;
						font-size: 24rpx;
						font-weight: 500;
						margin-left: -20rpx;
					}
				}
			}
		}
	}
</style>
