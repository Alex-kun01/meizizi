<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 我的足迹 -->
		<!-- 今日查看 -->
		<view class="show_list">
			<!-- <view class="titles">
				今日查看
			</view> -->
			<view class="item"
			v-for="(item,index) in showList"
			:key="index"
			@click="gotoDetauls(item)"
			>
				<image class="img" :src="item.image" mode=""></image>
				<view class="con_text">
					<view class="title">
						{{item.store_name}}
					</view>
					<view class="shoucangNum">
						浏览时间{{item.add_time}}
					</view>
					<view class="price">
						<text>￥</text>
						<text style="font-size: 34rpx;">{{item.price}}</text>
					</view>
				</view>
			</view>
			<view class="loading"
			v-if="isLoading"
			>
				加载中...
			</view>
		</view>
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				// 今日查看列表
				showList: [],
				page: 1,
				limit: 10,
				isLoading: false,
			}
		},
		// onLoad(){
		// 	this.showList = []
		// 	this.getData()
		// 	  setTimeout(function () {
		// 		console.log('start pulldown');
		// 	}, 1000);
		// 	uni.startPullDownRefresh();
		// },
		// // 下拉刷新
		// onPullDownRefresh(){
		// 	console.log('混入-下拉刷新')
		// 	this.page = 1
		// 	this.showList = []
		// 	this.getData()
		// 	 setTimeout(function () {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		methods:{
			gotoDetauls(item){
				console.log('item', item)
				uni.navigateTo({
					url: '../../index/productdetails?id=' + item.id
				})
			},
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData()
			},
			// 获取列表数
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/index/footprint',
							method: 'POST',
							data:{
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								uni.hideLoading()
								console.log('足迹列表数据',res)
								if(res.data.status == 200){
									_this.showList = [..._this.showList, ...res.data.data]
									_this.isLoading = false
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
			}
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
			height: 100%;
			min-height: 100vh;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				background-color: #eee;
				text-align: center;
				line-height: 70rpx;
				font-size: 28rpx;
			}
			.titles{
				font-size:30rpx;
				font-weight:500;
				color:rgba(34,34,34,1);
				margin-bottom: 24rpx;
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					box-sizing: border-box;
					padding: 18rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					display: flex;
					margin-bottom: 24rpx;
					.img{
						width: 222rpx;
						height: 198rpx;
						margin-right: 25rpx;
					}
					.con_text{
						.title{
							width: 394rpx;
							font-size:27rpx;
							font-weight:500;
							color:rgba(39,39,39,1);
							line-height:41rpx;
							margin-bottom: 25rpx;
							overflow: hidden;
							  text-overflow: ellipsis;
							  display: -webkit-box;
							  -webkit-line-clamp: 3; //行数
							  -webkit-box-orient: vertical;
						}
						.shoucangNum{
							font-size:24rpx;
							font-weight:500;
							color:rgba(148,148,148,1);
							line-height:36rpx;
							margin-bottom: 10rpx;
						}
						.price{
							font-size:24rpx;
							font-weight:500;
							color:rgba(253,105,54,1);
							line-height:36rpx;
						}
					}
				}
			}
		}
	}
</style>
