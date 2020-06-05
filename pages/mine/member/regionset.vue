<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 区域管理 -->
		<view class="top_bar">
			<view class="top_con">
				<view style="display: flex;">
					<image :src="userInfo.img" mode=""></image>
					<view class="con_con">
						<view class="name">
							{{userInfo.name}}
							<text>职位:{{userInfo.zhiwei}}</text>
						</view>
						<view class="region">
							管理区域：{{userInfo.region}}
						</view>
					</view>
				</view>
				<view class="r_btn" @click="renmClick">
					更改
				</view>
			</view>
			<view class="con_cons">
				<view class="item">
					业务数据
				</view>
				<view class="look_more">
					查看更多
				</view>
			</view>
			<view class="con_cons">
				<view class="item">
					总交易额
				</view>
				<view class="price">
					{{userInfo.jine}}
				</view>
			</view>
		</view>
		<!-- 列表数据 -->
		<view class="show_list">
			<view class="top_bars">
				<view class="shu"></view>
				<text>他的团队</text>
			</view>
			<view class="lis_data">
				<view class="item"
				v-for="(item, index) in showList"
				:key="index"
				>
					<image :src="item.img" mode=""></image>
					<view class="user_info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="item">
							电话: {{item.phone}}
						</view>
						<view class="item">
							职位:{{item.zhiwei}}
						</view>
					</view>
				</view>
			</view>
			</view>
			
			<!-- 更改区域弹窗 -->
			<view class="renming_float"
			v-if="isShow"
			@touchmove.stop.prevent="moveHandle" 
			>
				<view class="con_box">
					<view class="title">
						更改区域
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll"
					>
						<view class="item"
						v-for="(item, index) in renmingList"
						:key="index"
						@click="chooseActive(index)"
						>
						<view class="yuan">
							<image v-if="isActive === index" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
						</view>	
						<view class="text">
							{{item}}
						</view>
						</view>
					 </scroll-view>
					<view class="btn_box">
						<view class="on_btn" @click="onClick">取消</view>
						<view class="ok_btn" @click="okClick">确定</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userInfo: {
					img: '../../../static/mine/avatar.jpg',
					name: '李森森',
					zhiwei: '总监',
					region: '四川',
					jine: 30000
				},
				scrollTop: 0,
				// 是否展示更改弹窗
				isShow: false,
				// 更改区域列表
				renmingList: ['四川', '河南', '贵州', '云南', '广东'],
				isActive: 1, // 更改区域选中
				showList: [
					{
						img: '../../../static/mine/avatar.jpg',
						name: '李森森',
						phone: 123456789,
						zhiwei: '省区经理'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						name: '李森森',
						phone: 123456789,
						zhiwei: '省区经理'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						name: '李森森',
						phone: 123456789,
						zhiwei: '省区经理'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						name: '李森森',
						phone: 123456789,
						zhiwei: '省区经理'
					},
					{
						img: '../../../static/mine/avatar.jpg',
						name: '李森森',
						phone: 123456789,
						zhiwei: '省区经理'
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			renmClick() {
				this.isShow = true
			},
			moveHandle(){
				
			},
			chooseActive(index) {
				this.isActive = index
			},
			// 取消任命
			onClick(){
				this.isShow = false
			},
			// 确定任命
			okClick(){
				this.isShow = false
			},
			upper: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
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
			height: 100vh;
			background-color: #F4F4F4;
			.top_bar{
				width: 700rpx;
				height: 278rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				margin-top: 25rpx;
				box-sizing: border-box;
				padding: 24rpx;
				margin-left: 25rpx;
				.top_con{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					image{
						width: 115rpx;
						height: 112rpx;
						margin-right: 25rpx;
					}
					.con_con{
						.name{
							font-size: 26rpx;
							color: #2B2B2B;
							font-weight: 500;
							text{
								margin-left: 24rpx;
								color: #666666;
							}
						}
						.region{
							color: #B8B8B8;
							font-size: 24rpx;
							margin-top: 24rpx;
						}
					}
					.r_btn{
						width:65rpx;
						height:30rpx;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
						border-radius:15rpx;
						line-height: 30rpx;
						text-align: center;
						color: #FFFFFF;
						font-size: 20rpx;
					}
					
				}
				.con_cons{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 24rpx;
					.item{
						color: #2B2B2B;
						font-size: 26rpx;
						font-weight: 500;
						
					}
					.look_more{
						color: #B8B8B8;
						font-size: 24rpx;
					}
					.price{
						color: #333333;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
				
			}
			.show_list{
				width: 700rpx;
				margin-left: 25rpx;
				margin-top: 24rpx;
				background-color: #FFFFFF;
				.top_bars{
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #111111;
					font-weight: 500;
					box-sizing: border-box;
					padding: 15rpx 15rpx 15rpx 0;
					.shu{
						width:3rpx;
						height:28rpx;
						background:rgba(229,112,55,1);
						margin-right: 15rpx;
					}
				}
				.lis_data{
					width: 100%;
					box-sizing: border-box;
					padding: 0 15rpx 15rpx 15rpx;
					image{
						width: 121rpx;
						height: 122rpx;
						margin-right: 24rpx;
					}
					.item{
						display: flex;
						align-items: center;
						margin-bottom: 24rpx;
						.user_info{
							.name{
								color: #2B2B2B;
								font-size: 26rpx;
								font-weight: 500;
								margin-bottom: 8rpx;
							}
							.item{
								font-size: 24rpx;
								color: #BBBBBB;
								margin-bottom: 8rpx;
							}
						}
					}
				}
			}
			.renming_float{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.con_box{
					width:556rpx;
					height:450rpx;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					position: absolute;
					top: calc(50% - 203rpx);
					left: calc(50% - 273rpx);
					box-sizing: border-box;
					padding: 24rpx;
					.title{
						color: #333333;
						font-weight: 500;
						font-size: 30rpx;
						text-align: center;
						margin-bottom: 24rpx;
						
					}
					.scroll-Y{
						width: 100%;
						height: 235rpx;
						.item{
							display: flex;
							justify-content: center;
							align-items: center;
							margin-bottom: 18rpx;
							.yuan{
								width:28rpx;
								height:28rpx;
								border:2rpx solid rgba(212,212,212,1);
								border-radius:50%;
								margin-right: 15rpx;
								position: relative;
								image{
									width: 28rpx;
									height: 28rpx;
									position: absolute;
									top: 0;
								}
							}
							.text{
								width: 80rpx;
								color: #BBBBBB;
								font-size: 28rpx;
								font-weight: 500;
							}
						}
					}
					.btn_box{
						width: 100%;
						box-sizing: border-box;
						padding: 0 13%;
						display: flex;
						justify-content: space-between;
						margin-top: 40rpx;
						.on_btn{
							width:178rpx;
							height:69rpx;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #000000;
							font-size: 24rpx;
						}
						.ok_btn{
							width:178rpx;
							height:69rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 24rpx;
							
						}
					}
				}
			}
		}
	}
</style>
