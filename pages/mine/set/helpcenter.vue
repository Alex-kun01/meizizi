<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 帮助中心 -->
		<view class="top_bar">
			<view class="avatar">
				<image src="../../../static/mine/avatar.jpg" mode=""></image>
				<view class="title_box">
					<view class="title">
						Hi~小主
					</view>
					<view class="text">
						有什么问题尽管问我哦~
					</view>
				</view>
			</view>
			<view class="search_box">
				<image src="../../../static/index/sosuo.png" mode=""></image>
				<input type="text" v-model="searchValue" placeholder="搜索常见问题" />
			</view>
			<view class="bom_bar">
				常见问题
			</view>
		</view>
		<!-- 问题列表 -->
		<view class="problem_list">
			<view class="item"
			v-for="(item,index) in problemList"
			:key="index"
			>
				{{item.problem}}
			</view>
		</view>
		<!-- 联系客服 -->
		<view class="service">
			<image src="../../../static/mine/kefu@3x.png" mode=""></image>
			<text>在线客服</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				searchValue:'', // 搜索值
				problemList: [
					{
						problem: '下单成功后什么时候发货？'
					},
					{
						problem: '为什么我下单好几天了还没发货？？'
					},
					{
						problem: '多少钱包邮？邮费多少？'
					},
					{
						problem: '我收到的赠品不喜欢能重新更换一款赠品吗'
					},
					{
						problem: '我有多张优惠劵，可以一起使用吗？'
					},
					{
						problem: '我收到的商品有问题，要退货，运费怎么退给我？'
					},
					{
						problem: '物流上面显示签收了，我根本没有收到货？'
					},
					{
						problem: '我收到的赠品不喜欢能重新更换一款赠品吗?'
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			
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
			.top_bar{
				width: 100%;
				height: 398rpx;
				position: relative;
				background:linear-gradient(179deg,rgba(255,78,3,1),rgba(255,123,46,1));
				.avatar{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					align-items: center;
					padding: 24rpx;
					image{
						width: 132rpx;
						height: 132rpx;
						border-radius: 50%;
						margin-right: 24rpx;
					}
					.title_box{
						.title{
							font-size:42rpx;
							font-weight:500;
							color:rgba(255,255,255,1);
							margin-bottom: 15rpx;
						}
						.text{
							font-size:24rpx;
							font-weight:500;
							color:rgba(255,255,255,1);
						}
					}
				}
				.search_box{
					width:690rpx;
					height:80rpx;
					background:rgba(255,255,255,1);
					border-radius:40rpx;
					margin-left: 30rpx;
					display: flex;
					box-sizing: border-box;
					padding: 0 50rpx;
					display: flex;
					align-items: center;
					image{
						width: 30rpx;
						height: 29rpx;
						margin-right: 24rpx;
					}
					input{
						color: #707070;
						font-size: 26rpx;
					}
				}
				.bom_bar{
					width: 690rpx;
					height: 80rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx 12rpx 0 0;
					box-sizing: border-box;
					padding: 10rpx;
					color: #7C7C7C;
					font-size: 26rpx;
					position: absolute;
					bottom: 0;
					left: 30rpx;
				}
			}
			.problem_list{
				width: 100%;
				background-color: #FFFFFF;
				margin-bottom: 100rpx;
				border-top: 1rpx solid #ddd;
				.item{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ddd;
					padding: 0 35rpx;
					color: #1B1B1B;
					font-size: 30rpx;
					font-weight: 500;
				}
			}
			.service{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				position: fixed;
				bottom: 0;
				image{
					width: 46rpx;
					height: 46rpx;
					margin-right: 10rpx;
					
				}
			}
		}
	}
</style>
