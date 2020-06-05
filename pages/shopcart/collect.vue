<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 收藏 -->
		<view class="show_list">
			<view class="item"
			v-for="(item,index) in showList"
			:key="index"
			@click="gotoDetauls(item)"
			>
				<image class="img" :src="item.img" mode=""></image>
				<view class="con_text">
					<view class="title">
						{{item.title}}
					</view>
					<view class="shoucangNum">
						{{item.num}}人收藏
					</view>
					<view class="price">
						<text>￥</text>
						<text style="font-size: 34rpx;">{{item.price}}</text>
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
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					},
					{
						img: '../../static/shopcart/shop2.png',
						title: '雅诗兰黛DW持妆粉底液 油皮亲 持久不脱妆遮瑕控油防晒 ',
						num: 11, // 收藏人数
						price: 40.00
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			gotoDetauls(item){
				console.log('item',item)
				uni.navigateTo({
					url: '../index/productdetails'
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
			height: 100%;
			background-color: #F4F4F4;
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					box-sizing: border-box;
					padding: 18rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					display: flex;
					.img{
						width: 222rpx;
						height: 198rpx;
						margin-right: 25rpx;
					}
					.con_text{
						.title{
							width: 394rpx;
							font-size:27rpx;
							font-weight:500;
							color:rgba(39,39,39,1);
							line-height:41rpx;
							margin-bottom: 25rpx;
						}
						.shoucangNum{
							font-size:24rpx;
							font-weight:500;
							color:rgba(148,148,148,1);
							line-height:36rpx;
							margin-bottom: 10rpx;
						}
						.price{
							font-size:24rpx;
							font-weight:500;
							color:rgba(253,105,54,1);
							line-height:36rpx;
						}
					}
				}
			}
		}
	}
</style>
