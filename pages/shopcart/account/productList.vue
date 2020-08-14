<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 商品列表 -->
		<view class="search_box">
			<image src="../../../static/index/sosuo@2x.png" mode=""></image>
			<input  confirm-type="search" @confirm="getData()" type="text" v-model="searchValue" />
		</view>
		<view class="show_list2 top">
			<!-- <view class="item blod">
				名称
			</view> -->
			<view class="item blod">
				规格
			</view>
			<view class="item blod">
				单价
			</view>
			<view class="item blod">
				现有库存
			</view>
			<view class="item blod">
				预警库存
			</view>
			<view class="item blod">
				总库存
			</view>
			<view class="item blod">
				操作
			</view>
		</view>
		
		<view class="show_list"
		v-for="(item,index) in showList"
		:key="index"
		v-if="showList.length != 0"
		>
			<view class="name">
				{{item.store_name}}
			</view>
			
			<view class="item_box">
				<view class="item"
				@click="lookClick('规格',item.suk)"
				>
					{{item.suk.substring(0,5)}}
				</view>
				<view class="item">
					{{item.price}}
				</view>
				<view class="item">
					{{item.stock}}
				</view>
				<view class="item">
					{{item.alarm_stock}}
				</view>
				<view class="item">
					{{item.total_stock}}
				</view>
				<view class="item" style="display: flex;">
					<view style="margin-right: 10rpx;color: #0081FF;" @click="gotoInfo(item)" class="btn_edit">
						修改
					</view>
					<view @click="deleteClick(item)" style="font-weight: 500;color: #F43F3B" class="btn_delete">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="btn_price">
			总价格：{{getAllPrice}}
		</view>
		
		<view class="noneShow" v-if="showList.length == 0">
			暂无数据
		</view>
		<view class="loading"
		v-if="isLoading"
		>
			加载中...
		</view>
		
	</view>
</template>

<script>
	// import {myMixins} from '@/components/mixins.js'
	export default {
		// mixins: [myMixins],
		data () {
			return {
				searchValue: '',
				isLoading: false,
				page: 1,
				limit: 10,
				showList: []
			}
		},
		onLoad(){
			//   setTimeout(function () {
			// 	console.log('start pulldown');
			// }, 1000);
			
		},
		onShow() {
			
			uni.startPullDownRefresh();
		},
		// 下拉刷新
		onPullDownRefresh(){
			console.log('混入-下拉刷新')
			if(this.showList){
				this.showList = []
			}
			this.page = 1
			this.getData()
			 setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed:{
			getAllPrice(){
				let allPrice = 0;
				this.showList.forEach(item =>{
					allPrice = allPrice + (+item.price * +item.total_stock)
				})
				return allPrice;
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
							search: _this.searchValue,
							page: _this.page,
							limit: _this.limit
						}
						console.log('请求参数',datas)
						uni.request({
							url: _this.$http + '/api/user/stockSet/getList',
							method: 'POST',
							data: datas,
							success(res){
								_this.isLoading = false
								console.log('商品列表数据', res)
								// return
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
			// 查看信息
			lookClick(title,content){
				uni.showModal({
					title: title,
					content:content
				})
			},
			// 修改页面
			gotoInfo(item){
				//suk id
				
				console.log(item.product_id, item.suk)
				uni.navigateTo({
					url: './productDetual?product_id=' + item.product_id + '&suk=' + item.suk
				})
			},
			// 删除
			deleteClick(item){
				console.log('item', item)
				let _this = this
				uni.showModal({
					title: '提示',
					content: '该操作将删除此项，是否继续？',
					success(data) {
						console.log('data',data)
						if(data.confirm){
							// 同意删除
							uni.getStorage({
								key: 'userInfo',
								success(reg){
									let datas = {
										token: reg.data.token,
										action: 'del',
										product_id: item.product_id,
										suk: item.suk
									}
									uni.request({
										url: _this.$http + '/api/user/stockSet/save',
										method:'POST',
										data: datas,
										success(res){
											console.log('删除返回数据', res)
											if(res.data.status === 200){
												uni.showToast({
													title: '删除成功！'
												})
												_this.page = 1
												_this.showList = []
												_this.getData()
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
			min-height: 100vh;
			height: 100%;
			background-color: #999;
			padding-top: 24rpx;
			.loading{
				width: 100%;
				height: 70rpx;
				background-color: #AAAAAA;
				text-align: center;
				line-height: 70rpx;
				font-size: 28rpx;
			}
			.show_list2{
				width: 90%;
				box-sizing: border-box;
				padding: 25rpx;
				background-color: #999;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 50rpx;
			}
			.show_list{
				
				width: 100%;
				box-sizing: border-box;
				padding: 25rpx;
				background-color: #999;
				display: flex;
				flex-direction: column;
				.name{
					color: #FFFFFF;
					margin-bottom: 20rpx;
					margin-left: 20rp;
				}
				.item_box{
					display: flex;
					padding: 15rpx 0;
					border-bottom: 1rpx solid #FFFFFF;
					margin-left: 20rpx;
					.item{
						width: 140rpx;
						height: 20rpx;
						// background-color: green;
						text-align: center;
						line-height: 20rpx;
						color: #FFFFFF;
						font-size: 24rpx;
						.btn_edit{
							color: #FFFFFF;
							font-weight: 500;
						}
					}
				}
				
				.item.blod{
					font-weight: 500;
				}
			}
			.search_box{
				width: 600rpx;
				height: 60rpx;
				background-color: #AAAAAA;
				border: 1rpx solid #F0F0F0;
				border-radius: 30rpx;
				margin-left: 75rpx;
				margin-bottom: 24rpx;
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
			.btn_price{
				height: 80rpx;
				width: 100%;
				// background-color: #EEEEEE;
				text-align: right;
				padding-right: 20rpx;
				padding-top: 35rpx;
				color: #FFFFFF;
				font-weight: 500;
			}
			.noneShow{
				width: 100%;
				margin-top: 100rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
</style>
