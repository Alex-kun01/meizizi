<template>
	<!-- 产品列表 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<view class="search_box">
				<image @click="search" style="width: 31rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
				<input type="text" v-model="searchValue" placeholder="口红 / 唇膏" />
			</view>
			<view class="quxiao"
			@click="goback"
			>
				取消
			</view>
		</view>
		<!-- 导航菜单 -->
		<view class="menu_list">
			<view :class="{item: true, active: isActive == 1}" @click='changeActive(1)'>
					综合
			</view>
			<view :class="{item: true, active: isActive == 2}" @click='changeActive(2)'>
				销量
			</view>
			<view :class="{item: true, active: isActive == 3}" @click='changeActive(3)'>
				最新
			</view>
			<view :class="{item: true, active: isActive == 4}" @click='changeActive(4)'>
					价格
					<image style="width: 12rpx;height: 16rpx;margin-left: 16rpx;" src="../../static/index/jiage@2x.png" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="shop_num">
			共找到2627件商品
		</view>
		<view class="shop_list">
			<view class="item"
			v-for="(item, index) in shopList"
			:key="index"
			@click="gotdetalus(item,index)"
			>
				<view class="img">
					<image style="width: 193rpx;height: 201rpx;" :src="item.img" mode=""></image>
				</view>
				<view class="text_con">
					<view class="title">
						{{item.title}}
					</view>
					<view class="old_price">
						原价￥{{item.oldPrice}}
					</view>
				</view>
				
				<view class="price_btn">
					<view class="left_price">
						<image style="width: 25rpx;height: 24rpx;" src="../../static/index/huiyuan@3x(3).png" mode=""></image>
						<view class="price">
							<text style="font-size: 26rpx;font-weight: 500;">￥</text>
							{{item.price}}
						</view>
					</view>
					<!-- <image style="width: 47rpx;height: 47rpx;" src="../../static/index/tianjia@2x(3).png" mode=""></image> -->
				</view>
				<image v-if="item.miaoshaImg" style="width: 93rpx;height: 89rpx;position: absolute;top: 0;right: 0;" :src="item.miaoshaImg" mode=""></image>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="float_box"
		v-if="isShowFloat"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="price_filter">
				<view class="item" 
				@click="changeIsPrice(1)"
				>
					<text>价格从高到低</text>
					<image v-if="isPrice == 1" style="height: 30rpx;width: 30rpx;" src="../../static/index/gou@2x.png" mode=""></image>
				</view>
				<view class="item"
				@click="changeIsPrice(2)"
				>
					<text>价格从低到高</text>
					<image v-if="isPrice == 2" style="height: 30rpx;width: 30rpx;" src="../../static/index/gou@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				searchValue: '',
				isActive: 1, //导航菜单显示
				isShowFloat: false, // 遮罩层显示
				isPrice: 1, //价格排序
				shopList:[
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '../../static/index/miaosha.png',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '../../static/index/miaosha.png',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '../../static/index/miaosha.png',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '../../static/index/miaosha.png',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '',
						oldPrice: 238,
						price: 198
					},
					{
						img: '../../static/index/picu5.png',
						title: 'MAC/魅可全色号子弹头口红打牌唇膏 小辣椒小辣椒小辣椒',
						miaoshaImg: '',
						oldPrice: 238,
						price: 198
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			search(){
				console.log(this.searchValue)
			},
			// 导航改变
			changeActive(index){
				this.isActive = index
				if(index === 4){
					this.isShowFloat = !this.isShowFloat
					return
				}
				this.isShowFloat = false
			},
			// 选择价格排序
			changeIsPrice(index){
				this.isPrice = index
				this.isShowFloat = false
			},
			gotdetalus(item,index){
				uni.navigateTo({
					url: './productdetails'
				})
			},
			moveHandle(){},
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
			height: 100%;
			background-color: #F4F4F4;
			// box-sizing: border-box;
			// padding: 30rpx 30rpx 0 30rpx;
			.float_box{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.3);
				position: absolute;
				top: 200rpx;
				.price_filter{
					width: 100%;
					
					.item{
						width: 100%;
						height: 70rpx;
						box-sizing: border-box;
						padding: 0 28rpx;
						line-height: 70rpx;
						background-color: #FFFFFF;
						border-top: 1rpx solid #EEEEEE;
						color: #3A3A3A;
						font-size: 26rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
				}
				
			}
			.top_search{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				justify-content: space-between;
				background-color: #FFFFFF;
				padding: 30rpx 30rpx 0 30rpx;
				.search_box{
					width:587rpx;
					height:57rpx;
					background:rgba(238,238,238,1);
					box-sizing: border-box;
					padding: 0 30rpx;
					border-radius:27rpx;
					display: flex;
					align-items: center;
					image{
						margin-right: 30rpx;
					}
					input{
						font-size: 26rpx;
						color: #5E5E5E;
						font-weight: 500;
					}
				}
				.quxiao{
					font-size:26rpx;
					font-weight:500;
					color:rgba(41,41,41,1);
				}
			}
			.menu_list{
				width: 100%;
				height: 100rpx;
				line-height: 120rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 30rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #69686C;
				font-weight: 500;
				.item{
					height: 85rpx;
					box-sizing: border-box;
				}
				.item.active{
					border-bottom:  5rpx solid #FF792C;
					color: #FF792C;
				}
			}
			.shop_num{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #8E8E8E;
				box-sizing: border-box;
				padding-left: 30rpx;
				// font-weight: 500;
			}
			.shop_list{
				width: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.item{
					width: 341rpx;
					height: 447rpx;
					background-color: #FFFFFF;
					margin-bottom: 18rpx;
					border-radius:12rpx;
					position: relative;
					
					.img{
						width: 100%;
						box-sizing: border-box;
						padding: 23rpx 0 0 80rpx;
					}
					.text_con{
						width: 100%;
						box-sizing: border-box;
						padding: 0 24rpx;
						.title{
							margin-top: 20rpx;
							font-size: 26rpx;
							color: #111111;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp:2;
							-webkit-box-orient: vertical;
						}
						.old_price{
							font-size:24rpx;
							font-weight:bold;
							text-decoration:line-through;
							color:rgba(133,133,133,1);
							line-height:37rpx;
							margin-top: 20rpx;
						}
					}
					.price_btn{
						width: 100%;
						padding: 0 30rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left_price{
							display: flex;
							align-items: center;
							margin-top: 15rpx;
							image{
								margin-right: 13rpx;
							}
							.price{
								font-size: 34rpx;
								font-weight: 500;
							}
						}
					}
				}
			}
			
			
			
		}
	}
</style>
