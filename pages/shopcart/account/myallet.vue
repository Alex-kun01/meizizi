<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 我的钱包 -->
		<view class="top_bar">
			<image @click="goback" class="back" src="../../../static/index/fanhui@3x.png" mode=""></image>
			<view class="name">
				我的钱包
			</view>
			<view class="r_btn"
			@click="gototarget('./topup')"
			>
				充值
			</view>
		</view>
		<!-- 顶部区域 -->
		<view class="Top_color">
			<view class="price_box">
				<view class="title">
					余额(元)
				</view>
				<view class="price">
					￥{{price}}
				</view>
			</view>
			<!-- <view class="float_box">
				<view class="t_title">
					<image src="../../../static/shopcart/wodeshouyi@2x.png" mode=""></image>
					<text>我的收益</text>
				</view>
				<view class="menu_list">
					<view class="item">
						<view class="price_i">
							￥0.00
						</view>
						<view class="text">
							可提现
						</view>
					</view>
					<view class="item">
						<view class="price_i">
							￥0.00
						</view>
						<view class="text">
							不可提现
						</view>
					</view>
					<view class="item">
						<view class="price_i">
							￥0.00
						</view>
						<view class="text">
							待到账
						</view>
					</view>
					<view class="item">
						<view class="price_i">
							￥0.00
						</view>
						<view class="text">
							今日到账
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 菜单项 -->
		<view class="option_list">
			<view class="option"
			@click="gototarget('./withdraw')"
			>
				<image style="width: 39rpx;height: 29rpx;" src="../../../static/shopcart/woyaotixian@2x.png" mode=""></image>
				<view class="name">
					我要提现
				</view>
			</view>
			<view class="option"
			@click="gototarget('./billdetails')"
			>
				<image style="width: 34rpx;height: 34rpx;" src="../../../static/shopcart/yuemingxi@2x.png" mode=""></image>
				<view class="name">
					账单明细
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				price: 0.00
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
						uni.request({
							url: _this.$http + '/api/index/userMoney',
							method: 'POST',
							data:{
								token: reg.data.token
							},
							success(res){
								console.log('我的钱包返回数据', res)
								if(res.data.status === 200){
									_this.price = res.data.data
								}else{
									uni.showModal({
										title: '提示',
										content: '数据获取失败'
									})
								}
							}
						})
					}
				})
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			gototarget(url){
				uni.navigateTo({
					url: url
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
		height: 100vh;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				display: flex;
				justify-content: space-between;
				position: relative;
				box-sizing: border-box;
				padding: 24rpx;
				.back{
					width: 23rpx;
					height: 41rpx;
				}
				.name{
					font-size:32rpx;
					font-weight:500;
					color:rgba(17,17,17,1);
				}
				.r_btn{
					font-size:28rpx;
					font-weight:500;
					color:rgba(102,102,102,1);
				}
				
			}
			.Top_color{
				position: relative;
				width:750rpx;
				height:206rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,143,2,1));
				.price_box{
					padding: 36rpx 0 0 59rpx;
					.title{
						font-size:28rpx;
						font-weight:500;
						color:rgba(255,255,255,1);
					}
					.price{
						font-size:58rpx;
						font-weight:800;
						color:rgba(255,255,255,1);
					}
				}
				.float_box{
					width:700rpx;
					height:215rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					position: absolute;
					bottom: -130rpx;
					left: 25rpx;
					box-sizing: border-box;
					padding: 33rpx 36rpx;
					.t_title{
						display: flex;
						align-items: center;
						margin-bottom: 20rpx;
						image{
							width: 37rpx;
							height: 42rpx;
							margin-right: 20rpx;
						}
						text{
							font-size:28rpx;
							font-weight:bold;
							color:rgba(51,51,51,1);
						}
					}
					.menu_list{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.item{
							width: 158rpx;
							text-align: center;
							.price_i{
									font-size:34rpx;
									font-weight:800;
									color:rgba(22,22,22,1);
									margin-bottom: 10rpx;
								}
								.text{
									font-size:26rpx;
									// font-weight:500;
									color:rgba(154,154,154,1);
								}
							}
						}
						
				}
			}
			.option_list{
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx;
				margin-top: 24rpx;
				.option{
					width:100%;
					height:96rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					margin-bottom: 24rpx;
					box-sizing: border-box;
					padding: 0 24rpx;
					display: flex;
					align-items: center;
					image{
						margin-right: 18rpx;
					}
					.name{
						font-size:28rpx;
						font-weight:bold;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
	}
</style>
