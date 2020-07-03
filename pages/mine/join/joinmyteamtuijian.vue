<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 加盟店-我的团队-推荐加盟店 -->
		<view class="top_bar">
			<view class="img" @click="goback">
				<image style="width: 23rpx;height: 36rpx;" src="../../../static/index/fanhui@2x.png" mode=""></image>
			</view>
			<view @click="changeIndex(1)" :class="{item:true,active: isActive === 1}">
				加盟店{{'('+ strCount+ ')'}}
			</view>
			<view @click="changeIndex(2)" :class="{item:true,active: isActive === 2}">
				会员{{'('+ betCount+ ')'}}
			</view>
		</view>
		<!-- 加盟店 -->
		<view class="show_list" v-if="isActive === 1">
			<view class="item"
			v-for="(item, index) in joinList"
			:key='index'
			@click="gotshangInfo(item)"
			>
				<view class="title">
					{{item.company}}
				</view>
				<view class="con_box">
					<image :src="item.logo" mode=""></image>
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
								<text>{{item.wx_name}}</text>
							</view>
						</view>
					</view>
					<view class="btn_r">
						
					</view>
				</view>
			</view>
			<view class="loading" v-if="isLoading">
				加载中...
			</view>
		</view>
		
		<!-- 会员 -->
		<view class="top_bars" v-if="isActive === 2">
			<view class="zhitui_box"
			v-if="isShowFloat"
			>
				<view  :class="{item:true, active: showActiveHuiyuan == 3}"
				@click="changeHuiyuan(3)"
				>
					全部会员
				</view>
				<view :class="{item:true, active: showActiveHuiyuan == 1}"
				@click="changeHuiyuan(1)"
				>
					直推会员
				</view>
				<view  :class="{item:true, active: showActiveHuiyuan == 2}"
				@click="changeHuiyuan(2)"
				>
					间推会员
				</view>
				
			</view>
			<view :class="{option:true, active: memberActive === 1}" @click="changMember(1)">
				<text>{{activeHuiyuan}}</text>
				<image v-if="memberActive === 1" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive === 2}" @click="changMember(2)">
				<text>复购人数</text>
				<image v-if="memberActive === 2" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive === 3}" @click="changMember(3)">
				<text>直推人数</text>
				<image v-if="memberActive === 3" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="member_list" v-if="isActive === 2"> 
		
			<view class="item"
			v-for="(item, index) in memberList"
			:key='index'
			@click="gotomemberInfo(item)"
			>
				<view style="display: flex;">
					<image :src="item.avatar" mode=""></image>
					<view class="con_r">
						<view class="name">
							{{item.nickname}}
						</view>
						<text>复购频数：{{item.pay_count}}</text>
						<text>直推人数：{{item.spread_count}}</text>
						<text>入会时间：{{item.member_time}}</text>
					</view>
				</view>
				<view class="r_shouyi"
				v-if="item.benefit"
				>
					收益:{{item.benefit}}
				</view>
			</view>
			<view class="loading" v-if="isLoading">
				加载中...
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isActive: 1, 
				memberActive: 1,
				isShowFloat: false, // 是否展示选择直推会员
				showActiveHuiyuan: 3, // 激活选择会员
				page: 1,
				limit: 10,
				activeHuiyuan: '全部会员',
				betCount: 0,
				strCount:0,
				isLoading: false, // loading
				joinList: [],
				// 会员展示列表
				memberList:[],
			}
		},
		onLoad(){
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
						let datas = {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit,
								type: _this.isActive,
								group_id: reg.data.group_id,
								sort: '',
								condition_type: ''
							}
							if(_this.isActive == 1){
								datas.sort = ''
								datas.condition_type = ''
							}
							if(_this.isActive == 2){
								if(_this.memberActive == 1){
									datas.sort = ''
								}
								if(_this.memberActive == 2){
									datas.sort = 1
								}
								if(_this.memberActive == 3){
									datas.sort = 2
								}
								datas.condition_type = _this.showActiveHuiyuan
							}
							console.log('传递参数', datas)
						uni.request({
							url: _this.$http + '/api/team/myTeam',
							method:'POST',
							data:datas,
							success(res){
								console.log('我的团队返回数据', res)
								uni.hideLoading()
								if(res.data.status == 200){
									_this.isLoading = false
									_this.betCount = res.data.data.bet_count
									_this.strCount = res.data.data.str_count
									// 加盟店
									if(res.data.data.str_data.length != 0){
										if(_this.joinList.length == 0){
											_this.joinList = res.data.data.str_data
										}else{
											_this.joinList = _this.joinList.concat(res.data.data.str_data)
										}
										
									}
									// 会员
									if(res.data.data.bet_data.length != 0){
										if(_this.memberList.length == 0){
											_this.memberList = res.data.data.bet_data
										}else{
											_this.memberList = _this.memberList.concat(res.data.data.bet_data)
										}
									}
									
								}else{
									uni.showModal({
										title: '提示',
										content: '数据列表获取失败'
									})
								}
								
							}
						})
					}
				})
			},
			changeIndex(index){
				this.isActive = index
				this.showActiveHuiyuan = 3
				this.getData()
				this.joinList = []
				this.memberList = []
			},
			// 切换筛选
			changMember(index){
				this.memberActive = index
				
				if(index == 1){
					this.isShowFloat = true
				}else{
					this.isShowFloat = false
					this.memberList = []
					this.getData()
				}
				
			},
			// 直推下拉
			changeHuiyuan(type){
				if(type == 1){
					this.activeHuiyuan = '直推会员'
				}
				if(type == 2){
					this.activeHuiyuan = '间推会员'
				}
				if(type == 3){
					this.activeHuiyuan = '全部会员'
				}
				this.showActiveHuiyuan = type
				this.isShowFloat = false
				this.memberList = []
				this.getData()
			},
			// 跳转会员信息
			gotomemberInfo(item){
				console.log('item', item)
				uni.navigateTo({
					url: '../member/memberinfo?id=' + item.id
				})
			},
			// 跳转商家信息
			gotshangInfo(item){
				console.log('item', item)
				uni.navigateTo({
					url: '../merchant/logisticsinfo?id=' + item.id
				})
			},
			goback(){
				uni.navigateBack({
					
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
			.top_bar{
				width: 100%;
				height: 100rpx;
				box-sizing: border-box;
				padding: 0 15%;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				.img{
					position: absolute;
					top: 24rpx;
					left: 24rpx;
				}
				.item{
					height: 50%;
					font-size: 32rpx;
					font-weight: 500;
					border-bottom: 6rpx solid #FFFFFF;
				}
				.item.active{
					border-bottom: 6rpx solid #FF7E00;
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
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
								// display: flex;
								// margin-bottom: 15rpx;
								.item{
									margin: 0;
									padding: 0;
									margin-bottom: 15rpx;
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
							width:105rpx;
							height:31rpx;
						}
					}
				}
			}
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx 0 24rpx;
				background-color: #FFFFFF;
				// margin-top: 24rpx;
				
				.item{
					width: 100%;
					justify-content: space-between;
					display: flex;
					
					padding: 15rpx 0;
					// margin-bottom: 18rpx;
					border-bottom: 1rpx solid #eee;
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
			.top_bars{
				width: 100%;
				height: 80rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 24rpx;
				margin-bottom: 24rpx;
				position: relative;
				.zhitui_box{
					width: 200rpx;
					// height: 90rpx;
					background-color: #FFFFFF;
					position: absolute;
					bottom: -178rpx;
					left: -24rpx;
					z-index: 999;
					padding: 15rpx 0 0 0;
					opacity: .9;
					.item{
						width: 100%;
						height: 40rpx;
						line-height: 28rpx;
						font-size: 28rpx;
						text-align: center;
						margin-bottom: 15rpx;
					}
					.item.active{
						color: #FF792C;
					}
				}
				.option{
					color: #666666;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					image{
						margin-left: 10rpx;
					}
				}
				.option.active{
					text{
						color: #FF7E00;
					}
				}
			}
			
		}
	}
</style>
