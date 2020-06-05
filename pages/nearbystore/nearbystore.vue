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
						<image style="width: 99rpx;height: 79rpx;" :src="item.img" mode=""></image>
						<image style="width: 74rpx;height: 13rpx;" src="item.startImg" mode=""></image>
					</view>
					<view class="con">
						<view class="title">
							{{item.title}}
						</view>
						<view class="weixin">
							微信：{{item.weixin}}
						</view>
						<view class="phone">
							电话：{{item.phone}}
						</view>
					</view>
				</view>
				
				<view class="right_btn">
					<view class="top">
						<image style="width: 22rpx;height: 22rpx;" src="../../static/nearbystore/dianhua(1).png" mode=""></image>
						<image style="width: 26rpx;height: 22rpx;margin-left: 12rpx;" src="../../static/nearbystore/liaotian(1).png" mode=""></image>
					</view>
					<view class="bom">
						<image style="width: 26rpx;height: 25rpx;margin-right: 12rpx;" src="../../static/nearbystore/daohang@2x(1).png" mode=""></image>
						<text>{{item.distance}}</text>
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
				storeList: [
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '../../static/nearbystore/yuantoudian@2x.png',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					},
					{
						img:'../../static/nearbystore/test2.png',
						startImg: '../../static/nearbystore/dengji(1).png',
						isSource: '',
						title: '屈臣氏(成都百盛店)',
						weixin: 123456789,
						phone: 123456789,
						distance: '1.0km'
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {

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
		background-color: #F4F4F4;
		.store_list{
			// margin-top: 30rpx;
			width: 100%;
			padding: 0 25rpx;
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
