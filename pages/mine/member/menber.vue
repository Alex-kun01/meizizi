<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 会员成员 -->
		<view class="top_box">
			<view class="top_bar">
				<image @click="goback" style="width: 19rpx;height: 34rpx;" src="../../../static/mine/fanhui@2x.png" mode=""></image>
				<view class="txt">
					成员
				</view>
				<text></text>
			</view>
			<view class="tab_box">
				<image src="../../../static/mine/huiyuan@2x.png" mode=""></image>
				<text>一次性购买399商品成为会员</text>
			</view>
		</view>
		<!-- 展示列表 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			>
				<image :src="item.img" mode=""></image>
				<view class="con_r">
					<view class="name">
						{{item.name}}
					</view>
					<text>复购人数：{{item.fugou}}</text>
					<text>直推人数：{{item.zhitui}}</text>
					<text>入会时间：{{item.pushTime}}</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				showList: [
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22'
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			goback(){
				uni.navigateBack({
					
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
		background-color: #FFFFFF;
		.content{
			width: 100%;
			.top_box{
				width: 100%;
				height:239rpx;
				background:linear-gradient(179deg,rgba(255,78,3,1),rgba(255,123,46,1));
				.top_bar{
					width: 100%;
					box-sizing: border-box;
					padding: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					.txt{
						font-size: 36rpx;
						color: #FFFFFF;
						font-weight: 500;
					}
				}
				.tab_box{
					width:690rpx;
					height:87rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 30rpx;
					image{
						width: 52rpx;
						height: 51rpx;
						margin-right: 24rpx;
					}
					text{
						font-size: 36rpx;
						color: #222222;
						font-weight: 500;
					}
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					// height: ;
					display: flex;
					margin-bottom: 18rpx;
					image{
						width: 187rpx;
						height: 181rpx;
						margin-right: 24rpx;
					}
					.con_r{
						display: flex;
						flex-direction: column;
						
						.name{
							color: #2B2B2B;
							font-size: 26rpx;
							font-weight: 500;
							margin-bottom: 15rpx;
						}
						text{
							font-size: 24rpx;
							color: #BBBBBB;
							margin-bottom: 15rpx;
						}
					}
				}
			}
			
			
		}
	}
</style>
