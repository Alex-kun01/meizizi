<template>
	<view class="content">
		<!-- 申请退货 -->
		<view class="titleNview-placing"></view>
		<view class="shop_box">
			<image :src="info.image" mode=""></image>
			<view class="con">
				<view class="title">
					{{info.goods_name}}
				</view>
				<view v-if="info.spe_name" class="sub">
					{{info.spe_name}}
				</view>
				<view class="bom">
					<text class="tui">退款金额</text>
					<text class="price">￥<text style="font-size: 36rpx;">{{info.price}}</text></text>
				</view>
			</view>
		</view>
		<view class="why_box">
			<view class="title">
				退货原因：
			</view>
			<textarea maxlength='255' v-model="whyValue" placeholder="请填写退货原因" />
		</view>
		<!-- 提交按钮 -->
		<view class="pay_btn"
		@click="submitClick"
		>
			提交
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data () {
			return {
				whyValue: '',
				info: {}
			}
		},
		onLoad(){
			console.log('我看看数据', this.tuiOrderInfo)
			this.info = this.tuiOrderInfo
		},
		onShow(){
			
		},
		computed:{
			...mapState(['tuiOrderInfo'])
		},
		methods:{
			// 提交
			submitClick(){
				let _this = this
				// 请求接口
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							order_id: _this.info.goods_id,
							content: _this.whyValue
						}
						console.log('查看参数', datas)
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/goods/refund',
							method:'POST',
							data: datas,
							success(res){
								uni.hideLoading()
								console.log('退货返回数据', res)
								if(res.data.status === 200){
									//请求成功后页面跳转
									uni.showToast({
										title: '提交成功',
										success(){
											uni.redirectTo=({
												url: './allorder'
											})
										}
									})
								}else{
									uni.showModal({
										title: res.data.msg
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
		height:2rpx;
		background: #F4F4F4;
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
			.shop_box{
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				.con{
					width: 100%;
					.title{
						// width: 100%;
						width: 450rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size:26rpx;
						font-weight:500;
						color:rgba(62,62,62,1);
						line-height:32rpx;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.sub{
						display: inline-block;
						height: 42rpx;
						background:rgba(250,250,250,1);
						font-size:24rpx;
						font-weight:500;
						color:rgba(159,159,159,1);
						padding: 3rpx 15rpx;
						margin-bottom: 10rpx;
					}
					.bom{
						width: 100%;
						display: flex;
						
						align-items: center;
						justify-content: space-between;
						margin-bottom: 10rpx;
						.tui{
							font-size:28rpx;
							font-weight:500;
							color:rgba(72,72,72,1);
							line-height:36rpx;
						}
						.price{
							color: #FF8721;
							font-weight: 500;
							font-size: 26rpx;
						}
					}
				}
				image{
					min-width: 190rpx;
					min-height: 186rpx;
					width: 190rpx;
					height: 186rpx;
					margin-right: 24rpx;
				}
			}
			.why_box{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.title{
					font-size:28rpx;
					font-weight:500;
					color:rgba(72,72,72,1);
					line-height:36rpx;
				}
				textarea{
					font-size:24rpx;
					// font-weight:500;
					margin-top: 30rpx;
					color:rgba(159,159,159,1);
					text-indent: 60rpx;
					height: 300rpx;
				}
			}
			.pay_btn{
				width:543rpx;
				height:91rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				line-height: 91rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				color:#FFFFFF;
				margin: 161rpx 0 89rpx 104rpx;
			}
		}
	}
</style>
