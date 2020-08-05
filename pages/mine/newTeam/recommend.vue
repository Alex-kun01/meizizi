<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 推荐门店 -->
		<view class="search_box">
			<image src="../../../static/index/sosuo@2x.png" mode=""></image>
			<input  confirm-type="search" @confirm="getData()" type="text" v-model="searchValue" />
		</view>
		<!-- 列表 -->
		<view class="show_list">
			<view class="show_item"
			v-for="(item,index) in showList"
			:key="index"
			>
				<image :src="item.logo" mode=""></image>
				<view class="contents">
					<text style="color: #000000;">{{item.company}}</text>
					<text>会员人数：{{item.user_count}}</text>
					<text>复购瓶数：{{item.repurchase}}</text>
				</view>
			</view>
			<view v-if="isLoading" class="loading">
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
				isLoading: false,
				page: 1,
				limit: 10,
				searchValue: '',
				showList: [],
				page: 1,
				limit: 10
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.getData()
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							content: _this.searchValue,
							page: _this.page,
							limit: _this.limit
						}
						console.log('查看参数', datas)
						uni.request({
							url: _this.$http + '/api/team/shopList',
							method: 'POST',
							data: datas,
							success(res){
								_this.isLoading = false
								console.log('直推门店数据', res)
								if(res.data.status === 200){
									_this.showList = [..._this.showList,...res.data.data]
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
			height: 100vh;
			background-color: #F4F4F4;
			.search_box{
				width: 600rpx;
				height: 60rpx;
				// background-color: #FFFFFF;
				border: 1rpx solid black;
				border-radius: 30rpx;
				margin-left: 75rpx;
				margin-top: 24rpx;
				box-sizing: border-box;
				padding: 2rpx 20rpx;
				display: flex;
				align-items: center;
				input{
					width: 500rpx;
					height: 60rpx;
					margin-left: 15rpx;
					font-size: 26rpx;
					// background-color: #eee;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					// margin-top: 15rpx;
				}
			}
			.show_list{
				margin-top: 24rpx;
				.loading{
					width: 100%;
					height: 70rpx;
					background-color: #eee;
					line-height: 70rpx;
					text-align: center;
					font-size: 28rpx;
				}
				.show_item{
					width:702rpx;
					height:167rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					margin-left: 24rpx;
					margin-bottom: 12rpx;
					box-sizing: border-box;
					padding: 22rpx 18rpx;
					display: flex;
					image{
						width: 124rpx;
						height: 121rpx;
						min-width: 124rpx;
					}
					.contents{
						display: flex;
						flex-direction: column;
						margin-left: 25rpx;
						justify-content: space-between;
						text{
							font-size:24rpx;
							font-weight:500;
							color:rgba(102,102,102,1);
						}
					}
				}
			}
		}
	}
</style>
