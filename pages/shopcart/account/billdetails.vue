<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 账单明细 -->
		<view class="show_list">
			<view class="null_box" v-if="isNull">
				暂无数据
			</view>
			<view class="item"
			v-for="(item,index) in showList"
			:key='index'
			>
				<view class="left_name">
					<view class="name">
						{{item.content}}
					</view>
					<view class="date">
						{{item.add_time}}
					</view>
				</view>
				<view class="right_price">
					<view class="addPrice">
						<text v-if="item.type == 1">+</text>
						<text v-if="item.type == 2">-</text>
						{{item.money}}
					</view>
					<view class="syNum">
						余额 {{item.after_money}}
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
	export default {
		data () {
			return {
				showList: [],
				page: 1,
				limit: 10,
				isLoading: false,
			}
		},
		computed:{
			// 是否有账单数据
			isNull(){
				if(this.showList.length == 0){
					return true
				}
			}
		},
		onLoad(){
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
						let datas = {
							uid: reg.data.uid,
							page: _this.page,
							limit: _this.limit
						}
						console.log('账单明细参数', datas)
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/goods/tranDetailed',
							method: 'POST',
							data: datas,
							success(res){
								uni.hideLoading()
								_this.isLoading = false
								console.log('账单明细数据', res)
								if(res.data.status === 200){
									if(_this.showList.length == 0){
										_this.showList = res.data.data
									}else{
										_this.showList = _this.showList.concat(res.data.data) 
									}
								}else{
									uni.showModal({
										title: '提示',
										content: '获取数据列表失败'
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
			
		},
		// 下拉刷新
		onPullDownRefresh(){
			console.log('下拉刷新')
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
			min-height: 100vh;
			height: 100%;
			background-color: #F4F4F4;
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
				margin-top: 24rpx;
				.null_box{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					color: #999;
				}
				.item{
					width: 100%;
					box-sizing: border-box;
					padding: 30rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #ddd;
					.left_name{
						.name{
							font-size:30rpx;
							font-weight:500;
							color:rgba(51,51,51,1);
							margin-bottom: 20rpx;
						}
						.date{
							font-size:26rpx;
							font-weight:500;
							color:rgba(139,139,139,1);
						}
					}
					.right_price{
						.addPrice{
							font-size:33rpx;
							font-weight:bold;
							color:rgba(255,121,44,1);
							margin-bottom: 20rpx;
						}
						.syNum{
							font-size:26rpx;
							font-weight:500;
							color:rgba(139,139,139,1);
						}
					}
				}
			}
		}
	}
</style>
