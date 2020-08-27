<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 彩妆系列 -->
		<!-- 搜索 -->
		<view class="search_box">
			<image style="width: 31rpx;height: 29rpx;" src="@/static/index/sosuo@2x.png" mode=""></image>
			<input type="text" value="" placeholder="耳环" />
		</view>
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
		<!-- 导航 -->
		<view class="navigater_box">
			<swiper class="swiper">
				<swiper-item
				v-for="(item, index) in menus"
				:key="index"
				>
					<view class="item">
						<view class="box"
						v-for="(box,iox) in item"
						:key='iox'
						>
							<image :src="box.img" mode=""></image>
							<text>{{box.menuName}}</text>
						</view>
						
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 猜你喜欢 -->
		<view class="cai_like">
			<view class="title">
				今日上新
			</view>
			<view class="hot_list">
				<view class="item"
				v-for="(item, index) in caiList"
				:key='index'
				@click="gotoDetalus(item)"
				>
				<view class="img">
					<image style="width: 156rpx;height: 145rpx;" :src="item.img" mode=""></image>	
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="old_price">
					原价{{item.oldPrice}}
				</view>
				<view class="price">
					<!-- <image style="width: 25rpx;height: 24rpx;" src="@/static/index/huiyuan@3x(3).png" mode=""></image> -->
					会员价：
					<view >
						￥
						<text>{{item.price}}</text>
					</view>
				</view>
				<view class="new_box">
					NEW
				</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 1000,
				imgList:[
					'@/static/mine/jifenshangcheng@2x.png',
					'@/static/mine/jifenshangcheng@2x.png',
					'@/static/mine/jifenshangcheng@2x.png'
				],
				// 菜单二维数组
				menus:[],
				navigaterList: [
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '彩妆套装'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '喷雾'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '气BB'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '粉底'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '散粉'
					},	
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '眼影'
					},	
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '眉笔'
					},	
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '睫毛膏'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '彩妆套装'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '喷雾'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '气BB'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '粉底'
					},
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '散粉'
					},	
					{
						img: '@/static/index/huiyuanzhongxin@2x.png',
						menuName: '眼影'
					}
				],
				caiList: [
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					},
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					},
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					},
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					},
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					},
					{
						img: '@/static/mine/avatar.jpg',
						title: '百雀羚水乳护肤 套装补水保湿百雀羚水乳护肤 套装补水保湿',
						oldPrice: 299,
						price: 198
					}
				]
			}
		},
		onLoad(){
			// 模拟真实数据请求截取
			this.menus = this.getTargetData(this.navigaterList, 8)
		},
		onShow(){
			
		},
		methods:{
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 跳转产品详情页
			gotoDetalus(item){
				uni.navigateTo({
					url: '../productdetails'
				})
			},
			// 将菜单数据截取成展示结构 传入一维数组，返回想要的二维数组结构
			// arr 目标数组 
			// mnum 一页展示个数
			getTargetData(arr, mnum){
				let staticArr = arr
				let newArr = []
				var num = Math.ceil(arr.length / mnum)
				console.log('计算出的页数',arr.length, num)
				for(let i = 0; i < num; i++){
					let narr
					if(staticArr.length >= mnum){
						narr = staticArr.splice(0,mnum)
					}else{
						narr = staticArr
					}
					
					newArr.push(narr)
				}
				console.log('目标二维数组', newArr)
				
				
				return newArr
			},
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
		background-color: #FFFFFF;
		.content{
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			.search_box{
				width: 690rpx;
				margin-left: 30rpx;
				box-sizing: border-box;
				padding: 30rpx;
				height:69rpx;
				background:  #F4F4F4;
				// background-color: pink;
				border-radius:35rpx;
				display: flex;
				align-items: center;
				padding-top: 24rpx;
				image{
					margin-right: 22rpx;
				}
				input{
					font-size: 26rpx;
					color: #575757;
				}
			}
			.lunbo{
				width: 100%;
				// height: 267rpx;
				border-radius: 12rpx;
				// margin-left: 25rpx;
				// margin-top: 30rpx;
				padding: 30rpx 0 0 25rpx;
				// background-color: blue;
				box-sizing: border-box;
				
				image{
					width: 100%;
					height: 267rpx;
				}
			}
			.navigater_box{
				margin: 30rpx 0;
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				// background-color: pink;
				.item{
					// background-color: green;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.box{
						width: 178rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 10rpx;
						image{
							width: 108rpx;
							height: 108rpx;
						}
						text{
							font-size:24rpx;
							font-weight:500;
							color:rgba(0,0,0,1);
						}
					}
				}
			}
			.hot_like,.cai_like{
				// background-color: black;
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx;
				.title{
					color: #222222;
					font-size: 38rpx;
					font-weight: 500;
					margin-bottom: 35rpx;
					}
					.hot_list{
						width: 100%;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						
						.item{
							width:228rpx;
							// height:384rpx;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(235,235,235,1);
							border-radius:12rpx;
							margin-bottom: 30rpx;
							position: relative;
							.new_box{
								width:62rpx;
								height:29rpx;
								line-height: 29rpx;
								text-align: center;
								background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
								border-radius:6rpx;
								color: #FFFFFF;
								font-size: 22rpx;
								position: absolute;
								top: 0;
								left: 0;
							}
							.img{
								text-align: center;
								padding: 32rpx 0 20rpx 0;
							}
							.title{
								box-sizing: border-box;
								padding: 0 40rpx 0  21rpx;
								color: #272727;
								font-size: 24rpx;
								overflow: hidden;
							  text-overflow: ellipsis;
							  display: -webkit-box;
							  -webkit-line-clamp: 2; //行数
							  -webkit-box-orient: vertical;
							}
							.old_price{
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:bold;
								text-decoration:line-through;
								color:rgba(147,147,147,1);
								line-height:41rpx;
								box-sizing: border-box;
								padding-left: 21rpx;
							}
							.price{
								box-sizing: border-box;
								padding-left: 21rpx;
								margin-bottom: 20rpx;
								display: flex;
								align-items: center;
								font-weight: 500;
								font-size: 22rpx;
								image{
									margin-right: 24rpx;
								}
								text{
									font-size: 30rpx;
								}
							}
						}
					
				}
			}
			
			
		}
	}
</style>
