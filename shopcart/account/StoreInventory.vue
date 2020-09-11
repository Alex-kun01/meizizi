<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 门店库存设置 -->
		<view class="btn"
		@click="gotoList"
		>
			查看商品列表
		</view>
		<view class="item">
			<text>选择产品</text>
			<view class="con">
				<picker mode="selector" :range="productList" @change="changeProduct">
					<view>{{productList[productValue]}}</view>
				</picker>
			</view>
			
		</view>
		<view class="item">
			<text>现有库存</text>
			<view class="con">
				<input type="text" value="" placeholder="请输入现有库存" v-model="stock" />
			</view>
		</view>
		<view class="item">
			<text>总的库存</text>
			<view class="con">
				<input type="text" value=""  placeholder="请输入总库存"  v-model="total_stock" />
			</view>
			
		</view>
		
		<view class="sub_mit"
		@click="subMitClick"
		>
			提交
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				originProductList: [],
				productList: [], // 产品列表
				productIdList: [], // id列表
				productValue: 0, // 索引
				total_stock: '',
				alarm_stock: '',
				stock: ''
			}
		},
		onLoad(){
			this.getProductList()
		},
		onShow(){
			
		},
		methods:{
			// 获取产品列表数据
			getProductList(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token
						}
						uni.request({
							url: _this.$http + '/api/getProductList',
							method: 'POST',
							data: datas,
							success(res){
									console.log('产品列表数据',res)
									if(res.data.status === 200){
										_this.originProductList = res.data.data
										_this.init()
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
			init(){
				let _this = this
				this.originProductList.forEach(item =>{
					_this.productList.push(item.label)
					_this.productIdList.push(item.value)
				})
			},
			changeProduct(e){
				console.log(e)
				this.productValue = e.detail.value
			},
			gotoList(){
				uni.navigateTo({
					url: './productList'
				})
			},
			// 提交
			subMitClick(){
				let _this = this
				let product = this.productIdList[this.productValue]
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							action: 'add',
							product: product,
							alarm_stock: _this.alarm_stock,
							total_stock: _this.total_stock,
							stock: _this.stock
						}
						console.log('提交参数', datas)
						uni.request({
							url: _this.$http + '/api/user/stockSet/save',
							method: 'POST',
							data: datas,
							success(res){
								console.log('提交后数据',res)
								if(res.data.status === 200){
									uni.showToast({
										title: '添加成功!'
									})
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
			height: 100vh;
			background-color: #F4F4F4;
			.item{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #FFFFFF;
				border-bottom: 1rpx solid #eee;
				display: flex;
				box-sizing: border-box;
				padding: 0 24rpx;
				font-size: 32rpx;
				picker{
					width: 500rpx;
				}
				text{
					font-weight: 500;
					margin-right: 20rpx;
				}
				
				.con{
					width: 500rpx;
					height: 100%;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					input{
						height: 100%;
						font-size: 30rpx;
					}
				}
				
			}
			.btn{
				display: flex;
				justify-content: flex-end;
				padding: 10rpx 10rpx 0 0;
				color: #008c8c;
				margin: 20rpx 0;
				font-weight: 500;
				font-size: 32rpx;
			}
			.sub_mit{
				width: 700rpx;
				height: 80rpx;
				background-color: #008c8c;
				color: #FFFFFF;
				line-height: 80rpx;
				text-align: center;
				font-size: 34rpx;
				border-radius: 43rpx;
				margin: 150rpx 0 0 25rpx;
				font-weight: 500;
			}
		}
	}
</style>
