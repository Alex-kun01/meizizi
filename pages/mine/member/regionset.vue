<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_box_bar">
			<image @click="goback" src="../../../static/index/fanhui@3x.png" mode=""></image>
			<view class="title">
				<text v-if='position == 1'>超级管理员</text>
				<text v-if='position == 2'>总经理</text>
				<text v-if='position == 3'>总监</text>
				<text v-if='position == 4'>省代理</text>
				<text v-if='position == 5'>业务员</text>
				<text v-if='position == 6'>服务商</text>
				<text v-if='position == 7'>物流商</text>
				<text v-if='position == 8'>加盟店</text>
				<text v-if='position == 9'>会员消费者</text>
				<text v-if='position == 10'>普通消费者</text>
				<text v-if='position == 11'>市级服务商</text>
			</view>
			<text></text>
		</view>
		<!-- 区域管理 -->
		<view class="top_bar">
			<view class="top_con">
				<view style="display: flex;">
					<image :src="userInfo.avatar || '../../../static/mine/staticAvatar.jpg'" mode=""></image>
					<view class="con_con">
						<view class="name">
							{{userInfo.real_name}}
							<text v-if="userInfo.position == 1">职位: 总监</text>
							<text v-if="userInfo.position == 2">职位: 省区经理</text>
							<text v-if="userInfo.position == 3">职位: 业务员</text>
							<text v-if="userInfo.position == 4">职位: 店铺</text>
						</view>
						<view class="region">
							管理区域：{{userInfo.manag_area}}
						</view>
					</view>
				</view>
				<!-- <view class="r_btn" @click="renmClick">
					更改
				</view> -->
			</view>
			<view class="con_cons">
				<view class="item">
					业务数据
				</view>
				<view class="look_more">
					查看更多
				</view>
			</view>
			<view class="con_cons">
				<view class="item">
					总交易额
				</view>
				<view class="price">
					{{userInfo.count_money}}
				</view>
			</view>
		</view>
		<!-- 切换视图 -->
		<view class="change_show">
			<view :class="{item:true, active: isActivee == 1}"
			@click="changeShow(1)"
			>
				会员
			</view>
			<view :class="{item:true, active: isActivee == 2}"
			@click="changeShow(2)"
			>
				店铺
			</view>
		</view>
		<!-- 会员列表 1 -->
		<view class="show_list" v-if="isActivee == 1">
			<view class="top_bars">
				<view class="shu"></view>
				<text>他的团队</text>
			</view>
			<view class="lis_data">
				<view class="item"
				v-for="(item, index) in memberList"
				:key="index"
				>
					<image :src="item.avatar" mode=""></image>
					<view class="user_info">
						<view class="name">
							{{item.nickname}}
						</view>
						<view class="item">
							电话: {{item.phone}}
						</view>
						<!-- 职位（1-超级管理员 2-总经理 3-总监 4-省代理 5-业务员/讲师 6-服务商 7-物流商 8-加盟店 9-会员消费者 10-普通消费者 11-市级服务商） -->
						<view class="item">
							<text v-if="item.position == 3">职位: 总监</text>
							<text v-if="item.position == 4">职位: 省区经理</text>
							<text v-if="item.position == 5">职位: 业务员</text>
							<text v-if="item.position == 6">职位: 服务商</text>
							<text v-if="item.position == 7">职位: 物流商</text>
							<text v-if="item.position == 11">职位: 市级代理</text>
						</view>
					</view>
				</view>
				<view class="loading" v-if="isLoading">
					加载中...
				</view>
			</view>
			</view>
			
			<!-- 店铺视图 2 -->
			<view class="show_list2" v-if="isActivee == 2">
				<view class="top_bars">
					<view class="shu"></view>
					<text>他的团队</text>
				</view>
				<view class="lis_data">
					<view class="item"
					v-for="(item, index) in storeList"
					:key="index"
					>
						<image :src="item.logo" mode=""></image>
						<view class="con_info">
							<view class="con_title">
								{{item.company}}
							</view>
							<view class="phone_box">
								<image style="width: 20rpx;height: 28rpx;" src="../../../static/mine/dianhua@2x.png" mode=""></image>
								<text>{{item.phone}}</text>
								<image style="width: 28rpx;height: 25rpx;" src="../../../static/mine/weixin@2x.png" mode=""></image>
								<text>{{item.wx_name}}</text>
							</view>
							<view class="address">
								{{item.address}}
							</view>
						</view>
					</view>
					<view class="loading" v-if="isLoading">
						加载中...
					</view>
				</view>
				</view>
			
			
			
			<!-- 更改区域弹窗 -->
			<!-- <view class="renming_float"
			v-if="isShow"
			@touchmove.stop.prevent="moveHandle" 
			>
				<view class="con_box">
					<view class="title">
						更改区域
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll"
					>
						<view class="item"
						v-for="(item, index) in renmingList"
						:key="index"
						@click="chooseActive(index)"
						>
						<view class="yuan">
							<image v-if="isActive === index" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
						</view>	
						<view class="text">
							{{item}}
						</view>
						</view>
					 </scroll-view>
					<view class="btn_box">
						<view class="on_btn" @click="onClick">取消</view>
						<view class="ok_btn" @click="okClick">确定</view>
					</view>
				</view>
			</view> -->
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userInfo: {
					img: '../../../static/mine/avatar.jpg',
					name: '李森森',
					zhiwei: '总监',
					region: '四川',
					jine: 30000
				},
				scrollTop: 0,
				isLoading:false, 
				opt: {},
				page: 1,
				limit: 4,
				// 是否展示更改弹窗
				isShow: false,
				isActivee: 1, // 视图切换
				// 更改区域列表
				renmingList: ['四川', '河南', '贵州', '云南', '广东'],
				isActive: 1, // 更改区域选中
				memberList: [],
				storeList:[],
				position: '', //身份
			}
		},
		onLoad(opt){
			console.log('opt',opt)
			this.opt = opt
			this.position = opt.position
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/team/heTeam',
							method: 'POST',
							data: {
								token:reg.data.token,
								page: _this.page,
								limit: _this.limit,
								uid: _this.opt.id,
								type: _this.isActivee
							},
							success(res){
								console.log('团队角色数据', res)
								uni.hideLoading()
								_this.isLoading = false
								if(res.data.status === 200){
									_this.userInfo = res.data.data.info
									if(_this.memberList.length == 0){
										_this.memberList = res.data.data.list
									}else{
										_this.memberList = _this.memberList.concat(res.data.data.list) 
									}
									if(_this.storeList.length == 0){
										_this.storeList = res.data.data.shop_list
									}else{
										_this.storeList = _this.storeList.concat(res.data.data.shop_list) 
									}
									
								}else{
									uni.showModal({
										title:'提示',
										content: res.data.msg
									})
								}
								
							}
						})
					}
				})
			},
			renmClick() {
				this.isShow = true
			},
			moveHandle(){
				
			},
			chooseActive(index) {
				this.isActive = index
			},
			// 取消任命
			onClick(){
				this.isShow = false
			},
			// 确定任命
			okClick(){
				this.isShow = false
			},
			upper: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.scrollTop = e.detail.scrollTop
			},
			lower(){
				
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			// 切换视图
			changeShow(index){
				this.isActivee = index
				this.memberList = []
				this.storeList = []
				this.page = 1
				this.getData()
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			min-height: 100vh;
			height: 100%;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.top_box_bar{
				width: 100%;
				height: 100rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					font-weight: 500;
					font-size: 36rpx;
				}
				image{
					width: 22rpx;
					height: 38rpx;
				}
			}
			.top_bar{
				width: 700rpx;
				height: 278rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				margin-top: 25rpx;
				box-sizing: border-box;
				padding: 24rpx;
				margin-left: 25rpx;
				.top_con{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					image{
						width: 115rpx;
						height: 112rpx;
						margin-right: 25rpx;
					}
					.con_con{
						.name{
							font-size: 26rpx;
							color: #2B2B2B;
							font-weight: 500;
							text{
								margin-left: 24rpx;
								color: #666666;
							}
						}
						.region{
							color: #B8B8B8;
							font-size: 24rpx;
							margin-top: 24rpx;
						}
					}
					.r_btn{
						width:65rpx;
						height:30rpx;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
						border-radius:15rpx;
						line-height: 30rpx;
						text-align: center;
						color: #FFFFFF;
						font-size: 20rpx;
					}
					
				}
				.con_cons{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 24rpx;
					.item{
						color: #2B2B2B;
						font-size: 26rpx;
						font-weight: 500;
						
					}
					.look_more{
						color: #B8B8B8;
						font-size: 24rpx;
					}
					.price{
						color: #333333;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
				
			}
			.change_show{
				width: 600rpx;
				height: 80rpx;
				margin-left: 75rpx;
				line-height: 80rpx;
				margin-top: 24rpx;
				background-color: pink;
				display: flex;
				justify-content: space-between;
				border-radius: 10rpx;
				.item{
					width: 300rpx;
					height: 100%;
					text-align: center;
					background-color: #eee;
					font-size: 34rpx;
					color: #999999;
				}
				.item.active{
					background-color: #FFFFFF;
					color: #000;
					box-shadow: 0 0 10rpx 2rpx #ddd;
				}
			}
			.show_list{
				width: 700rpx;
				margin-left: 25rpx;
				margin-top: 24rpx;
				background-color: #FFFFFF;
				.top_bars{
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #111111;
					font-weight: 500;
					box-sizing: border-box;
					padding: 15rpx 15rpx 15rpx 0;
					.shu{
						width:3rpx;
						height:28rpx;
						background:rgba(229,112,55,1);
						margin-right: 15rpx;
					}
				}
				.lis_data{
					width: 100%;
					box-sizing: border-box;
					padding: 0 15rpx 15rpx 15rpx;
					image{
						width: 121rpx;
						height: 122rpx;
						margin-right: 24rpx;
					}
					.item{
						display: flex;
						align-items: center;
						margin-bottom: 24rpx;
						.user_info{
							.name{
								color: #2B2B2B;
								font-size: 26rpx;
								font-weight: 500;
								margin-bottom: 8rpx;
							}
							.item{
								font-size: 24rpx;
								color: #BBBBBB;
								margin-bottom: 8rpx;
							}
						}
					}
				}
			}
			.show_list2{
				width: 700rpx;
				margin-left: 25rpx;
				margin-top: 24rpx;
				background-color: #FFFFFF;
				.top_bars{
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #111111;
					font-weight: 500;
					box-sizing: border-box;
					padding: 15rpx 15rpx 15rpx 0;
					.shu{
						width:3rpx;
						height:28rpx;
						background:rgba(229,112,55,1);
						margin-right: 15rpx;
					}
				}
				.lis_data{
					width: 100%;
					box-sizing: border-box;
					padding: 0 15rpx 15rpx 15rpx;
					.item{
						display: flex;
						margin-bottom: 24rpx;
						image{
							width: 121rpx;
							height: 122rpx;
							margin-right: 24rpx;
						}
						.con_info{
							.con_title{
								font-size: 26rpx;
								color: #2B2B2B;
								font-weight: 500;
							}
							.phone_box{
								margin-top: 10rpx;
								display: flex;
								text-align: center;
								text{
									margin-right: 15rpx;
									font-size: 24rpx;
									color: #B8B8B8;
								}
							}
							.address{
								margin-top: 10rpx;
								font-size: 24rpx;
								color: #B8B8B8;
							}
						}
					}
					
					
					
				}
			}
			.renming_float{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.con_box{
					width:556rpx;
					height:450rpx;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					position: absolute;
					top: calc(50% - 203rpx);
					left: calc(50% - 273rpx);
					box-sizing: border-box;
					padding: 24rpx;
					.title{
						color: #333333;
						font-weight: 500;
						font-size: 30rpx;
						text-align: center;
						margin-bottom: 24rpx;
						
					}
					.scroll-Y{
						width: 100%;
						height: 235rpx;
						.item{
							display: flex;
							justify-content: center;
							align-items: center;
							margin-bottom: 18rpx;
							.yuan{
								width:28rpx;
								height:28rpx;
								border:2rpx solid rgba(212,212,212,1);
								border-radius:50%;
								margin-right: 15rpx;
								position: relative;
								image{
									width: 28rpx;
									height: 28rpx;
									position: absolute;
									top: 0;
								}
							}
							.text{
								width: 80rpx;
								color: #BBBBBB;
								font-size: 28rpx;
								font-weight: 500;
							}
						}
					}
					.btn_box{
						width: 100%;
						box-sizing: border-box;
						padding: 0 13%;
						display: flex;
						justify-content: space-between;
						margin-top: 40rpx;
						.on_btn{
							width:178rpx;
							height:69rpx;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #000000;
							font-size: 24rpx;
						}
						.ok_btn{
							width:178rpx;
							height:69rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 24rpx;
							
						}
					}
				}
			}
		}
	}
</style>
