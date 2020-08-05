<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 物流商-我的商家 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			@click="gotoInfo(item)"
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
								<text>{{item.d}}</text>
							</view>
						</view>
						<view class="num_box">
							总库存:
							<text style="color: #EB5204;">{{item.total_stock}}/</text>
							<text>{{item.total_stock}}</text>
							<image v-if="item.is_call == 1" style="width: 23rpx;height: 23rpx;margin-left: 12rpx;" src="../../../static/mine/baojing@2x.png" mode=""></image>
						</view>
					</view>
					<view class="btn_r"
					@click="gotpage"
					>
						<text v-if="item.is_auto == 1">自动</text>
						<text v-if="item.is_auto == 2">手动</text>
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
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							page: _this.page,
							limit: _this.limit
						}
						console.log('我的商家参数', datas)
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/store/logisticsList',
							method: 'POST',
							data:datas,
							success(res){
								uni.hideLoading()
								_this.isLoading = false
								console.log('我的商家-物流商', res)
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
			//跳转店铺详情
			gotpage(){
				uni.navigateTo({
					url: './storeinfo'
				})
			},
			// 跳转项目
			gotoInfo(item){
				console.log('item',item)
				uni.navigateTo({
					url: './mymerchantinfo?id=' + item.id
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
								width: 390rpx;
								font-weight: 500;
								margin-bottom: 20rpx;
							}
							.item_box{
								display: flex;
								margin-bottom: 15rpx;
								.item{
									margin: 0;
									padding: 0;
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
							// width:70rpx;
							padding: 0 15rpx;
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
