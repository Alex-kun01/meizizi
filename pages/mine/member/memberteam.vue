<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 会员团队 -->
		<view class="search_box">
			<image style="width: 30rpx;height: 30rpx;" src="../../../static/index/sosuo.png" mode=""></image>
			<input type="text" value="" placeholder="搜索" />
		</view>
		<!--成员列表 -->
		<view class="member_list">
			<view class="item"
			v-for="(item,index) in showList"
			:key="index"
			>
				<view class="img_l">
					<image :src="item.avatar" mode=""></image>
					<view class="con_box">
						<view class="name">{{item.real_name}}</view>
						<view class="zhiwei" v-if="item.position == 1">职位：总监</view>
						<view class="zhiwei" v-if="item.position == 2">职位：省区经理</view>
						<view class="zhiwei" v-if="item.position == 3">职位：业务员</view>
						<view class="zhiwei" v-if="item.position == 4">职位：店铺</view>
						
					</view>
				</view>
				<view class="btn_r" @click="renmClick(item, index)">任命</view>
			</view>
		</view>
		
		<!-- 任命弹窗 -->
		<view class="renming_float"
		v-if="isShow"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="con_box">
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
				isShow: false,  // 是否展示任命弹窗
				isActive: 1, // 任命角色 0 
				 scrollTop: 0,
				// 任命列表
				renmingList: ['总监','省级代理','市级代理','讲师','业务员','总监','省级代理','市级代理','讲师','业务员'],
				showList:[],
				
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
							url: _this.$http + '/api/team/teamNum',
							method: 'POST',
							data: {
								token: reg.data.token
							},
							success(res){
								console.log('成员返回数据', res)
								if(res.data.status === 200){
									_this.showList = res.data.data
								}else{
									uni.showModal({
										title: '提示',
										content: res.data.msg
									})
								}
								
							}
						})
					}
				})
			},
			// 任命
			renmClick(item, index) {
				console.log(item, index)
				this.isShow = true
			},
			upper: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
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
		// height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.search_box{
				width:690rpx;
				height:53rpx;
				background: #FFFFFF;
				margin-left: 30rpx;
				// background-color: pink;
				border-radius:27rpx;
				box-sizing: border-box;
				padding: 24rpx;
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				input{
					color: #707070;
					font-size: 26rpx;
				}
				image{
					margin-right: 24rpx;
				}
			}
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.img_l{
						display: flex;
						align-items: center;
						image{
							width: 115rpx;
							height: 112rpx;
							margin-right: 24rpx;
						}
						.name{
							color: #2B2B2B;
							font-size: 26rpx;
							font-weight: 500;
							margin-bottom: 17rpx;
						}
						.zhiwei{
							color: #BBBBBB;
							font-size: 24rpx;
						}
					}
					.btn_r{
						width:76rpx;
						height:35rpx;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
						border-radius:18rpx;
						line-height: 35rpx;
						text-align: center;
						color: #FFFFFF;
						// font-weight: 500;
						font-size: 24rpx;
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
					height:406rpx;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					position: absolute;
					top: calc(50% - 203rpx);
					left: calc(50% - 273rpx);
					box-sizing: border-box;
					padding: 24rpx;
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
									width: 150rpx;
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
