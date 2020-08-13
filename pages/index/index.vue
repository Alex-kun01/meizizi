<template>
	<!-- 首页 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<view class="location_box"
				@click="reClick"
			>
				<image src="../../static/mine/dizhi@2x.png" mode=""></image>
				<view class="address_show">
					{{address}}
				</view>
			</view>
			<view class="search_box"
			@click="gotoTarget('./search')"
			>
				<image style="width: 30rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
				<input type="text" value="" placeholder="搜索" />
				<view class="search_btn">
					搜索
				</view>
			</view>
			<view style="position: relative;"
			@click="gotoshop"
			>
				<image src="../../static/index/gouwuche@2x.png" mode=""></image>
				<!-- <image src="../../static/index/gouwuche@8x.png" mode=""></image> -->
				<view class="float">{{cart_count}}</view>
			</view>
			<view style="position: relative;">
				<image @click="gotoTarget('../mine/set/news')" src="../../static/index/xiaoxi.png" mode=""></image>
				<!-- <image  @click="gotoTarget('../mine/set/news')"  src="../../static/mine/kefu@2x.png" mode=""></image> -->
			</view>
			
		</view>
		<!-- 轮播 -->
		
		<view class="lunbo">
			<swiper class="screen-swiper"
			:class="dotStyle?'square-dot':'round-dot'"
			:indicator-dots="true" :circular="true"
			 :autoplay="true"
			 :height="100"
			 interval="5000"
			 duration="400">
				<swiper-item
				v-for="(item,index) in banner"
				:key="index"
				@click="gotomenu(item)"
				>
					<image style="height: 276rpx;" :src="item.pic" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 菜单列 -->
		
		<view class="menu_box">
			<swiper class="swiper">
				<swiper-item
				v-for="(item,index) in menus"
				:key='index'
				>
					<view class="item">
						<view class="box"
						v-for="(box, iox) in item"
						:key="iox"
						@click="gotomenu(box)"
						>
							<image :src="box.pic" mode=""></image>
							<text>{{box.name}}</text>
						</view>
						
					</view>
				</swiper-item>
			</swiper>
			
		</view>
		
		
		<!-- 活动专区  没图先不写-->
		<view class="activity"
		>
			<image class="pic_1" @click="gotomenu(activity[0])" :src="activity[0].pic" mode=""></image>
			<view class="pic_bom_box">
				<image class="pic_2" @click="gotomenu(activity[1])"  :src="activity[1].pic" mode=""></image>
				<view class="pic_box2">
					<image class="pic_3" @click="gotomenu(activity[2])" :src="activity[2].pic" mode=""></image>
					<image class="pic_4" @click="gotomenu(activity[3])" :src="activity[3].pic" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 今日秒杀 -->
		<view class="today">
			<view class="today_top">
				<view class="time_box">
					<text class="miaosha">今日秒杀</text>
				</view>
				<view class="more_btn" v-if="storeList.length != 0">
					<text>更多好货</text>
					<text>></text>
				</view>
			</view>
			<!-- 秒杀列表 -->
			<view class="today_list">
				<view class="item"
				v-for="(item, index) in storeList"
				:key="index"
				@click="gotoproduct(item, index)"
				>
					<view class="img">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="bom_mes">
					<view class="bom_price" style="display: flex;align-items: center;">
						<!-- <image src="../../static/index/huiyuan@3x(3).png" mode=""></image> -->
						<view class="price">
							会员价￥{{item.vip_price}}
						</view>
						<view class="oldPrice">
							￥{{item.price}}
						</view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员礼品 -->
		<view class="recommend">
			<view class="title">
				会员礼品
			</view>
			<view class="recommend_list">
				<view class="item"
				v-for="(item, index) in recoList"
				:key='index'
				@click="tuijianClick(item.link)"
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
				v-for="(item, index) in likeInfo"
				:key='index'
				@click="gotoproduct(item, index)"
				>
					<view class="img">
						<image class="showPic" :src="item.image" mode=""></image>
						<image style="width: 65rpx;height: 30rpx;position: absolute;top: 0;left: 0;" v-if="item.biqiangImg" :src="item.biqiangImg" mode=""></image>
					</view>
					
					<view class="bom_con">
						<view class="left_info">
							<view class="title">
								{{item.store_name}}
							</view>
							<view class="price_box">
								<!-- <image style="width: 21rpx;height: 21rpx;min-width: 21rpx;min-height: 21rpx;" src="../../static/index/huiyuan@3x(3).png" mode=""></image> -->
								<view class="price">
									会员价￥{{item.vip_price}}
								</view>
								<view class="oldPrice">
									￥{{item.price}}
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 弹出广告层 -->
		<view class="float_ad"
		v-if="isAdShow"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="show_box">
				<!-- 广告小标签 -->
				<view class="ad_bar">
					广告
				</view>
				<image class="adImg" :src="adImg" mode=""></image>
				<!-- 关闭按钮 -->
				<view class="close_float"
				@click="isAdShow = false"
				>
					<image src="../../static/index/close3.png" mode=""></image>
				</view>
			</view>
			
		</view>

		
		
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data() {
			return {
				ddd: 36000000, // 临时毫秒数 24小时
				hours: '', //小时数
				minute: '', // 分钟数
				second: '', // 秒数
				times: null, // 
				banner: [], // 轮播图列表
				 // 菜单列表
				menus: [],  //菜单二
				storeList: [],// 秒杀列表
				// 推荐列表
				recoList: [],
				// 专题精选列表
				likeInfo:[],
				old: {
					scrollTop: 0
				},
				cart_count: 0, 
				isAdShow: false, // 控制弹窗广告显示
				adImg: '../../static/index/item4.png', // 广告图片
				address: '定位中...',
				activity: [], // 活动图片存放
				test:'../../static/index/maijiaxiu1.png'
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			
		},
		methods: {
			init(){
				this.getRemTimes(this.ddd)
				this.countDown()
				this.getData()
				this.userInit()
				this.getLocatiion()
				this.locationInit()
			},
			scroll(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 初始化用户信息
			userInit(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('首页获取本地用户信息',res.data)
						_this.$store.commit('setUserInfo', res.data)
						console.log('首页获取vuex用户信息',res.data)
						uni.request({
							url: _this.$http + '/api/index/info',
							method: 'POST',
							data: {
								token: res.data.token
							},
							success(reg){
								console.log('购物车，收藏夹',reg)
								if(reg.data.status === 200){
									_this.cart_count = reg.data.data.cart_count
								}else{
									
								}
							}
						})
					}
				})
			},
			// 重新定位
			reClick(){
				uni.showLoading({
					title: ''
				})
				this.locationInit()
			},
			// 初始化定位
			locationInit(){
				let _this = this
				uni.getLocation({
					type: 'gcj02',
					geocode:true,
					success(res){
						uni.hideLoading()
						console.log('中文信息', res)
						_this.address = res.address.district
					}
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
			// 首页数据请求
			getData(){
				let _this = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$http + '/api/index',
					method: 'GET',
					success(res){
						console.log('首页返回数据',res)
						if(res.data.status === 200){
							let {banner, menus, store_list, reco_list, likeInfo, activity_list} =  res.data.data
							// 轮播图列表
							_this.banner = banner
							// 菜单列表
						    _this.menus = _this.getTargetData(menus, 10)
							// 秒杀列表
							_this.storeList = store_list
							//为你推荐列表
							_this.recoList = reco_list
							// 专题精选列表
							_this.likeInfo = likeInfo
							// 活动列表
							_this.activity = activity_list
							uni.hideLoading()
						}else{
							uni.showModal({
								title:'提示',
								content: '数据请求出错'
							})
						}
					}
				})
			},
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
				moveHandle(){},
				gotoproduct(item, index){
					console.log('item',item)
					let img = item.image
					// return
					uni.navigateTo({
						url:'./productdetails?id=' + item.id + '&img=' + img
					})
				},
				// 为您推荐
				tuijianClick(url){
					
					uni.showModal({
						title: '提示',
						content: '敬请期待'
					})
				},
				// 菜单项跳转
				gotomenu(item){
					console.log(item)
					// return
					let url = null
					let {condition, type} = item
					// 根据type值跳转响应页面  1 详情页面，2 列表页面
					if(type == 1){
						url = './productdetails'
					}else if (type == 2){
						url = './productlist'
					}
					else {
						return
					}
					let obj = JSON.parse(condition)
					this.setParameter(obj)
					uni.navigateTo({
						url: url
					})
				},
				setParameter(obj){
					this.$store.commit('setParameter', obj)
				},
				// 跳转购物车
				gotoshop(){
					uni.switchTab({
						url: '../shopcart/shopcart'
					})
				},
				// 获取并计算剩余时间
				// time 毫秒数
				getRemTimes(time){
					
					let allSecond = time / 1000  // 总共的秒数
					// console.log('总共的秒数',allSecond)
					let hours = allSecond / 3600 // 总的小时数
					// console.log('总的小时数',hours)
					let targetHours = parseInt(hours)  //目标小时数
					// console.log('目标小时数',targetHours)
					let syhours = hours - targetHours
					
					// console.log('余下小时数',syhours)
					// return
					let minute = +syhours * 3600 / 60 //分钟数
					// console.log('分钟数',minute)
					let targetMinute = parseInt(minute)  //目标分钟数
					// console.log('目标分钟数',targetMinute)
					let syMinute = '0.' + minute.toString().replace(/\d+\.(\d*)/,"$1") //剩余秒数
					// console.log('剩余秒数',syMinute)
					let targetSecond = Math.ceil(+syMinute * 60) //目标秒数
					// console.log('目标秒数',targetSecond)
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
				// 扫描二维码
				scanCode(){
					let _this = this
					uni.scanCode({
						success(res) {
							console.log('扫描二维码',res)
							let	arr = JSON.parse( res.result )
							console.log('arr',arr)
							
							if(arr.mzzUrl){
								uni.navigateTo({
									url: arr.mzzUrl + '?id=' + arr.order_id
								})
							}else{
								uni.showModal({
									title: '提示',
									content: '二维码已失效！'
								})
							}
						}
					})
				},
				// 获取当前位置
				getLocatiion(){
					let _this = this
					uni.getLocation({
					    type: 'wgs84',
					　　 geocode:true,
					    success: function (res) {
							let maddress = res.address || {}
					        // console.log('获取当前位置',maddress)
							_this.$store.commit('setAddress', maddress)
					    }
					});
				}

		}
	}
</script>

<style lang="less" >
	uni-swiper-dots{
		background-color: deeppink !important;
	}
	.uni-swiper-item{
		height:1000px !important;
	}
	uni-swiper .uni-swiper-dots-horizontal{
		bottom:100rpx !important;
	}
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #FFFFFF;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			background-color: #F4F4F4;
			.float_ad{
				width: 100%;
				height: 100vh;
				background: rgba(0,0,0,.6);
				position: absolute;
				top: 0;
				.show_box{
					width: 600rpx;
					height: 600rpx;
					background-color: #FFFFFF;
					position: absolute;
					top: calc(50% - 300rpx);
					left: calc(50% - 300rpx);
					border-radius: 15rpx;
					.adImg{
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}
					.ad_bar{
						display: inline-block;
						color: #FFFFFF;
						font-size: 22rpx;
						background: rgba(0,0,0,.7);
						padding: 2rpx 5rpx;
						position: absolute;
						top: 10rpx;
						left: 10rpx;
						z-index: 9999;
					}
					.close_float{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						background: rgba(0,0,0,.6);
						position: absolute;
						top: -70rpx;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
				
			}
			
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
				.location_box{
					width: 140rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					// background-color: pink;
					image{
						min-width: 22rpx;
						width:22rpx;
						height: 28rpx;
						margin-right: 10rpx;
					}
					.address_show{
						width: 118rpx;
						font-size: 24rpx;
					    white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
				}
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
				width: 750rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 24rpx;
				image{
					height:300upx !important;
					border-radius: 20upx;
				}
			}
			.menu_box{
				width: 100%;
				padding: 25rpx 25rpx 0 25rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				padding-top: 40rpx;
				// background-color: pink;
				.swiper{
					height: 300rpx;
					// background-color: green;
					.item{
						display: flex;
						flex-wrap: wrap;
						.box{
							width: 140rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-bottom: 30rpx;
							image{
								width: 77rpx;
								height: 77rpx;
							}
							text{
								font-size:24rpx;
								font-weight:500;
								color:rgba(51,51,51,1);
							}
						}
						
					}
				}
				
				
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
				// height: 552rpx;
				padding: 0 25rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				.pic_1{
					width: 605rpx;
					height: 203rpx;
					margin-left: 50rpx;
					margin-bottom: 18rpx;
				}
				.pic_bom_box{
					width: 701rpx;
					height: 322rpx;
					display: flex;
					justify-content: space-between;
					.pic_2{
						width: 348rpx;
						height: 322rpx;
						// background-color: red;
					}
					.pic_box2{
						width: 348rpx;
						height: 322rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.pic_3{
							width: 348rpx;
							height: 159rpx;
						}
						.pic_4{
							width: 348rpx;
							height: 159rpx;
						}
					}
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
					min-height: 1000rpx;
					margin-top: 34rpx;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.item{
						width: 329rpx;
						border-radius: 12rpx;
						margin-bottom: 24rpx;
						background-color: #FFFFFF;
						box-shadow: #DDDDDD 0 0 15rpx 5rpx;
						position: relative;
						.title{
							font-size: 24rpx;
							color: #272727;
							padding: 0 18rpx;
							width: 330rpx;
							// background-color: pink;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.bom_mes{
							margin-top: 20rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 12rpx;
							margin-bottom: 10rpx;
							position: absolute;
							bottom: 10rpx;
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
								color: #FF5807;
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
					height: 276rpx;
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
					margin-bottom: 130rpx;
					.item{
						width: 335rpx;
						// height: 341rpx;
						background-color: #FFFFFF;
						border-radius:6rpx 6rpx 0rpx 0rpx;
						box-sizing: border-box;
						padding-bottom: 10rpx;
						margin-bottom: 24rpx;
						box-shadow: #DDDDDD 0 0 15rpx 5rpx;
						.img{
							width: 100%;
							// height: 250rpx;
							position: relative;
							// padding: 22rpx 0 0 67rpx;
							box-sizing: border-box;
							.showPic{
								width: 100%;
								height: 303rpx;
							}
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
									width: 300rpx;
									display: flex;
									align-items: center;
									margin-bottom: 10rpx;
									.price{
										display: inline-block;
										margin-left: 10rpx;
										color: #FF5807;
										font-weight: bold;
									}
									.oldPrice{
										margin-left: 23rpx;
										color: #FF5807;
										// text-decoration:line-through; 
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
