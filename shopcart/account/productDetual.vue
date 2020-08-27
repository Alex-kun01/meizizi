<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 商品修改 -->
		<view class="show_list">
			<view class="item">
				<view class="title">
					产品名称
				</view>
				<view class="con disabled">
					{{info.store_name}}
				</view>
			</view>
			<view class="item">
				<view class="title">
					规格型号
				</view>
				<view class="con disabled">
					{{info.suk}}
				</view>
			</view>
			<view class="item">
				<view class="title">
					现有库存
				</view>
				<view class="con">
					<input type="text" v-model="info.stock" placeholder="修改现有库存" />
				</view>
			</view>
			<!-- <view class="item">
				<view class="title">
					预警库存
				</view>
				<view class="con">
					<input type="text" v-model="info.alarm_stock" placeholder="修改预警库存" />
				</view>
			</view> -->
			<view class="item">
				<view class="title">
					总的库存
				</view>
				<view class="con">
					<input type="text" v-model="info.total_stock" placeholder="修改总的库存" />
				</view>
			</view>
		</view>
		
		<view class="sub_mit" @click="editClick">
			修改
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				info: {
					product_id: '',
					store_name: '',
					suk: '',
					stock: '',
					total_stock: '',
					alarm_stock: '',
				},
				opt: {
					product_id: '',
					suk: ''
				}
			}
		},
		onLoad(opt){
			this.opt = opt
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
							token: reg.data.token,
							product_id:_this.opt.product_id,
							suk: _this.opt.suk
						}
						console.log('参数',datas)
						uni.request({
							url: _this.$http + '/api/user/stockSet/getDetails',
							method:'POST',
							data: datas,
							success(res){
								console.log('修改请求数据',res)
								if(res.data.status === 200){
									_this.info = res.data.data
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
			// 修改
			editClick(){
				let _this = this
				
				
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							product_id: _this.opt.product_id,
							suk: _this.opt.suk,
							action: 'edit',
							alarm_stock: +_this.info.alarm_stock,
							total_stock: +_this.info.total_stock,
							stock: +_this.info.stock
						}
						console.log('修改时的参数',datas)
						uni.request({
							url: _this.$http + '/api/user/stockSet/save',
							method: 'POST',
							data: datas,
							success(res){
								console.log('修改后',res)
								if(res.data.status === 200){
									uni.showToast({
										title: '操作成功'
									})
									setTimeout(()=>{
										uni.navigateBack({
											
										})
									},1000)
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
			.show_list{
				width: 100%;
				margin-top: 24rpx;
				.item{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					box-sizing: border-box;
					box-sizing: border-box;
					padding: 0 24rpx;
					background-color: #FFFFFF;
					border-bottom: 1rpx solid #eee;
					display: flex;
					.title{
						font-weight: 500;
						margin-right: 24rpx;
					}
					.con{
						min-width: 500rpx;
						font-size: 30rpx;
						input{
							height: 100%;
							font-size: 30rpx;
						}
					}
					.con.disabled{
						color: #999;
					}
				}
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
