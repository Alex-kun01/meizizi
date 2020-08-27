<template>
	<view class="content">
		<!-- <view class="">
			配送管理我的商家
		</view> -->
		<view class="titleNview-placing"></view>
		<view class="top_bar_box">
			<image @click="goback" class="left" src="@/static/index/fanhui@3x.png" mode=""></image>
			<view class="store">
				我的商家
			</view>
			<image @click="record" class="right" src="@/static/public/lishi@2x.png" mode=""></image>
		</view>
		<!-- 我的商家 详细信息  (库存) -->
		<view class="top_bar">
			<view class="top">
				<image style="width: 34rpx;height: 30rpx;" src="@/static/mine/mendian@2x.png" mode=""></image>
				<view class="title">
					{{info.company}}
				</view>
			</view>
			<view class="con_info">
				<image style="width: 180rpx;height: 180rpx;" :src="info.logo" v-if="info.logo" mode=""></image>
				<image v-else style="width: 180rpx;height: 180rpx;" src="@/static/mine/staticAvatar.jpg" mode=""></image>
				<view class="text_box">
					<view style="margin-bottom: 30rpx;">
						授信额度:<text style="font-size: 34rpx;font-weight: 500;color: ;">{{info.credit}}</text>
					</view>
					<view style="margin-bottom: 30rpx;">
						剩余授信额度:<text style="font-size: 34rpx;font-weight: 500;color: ;">{{info.surplus}}</text>
					</view>
					<view class="text">
						<image style="width: 22rpx;height: 18rpx;" src="@/static/mine/dianhua@2x.png" mode=""></image>
						<text>{{info.phone}}</text>
					</view>
					<view class="text">
						<image style="width: 22rpx;height: 18rpx;" src="@/static/mine/weixin@2x.png" mode=""></image>
						<text>{{info.wx_name}}</text>
					</view>
				</view>
			</view>
			<view class="address">
				{{info.address}}
			</view>
		</view>
		<!-- 导航 -->
		<view class="navagater_box">
			<view :class="{item:true, active: isActive == 1}" @click="changeIndex(1)">
				<view class="title">
					总库存
				</view>
				<view class="info">
					<text style="color: #EB5204;">{{info.now_stock}}</text>
					<text>/{{info.total_stock}}</text>
				</view>
			</view>
			<view :class="{item:true, active: isActive == 2}" @click="changeIndex(2)">
				<view class="title">
					会员
				</view>
				<view class="info">
					<text>{{info.user_count}}</text>
				</view>
			</view>
			<view :class="{item:true, active: isActive == 3}" @click="changeIndex(3)">
				<view class="title">
					待发货
				</view>
				<view class="info">
					<text>{{info.shop_count}}</text>
				</view>
			</view>
		</view>
		<!-- 显示区域 库存 -->
		<view class="shipping_box box_i" v-if='isActive == 1' >
			<view class="title_list">
				<view class="title"
				v-for="(tit, int) in titleList"
				:key='int'
				>
					{{tit}}
				</view>
			</view>
			
			<!-- <view class="show_list"> -->
				<view class="item"
				v-for="(item, index) in product_list"
				:key='index'
				>
					
					<view class="name">{{item.store_name}}</view>
					<view class="item_box">
						<view class="item_i">{{item.price}}</view>
						<view class="item_i">{{item.total_stock}}</view>
						<view class="item_i">{{item.stock}}</view>
						<view class="item_i">{{item.need_stock}}</view>
						<view class="item_i">{{item.alarm_stock}}</view>
					</view>
				</view>
			<!-- </view> -->
		</view>
		
		<!-- 显示区域 会员 -->
		<view class="member_box box_i" v-if='isActive == 2'>
			<view class="member_list">
				<view class="item"
				v-for="(item, index) in user_list"
				:key='index'
				>
					<view style="display: flex;">
						<image :src="item.avatar" mode=""></image>
						<view class="con_r">
							<view class="name">
								{{item.nickname}}
							</view>
							<text>复购频数：{{item.pay_count}}</text>
							<text>直推人数：{{item.spread_count}}</text>
							<text>入会时间：{{item.member_time.substring(0,10)}}</text>
						</view>
					</view>
					<view class="r_shouyi">
							收益:{{item.benefit}}
					</view>
				</view>
			</view>
		</view>
		<!-- 显示区域 出货单 -->
		<view class="shipping_box box_i" v-if='isActive == 3'>
			<view class="title_list">
				<view class="title"
				v-for="(tit, int) in titleList"
				:key='int'
				>
					{{tit}}
				</view>
			</view>
			
			<view class="item"
			v-for="(item, index) in order_list"
			:key='index'
			>
				<view class="name">{{item.store_name}}</view>
				<view class="item_box">
					<view class="item_i">{{item.price}}</view>
					<view class="item_i">{{item.total_stock}}</view>
					<view class="item_i">{{item.stock}}</view>
					<view class="item_i input"><input type="text" v-model="item.need_stock" /></view>
					<view class="item_i">{{item.alarm_stock}}</view>
				</view>
				
			</view>
			<view class="sub_btn">
				<view style="margin-right: 30rpx;">
					总金额：<text style="font-size: 34rpx;font-weight: 500;">{{allPrice}}</text>
				</view>
				<view class="btn" @click="submitClick" v-if="is_auto != 0">
					
					提交
				</view>
			</view>
		</view>
		<view class="loading" v-if="isLoading">
			加载中...
		</view>
		
	</view>
</template>

<script>
	// import {myMixins} from '@/components/mixins.js'
	export default {
		// mixins: [myMixins],
		data () {
			return {
				isActive: 1, 
				page: 1,
				limit:10,
				isLoading:false, 
				opt: {},
				titleList: ['单价','总库存','现有库存','所需库存','报警线',],
				info: {},
				// 总库存展示列表
				product_list: [],
				// 会员展示列表
				user_list:[],
				// 出货单展示列表
				order_list: [],
				is_auto: 0, //是否展示确认发货
			}
		},
		onLoad(opt){
			console.log('opt',opt)
			this.opt = opt
			this.getData()
			
		},
		computed:{
			// 计算总金额
			allPrice(){
				let allP = 0
				this.order_list.forEach(item =>{
					allP = allP + +item.price * +item.need_stock
				})
				return allP
			},
			// 所需库存是否超过总库存
			isSubmitOk(){
				let arr = []
				this.order_list.forEach(item =>{
					if(+item.need_stock + +item.stock > +item.total_stock){
						arr.push(1)
					}
				})
				return arr.includes(1)
			}
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							shop_id: _this.opt.id,
							page: _this.page,
							limit: _this.limit,
							give_type: _this.isActive
						}
						console.log('我的商家详情参数', datas)
						uni.request({
							url: _this.$http + '/api/user/logisticsDetails',
							method: 'GET',
							data: datas,
							success(res){
								// uni.hideLoading()
								_this.isLoading = false
								console.log('我的商家详情返回数据', res)
								if(res.data.status === 200){
									
									let {order_list,product_list,user_list,shop_info,is_auto} = res.data.data
									_this.is_auto = is_auto
									_this.info = shop_info
									_this.order_list = order_list
									_this.product_list = [..._this.product_list,...product_list]
									_this.user_list = [..._this.user_list,...user_list]
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
			// 显示完成的商品名
			showMore(item){
				uni.showModal({
					title: '商品名',
					content: item.store_name
				})
			},
			changeIndex(index) {
				
				if(this.isActive == index){
					// 当前重复点击
				}else{
					// 非点击当前菜单
					this.product_list = []
					this.order_list = []
					this.user_list =[]
					this.isActive = index
					this.page = 1
					this.getData()
				}
				this.isActive = index
			},
			// 返回
			goback(){
				uni.navigateBack({
					
				})
			},
			// 交易记录
			record(){
				uni.navigateTo({
					url: './jiaoyichuhuo?id=' + this.opt.id
				})
			},
			// 处理出货单数组
			getTargetList(){
				return this.order_list.filter(item =>{
					return item.need_stock != 0
				})
			},
			// 提交
			submitClick(){
				let _this = this
				if(this.isSubmitOk){
					uni.showModal({
						title: '提示',
						content: '某个商品输入所需库存超过该商品总库存!!!'
					})
					return
				}
				if(this.allPrice > this.info.surplus){
					uni.showModal({
						title: '提示',
						content: '补货总金额超过剩余授信额度!!!'
					})
					return
				}
				// 请求
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
								token: reg.data.token,
								take_id: _this.info.id,
								product_list: JSON.stringify(_this.getTargetList()),
								type: 2
							}
							console.log('传递参数',datas)
							// return
						uni.request({
							url: _this.$http + '/api/user/addShopOrder',
							method: 'POST',
							data:datas,
							success(res){
								console.log('手动补货返回数据',res)
								if(res.data.status == 200){
									uni.showToast({
										title: '操作成功!'
									})
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
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData()
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
		background-color: #FFFFFF; //#F4F4F4
		.content{
			width: 100%;
			height: 100%;
			min-height: 100vh;
			background-color: #F4F4F4;
			.sub_btn{
				width: 100%;
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;
				.btn{
					height:46rpx;
					line-height: 46rpx;
					text-align: center;
					background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
					border-radius:23rpx;
					font-size: 28rpx;
					color:rgba(255,255,255,1);
					padding: 0 20rpx;
				}
			}
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.top_bar_box{
				width: 100%;
				// height: 70rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 24rpx;
				.store{
					font-size:36rpx;
					font-weight:bold;
					color:rgba(48,48,48,1);
				}
				.left{
					width: 19rpx;
					height: 34rpx;
				}
				.right{
					width: 30rpx;
					height: 30rpx;
				}
			}
			.top_bar{
				width: 100%;
				// height: 379rpx;
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
					align-items: center;
					color: #8F8F8F;
					font-size: 24rpx;
					margin-bottom: 24rpx;
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
			.navagater_box{
				width: 100%;
				height: 120rpx;
				background-color: #F4F4F4;
				display: flex;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				padding-top: 20rpx;
				font-size: 30rpx;
				font-weight: 500;
				.item{
					width: 33.333%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text{
						font-size: 24rpx;
						color: #666666;
						font-weight: 500;
					}
				}
				.item.active{
					background-color: #FFFFFF;
				}
			}
			.box_i{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.title_list{
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
						input{
							font-size: 28rpx;
							border: 1rpx solid #666666;
						}
						.item_i{
							width: 140rpx;
							text-align: center;
						}
					}
				}
				.member_list{
					width: 100%;
					box-sizing: border-box;
					padding: 24rpx;
					.item{
						width: 100%;
						// height: ;
						justify-content: space-between;
						display: flex;
						
						margin-bottom: 18rpx;
						image{
							width: 187rpx;
							height: 181rpx;
							margin-right: 24rpx;
						}
						.con_r{
							display: flex;
							
							flex-direction: column;
							
							.name{
								color: #2B2B2B;
								font-size: 26rpx;
								font-weight: 500;
								margin-bottom: 15rpx;
							}
							text{
								font-size: 24rpx;
								color: #BBBBBB;
								margin-bottom: 15rpx;
							}
						}
						.r_shouyi{
							font-size: 26rpx;
							font-weight: 500;
							color: #FF792C;
							margin-right: 24rpx;
						}
					}
				}
			}
			.shipping_box{
				.title_list{
					.title{
						width: 175rpx;
						text-align: center;
					}
				}
				.item{
					display: flex;
					flex-direction: column;
					color: #919191;
					font-size: 24rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
					border-bottom: 1rpx solid #DDDDDD;
					padding: 15rpx 0;
					.name{
						margin-bottom: 15rpx;
						margin-left: 40rpx;
						color: black;
					}
					.item_box{
						display: flex;
						.item_i{
							width: 175rpx;
							text-align: center;
						}
						.input{
							border: 1rpx solid #999999;
							input{
								font-size: 28rpx;
							}
						}
					}
					
				}
			}
			
		}
	}
</style>
