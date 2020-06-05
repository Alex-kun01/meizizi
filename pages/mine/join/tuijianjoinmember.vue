<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 推荐加盟店会员 -->
		<view class="member_list">
			<view class="item"
			v-for="(item, index) in memberList"
			:key='index'
			>
				<view style="display: flex;">
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
				<view class="r_shouyi">
					收益:{{item.shouyi}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// 会员展示列表
				memberList:[
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						fugou: 20,
						zhitui:200,
						pushTime: '2020.04.22',
						shouyi: 200
					},
					
				],
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
			height: 100vh;
			background-color: #F4F4F4;
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					width: 100%;
					// height: ;
					justify-content: space-between;
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
					.r_shouyi{
						font-size: 26rpx;
						font-weight: 500;
						color: #FF792C;
						margin-right: 24rpx;
					}
				}
			}
		}
	}
</style>
