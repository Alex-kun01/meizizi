<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="weixin-wx"></view>
		<!-- #endif -->
		<!-- 购物车 -->
		<view class="top_bar">
			<view></view>
			<view style="color: #303030;font-size: 36rpx;font-weight: 500;">
				购物车
			</view>
			<view style="color: #303030;font-size: 30rpx;">
				<view v-if="!isMg" @click="guanliClick">管理</view>
				<view v-else @click="okClick">完成</view>
			</view>
		</view>
		<!-- 购物列表 -->
		<view class="shop_list">
			<view class="null_box" v-if="idNullBox">
				空空如也
			</view>
			<view class="item"
			v-for="(item, index) in shopList"
			:key='index'
			>
				
				<view class="con_info">
					
				<view class="store">
					<view class="left_pic">
						<view class="yuan2"
						@click="chooseThing(item)"
						>
							<!-- 根据商品id显示 -->
							<image v-if="showThing.includes(item.id)" style="width: 30rpx;height: 30rpx;" src="@/static/index/gouxuan@2x.png" mode=""></image>
						</view>
						<image :src="item.image" mode=""></image>
					</view>
					<view class="right_con">
						<view class="r_text">
							{{item.goods_name}}
						</view>
						<text class="r_type"
						v-if="item.spe_name"
						>
							{{item.spe_name}}
						</text>
						<view class="r_btn">
							<view class="price">
								￥{{item.market_price}}
							</view>
							<view class="btn">
								<view
								@click="jianClick(item)"
								class="jian">-</view>
								<view class="num">{{item.goods_num}}</view>
								<view
								@click="jiaClick(item)"
								class="jia">+</view>
							</view>
						</view>
					</view>
				</view>
					
				</view>
			</view>
		</view>
		<!-- 你可能还喜欢 -->
		<view class="like_box">
			<view class="like">
				<view class="gang">
					<view class="hen"></view>
					<view class="dian"></view>
				</view>
				<view class="text">
					你可能还喜欢
				</view>
				<view class="gang">
					<view class="dian"></view>
					<view class="hen"></view>
				</view>
			</view>
			<view class="like_list">
				<view class="item"
				v-for="(item, index) in likeList"
				:key='index'
				@click="gotoDetauls(item)"
				>
					<image :src="item.image" mode=""></image>
					
					<view class="con_text">
						<view class="title">
							{{item.store_name}}
						</view>
						
						
						<view class="bom_btn">
							<view style="display: flex;align-items: center;">
								<!-- <image style="width: 21rpx;height: 21rpx;" src="@/static/shopcart/huiyuan.png" mode=""></image> -->
								<view class="fukuan">
									<text style="margin-right: 15rpx;color: #FF792C;">会员价￥{{item.vip_price}}</text>
									<text>￥{{item.price}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 结算 -->
		<view class="bom_bar">
			<view class="left">
				<view @click="changeAllActive" :class="{yuan:true, active: allActive}">
					<image v-if="allActive" style="width: 30rpx;height: 30rpx;" src="@/static/index/gouxuan@2x.png" mode=""></image>
				</view>
				<text style="margin-left: 20rpx; color: #6A6A6A;font-size: 30rpx;">
					全选
				</text>
			</view>
			<view class="guanli"
			v-if="isMg"
			>
				<view class="shoucahng"
				@click="gotorelation"
				>
					移入收藏夹
				</view>
				<view
				 @click="deleteClick"
				 class="delete">
					删除
				</view>
			</view>
			<view class="jiesuan"
			v-else
			>
				<text class="heji">合计：</text>
				<text class="price">￥{{allPrice}}</text>
				
				<view class="jieduan_btn"
				@click="jiesuanClick"
				>
					结算
				</view>
			</view>
		</view>
		
		<!-- 删除提示弹出层 -->
		<view class="delete_float"
		v-if="isDeleteShow"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="close_p_box">
				<view class="text">
					是否删除选中的商品
				</view>
				<view class="bom_btn">
					<view class="fangqi"
					@click="isOnClick"
					>
						取消
					</view>
					<view class="jixu"
					@click="isOkClick"
					>
						确定
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
		data() {
			return {
				isMg: false, // 是否是管理模式
				isDeleteShow: false, // 控制删除提示弹出层显示
				allActive: false, //全选 控制
				showThing: [], // 被选中的商品列表 
				shopList: [],
				goodsList: [], // goods_id
				likeList: [],
				page: 1,
				limit: 100,
				storeList: [], // 所有选中商品列表
			}
		},
		computed:{
			 // 计算订单总价
			allPrice(){
				let allNum = 0
				this.shopList.forEach(item =>{
					if(this.showThing.includes(item.id)){
						console.log('item',item)
						allNum = allNum + (item.market_price * item.goods_num)
					}
				})
				return allNum
			},
			idNullBox(){
				if(this.shopList.length == 0){
					return true
				}
				return false
			}
		},
		methods: {
			
			// 获取列表数	
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						console.log('pppp',reg)
						if(reg.data.tourist){
							
							uni.showModal({
								title: '提示',
								content: '游客没有该权限，是否去登录？',
								success(rr){
									console.log('rr',rr)
									if(rr.confirm){
										uni.redirectTo({
											url: '../mine/login'
										})
									}
									if(rr.cancel){
										uni.switchTab({
											url: '../index/index'
										})
									}
								}
							})
							return
						}
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/goods/cartList',
							method: 'POST',
							data: {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								uni.hideLoading()
								console.log('购物车列表数据', res)
								if(res.data.status == 200){
									_this.shopList = res.data.data.cart_list
									_this.likeList =res.data.data.goods_list
								}else{
									uni.showModal({
										title: '提示',
										content: res.data.msg
									})
								}
							}
						})
						
						
					}
				})
			},
			// 结算按钮
			jiesuanClick(){
				console.log('商品列表', this.storeList)
				//将订单列表存到vuex
				this.$store.commit('setOrderList', this.storeList)
				uni.navigateTo({
					url: '../../index/confirmordermany'
				})
			},
			// 移入收藏夹
			gotorelation(){
				let _this = this
				console.log('选中的商品列表',this.goodsList)
				console.log('移入收藏夹执行了')
				let targetNum = this.goodsList.length
				let newNum = 0
				this.goodsList.forEach(item =>{
					console.log('查看item数据',item)
					uni.getStorage({
						key: 'userInfo',
						success(reg){
							let datas = {
									id: item,
									type: 1,
									re_type: 1,
									token: reg.data.token
								}
								console.log('查看收藏传递参数xxxxxxxxxxx', datas)
							uni.request({
								url: _this.$http + '/api/index/relation',
								method: 'POST',
								data:datas,
								success(res){
									console.log('加入购物车返回数据', res)
									if(res.data.status == 200){
										newNum++
										if(newNum == targetNum){
											uni.showToast({
												title: '收藏成功'
											})
										}
									}else{
										
									}
								}
							})
						}
					})
					
				})
			},
			
			guanliClick(){
				this.isMg = true
			},
			okClick(){
				this.isMg = false
			},
			moveHandle(){
				
			},
			deleteClick(){
				this.isDeleteShow = true
			},
			// 取消删除
			isOnClick(){
				this.isDeleteShow = false
			},
			// 确定删除
			isOkClick(){
				let _this = this 
				let targetNum = this.showThing.length
				let newNum = 0
				this.showThing.forEach(item =>{
					uni.getStorage({
						key: 'userInfo',
						success(reg){
							uni.request({
								url: _this.$http + '/api/goods/delCart',
								method: 'POST',
								data:{
									id: item,
									token: reg.data.token
								},
								success(res){
									console.log('删除购物车返回数据', res)
									if(res.data.status == 200){
										newNum++
										if(newNum == targetNum){
											uni.showToast({
												title: '删除成功'
											})
											_this.showThing = []
											_this.goodsList = []
											_this.storeList = []
											_this.getData()
											_this.isDeleteShow = false
										}
									}else{
										
									}
								}
							})
						}
					})
					
				})
			},
			gotoDetauls(item){
				console.log('item', item)
				let img = item.image
				uni.navigateTo({
					url: '../../index/productdetails?id=' + item.id + '&img=' + img
				})
			},
			// 根据数组 和值 返回该值在数组中的下标
			isHasElementOne(arr,target){
				
				for(let i = 0, vlen = arr.length;i< vlen; i++){
					if(arr[i] == target){
						return i
					}
				}
				return -1
				
			},
			// 选中商品
			chooseThing(item){
				console.log('item', item)
				if(this.showThing.includes(item.id)){
					// 已经选中 取消
					let index = this.isHasElementOne(this.showThing, item.id)
					console.log('原来数组',this.showThing)
					console.log('返回的下标',index)
					this.showThing.splice(index,1)
					this.goodsList.splice(index,1)
					this.storeList.splice(index,1)
					
					console.log('后来数组',this.showThing)
					this.allActive = false
				}else{
					// 没有选中 选中
					this.showThing.push(item.id)
					this.goodsList.push(item.goods_id)
					this.storeList.push(item)
					console.log('后来数组',this.showThing)
				}
				
			},
			// 全选按钮
			changeAllActive(){
				let list = this.shopList
				this.allActive = !this.allActive
				// 取消全选
				if(!this.allActive){
					this.showThing = []
					this.storeList = []
					this.goodsList = []
				}else{
					// 全选
					list.forEach(item =>{
						if(this.showThing.includes(item.id)){
							// 已被选中 不做处理
						}else{
							this.showThing.push(item.id)
							this.storeList.push(item)
							this.goodsList.push(item.goods_id)
						}
					})
				}
			},
			// 修改购物车商品数量
			edtiShopNum(store){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title:''
						})
						uni.request({
							url: _this.$http + '/api/goods/editCart',
							method: 'POST',
							data: {
								token: reg.data.token,
								id: store.id,
								number: store.goods_num
							},
							success(res){
								console.log('修改购物车数量', res)
								if(res.data.status === 200){
									uni.hideLoading()
								}else{
									uni.showModal({
										title: '提示',
										content: '数量修改失败'
									})
								}
							}
						})
					}
				})
			},
			// 减 按钮
			jianClick(store){
				console.log('store减', store)
				// 等于1
				if(store.goods_num === 1){
					uni.showModal({
						title: '提示',
						content: '宝贝数量不能再少了'
					})
					return
				}
				store.goods_num--
				this.edtiShopNum(store)
			},
			// 加按钮
			jiaClick(store){
				console.log('store加', store)
				// 达到库存数量
				if(store.goods_num === store.stock){
					uni.showModal({
						title:'提示',
						content: '没有更多库存'
					})
					return
				}
				store.goods_num++
				this.edtiShopNum(store)
			},
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #F4F4F4;
		padding-top: 0;
		box-sizing: content-box;
	 }
	 .weixin-wx{
	 	height: var(--status-bar-height);
	 	background: #F4F4F4;
	 	padding-top: 50rpx;
	 	box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			min-height: 100vh;
			width: 100%;
			height: 100%;
			background-color: #F4F4F4;
			.null_box{
				width: 100%;
				height: 300rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 300rpx;
			}
			.delete_float{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				bottom: 0;
				// .msg_box{
				// 	width:690rpx;
				// 	height:324rpx;
				// 	background:rgba(255,255,255,1);
				// 	border-radius:12rpx;
				// 	position: absolute;
				// 	top: calc(50% - 162rpx);
				// 	left: calc(50% - 345rpx);
				// }
				.close_p_box{
					width: 690rpx;
					height: 324rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					position: absolute;
					top: calc(50% - 162rpx);
					left: calc(50% - 345rpx);
					box-sizing: border-box;
					padding: 30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					.text{
						font-size: 30rpx;
						font-weight: 500;
						color: #000000;
						margin-top: 40rpx;
					}
					.bom_btn{
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin-top: 65rpx;
						.fangqi{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;
							font-size: 32rpx;
							color: #000000;
							font-weight: 500;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:53rpx;
						}
						.jixu{
							width:311rpx;
							height:105rpx;
							line-height: 105rpx;
							text-align: center;
							font-size: 32rpx;
							color: #FFFFFF;
							font-weight: 500;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:53rpx;
						}
						
					}
				}
			}
			.top_bar{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 24rpx;
				display: flex;
				justify-content: space-between;
				
			}
				
			.shop_list{
				width: 100%;
				padding: 0 25rpx;
				box-sizing: border-box;
				.item{
					width: 700rpx;
					// height: 349rpx;
					background:rgba(255,255,255,1);
					border-radius:24rpx;
					padding: 31rpx 24rpx 24rpx 24rpx;
					box-sizing: border-box;
					margin-bottom: 24rpx;
					box-shadow: #DDDDDD 0 0 15rpx 5rpx;
					.yuan{
						width: 30rpx;
						height: 30rpx;
						border:2rpx solid rgba(206,206,206,1);
						border-radius:50%;
						position: relative;
						image{
							position: absolute;
							top: 0;
						}
					}
					.top_title{
						display: flex;
						align-items: center;
						margin-bottom: 38rpx;
						box-sizing: border-box;
						.yuan{
							position: relative;
							image{
								position: absolute;
								top: 0;
							}
						}
						.title{
							margin-left: 24rpx;
							color: #303030;
							font-size: 34rpx;
							font-weight: 500;
						}
					}
					.con_info{
						display: flex;
						flex-direction: column;
						align-items: center;
						.store{
							display: flex;
							margin-bottom: 30rpx;
							.left_pic{
								display: flex;
								align-items: center;
								margin-right: 24rpx;
								.yuan2{
									width:30rpx;
									height:30rpx;
									border:2rpx solid rgba(206,206,206,1);
									border-radius:50%;
									position: relative;
									image{
										position: absolute;
										top: 0;
										left: -25rpx;
									}
								}
								image{
									width: 190rpx;
									height: 191rpx;
									margin-left: 24rpx;
									border-radius:6rpx;
								}
							}
						}
						
						
						.right_con{
							// display: flex;
							// flex-direction: column;
							// justify-content: space-between;
							.r_text{
								width: 400rpx;
								color: #272727;
								font-size: 26rpx;
								 overflow: hidden;
								  text-overflow: ellipsis;
								  display: -webkit-box;
								  -webkit-line-clamp: 3; //行数
								  -webkit-box-orient: vertical;
								box-sizing: border-box;
								margin-bottom: 24rpx;
							}
							.r_type{
								display: inline-block;
								padding: 0 15rpx;
								height:50rpx;
								line-height: 50rpx;
								text-align: center;
								background:rgba(235,235,235,1);
								border-radius:6rpx;
								font-size: 26rpx;
								color: #8F8F8F;
								margin-bottom: 20rpx;
							}
							.r_btn{
								display: flex;
								justify-content: space-between;
								.price{
									color: #EB5204;
									font-size: 30rpx;
									font-weight: 500;
								}
								.btn{
									display: flex;
									
									.jian,.jia{
										width:52rpx;
										height:47rpx;
										border:1rpx solid rgba(231,231,231,1);
										border-radius:0rpx 0rpx 0rpx 6rpx;
										color: #B7B7B7;
										font-size: 42rpx;
										line-height: 47rpx;
										text-align: center;
										font-weight: 400;
									}
									.num{
										width:85rpx;
										height:47rpx;
										border-top:1rpx solid rgba(231,231,231,1);
										border-bottom:1rpx solid rgba(231,231,231,1);
										font-size: 30rpx;
										color: #001111;
										line-height: 47rpx;
										text-align: center;
										font-weight: 500;
									}
								}
							}
						}
					}
				}
			}
			.like_box{
				width: 100%;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin-bottom: 100rpx;
				.like{
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 31rpx;
					.text{
						color: #FF5807;
						font-size: 30rpx;
						font-weight: 500;
					}
					.gang{
						display: flex;
						align-items: center;
						margin: 0 30rpx;
						
						.dian{
							width:5rpx;
							height:5rpx;
							background:rgba(237,82,13,1);
							border-radius:50%;
							color: #FF5807;
						}
						.hen{
							width:28rpx;
							height:2rpx;
							background-color: rgba(255,88,7,1);
							// border:1rpx solid rgba(255,88,7,1);
							color: #FF5807;
						}
					}
				}
				.like_list{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.item{
						width: 343rpx;
						// height: 476rpx;
						background:rgba(255,255,255,1);
						border-radius:12rpx;
						margin-bottom: 26rpx;
						box-shadow: #DDDDDD 0 0 15rpx 5rpx;
						image{
							width: 100%;
							height: 315.7rpx;
							// margin-bottom: 24rpx;
						}
						.con_text{
							box-sizing: border-box;
							padding: 24rpx 18rpx;
							.title{
								font-size: 25rpx;
								color: #272727;
								font-size: 500;
								margin-bottom: 24rpx;
								width: 100%;
								 overflow: hidden;
								  text-overflow: ellipsis;
								  display: -webkit-box;
								  -webkit-line-clamp: 2; //行数
								  -webkit-box-orient: vertical;
							}
							.bom_btn{
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-size: 23rpx;
								.more{
									width:56rpx;
									height:34rpx;
									line-height: 34rpx;
									text-align: center;
									border:1px solid #C3C3C3;
									border-radius:17rpx;
								}
							}
						}
					}
				}
			}
			.bom_bar{
				width: 100%;
				height: 96rpx;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 0 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				bottom: 0;
				.guanli{
					display: flex;
					.shoucahng{
						width:172rpx;
						height:65rpx;
						line-height: 65rpx;
						text-align: center;
						background:rgba(255,255,255,1);
						border:1rpx solid rgba(255,130,3,1);
						border-radius:33rpx;
						color: #FF8203;
						font-size: 28rpx;
						margin-right: 24rpx;
					}
					.delete{
						width:111rpx;
						height:65rpx;
						line-height: 65rpx;
						text-align: center;
						background:rgba(255,255,255,1);
						border:1rpx solid rgba(235,96,28,1);
						border-radius:33rpx;
						color: #EB611C;
						font-size: 28rpx;
					}
				}
				.left{
					display: flex;
					align-items: center;
					.yuan{
						width: 30rpx;
						height: 30rpx;
						border:2rpx solid rgba(206,206,206,1);
						border-radius:50%;
						position: relative;
					}
					.yuan.active{
						image{
							position: absolute;
							top: 0;
						}
					}
				}
				.jiesuan{
					display: flex;
					align-items: center;
					.heji{
						font-size: 24rpx;
						color: #5C5C5C;
					}
					.price{
						font-size: 26rpx;
						color: #FF5807;
						font-weight: 500;
						margin-right: 36rpx;
					}
					.jieduan_btn{
						width:148rpx;
						height:67rpx;
						font-weight: 36rpx;
						color: #FFFFFF;
						font-weight: 400;
						line-height: 67rpx;
						text-align: center;
						background:linear-gradient(-88deg,rgba(254,93,13,1),rgba(255,131,3,1));
						border-radius:34rpx;
					}
				}
			}
			
			
		}
	}
	
</style>
