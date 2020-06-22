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
						<text class="num">{{info.chief}}</text>
					</view>
					<view class="item">
						<text>省区经理</text>
						<text class="num">{{info.area}}</text>
					</view>
					<view class="item">
						<text>业务员</text>
						<text class="num">{{info.salesman}}</text>
					</view>
					<view class="item">
						<text>讲师</text>
						<text class="num">{{info.teacher}}</text>
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
				<image :src="item.head_img || '../../../static/index/item4.png'" mode=""></image>
				<view class="con_r">
					<view class="name">
						{{item.real_name || '暂无姓名'}}
					</view>
					<text>电话：{{item.phone}}</text>
					<text v-if="item.position == 1">职位：总监</text>
					<text v-if="item.position == 2">职位：省区经理</text>
					<text v-if="item.position == 3">职位：业务员</text>
					<text v-if="item.position == 4">职位：讲师</text>
					<text v-if="item.position == 5">职位：店铺</text>
				</view>
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
				showList: []
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
							url: _this.$http + '/api/team/myTeam',
							method:'POST',
							data:{
								token: 'b90b4487aff36cef4aa066558faf4c10' // reg.data.token
							},
							success(res){
								uni.hideLoading()
								console.log('我的团队返回数据', res)
								if(res.data.status === 200){
									_this.info = res.data.data.data
									_this.showList = res.data.data.info
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
				let url 
				console.log('',item)
				if(item.position == 1){
					url = './regionset'
				}
				if(item.position == 2){
					url = './shenregion'
				}
				if(item.position == 3){
					url = './teacherregion'
				}
				if(item.position == 4){
					
				}
				uni.navigateTo({
					url: url
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
			}
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
