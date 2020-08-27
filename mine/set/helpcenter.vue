<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 帮助中心 -->
		<view class="top_bar">
			<view class="avatar">
				<image :src="avatar || staticpic" mode=""></image>
				<view class="title_box">
					<view class="title">
						Hi~小主
					</view>
					<view class="text">
						有什么问题尽管问我哦~
					</view>
				</view>
			</view>
			<view class="search_box">
				<image @click="searchClick" src="@/static/index/sosuo@2x.png" mode=""></image>
				<input confirm-type="search" @confirm="searchClick()" type="text" v-model="searchValue" placeholder="搜索常见问题" />
			</view>
			<view class="bom_bar">
				常见问题
			</view>
		</view>
		<!-- 问题列表 -->
		<view class="problem_list">
			<view class="item"
			v-for="(item,index) in problemList"
			:key="index"
			@click="problemDetalus(item)"
			>
				{{item.title}}
			</view>
			<view v-if="isLoading" class="loading">
				加载中...
			</view>
		</view>
		<!-- 联系客服 -->
		<view class="service"
		@click="tel"
		>
			<image src="@/static/mine/kefu@3x.png" mode=""></image>
			<text>在线客服</text>
		</view>
		
		<!-- 展示问题详情 -->
		<view class="problem_detalus"
		v-if="isShowProblemDetalus"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="title">
				{{title}}
			</view>
			<view class="content" v-html="content"></view>
			<image @click="isShowProblemDetalus = false" src="@/static/index/closeX2.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				isLoading: false,
				searchValue:'', // 搜索值
				page: 1, // 页数
				limit: 10, // 显示条数
				problemList: [],
				title: '默认问题', // 问题
				content: '回答', // 问题解答
				isShowProblemDetalus: false, // 是否展示问题详情
				avatar: '', //头像
				staticpic: '@/static/mine/staticAvatar.jpg', // 默认头像
			}
		},
		onLoad(){
			this.init()
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			init(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('查看userInfo', res)
						_this.avatar = res.data.avatar
					}
				})
			},
			getData(){
				let _this = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$http + '/api/goods/help',
					method: 'POST',
					data:{
						content: _this.searchValue,
						page: _this.page,
						limit: _this.limit
					},
					success(res){
						console.log('帮助中心', res)
						if(res.data.status === 200){
							if(_this.page === 1){
								_this.problemList = res.data.data.list
							}else{
								_this.problemList = _this.problemList.concat(res.data.data.list) 
							}
							_this.isLoading = false
							
						}else{
							uni.showModal({
								title: '提示',
								content:  res.data.msg
							})
						}
						uni.hideLoading()
					}
				})
			},
			// 搜索问题
			searchClick(){
				this.getData()
			},
			// 查看问题详情
			problemDetalus(item){
				let _this = this
				console.log('item',item)
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$http + '/api/goods/helpInfo',
					method: 'POST',
					data: {
						id: item.id
					},
					success(res){
						console.log('问题详情数据', res)
						if(res.data.status === 200){
							_this.title = res.data.data.title
							_this.content = res.data.data.content
							_this.isShowProblemDetalus = true
						}else{
							uni.showModal({
								title: '提示',
								content: '获取详情数据失败'
							})
						}
						uni.hideLoading()
					}
				})
			},
			tel(){
				uni.makePhoneCall({
					phoneNumber: this.$mobel
				})
			},
			moveHandle(){
				
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
		height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			.top_bar{
				width: 100%;
				height: 398rpx;
				position: relative;
				background:linear-gradient(179deg,rgba(255,78,3,1),rgba(255,123,46,1));
				.avatar{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					padding: 24rpx;
					image{
						width: 132rpx;
						height: 132rpx;
						border-radius: 50%;
						margin-right: 24rpx;
					}
					.title_box{
						.title{
							font-size:42rpx;
							font-weight:500;
							color:rgba(255,255,255,1);
							margin-bottom: 15rpx;
						}
						.text{
							font-size:24rpx;
							font-weight:500;
							color:rgba(255,255,255,1);
						}
					}
				}
				.search_box{
					width:690rpx;
					height:80rpx;
					background:rgba(255,255,255,1);
					border-radius:40rpx;
					margin-left: 30rpx;
					display: flex;
					box-sizing: border-box;
					padding: 0 50rpx;
					display: flex;
					align-items: center;
					image{
						width: 30rpx;
						height: 29rpx;
						margin-right: 24rpx;
					}
					input{
						color: #707070;
						font-size: 26rpx;
					}
				}
				.bom_bar{
					width: 690rpx;
					height: 80rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx 12rpx 0 0;
					box-sizing: border-box;
					padding: 10rpx;
					color: #7C7C7C;
					font-size: 26rpx;
					position: absolute;
					bottom: 0;
					left: 30rpx;
				}
			}
			.problem_list{
				width: 100%;
				background-color: #FFFFFF;
				margin-bottom: 100rpx;
				border-top: 1rpx solid #ddd;
				.loading{
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					background-color: #eee;
					font-size: 28rpx;
					text-align: center;
				}
				.item{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ddd;
					padding: 0 35rpx;
					color: #1B1B1B;
					font-size: 30rpx;
					font-weight: 500;
				}
			}
			.service{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				position: fixed;
				bottom: 0;
				image{
					width: 46rpx;
					height: 46rpx;
					margin-right: 10rpx;
					
				}
			}
			.problem_detalus{
				width: 100%;
				height: 80%;
				background-color: #FFFFFF;
				position: absolute;
				box-sizing: border-box;
				padding: 30rpx;
				bottom: 0;
				.title{
					font-size: 36rpx;
					font-weight: 500;
					margin-bottom: 30rpx;
				}
				.content{
					font-size: 28rpx;
					
					
				}
				image{
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					top: 20rpx;
					right: 20rpx;
				}
			}
		}
	}
</style>
