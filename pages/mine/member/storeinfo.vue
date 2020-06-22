<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 店铺信息 -->
		<view class="title_list">
			<view class="item title"
			v-for="(title, itix) in titleList"
			:key='itix'
			>
				{{title}}
			</view>
		</view>
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			>
				<view class="item_i">{{item.store_name}}</view>
				<view class="item_i">{{item.price}}</view>
				<view class="item_i"><text>{{item.stock}}/<text>{{item.stock}}</text></text></view>
				<view class="item_i">{{item.turnover}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				titleList: ['商品名', '单价' , '库存', '营业额'],
				opt: {},
				showList: []
			}
		},
		onLoad(opt){
			this.opt = opt
			this.getData(opt.id)
			
		},
		onShow(){
			
		},
		methods:{
			getData(id){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/team/shopInfo',
							method: 'POST',
							data: {
								token: '8300ee357cf18d92ab2712818108a3e8',// reg.data.token,
								mid: id || 1
							},
							success(res){
								uni.hideLoading()
								console.log('店铺信息数据', res)
								if(res.data.status === 200){
									_this.showList = res.data.data
								}else{
									uni.showModal({
										title: '店铺信息数据获取失败'
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
			width: 700rpx;
			margin-left: 15rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 24rpx 30rpx;
			.title_list{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.title{
					width: 175rpx;
					text-align: center;
					color: #333333;
					font-size: 28rpx;
					font-weight: 500;
				}
			}
			.show_list{
				width: 100%;
				.item{
					color: #919191;
					font-size: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 23rpx;
					.item_i{
						width: 175rpx;
						text-align: center;
					}
				}
			}
			
		}
	}
</style>
