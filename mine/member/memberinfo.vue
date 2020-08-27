<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view>	 -->
		<!-- 会员信息 -->
		<view class="member_info">
			<view class="top_img">
				<image style="width: 180rpx;height: 181rpx;" :src="info.avatar" mode=""></image>
				<view class="text_t">
					<view class="name">
						{{info.nickname}}
					</view>
					<view class="item">
						<text>入会时间：</text>
						<text>{{info.member_time}}</text>
					</view>
					<view class="item">
						<text>复购频数：</text>
						<text>{{info.pay_count}}</text>
					</view>
					<view class="item">
						<text>直推会员：</text>
						<text>{{info.spread_count}}</text>
					</view>
				</view>
			</view>
			<view class="bom_text">
				<view class="icon_b">
					<image style="width: 21rpx;height: 24rpx;" src="@/static/mine/dianhua@2x.png" mode=""></image>
					<text>{{info.phone}}</text>
					<image style="width: 22rpx;height: 18rpx;" src="@/static/mine/weixin@2x.png" mode=""></image>
					<text>{{info.wx_name}}</text>
				</view>
				<view class="address">
					{{info.addres}}
				</view>
			</view>
		</view>
		<!-- 会员列表 -->
		<view class="member_list"
		v-if="memberList.length !== 0"
		>
		
			<view class="item"
			v-for="(item, index) in memberList"
			:key='index'
			>
				<view style="display: flex;">
					<image :src="item.avatar" mode=""></image>
					<view class="con_r">
						<view class="name">
							{{item.nickname}}
						</view>
						<text>复购人数：{{item.pay_count}}</text>
						<text>直推人数：{{item.spread_count}}</text>
						<text>入会时间：{{item.member_time}}</text>
					</view>
				</view>
				<!-- <view class="r_shouyi">
					收益:{{item.shouyi}}
				</view> -->
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
				// 会员展示列表
				memberList:[],
				opt: {},
				info:{},
				page: 1,
				limit: 10,
				isLoading: false, 
			}
		},
		onLoad(opt){
			console.log('opt', opt)
			this.opt = opt
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
						uni.request({
							url: _this.$http + '/api/team/memberInfo',
							method: 'POST',
							data: {
								token: reg.data.token,
								uid: _this.opt.id,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								_this.isLoading = false
								console.log('会员信息返回数据', res)
								if(res.data.status === 200){
									let {list,user_info} = res.data.data
									_this.memberList = [..._this.memberList,...list]
									_this.info = user_info
								}else{
									uni.showModal({
										title:'提示',
										content:  res.data.msg
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.member_info{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				.top_img{
					display: flex;
					align-items: center;
					image{
						margin-right: 24rpx;
					}
					.name{
						font-size: 34rpx;
						color: #111111;
						font-weight: 500;
					}
					.item{
						text{
							color: #BBBBBB;
							font-size: 24rpx;
							font-weight: 500;
						}
					}
				}
				.bom_text{
					.icon_b{
						display: flex;
						align-items: center;
						margin: 23rpx 0;
						text{
							font-size: 24rpx;
							color: #8F8F8F;
							margin: 0 24rpx 0 10rpx;
						}
					}
					.address{
						font-size: 30rpx;
						color: #333333;
						font-weight: 500;
					}
				}
			}
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				
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
	}
</style>
