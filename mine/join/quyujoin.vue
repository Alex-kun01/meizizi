<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 区域加盟店 -->
		<view class="top_bar">
			<view class="img" @click="goback">
				<image style="width: 23rpx;height: 36rpx;" src="@/static/index/fanhui@2x.png" mode=""></image>
			</view>
			<view @click="changeIndex(1)" :class="{item:true,active: isActive === 1}">
				区域加盟店{{'(' + quyuNum + ')'}}
			</view>
			<view @click="changeIndex(2)" :class="{item:true,active: isActive === 2}">
				直推加盟店{{'(' + tuijianNum + ')'}}
			</view>
		</view>
		<!-- 区域加盟店 -->
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key='index'
			>
				<view class="title">
					{{item.company}}
				</view>
				<view class="con_box">
					<image :src="item.logo" mode=""></image>
					<view class="con_con">
						<view class="address">
							{{item.address}}
						</view>
						<view class="item_box">
							<view class="item">
								<image src="@/static/mine/dianhua@2x.png" mode=""></image>
								<text>{{item.phone}}</text>
							</view>
							<view class="item">
								<image src="@/static/mine/weixin@2x.png" mode=""></image>
								<text>{{item.wx_name}}</text>
							</view>
						</view>
					</view>
					<view class="btn_r"
					@click="gotpage(item)"
					>
						查看收益
					</view>
				</view>
			</view>
			<view class="loading" v-if="isLoading">
				加载中...
			</view>
		</view>
		
	</view>
</template>

<script>
	// import {myMixins} from '@/components/mixins.js'
	export default {
		// mixins: [myMixins],
		data () {
			return {
				isActive: 1, 
				page: 1,
				limit: 10, 
				isLoading: false,
				showList: [],
				quyuNum: 0, // 区域加盟店数量
				tuijianNum: 0, // 推荐加盟店数量
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
						uni.showLoading({
							title: ''
						})
						let datas = {
							token: reg.data.token,
							give_type: _this.isActive,
							page: _this.page,
							limit: _this.limit
						}
						console.log('服务商参数', datas)
						uni.request({
							url: _this.$http + '/api/user/storeList',
							method: 'POST',
							data: datas,
							success(res){
								_this.isLoading = false
								uni.hideLoading()
								console.log('服务商返回数据', res)
								if(res.data.status === 200){
									let {area_quantity,recommend_quantity,shop_list,} = res.data.data
									_this.quyuNum = area_quantity
									_this.tuijianNum = recommend_quantity
									_this.showList = [..._this.showList,...shop_list]
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
			changeIndex(index){
				this.isActive = index
				this.showList = []
				this.getData()
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			// 跳转收益
			gotpage(item){
				console.log('item', item)
				uni.navigateTo({
					url: '../merchant/logisticsinfo?id='+item.shop_id
					})
			},
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData()
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
			min-height: 100vh;
			height: 100%;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.top_bar{
				width: 100%;
				height: 100rpx;
				box-sizing: border-box;
				padding: 0 15%;
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
							line-height: 31rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 22rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:16rpx;
							align-self: flex-end;
						}
					}
				}
			}
			
		}
	}
</style>
