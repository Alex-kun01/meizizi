<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 收藏 -->
		<view class="show_list">
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
						{{item.re_count}}人收藏
					</view>
					<view class="price">
						<text>￥</text>
						<text style="font-size: 34rpx;">{{item.price}}</text>
					</view>
				</view>
			</view>
			<view v-if="isLoading" class="loading">
				加载中...
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				page: 1,
				limit: 10,
				isLoading: false, 
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
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						
						uni.request({
							url: _this.$http + '/api/index/goodsRelation',
							method: 'POST',
							data: {
								token: res.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(ref){
								console.log('收藏返回数据',ref)
								if(ref.data.status === 200){
									_this.showList = ref.data.data
									_this.isLoading = false
								}else{
									uni.showModal({
										title: '提示',
										content: '获取列表数据失败'
									})
								}
							}
						})
					}
				})
				
			},
			gotoDetauls(item){
				console.log('item',item)
				uni.navigateTo({
					url: '../index/productdetails?id=' + item.id
					
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
			background-color: #F4F4F4;
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.loading{
					width: 100%;
					height: 70rpx;
					background-color: #eee;
					line-height: 70rpx;
					text-align: center;
					font-size: 28rpx;
				}
				.item{
					width: 100%;
					box-sizing: border-box;
					padding: 18rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					display: flex;
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
