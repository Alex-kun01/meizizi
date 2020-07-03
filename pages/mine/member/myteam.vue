<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 我的团队 -->
		<view class="top_box">
			<view class="top_bar">
				<image @click="goback" style="width: 19rpx;height: 34rpx;" src="../../../static/mine/fanhui@2x.png" mode=""></image>
				<view class="txt">
					我的团队
				</view>
				<view class="guanli"
				@click="gotoset"
				>
					管理
				</view>
			</view>
			<view class="tab_box">
				<view class="title">
					团队总人数{{info.total}}人
				</view>
				<view class="hen"></view>
				<view class="bom_box">
					<view class="item">
						<text>总监</text>
						<text class="num">{{info.chief_count}}</text>
					</view>
					<view class="item">
						<text>省区经理</text>
						<text class="num">{{info.province_count}}</text>
					</view>
					<view class="item">
						<text>市级代理</text>
						<text class="num">{{info.city_count}}</text>
					</view>
					<view class="item">
						<text>物流商</text>
						<text class="num">{{info.logistics_count}}</text>
					</view>
					<view class="item">
						<text>服务商</text>
						<text class="num">{{info.service_count}}</text>
					</view>
					<view class="item">
						<text>业务员</text>
						<text class="num">{{info.business_count}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 展示列表 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			@click="gototarget(item)"
			>
				<image :src="item.avatar || '../../../static/index/item4.png'" mode=""></image>
				<view class="con_r">
					<view class="name">
						{{item.nickname || '暂无姓名'}}
					</view>
					<!-- 职位（1-超级管理员 2-总经理 3-总监 4-省代理 5-业务员/讲师 6-服务商 7-物流商 8-加盟店 9-会员消费者 10-普通消费者 11-市级服务商） -->
					<text>电话：{{item.phone}}</text>
					<!-- <text v-if="item.position == 1">职位：超级管理员</text>
					<text v-if="item.position == 2">职位：总经理</text> -->
					<text v-if="item.position == 3">职位：总监</text>
					<text v-if="item.position == 4">职位：省代理</text>
					<text v-if="item.position == 5">职位：业务员</text>
					<text v-if="item.position == 6">职位：服务商</text>
					<text v-if="item.position == 7">职位：物流商</text>
					<!-- <text v-if="item.position == 8">职位：加盟店</text> -->
					<!-- <text v-if="item.position == 9">职位：会员</text>
					<text v-if="item.position == 10">职位：普通消费者</text> -->
					<text v-if="item.position == 11">职位：市级服务商</text>
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
				// 信息
				info: {},
				showList: [],
				page:1,
				limit: 10,
				isLoading: false
			}
		},
		onLoad(){
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			getData(){
				console.log('我执行了')
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/team/teamAmdin',
							method:'POST',
							data:{
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								uni.hideLoading()
								console.log('我的团队返回数据', res)
								_this.isLoading =false
								if(res.data.status === 200){
									_this.info = res.data.data.team_count
									if(_this.showList.length == 0){
										_this.showList = res.data.data.list
									}else{
										_this.showList = _this.showList.concat(res.data.data.list) 
									}
									
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
			gototarget(item){
				console.log('item',item)
				let position = item.position
				let id = item.id
				if(position == 5){
					// 业务员单独跳转页面
					uni.navigateTo({
						url: './teacherregion?id='+id
					})
					return
				}
				uni.navigateTo({
					url: './regionset?id='+id + '&position=' + item.position
				})
			},
			// 管理按钮
			gotoset(){
				uni.navigateTo({
					url: './memberteam'
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
		background: #2B2B2B;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			min-height: 100vh;
			background-color: #FFFFFF;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.top_box{
				width:750rpx;
				height:192rpx;
				background:rgba(43,43,43,1);
				.top_bar{
					color: #FFFFFF;
					font-weight: 500;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 24rpx;
					margin-bottom: 10rpx;
					.guanli{
						font-size: 24rpx;
					}
				}
				.tab_box{
					width:700rpx;
					height:206rpx;
					background:linear-gradient(-2deg,rgba(230,216,189,1),rgba(244,236,225,1));
					border-radius:12rpx;
					margin-left: 25rpx;
					box-sizing: border-box;
					padding: 24rpx;
					.title{
						color: #222222;
						font-size: 30rpx;
						font-weight: 500;
						margin-bottom: 23rpx;
					}
					.hen{
						width:567rpx;
						height:8rpx;
						background:#C69C6C;
						border-radius:4rpx;
						margin-bottom: 23rpx;
					}
					.bom_box{
						width: 100%;
						display: flex;
						justify-content: space-between;
						.item{
							display: flex;
							flex-direction: column;
							align-items: center;
							color: #724C1F;
							font-size: 24rpx;
							font-weight: 500;
							text.num{
								font-size: 34rpx;
							}
						}
					}
					
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				margin-top: 130rpx;
				.item{
					width: 100%;
					// height: ;
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
				}
			}
		}
	}
</style>
