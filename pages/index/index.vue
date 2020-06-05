<template>
	<!-- 首页 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<image src="../../static/index/saoyisao.png" mode=""></image>
			<view class="search_box"
			@click="gotoTarget('./search')"
			>
				<image style="width: 30rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
				<input type="text" value="" placeholder="保湿面膜0.1元" />
				<view class="search_btn">
					搜索
				</view>
			</view>
			<view style="position: relative;">
				<image src="../../static/index/gouwuche@2x.png" mode=""></image>
				<view class="float">8</view>
			</view>
			<view style="position: relative;">
				<image @click="gotoTarget('../mine/set/news')" src="../../static/index/xiaoxi.png" mode=""></image>
				<!-- <view class="float">9</view> -->
			</view>
			
		</view>
		
		<!-- 轮播 -->
		
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<image style="width: 700rpx;height: 296rpx;" src="../../static/public/tup@2x.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image style="width: 700rpx;height: 296rpx;" src="../../static/public/tup@2x.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image style="width: 700rpx;height: 296rpx;" src="../../static/public/tup@2x.png" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 菜单列 -->
		<view class="menu_list">
			<view class="menu_item">
				<image src="../../static/index/remen@2x.png" mode=""></image>
				<view class='text'>
					热门推荐
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/remen@2x.png" mode=""></image>
				<view class='text'>
					面膜热卖
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/xiangshuixilie@2x.png" mode=""></image>
				<view class='text'>
					香水系列
				</view>
			</view>
			<view class="menu_item"
			@click="gotoTarget('./shoplist/caizhuangxilie')"
			>
				<image src="../../static/index/caizhaungxilie@2x.png" mode=""></image>
				<view class='text'>
					彩妆系列
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/remen@2x.png" mode=""></image>
				<view class='text'>
					男士系列
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/pinpaizhongxin@2x.png" mode=""></image>
				<view class='text'>
					品牌中心
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/meizhaungxueyuan@2x.png" mode=""></image>
				<view class='text'>
					美妆学院
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/hufunaozhong@2x.png" mode=""></image>
				<view class='text'>
					护肤闹钟
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/huiyuanzhongxin@2x.png" mode=""></image>
				<view class='text'>
					会员中心
				</view>
			</view>
			<view class="menu_item">
				<image src="../../static/index/gengduoshangpin@2x.png" mode=""></image>
				<view class='text'>
					更多商品
				</view>
			</view>
		</view>
		<!-- 活动专区  没图先不写-->
		<view class="activity"
		@click="tuijianClick"
		>
			<image src="../../static/index/huodongzhuanqu.png" mode=""></image>
		</view>
		
		<!-- 今日秒杀 -->
		<view class="today">
			<view class="today_top">
				<view class="time_box">
					<text class="miaosha">今日秒杀</text>
					<view class="black_time">
						<text class="item">{{hours}}</text>
						<text>:</text>
						<text class="item">{{minute}}</text>
						<text>:</text>
						<text class="item">{{second}}</text>
					</view>
				</view>
				<view class="more_btn">
					<text>更多好货</text>
					<text>></text>
				</view>
			</view>
			<!-- 秒杀列表 -->
			<view class="today_list">
				<view class="item"
				v-for="(item, index) in todayMessage"
				:key="index"
				@click="gotoproduct(item, index)"
				>
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="bom_mes">
					<view style="display: flex;align-items: center;">
						<image src="../../static/index/huiyuan@3x(3).png" mode=""></image>
						<view class="price">
							￥{{item.price}}
						</view>
						<view class="oldPrice">
							￥{{item.oldPrice}}
						</view>
					</view>
						<view class="dian">
							...
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 为你推荐 -->
		<view class="recommend">
			<view class="title">
				为您推荐
			</view>
			<view class="recommend_list">
				<view class="item"
				v-for="(item, index) in recommendList"
				:key='index'
				@click="tuijianClick(item)"
				>
					<image :src="item.img" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 专题精选 -->
		<view class="Topic">
			<view class="titles">
				专题精选
			</view>
			<view class="Topic_list">
				<view class="item"
				v-for="(item, index) in TopicList"
				:key='index'
				@click="gotoproduct(item, index)"
				>
					<view class="img">
						<image style="width: 204rpx;height: 189rpx;"  :src="item.img" mode=""></image>
						<image style="width: 65rpx;height: 30rpx;position: absolute;top: 0;left: 0;" v-if="item.biqiangImg" :src="item.biqiangImg" mode=""></image>
					</view>
					
					<view class="bom_con">
						<view class="left_info">
							<view class="title">
								{{item.title}}
							</view>
							<view class="price_box">
								<image style="width: 21rpx;height: 21rpx;" src="../../static/index/huiyuan@3x(3).png" mode=""></image>
								<view class="price">
									￥{{item.price}}
								</view>
								<view class="oldPrice">
									￥{{item.oldPrice}}
								</view>
							</view>
						</view>
						<!-- <view class="right_btn">
							<image style="width: 38rpx;height: 38rpx;" src="../../static/index/tianjia@2x(3).png" mode=""></image>
						</view> -->
					</view>
					
				</view>
			</view>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 1000,
				// 今日秒杀列表
				ddd: 36000000, // 临时毫秒数 24小时
				hours: '', //小时数
				minute: '', // 分钟数
				second: '', // 秒数
				times: null, // 
				todayMessage: [
					{
						img: '../../static/index/item4.png',
						title: '雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399
					},
					{
						img: '../../static/index/item4.png',
						title: '雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399
					},
					{
						img: '../../static/index/item4.png',
						title: '雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399
					},{
						img: '../../static/index/item4.png',
						title: '雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399
					}
				],
				// 推荐列表
				recommendList: [
					{
						img: '../../static/index/weinintuijian1.png'
					},
					{
						img: '../../static/index/weinintuijian2.png'
					},
					{
						img: '../../static/index/weinintuijian3.png'
					}
				],
				// 专题精选列表
				TopicList:[
					{
						img: '../../static/index/item4.png',
						title:'雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399,
						biqiangImg: '../../static/index/biqiang@2x(2).png' 
					},
					{
						img: '../../static/index/item4.png',
						title:'雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399,
						biqiangImg: '../../static/index/biqiang@2x(2).png' 
					},
					{
						img: '../../static/index/item4.png',
						title:'雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399,
						biqiangImg: '../../static/index/biqiang@2x(2).png' 
					},
					{
						img: '../../static/index/item4.png',
						title:'雅思兰黛沁水粉底液防晒遮瑕奶油肌',
						price: 69,
						oldPrice: 399,
						biqiangImg: '../../static/index/biqiang@2x(2).png' 
					}
				]
				
			}
		},
		onLoad() {
			this.getRemTimes(this.ddd)
			this.countDown()
		},
		methods: {
			changeIndicatorDots(e) {
					this.indicatorDots = !this.indicatorDots
				},
				changeAutoplay(e) {
					this.autoplay = !this.autoplay
				},
				intervalChange(e) {
					this.interval = e.target.value
				},
				durationChange(e) {
					this.duration = e.target.value
				},
				gotoTarget(url){
					uni.navigateTo({
						url: url
					})
				},
				gotoproduct(item, index){
					uni.navigateTo({
						url:'./productdetails'
					})
				},
				// 为您推荐
				tuijianClick(item){
					uni.showModal({
						title: '提示',
						content: '敬请期待'
					})
				},
				// 获取并计算剩余时间
				// time 毫秒数
				getRemTimes(time){
					
					let allSecond = time / 1000  // 总共的秒数
					console.log('总共的秒数',allSecond)
					let hours = allSecond / 3600 // 总的小时数
					console.log('总的小时数',hours)
					let targetHours = parseInt(hours)  //目标小时数
					console.log('目标小时数',targetHours)
					let syhours = hours - targetHours
					
					console.log('余下小时数',syhours)
					// return
					let minute = +syhours * 3600 / 60 //分钟数
					console.log('分钟数',minute)
					let targetMinute = parseInt(minute)  //目标分钟数
					console.log('目标分钟数',targetMinute)
					let syMinute = '0.' + minute.toString().replace(/\d+\.(\d*)/,"$1") //剩余秒数
					console.log('剩余秒数',syMinute)
					let targetSecond = Math.ceil(+syMinute * 60) //目标秒数
					console.log('目标秒数',targetSecond)
					this.hours = targetHours
					this.minute = targetMinute
					this.second = targetSecond
				},
				// 倒计时
				countDown(){
					let _this = this
					this.times = setInterval(() => {
						if(_this.second === 0){
							if(_this.minute === 0){
								if(_this.hours === 0){
									console.log('我进来了')
									clearInterval(_this.times)
									return
								}else{
									_this.hours--
									_this.minute = 59
									_this.second = 60
								}
							}else{
								_this.minute--
								_this.second = 60
							}
						}
						// 累减
						_this.second--
						
					}, 1000)
					
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			background-color: #F4F4F4;
			.top_search{	
				width: 100%;
				height: 60rpx;
				display: flex;
				// padding: 0 25rpx;
				padding: 50rpx 25rpx 30rpx 25rpx;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				.float{
					width:18rpx;
					height:18rpx;
					background:linear-gradient(181deg,rgba(255,131,11,1),rgba(255,88,7,1));
					border-radius:50%;
					font-size: 18rpx;
					color: #FFFFFF;
					line-height: 18rpx;
					text-align: center;
					position: absolute;
					top: 0;
					right: -5rpx;
				}
				image{
					width: 46rpx;
					height: 47rpx;
				}
				.search_box{
					height: 60rpx;
					width: 437rpx;
					border:2rpx solid rgba(227,28,67,1);
					// background:linear-gradient(-83deg,rgba(255,85,7,1),rgba(255,132,11,1));
					border-radius:30rpx;
					display: flex;
					padding-left: 24rpx;
					box-sizing: border-box;
					align-items: center;
					position: relative;
					
					input{
						color:rgba(112,112,112,1);
						font-size: 26rpx;
						margin-left: 25rpx;
					}
					.search_btn{
						width: 100rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 26rpx;
						text-align: center;
						color: #FFFFFF;
						background:linear-gradient(-83deg,rgba(255,85,7,1),rgba(255,132,11,1));
						border-radius:30px;
						position: absolute;
						right: 0;
					}
				}
			}
			
			.lunbo{
				width: 100%;
				height: 320rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 24rpx;
				
				// .swiper{
				// 	width: 100%;
				// 	.swiper-item{
				// 		width: 100%;
				// 		image{
				// 			width: 100%;
				// 		}
				// 	}
				// }
				
			}
			.menu_list{
				width: 750rpx;
				height: 345rpx;
				padding: 25rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				padding: 43rpx 0 41rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.menu_item{
					width: 140rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				image{
					width: 77rpx;
					height: 77rpx;
				}
				.text{
					font-size: 24rpx;
					color: #333333;
				}
			}
			.activity{
				width: 750rpx;
				height: 552rpx;
				padding: 0 25rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.today{
				width: 750rpx;
				padding: 0 25rpx;
				box-sizing: border-box;
				margin-top: 45rpx;
				.today_top{
					width: 100%;
					display: flex;
					justify-content: space-between;
					.time_box{
						display: flex;
						.miaosha{
							font-size: 36rpx;
							color: #222222;
							font-weight: bold;
							margin-right: 27rpx;
							
						}
						.black_time{
							.item{
								display: inline-block;
								width: 36rpx;
								height: 42rpx;
								line-height: 42rpx;
								text-align: center;
								font-size: 24rpx;
								font-weight: bold;
								background-color: black;
								color: #FFFFFF;
								border-radius: 8rpx;
							}
						}
					}
					.more_btn{
						text{
							color: #FF5807;
							font-size: 30rpx;
						}
					}
				}
				.today_list{
					margin-top: 34rpx;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.item{
						width: 329rpx;
						border-radius: 12rpx;
						margin-bottom: 24rpx;
						background-color: #FFFFFF;
						.title{
							font-size: 24rpx;
							color: #272727;
							padding: 0 18rpx;
						}
						.bom_mes{
							margin-top: 20rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 12rpx;
							margin-bottom: 10rpx;
							image{
								width: 21rpx;
								height: 21rpx;
							}
							font-size: 24rpx;
							.price{
								color: #FF5807;
								font-weight: bold;
								margin-left: 5rpx;
							}
							.oldPrice{
								margin-left: 23rpx;
								font-size: 22rpx;
								color: #666666;
								text-decoration:line-through;
							}
							.dian{
								// align-self: flex-end;
								font-weight: bold;
								margin-right: 10rpx;
							}
						}
					}
					image{
						width: 329rpx;
						height: 323rpx;
						border-radius: 12rpx 12rpx 0 0;
					}
				}
				
			}
			.recommend{
				width: 100%;
				padding: 0 25rpx;
				box-sizing: border-box;
				.title{
					margin-bottom: 20rpx;
					font-size: 36rpx;
					color: #222222;
					font-weight: bold;
					
				}
				image{
					width: 700rpx;
					height: 219rpx;
				}
			}
			.Topic{
				width: 100%;
				padding: 0 25rpx;
				box-sizing: border-box;
				margin-top: 15rpx;
				.titles{
					font-size: 36rpx;
					color: #222222;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				.Topic_list{
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.item{
						width: 335rpx;
						height: 341rpx;
						background-color: #FFFFFF;
						border-radius:6rpx 6rpx 0rpx 0rpx;
						margin-bottom: 24rpx;
						.img{
							width: 100%;
							height: 250rpx;
							position: relative;
							padding: 22rpx 0 0 67rpx;
							box-sizing: border-box;
						}
						.bom_con{
							width: 100%;
							display: flex;
							align-items: center;
							.left_info{
								width: 250rpx;
								font-size: 24rpx;
								padding-left: 26rpx;
								box-sizing: border-box;
								.title{
									font-size: 24rpx;
									color: #272727;
									
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									margin: 10rpx 0;
								}
								.price_box{
									display: flex;
									align-items: center;
									margin-bottom: 10rpx;
									.price{
										margin-left: 10rpx;
										color: #FF5807;
										font-weight: bold;
									}
									.oldPrice{
										margin-left: 23rpx;
										text-decoration:line-through; 
									}
								}
								
							}
							.right_btn{
								width: 85rpx;
								text-align: center;
							}
						}
					}
				}
				
			}
			
		}
	}
	
</style>
