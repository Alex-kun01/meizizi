<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 会员我的团队	 -->
		<view class="top_bar">
			<view class="img" @click="goback">
				<image style="width: 23rpx;height: 36rpx;" src="@/static/index/fanhui@2x.png" mode=""></image>
			</view>
			<view @click="changeIndex(1)" :class="{item:true,active: isActive === 1}">
				直推会员{{'('+strCount+')'}}
			</view>
			<view @click="changeIndex(2)" :class="{item:true,active: isActive === 2}">
				间推会员{{'('+betCount+')'}}
			</view>
		</view>
		<!-- 直推会员 -->
		<view class="top_bars">
			<view :class="{option:true, active: memberActive1 === 1}" @click="changMember(1)">
				<text>默认排序</text>
				<image v-if="memberActive1 === 1" style="width: 14rpx;height: 8rpx;" src="@/static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="@/static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive1 === 2}" @click="changMember(2)">
				<text>复购人数</text>
				<image v-if="memberActive1 === 2" style="width: 14rpx;height: 8rpx;" src="@/static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="@/static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive1 === 3}" @click="changMember(3)">
				<text>推荐人数</text>
				<image v-if="memberActive1 === 3" style="width: 14rpx;height: 8rpx;" src="@/static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="@/static/mine/gengd@2x.png" mode=""></image>
			</view>
		</view>
		<view class="member_list"
		v-if="showList.length != 0"
		> 
		
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			>
				<view style="display: flex;">
					<image :src="item.avatar || staticImage" mode=""></image>
					<view class="con_r">
						<view class="name">
							{{item.nickname}}
						</view>
						<text>复购次数：{{item.pay_count}}</text>
						<text>直推人数：{{item.spread_count}}</text>
						<text>入会时间：{{item.member_time}}</text>
					</view>
				</view>
				<view class="r_shouyi">
					收益:{{item.benefit}}
				</view>
			</view>
			
		</view>
		<view class="loading" v-if="isLoading">
			加载中...
		</view>
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				isActive: 1, 
				memberActive1: 1, // 直推会员显示
				memberActive: 1, // 间推会员显示
				mysort: 1, // 排序类型
				page: 1,
				isLoading: false, 
				limit: 10,
				staticImage: '@/static/mine/staticAvatar.jpg', // 默认图片
				showList: [],
				betCount: 0,
				strCount: 0,
			}
		},
		onLoad(){
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			// 获取数据
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							page: _this.page,
							limit: _this.limit,
							type: _this.isActive,
							group_id: reg.data.group_id,
							sort: _this.mysort,
							condition_type: ''
						}
						console.log('传递参数', datas)
						uni.request({
							url: _this.$http + '/api/team/myTeam',
							method: 'POST',
							data:datas,
							success(res){
								console.log('会员-我的团队返回数据', res)
								if(res.data.status == 200){
									let {bet_count,str_count,str_data} = res.data.data
									_this.betCount = bet_count
									_this.strCount = str_count
									_this.isLoading = false
									_this.showList = [..._this.showList,...str_data]
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
			changeIndex(index){
				this.isActive = index
				this.memberActive1 = 1
				this.showList = []
				this.getData()
			},
			changMember(index){
				this.memberActive1 = index
				this.mysort = index
				this.showList = []
				this.getData()
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
				padding: 0 16%;
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
				padding: 24rpx;
				background-color: #FFFFFF;
				// margin-top: 24rpx;
				
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
			.top_bars{
				width: 100%;
				height: 80rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 24rpx;
				margin-bottom: 24rpx;
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
