<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 搜索框 -->
		<view class="search_box">
			<image src="../../static/index/sosuo@2x.png" mode=""></image>
			<input  confirm-type="search" @confirm="getData()" type="text" v-model="searchValue" />
		</view>
		<!-- 附近店铺 -->
		<view class="store_list">
			<view class="none_list" v-if="storeList.length == 0">
				空空如也
			</view>
			<view class="item"
			v-for="(item, index) in storeList"
			:key='index'
			:class="{active: item.is_source}"
			>
				<!-- 源头店标识 -->
				<image id="yuantou" v-if="item.is_source == 1" src="../../static/nearbystore/yuantoudian@2x.png" mode=""></image>
				<view class="left_info">
					<view class="pic">
						<image :src="item.logo" mode=""></image>
						<view class="box_start" v-if="item.grade != 0">
							<image style="width: 22rpx;height: 22rpx;" v-for="start in item.grade" :key="start" src="../../static/mine/start.png" mode=""></image>
						</view>
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
					<view class="bom"
					@click="mapGotoClick(item)"
					>
						<image style="width: 26rpx;height: 25rpx;margin-right: 12rpx;" src="../../static/nearbystore/daohang@2x(1).png" mode=""></image>
						<text>{{(item.distance/1000).toFixed(2)}}km</text>
						<text class="goto">去这里</text>
					</view>
				</view>
				
				<image style="width: 61rpx;height: 22rpx;position: absolute;top: 2rpx;left: 27rpx;" v-if="item.isSource" :src="item.isSource" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data() {
			return {
				storeList: [],
				page: 1,
				limit: 10,
				long_number: 0,
				lati_number: 0,
				searchValue: '', // 搜索value
			}
		},
		onShow() {
			this.mgetLocation()
		},
		methods: {
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit,
								long_number: _this.long_number,
								lati_number: _this.lati_number,
								content: _this.searchValue
							}
							console.log('datas', datas)
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: _this.$http + '/api/index/nearbyShop',
							method: 'POST',
							data: datas,
							success(res){
								console.log('获取附近店铺列表', res)
								if(res.data.status === 200){
									let newList = res.data.data
									newList.forEach(item =>{
										item.distance = item.distance.toFixed(2)
									})
									_this.storeList = newList
									uni.hideLoading()
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
			},
			// 跳转地图导航
			mapGotoClick(item){
				let _this = this
				console.log('item', item)
				// return
				uni.openLocation({
					latitude: +item.lati_number,
					longitude: +item.long_number,
					success(){
						 if(plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'iosamap://'})){    // 判断高德地图 是否安装  
							
						}else{  
							uni.showModal({
								title: '温馨提示',
								content: '检测到您未安装高德地图,为了您更好的导航体验,请下载高德地图,使用高德地图进行导航'
							})
						}  
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
		.search_box{
			width: 600rpx;
			height: 60rpx;
			// background-color: #FFFFFF;
			border: 1rpx solid #008c8c;
			border-radius: 30rpx;
			margin-left: 75rpx;
			margin-top: 24rpx;
			box-sizing: border-box;
			padding: 2rpx 20rpx;
			display: flex;
			align-items: center;
			input{
				width: 500rpx;
				height: 60rpx;
				margin-left: 15rpx;
				font-size: 26rpx;
				// background-color: #eee;
			}
			image{
				width: 30rpx;
				height: 30rpx;
				// margin-top: 15rpx;
			}
		}
		.store_list{
			// margin-top: 30rpx;
			width: 100%;
			padding: 24rpx 25rpx  0 25rpx;
			box-sizing: border-box;
			.none_list{
				width: 100%;
				height: 300rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 300rpx;
			}
			.item{
				width: 700rpx;
				height: 200rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				border-radius:18rpx;
				padding: 25rpx 18rpx 24rpx 24rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 18rpx;
				position: relative;
				box-shadow: #DDDDDD 0 0 15rpx 5rpx;
				#yuantou{
					width: 61rpx;
					height: 22rpx;
					position: absolute;
					top: 0;
					left: 2rpx;
				}
				.left_info{
					display: flex;
					.con{
						.title{
							width: 400rpx;
							font-size:30rpx;
							color: #111111;
							font-weight: bold;
							margin-bottom: 10rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						.weixin,.phone{
							font-size: 26rpx;
							color: #ABABAB;
						}
					}
					
					.pic{
						width: 120rpx;
						height: 150rpx;
						display: flex;
						flex-direction: column;
						margin-right: 24rpx;
						// background-color: pink;
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
						position: absolute;
						right: 10rpx;
						bottom: 10rpx;
						font-size: 22rpx;
						color: #323232;
						.goto{
							background-color: #008c8c;
							border-radius: 15rpx;
							color: #FFFFFF;
							margin-left: 10rpx;
							padding: 4rpx 10rpx;
						}
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
