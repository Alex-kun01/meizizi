<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 消息 -->
		<view class="item"
		v-for="(item,index) in showList"
		:key="index"
		>
			<view class="img">
				<image style="min-width: ;" src="../../../static/mine/xiaoxi@3x.png" mode=""></image>
				<view class="con_text">
					<text style="font-weight: 500;">{{item.title}}</text>
					<text style="font-size: 28rpx;">{{item.content}}</text>
					<text style="font-size: 22rpx;">{{item.add_time}}</text>
				</view>
			</view>
			<view class="r_date"
			@click="deleteNew(item)"
			>
				<image src="../../../static/index/closeX2.png" mode=""></image>
			</view>
		</view>
		<view v-if="isLoading" class="loading">
			加载中...
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// 展示数组
				showList: [],
				isLoading: true,
				page: 1,
				limit: 10,
				isDeleteOK: false, // 是否允许不提示删除
			}
		},
		onLoad(){
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			getData(type){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: _this.$http + '/api/index/newList',
							method: 'POST',
							data:{
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								console.log('消息列表数据', res)
								uni.hideLoading()
								if(res.data.status === 200){
									if(_this.showList.length === 0 || type){
										_this.showList = res.data.data
									}else{
										_this.showList = _this.showList.concat(res.data.data)
									}
									
									_this.isLoading = false
								}else{
									uni.showModal({
										title: '提示',
										content: '消息列表数据获取失败！'
									})
								}
							}
						})
					}
				})
			},
			// 删除消息
			deleteNew(item){
				console.log('item',item)
				// return
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
							// 直接删除
							uni.showLoading({
								title: ''
							})
							uni.request({
								url: _this.$http + '/api/index/delNews',
								method: 'POST',
								data: {
									token: reg.data.token,
									id: item.id
								},
								success(res){
									console.log('删除通知返回数据', res)
									if(res.data.status === 200){
										
										uni.hideLoading()
										_this.getData(1)
									}else{
										uni.showModal({
											title: '提示',
											content: '删除失败'
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
			height: 100%;
			min-height: 100vh;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				font-size: 28rpx;
				text-align: center;
			}
			.item{
				margin-top: 24rpx;
				width: 100%;
				box-sizing: border-box;
				background-color: #FFFFFF;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;
				
				.img{
					display: flex;
					align-items: center;
					image{
						min-height: 75rpx;
						min-width: 75rpx;
						width: 75rpx;
						height: 75rpx;
						margin-right: 20rpx;
					}
					.con_text{
						display: flex;
						flex-direction: column;
						text{
							font-size: 34rpx;
							color: #6A6A6A;
							margin-bottom: 10rpx;
						}
					}
				}
				.r_date{
					align-self: flex-start;
					color: #9A9A9A;
					font-size: 24rpx;
					image{
						width: 30rpx;
						height: 30rpx;
					}
				}
				
			}
		}
	}
</style>
