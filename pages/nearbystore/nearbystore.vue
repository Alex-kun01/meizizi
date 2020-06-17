<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 附近店铺 -->
		<view class="store_list">
			<view class="item"
			v-for="(item, index) in storeList"
			:key='index'
			:class="{active: item.isSource}"
			>
				<view class="left_info">
					<view class="pic">
						<image :src="item.logo || '../../static/nearbystore/test2.png'" mode=""></image>
						<!-- 源头店标识 -->
						<!-- <image style="width: 74rpx;height: 13rpx;" src="item.startImg" mode=""></image> -->
					</view>
					<view class="con">
						<view class="title">
							{{item.company || '暂无店铺信息'}}
						</view>
						<view class="weixin">
							微信：{{item.wx_name || '暂无微信信息'}}
						</view>
						<view class="phone">
							电话：{{item.phone}}
						</view>
					</view>
				</view>
				
				<view class="right_btn">
					<view class="top"
					@click="callPhone(item.phone)"
					>
						<image style="width: 22rpx;height: 22rpx;" src="../../static/nearbystore/dianhua(1).png" mode=""></image>
						<!-- <image style="width: 26rpx;height: 22rpx;margin-left: 12rpx;" src="../../static/nearbystore/liaotian(1).png" mode=""></image> -->
					</view>
					<view class="bom">
						<image style="width: 26rpx;height: 25rpx;margin-right: 12rpx;" src="../../static/nearbystore/daohang@2x(1).png" mode=""></image>
						<text>{{item.distance}}km</text>
					</view>
				</view>
				
				<image style="width: 61rpx;height: 22rpx;position: absolute;top: 2rpx;left: 27rpx;" v-if="item.isSource" :src="item.isSource" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeList: [],
				page: 1,
				limit: 10,
				long_number: 0,
				lati_number: 0
			}
		},
		onLoad() {
			this.mgetLocation()
			
		},
		methods: {
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: _this.$http + '/api/index/nearbyShop',
							method: 'POST',
							data: {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit,
								long_number: _this.long_number,
								lati_number: _this.lati_number,
							},
							success(res){
								console.log('获取附近店铺列表', res)
								if(res.data.status === 200){
									let newList = res.data.data
									newList.forEach(item =>{
										item.distance = item.distance.toFixed(2)
									})
									_this.storeList = newList
									uni.hideLoading()
									
								}
							}
						})
					}
				})
			},
			// 获取当前位置中文信息
			mgetLocation(){
				let _this = this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success(res){
						console.log(res)
						_this.long_number = res.longitude
						_this.lati_number = res.latitude
						_this.getData()
					}
				})
			},
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone,
					success(res){
						console.log('拨打电话成功')
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
		background: #FFFFFF;
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
		.store_list{
			// margin-top: 30rpx;
			width: 100%;
			padding: 24rpx 25rpx  0 25rpx;
			box-sizing: border-box;
			.item{
				width: 700rpx;
				height: 161rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				border-radius:18rpx;
				padding: 25rpx 18rpx 24rpx 24rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 18rpx;
				position: relative;
				.left_info{
					display: flex;
					.con{
						.title{
							font-size:30rpx;
							color: #111111;
							font-weight: bold;
							margin-bottom: 10rpx;
						}
						.weixin,.phone{
							font-size: 26rpx;
							color: #ABABAB;
						}
					}
					
					.pic{
						display: flex;
						image{
							width: 99rpx;
							height: 79rpx;
							min-height: 79rpx;
							min-width: 99rpx;
							margin-right: 24rpx;
						}
					}
				}
				.right_btn{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.top{
						align-self: flex-end;
					}
					.bom{
						font-size: 22rpx;
						color: #323232;
					}
				}
			}
			.item.active{
				background:rgba(255,122,45,0.1);
			}
		}
	}
}
</style>
