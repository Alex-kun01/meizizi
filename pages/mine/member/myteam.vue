<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 我的团队 -->
		<view class="top_box">
			<view class="top_bar">
				<image @click="goback" style="width: 19rpx;height: 34rpx;" src="../../../static/mine/fanhui@2x.png" mode=""></image>
				<view class="txt">
					我的团队
				</view>
				<view class="guanli"
				@click="gotoset"
				>
					管理
				</view>
			</view>
			<view class="tab_box">
				<view class="title">
					团队总人数200人
				</view>
				<view class="hen"></view>
				<view class="bom_box">
					<view class="item">
						<text>总监</text>
						<text class="num">30</text>
					</view>
					<view class="item">
						<text>省区经理</text>
						<text class="num">30</text>
					</view>
					<view class="item">
						<text>业务员</text>
						<text class="num">40</text>
					</view>
					<view class="item">
						<text>讲师</text>
						<text class="num">40</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 展示列表 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			@click="gototarget(item)"
			>
				<image :src="item.img" mode=""></image>
				<view class="con_r">
					<view class="name">
						{{item.name}}
					</view>
					<text>电话：{{item.phone}}</text>
					<text>职位：{{item.zhiwei}}</text>
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
						phone: 123456,
						zhiwei: '总监'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						phone: 123456,
						zhiwei: '省区经理'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						phone: 123456,
						zhiwei: '讲师'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						phone: 123456,
						zhiwei: '业务员'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						phone: 123456,
						zhiwei: '业务员'
					},
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李森森',
						phone: 123456,
						zhiwei: '讲师'
					},
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			gototarget(item){
				let url 
				console.log('',item)
				if(item.zhiwei == '总监'){
					url = './regionset'
				}
				if(item.zhiwei == '省区经理'){
					url = './shenregion'
				}
				if(item.zhiwei == '讲师'){
					url = './teacherregion'
				}
				if(item.zhiwei == '业务员'){
					
				}
				uni.navigateTo({
					url: url
				})
			},
			// 管理按钮
			gotoset(){
				uni.navigateTo({
					url: './memberteam'
				})
			},
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
		background: #2B2B2B;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			.top_box{
				width:750rpx;
				height:192rpx;
				background:rgba(43,43,43,1);
				.top_bar{
					color: #FFFFFF;
					font-weight: 500;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 24rpx;
					margin-bottom: 10rpx;
					.guanli{
						font-size: 24rpx;
					}
				}
				.tab_box{
					width:700rpx;
					height:206rpx;
					background:linear-gradient(-2deg,rgba(230,216,189,1),rgba(244,236,225,1));
					border-radius:12rpx;
					margin-left: 25rpx;
					box-sizing: border-box;
					padding: 24rpx;
					.title{
						color: #222222;
						font-size: 30rpx;
						font-weight: 500;
						margin-bottom: 23rpx;
					}
					.hen{
						width:567rpx;
						height:8rpx;
						background:#C69C6C;
						border-radius:4rpx;
						margin-bottom: 23rpx;
					}
					.bom_box{
						width: 100%;
						display: flex;
						justify-content: space-between;
						.item{
							display: flex;
							flex-direction: column;
							align-items: center;
							color: #724C1F;
							font-size: 24rpx;
							font-weight: 500;
							text.num{
								font-size: 34rpx;
							}
						}
					}
					
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				margin-top: 130rpx;
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
