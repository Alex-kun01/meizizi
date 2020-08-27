<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 讲师 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			
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
						<view class="item">
							<image src="@/static/mine/dianhua@2x.png" mode=""></image>
							<text>{{item.phone}}</text>
						</view>
						<view class="item">
							<image src="@/static/mine/weixin@2x.png" mode=""></image>
							<text>{{item.wx_name}}</text>
						</view>
					</view>
					<view class="btn_r"
					@click="gotoInfo(item)"
					>
						查看数据
					</view>
				</view>
			</view>
			<view class="loading" v-if="isLoading">
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
				showList: [],
				page: 1,
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
				console.log(1111)
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						// uni.showLoading({
						// 	title: ''
						// })
						uni.request({
							url: _this.$http + '/api/user/storeList',
							method: 'POST',
							data:{
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								// uni.hideLoading()
								_this.isLoading = false
								console.log('讲师返回数据', res)
							}
						})
					}
				})
			},
			//跳转店铺详情
			gotoInfo(item){
				console.log('item', item)
				uni.navigateTo({
					url: './storeinfo?id='+item.shop_id
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
			box-sizing: border-box;
			padding: 24rpx;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.show_list{
				width: 100%;
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
								width: 380rpx;
								font-weight: 500;
								margin-bottom: 10rpx;
							}
							.item{
								margin: 0;
								padding: 0;
								margin-bottom: 15rpx;
								image{
									width: 28rpx;
									height: 23rpx;
								}
							}
						}
						.btn_r{
							width:107rpx;
							height:31rpx;
							line-height: 31rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 22rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:16rpx;
							align-self: flex-end;
						}
					}
				}
			}
		}
	}
</style>
