<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 会员我的团队	 -->
		<view class="top_bar">
			<view class="img" @click="goback">
				<image style="width: 23rpx;height: 36rpx;" src="../../../static/index/fanhui@2x.png" mode=""></image>
			</view>
			<view @click="changeIndex(1)" :class="{item:true,active: isActive === 1}">
				直推会员(50)
			</view>
			<view @click="changeIndex(2)" :class="{item:true,active: isActive === 2}">
				间推会员(50)
			</view>
		</view>
		<!-- 直推会员 -->
		<view class="top_bars" v-if="isActive === 1">
			<view :class="{option:true, active: memberActive1 === 1}" @click="changMemberx(1)">
				<text>默认排序</text>
				<image v-if="memberActive1 === 1" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive1 === 2}" @click="changMemberx(2)">
				<text>复购人数</text>
				<image v-if="memberActive1 === 2" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive1 === 3}" @click="changMemberx(3)">
				<text>直推人数</text>
				<image v-if="memberActive1 === 3" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
		</view>
		<view class="member_list" v-if="isActive === 1"> 
		
			<view class="item"
			v-for="(item, index) in zhituiList"
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
		
		<!-- 间推会员 -->
		<view class="top_bars" v-if="isActive === 2">
			<view :class="{option:true, active: memberActive === 1}" @click="changMember(1)">
				<text>默认排序</text>
				<image v-if="memberActive === 1" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive === 2}" @click="changMember(2)">
				<text>复购人数</text>
				<image v-if="memberActive === 2" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
			<view :class="{option:true, active: memberActive === 3}" @click="changMember(3)">
				<text>直推人数</text>
				<image v-if="memberActive === 3" style="width: 14rpx;height: 8rpx;" src="../../../static/mine/geng@2x.png" mode=""></image>
				<image v-else style="width: 14rpx;height: 8rpx;" src="../../../static/mine/gengd@2x.png" mode=""></image>
			</view>
		</view>
		<view class="member_list" v-if="isActive === 2"> 
		
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
				isActive: 1, 
				memberActive1: 1, // 直推会员显示
				memberActive: 1, // 间推会员显示
				zhituiList: [
					{
						img: '../../../static/mine/tup@2x.png',
						name: '李水水',
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
				//间推会员
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
			changeIndex(index){
				this.isActive = index
			},
			changMember(index){
				this.memberActive = index
			},
			changMemberx(index){
				this.memberActive1 = index
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
				height: 100rpx;
				box-sizing: border-box;
				padding: 0 16%;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				.img{
					position: absolute;
					top: 24rpx;
					left: 24rpx;
				}
				.item{
					height: 50%;
					font-size: 32rpx;
					font-weight: 500;
					border-bottom: 6rpx solid #FFFFFF;
				}
				.item.active{
					border-bottom: 6rpx solid #FF7E00;
				}
			}
			.show_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding: 25rpx 15rpx;
					margin-bottom: 24rpx;
					.title{
						font-size: 34rpx;
						font-weight: 500;
						color: #111111;
						margin-bottom: 24rpx;
					}
					.con_box{
						display: flex;
						justify-content: space-between;
						align-items: center;
						image{
							width: 180rpx;
							height: 180rpx;
							margin-right: 24rpx;
						}
						.con_con{
							font-size: 24rpx;
							.address{
								width: 390rpx;
								font-weight: 500;
								margin-bottom: 20rpx;
							}
							.item_box{
								// display: flex;
								// margin-bottom: 15rpx;
								.item{
									margin: 0;
									padding: 0;
									margin-bottom: 15rpx;
									image{
										width: 28rpx;
										height: 23rpx;
										margin: 0 5rpx;
									}
								}
							}
							.num_box{
								font-weight: 500;
							}
							
						}
						.btn_r{
							width:105rpx;
							height:31rpx;
						}
					}
				}
			}
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				// margin-top: 24rpx;
				
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
			.top_bars{
				width: 100%;
				height: 80rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 24rpx;
				margin-bottom: 24rpx;
				.option{
					color: #666666;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					image{
						margin-left: 10rpx;
					}
				}
				.option.active{
					text{
						color: #FF7E00;
					}
				}
			}
			
		}
	}
</style>
