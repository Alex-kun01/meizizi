<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 顶部区域 -->
		<view class="top_box">
			<view class="top_bar">
				<view style="width: 80rpx;"></view>
				<view style="color: #FFFFFF;font-size: 36rpx;font-weight: 400;">个人中心</view>
				<view class="btn">
					<view class="lingdang"
					 @click="gotoTarget('../../mine/set/news')" 
					>
							<image style="width: 32rpx;height: 34rpx;" src="@/static/mine/xiaoxi@2x.png" mode=""></image>
					</view>
					<image @click="gotoTarget('../../mine/set/setup')" style="width: 35rpx;height: 35rpx;margin-left: 25rpx;" src="@/static/mine/shezhi@2x.png" mode=""></image>
				</view>
			</view>
			<view class="mine_info">
				<view class="avatar">
					<image style="width: 110rpx;height: 110rpx;border-radius: 50%;" :src="avatar" mode=""></image>
					<view class="mine_f">
						<view class="mine_name">
							<text class="name">{{nickName}}</text>
							<image v-if="isMember" style="width: 32rpx;height: 32rpx;margin-left: 11rpx;" src="@/static/mine/huiyuan@2x.png" mode=""></image>
						</view>
						<view class="date">
							{{birthday}}
						</view>
					</view>
					</view>
					
					<!-- 推荐码 -->
				<view class="tuijianma"
				@click="rqCodeOpen"
				>
					<image style="width: 49rpx;height: 49rpx;" src="@/static/mine/erweima@2x.png" mode=""></image>
					<view>
						推荐码
					</view>
				</view>
				
				
			</view>
			<view class="shoucahng">
				<view class="item"
				@click="gotoTarget('../../shopcart/collect')"
				>
					<text>收藏夹</text>
					<text class="num">{{coll_count}}</text>
				</view>
				<view class="shu"></view>
				<view class="item"
				@click="gotoTarget('../../shopcart/myfootprint')"
				>
					<text>足迹</text>
					<text class="num">{{foot_count}}</text>
				</view>
			</view>
			<view class="my_order"  @click="gotoTarget('../../shopcart/allorder')">
				<view class="left">
					<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/dingdan@2x.png" mode=""></image>
					<view class="order">
						我的订单
					</view>
				</view>
				<view class="right">
					<text class="lookAllOrder">查看全部订单</text>
					<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	<!-- 菜单列表 -->
	<view class="menu_list">
		<view class="item top line"
		@click="gotoTarget('../../shopcart/account/myallet')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/qianbao@2x.png" mode=""></image>
				<view class="menu_name">
					我的钱包
				</view>
			</view>
			<view class="right">
				<view class="chongzhi">
					充值
				</view>
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget2(1)"
		v-if="mineButton.includes('我的团队')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/wodetuandui@2x.png" mode=""></image>
				<view class="menu_name">
					我的团队
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<!-- #ifdef H5 || APP-PLUS -->
		
		<!-- <view class="linshi" @click="gotokf">
			临时跳转客服
		</view> -->
		
		<view class="item line"
		@click="gotoTarget2(2)"
		v-if="mineButton.includes('我的商家')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/shangjia@2x.png" mode=""></image>
				<view class="menu_name">
					我的商家
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget2(3)"
		v-if="mineButton.includes('团队管理')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/tuandui@2x.png" mode=""></image>
				<view class="menu_name">
					团队管理
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget2(4)"
		v-if="mineButton.includes('配送管理')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/wuliu.png" mode=""></image>
				<view class="menu_name">
					配送管理
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		
		<view class="item line"
		@click="gotoTarget2(5)"
		v-if="mineButton.includes('产品库存设置')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/wuliu.png" mode=""></image>
				<view class="menu_name">
					产品库存设置
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->
		<view class="item bom"
		@click="gotoTarget('../../mine/set/helpcenter')"
		>
			<view class="left">
				<image style="width: 41rpx;height: 41rpx;" src="@/static/mine/kefu@2x.png" mode=""></image>
				<view class="menu_name">
					帮助中心
				</view>
			</view>
			<view class="right">
				<image style="width: 12rpx;height: 18rpx;" src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
		</view>
	</view>
	<!-- 积分商城 -->
<!-- 	<view class="jifen_box"
	@click="test"
	>
		<image src="@/static/mine/jifenshangcheng@2x.png" mode=""></image>
	</view> -->
		
	<view class="rqcode"
	@touchmove.stop.prevent="moveHandle"
	v-if="isShowrqCode"
	>
		<view class="box">
			<image @click="isShowrqCode = false" class="close" src="@/static/index/closeX2.png" mode=""></image>
			<view class="position">
				<image class="rqcodepic" :src="rqCodeInfo.imgUrl" mode=""></image>
				<view class="code_box">
					<text>您的邀请码：</text>
					<text style="font-weight: 500;">{{rqCodeInfo.rqCode}}</text>
					<text @click="fuzhi" style="margin-left: 40rpx;color: #FF4E03;">复制</text>
				</view>
			</view>
		</view>
	</view>
		
		
		<view class="position_float"
		@touchmove.stop.prevent="moveHandle" 
		v-if="isCustomizeShow"
		>
			<view class="content_fl">
				<image src="@/static/second/tan.png" mode=""></image>
				<view class="btn_ok"
					@click="closeCusClick"
				>
					好的
				</view>
				<view class="float_text">
					<view class="float1">
						到店咨询！
					</view>
					<view class="float2">
						宝宝们，赶快来领取吧~
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowrqCode: false, // 控制二维码弹窗展示
				nickName: '', // 昵称
				avatar: '', // 头像
				birthday: '', // 生日
				// 角色
				character: 5, // 1 会员 2加盟店 3服务商 4 物流商 5 团队管理 6 业务员
				 // 推荐吗数据
				rqCodeInfo:{
					imgUrl: '',
					rqCode: ''
				},
				// 权限
				mineButton: [],
				coll_count: 0, //收藏数量
				foot_count: 0, //足迹数量
				isMember: false, // 是否是会员
				// 弹出自定义弹窗
				isCustomizeShow: false, 
			}
		},
		onLoad() {
			
		},
		onShow(){
			this.init()
			let _this = this
			// 获取用户信息
			uni.getStorage({
				key: 'userInfo',
				success(res){
					console.log('用户本地',res.data)
					_this.nickName = res.data.nickname || '暂无昵称'
					_this.mineButton = res.data.mineButton || []
					_this.character = res.data.group_id
					_this.avatar = res.data.avatar || '@/static/mine/staticAvatar.jpg'
					if(res.is_member == 1){
						_this.isMember = true
					}
				}
			})
		},
		methods: {
			gotokf(){
				uni.navigateTo({
					url: '../chat/chatLive'
				})
			},
			init(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						_this.nickName = res.data.nickname || '暂无昵称'
						_this.avatar = res.data.avatar || '@/static/mine/staticAvatar.jpg'
						_this.birthday = res.data.birthday//.substring(0,10)
						if(res.data.tourist){
							
							uni.showModal({
								title: '提示',
								content: '游客没有该权限，是否去登录？',
								success(rr){
									console.log('rr',rr)
									if(rr.confirm){
										uni.redirectTo({
											url: './login'
										})
									}
									if(rr.cancel){
										uni.switchTab({
											url: '../index/index'
										})
									}
								}
							})
							return
						}
						// 收藏夹 足迹
						uni.request({
							url: _this.$http + '/api/index/info',
							method: 'POST',
							data: {
								token: res.data.token
							},
							success(reg){
								console.log('购物车，收藏夹',reg)
								if(reg.data.status === 200){
									_this.coll_count = reg.data.data.coll_count
									_this.foot_count = reg.data.data.foot_count
								}else{
									uni.showModal({
										title: '提示',
										content: reg.data.msg
									})
								}
							}
						})
					}
				})
				
			},
			// 页面跳转
			gotoTarget(url){
				uni.navigateTo({
					url: url
				})
			},
			// 不同角色跳转不同页面
			gotoTarget2(index){
				console.log('xx',index,this.character)
				// index = 1 我的团队 2 我的商家 3 团队管理
				let url = ''
				if(index === 1){
					//我的团队
					switch(this.character) {
						 case 1:
						    // 会员
						    url = '../../mine/member/membermyteam'
						    break;
					     case 2:
					        // 加盟店
					        url = '../../mine/join/joinmyteamtuijian'
					        break;
						 default: uni.showModal({
										title: '警告',
										content: '您没有该权限！'
									})
					} 
				}
				else if(index === 2){
					//我的商家
					switch(this.character) {
						case 2:
							// 加盟店
							url = '../../mine/merchant/mymerchantx'
							break;
					     case 3:
							// 服务商
					        url = '../../mine/join/quyujoin'
					        break;
					     case 4:
						 	// 物流商
							// 改整
					        url = '../../mine/merchant/mymerchantx?show=' + 1
					        // url = './merchant/mymerchant'
					        break;
						 case 5:
							// 团队管理
						    url = '../../mine/join/teammentmy'
							break;
						 case 6:
						 // 业务员/讲师
						 url = '../../mine/member/teacher'
						 break;
						 default: uni.showModal({
						 			title: '警告',
						 			content: '您没有该权限！'
						 		})
					} 
				}
				else if(index === 3){
					// 团队管理
					switch(this.character) {
						case 5:
							// 团队管理
							url = '../../mine/newTeam/newteam'
							break;
						default: uni.showModal({
									title: '警告',
									content: '您没有该权限！'
								})
					} 
				}
				else if(index === 4){
					// 配送管理
					url = '../../mine/merchant/mymerchant'
				}
				else if (index === 5){
					// 产品库存设置
					url = '../../shopcart/account/StoreInventory'
				}else {
					uni.showModal({
						title: '警告',
						content: '您没有该权限！'
					})
				}
				
				uni.navigateTo({
					url: url
				})
				
			},
			test(){
				uni.showModal({
					title: '提示',
					content: '敬请期待...'
				})
				return
				this.isCustomizeShow = true
			},
			fuzhi(){
				uni.setClipboardData({
						data: this.rqCodeInfo.rqCode
					});
			},
			closeCusClick(){
				this.isCustomizeShow = false
			},
			moveHandle(){},
			rqCodeOpen(){
				let _this = this
				
				
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: _this.$http + '/api/index/getUserCode',
							method: 'POST',
							data: {
								token: reg.data.token
							},
							success(res){
								console.log('推荐码返回数据',res)
								if(res.data.status === 200){
									_this.rqCodeInfo.imgUrl = _this.$http + res.data.data.reco_url
									_this.rqCodeInfo.rqCode = res.data.data.reco_code
									console.log('查看', _this.rqCodeInfo)
									_this.isShowrqCode = true
									
								}else{
									uni.showModal({
										title: '提示',
										content: res.data.msg
									})
								}
								uni.hideLoading()
							}
						})
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '用户数据获取失败'
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
		background: #FF4E03;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			min-height: 100vh;
			background-color: #F4F4F4;
			.rqcode{
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.8);
				position: absolute;
				top: 30rpx;
				.close{
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					top: 20rpx;
					right: 20rpx;
				}
				.rqcodepic{
					width: 400rpx;
					height: 400rpx;
					margin-top: 30rpx;
				}
				.box{
					width: 100%;
					height: 100%;
					padding: 60rpx 0;
					background-color: #FFFFFF;
					// background-color: pink;
					position: absolute;
					bottom: -60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.position{
						// background-color: pink;
						width: 500rpx;
						// height: 500rpx;
						text-align: center;
						margin-bottom: 100rpx;
						.code_box{
							margin-top: 30rpx;
							margin-bottom: 30rpx;
							
						}
					}
				}
			}
			.top_box{
				width: 100%;
				height: 398rpx;
				position: relative;
				background:linear-gradient(179deg,rgba(255,78,3,1),rgba(255,123,46,1));
				// background-color: #008c8c;
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
				margin: 18rpx 0 0 25rpx;
				image{
					width: 700rpx;
					height: 323rpx;
				}
			}
			
			.position_float{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.6);
				position: fixed;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				.content_fl{
					width: 100%;
					height: 600rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
					image{
						width: 100%;
						height: 300rpx;
					}
					.float_text{
						border: 1rpx solid #FFFFFF;
						position: absolute;
						top: 80rpx;
						.float1{
							font-size: 45rpx;
							font-weight: 500;
							text-align: center;
							color:  #fd3325;
						}
						.float2{
							font-size: 35rpx;
							font-weight: 500;
							text-align: center;
							color:  #fd3325;
							margin-top: 20rpx;
						}
					}
					.btn_ok{
						width: 270rpx;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 50rpx;
						text-align: center;
						font-size: 38rpx;
						background-color: #fd3325;
						color: #FFFFFF;
						font-weight: 500;
						margin-top: 30rpx;
					}
				}
			}
			
		}
	}
</style>
