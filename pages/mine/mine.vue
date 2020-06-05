<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 顶部区域 -->
		<view class="top_box">
			<view class="top_bar">
				<view></view>
				<view style="color: #FFFFFF;font-size: 36rpx;font-weight: 400;">个人中心</view>
				<view class="btn">
					<view class="lingdang"
					 @click="gotoTarget('./set/news')" 
					>
							<image style="width: 32rpx;height: 34rpx;" src="../../static/mine/xiaoxi@2x.png" mode=""></image>
							<view class="mesInfo">
								1
							</view>
					</view>
					<image @click="gotoTarget('./set/setup')" style="width: 35rpx;height: 35rpx;margin-left: 25rpx;" src="../../static/mine/shezhi@2x.png" mode=""></image>
				</view>
			</view>
			<view class="mine_info">
				<view class="avatar">
					<image style="width: 110rpx;height: 110rpx;border-radius: 50%;" src="../../static/mine/avatar.jpg" mode=""></image>
					<view class="mine_f">
						<view class="mine_name">
							<text class="name">是九尾主动的</text>
							<image style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" src="../../static/mine/huiyuan@2x.png" mode=""></image>
						</view>
						<view class="date">
							2020.01.01
						</view>
					</view>
				</view>
				<view class="tuijianma"
				@click="test"
				>
					<image style="width: 49rpx;height: 49rpx;" src="../../static/mine/erweima@2x.png" mode=""></image>
					<view>
						推荐码
					</view>
				</view>
			</view>
			<view class="shoucahng">
				<view class="item"
				@click="gotoTarget('../shopcart/collect')"
				>
					<text>收藏夹</text>
					<text class="num">7</text>
				</view>
				<view class="shu"></view>
				<view class="item"
				@click="gotoTarget('../shopcart/myfootprint')"
				>
					<text>足迹</text>
					<text class="num">98</text>
				</view>
			</view>
			<view class="my_order">
				<view class="left">
					<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/dingdan@2x.png" mode=""></image>
					<view class="order">
						我的订单
					</view>
				</view>
				<view class="right" @click="gotoTarget('../shopcart/allorder')">
					<text class="lookAllOrder">查看全部订单</text>
					<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	<!-- 菜单列表 -->
	<view class="menu_list">
		<view class="item top line"
		@click="gotoTarget('../shopcart/account/myallet')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/qianbao@2x.png" mode=""></image>
				<view class="menu_name">
					我的钱包
				</view>
			</view>
			<view class="right">
				<view class="chongzhi">
					充值
				</view>
				<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget('./member/myteam')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/wodetuandui@2x.png" mode=""></image>
				<view class="menu_name">
					我的团队
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget('./merchant/mymerchant')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/shangjia@2x.png" mode=""></image>
				<view class="menu_name">
					我的商家
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget('./member/myteam')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/tuandui@2x.png" mode=""></image>
				<view class="menu_name">
					团队管理
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item bom"
		@click="gotoTarget('./set/helpcenter')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="../../static/mine/kefu@2x.png" mode=""></image>
				<view class="menu_name">
					帮助中心
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="../../static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
	</view>
	<!-- 积分商城 -->
	<view class="jifen_box"
	@click="test"
	>
		<image src="../../static/mine/jifenshangcheng@2x.png" mode=""></image>
	</view>
		
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			// 页面跳转
			gotoTarget(url){
				uni.navigateTo({
					url: url
				})
			},
			test(){
				uni.showModal({
					title: '提示',
					content: '敬请期待...'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #FF4E03;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			.top_box{
				width: 100%;
				height: 398rpx;
				position: relative;
				background:linear-gradient(179deg,rgba(255,78,3,1),rgba(255,123,46,1));
				.top_bar{
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 25rpx;
					.btn{
						display: flex;
						align-items: center;
						.lingdang{
							position: relative;
							.mesInfo{
								width:12rpx;
								height:12rpx;
								font-size: 12.8rpx;
								text-align: center;
								line-height: 12rpx;
								color: #FF4E03;
								background:rgba(255,255,255,1);
								border-radius:50%;
								position: absolute;
								top: -4rpx;
								right: -4rpx;
							}
						}
					}
				}
				.mine_info{
					width: 100%;
					box-sizing: border-box;
					padding: 0 54rpx 0 25rpx;
					align-items: center;
					margin-top: 31rpx;
					display: flex;
					justify-content: space-between;
					.avatar{
						display: flex;
						align-items: center;
						.mine_f{
							margin-left: 28rpx;
							.mine_name{
								font-size:30rpx;
								font-weight:400;
								color:rgba(255,255,255,1);
								display: flex;
								align-items: center;
							}
							.date{
								font-size: 24rpx;
								color: rgba(255,255,255,1);
								margin-top: 17rpx;
							}
						}
					}
					.tuijianma{
						font-size: 20rpx;
						color: rgba(255,255,255,1);
						display: flex;
						flex-direction: column;
						align-items: center;
						image{
							margin-bottom: 7rpx;
						}
					}
				}
				.shoucahng{
					width: 100%;
					box-sizing: border-box;
					padding: 35rpx 143rpx;
					display: flex;
					justify-content: space-between;
					.shu{
						width:2rpx;
						height:37rpx;
						background:rgba(255,255,255,1);
					}
					.item{
						font-size: 26rpx;
						font-weight: 400;
						color: #FFFFFF;
						.num{
							margin-left: 25rpx;
						}
					}
				}
				.my_order{
					width: 700rpx;
					height: 112rpx;
					box-sizing: border-box;
					padding: 0 23rpx;
					background-color: #FFFFFF;
					border-radius: 18rpx;
					position: absolute;
					bottom: -56rpx;
					left: 25rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						align-items: center;
						.order{
							font-size:30rpx;
							font-weight:500;
							color:rgba(34,34,34,1);
							margin-left: 25rpx;
						}
					}
					.right{
						display: flex;
						align-items: center;
						.lookAllOrder{
							margin-right: 14rpx;
							font-size: 24rpx;
							color: #666666;
						}
					}
				}
				
			}
			.menu_list{
				width: 100%;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin-top: 80rpx;
				.item{
					width: 100%;
					height: 93rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 24rpx;
					.left{
						display: flex;
						align-items: center;
						.menu_name{
							font-size: 30rpx;
							color: #222222;
							font-weight: 500;
						}
						image{
							margin-right: 24rpx;
						}
					}
					.right{
						display: flex;
						align-items: center;
						.chongzhi{
							font-size: 24rpx;
							color: #FF4848;
						}
						image{
							margin-left: 25rpx;
						}
					}
				}
				.item.top{
					border-radius: 18rpx 18rpx 0 0 ;
				}
				.item.bom{
					border-radius: 0 0 18rpx 18rpx;
				}
				.item.line{
					border-bottom: 1rpx solid #eee;
				}
			}
			.jifen_box{
				width: 700rpx;
				height: 323rpx;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin: 18rpx 0;
				image{
					width: 700rpx;
					height: 323rpx;
				}
			}
			
			
			
		}
	}
</style>
