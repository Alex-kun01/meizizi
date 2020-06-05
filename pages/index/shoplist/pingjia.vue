<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 评价 -->
		<view class="top_bar">
			<view class="title"
			@click="changeTap"
			>
				<text>按分类看评价</text>
				<image style="width: 17rpx;height: 9rpx;" src="../../../static/index/xiala@7x.png" mode=""></image>
			</view>
			<view class="tap_list"
			v-if="isShow"
			>
				<view :class="{item:true, active: isActive === index}"
				v-for="(item, index) in tapList"
				:key="index"
				@click="chooseTap(item, index)"
				>
					{{item}}
				</view>
			</view>
		</view>
		
		<view class="show_list">
			<view class="item"
			v-for="(item, index) in showList"
			:key="index"
			>
				<view class="top_name">
					<image style="width: 35rpx;height: 35rpx;" :src="item.avatar" mode=""></image>
					<text>{{item.name}}</text>
				</view>
				<view class="title">
					<text>{{item.day}}</text>
					<text>{{item.colorType}}</text>
				</view>
				<view class="text">
					{{item.title}}
				</view>
				<view class="piv_lis">
					<image
					v-for="(pic, inx) in item.picList"
					:key="inx"
					 :src="pic" mode=""></image>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isShow: true,
				isActive: 1,
				tapList: [
					'颜色漂亮(628)',
					'颜色漂亮(628)',
					'颜色漂亮(628)',
					'颜色漂亮(628)',
					'颜色漂亮(628)',
					'颜色漂亮(628)',
				],
				showList: [
					{
						avatar: '../../../static/index/QQ.png',
						name: '葡萄葡萄',
						day: '三天前',
						colorType: '152-123456',
						title: '细节做的特别好，涂上也毫无压力超气质，御姐范儿，外表 漂亮富有时尚感，非常显白又能完美衬托肤色,非常显白又能完美衬托肤色',
						picList: [
							'../../../static/index/maijiaxiu1.png',
							'../../../static/index/maijiaxiu1.png'
						]
					},
					{
						avatar: '../../../static/index/QQ.png',
						name: '葡萄葡萄',
						day: '三天前',
						colorType: '152-123456',
						title: '细节做的特别好，涂上也毫无压力超气质，御姐范儿，外表 漂亮富有时尚感，非常显白又能完美衬托肤色,非常显白又能完美衬托肤色',
						picList: [
							'../../../static/index/maijiaxiu1.png',
							'../../../static/index/maijiaxiu1.png'
						]
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeTap(){
				this.isShow = !this.isShow
			},
			chooseTap(item,index){
				console.log(item)
				this.isActive = index
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
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				// height: 234rpx;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				.title{
					font-size: 28rpx;
					font-weight: 500;
					color: #6B6B6B;
					display: flex;
					align-items: center;
					margin-bottom: 15rpx;
					image{
						margin-left: 15rpx;
					}
				}
				.tap_list{
					width: 100%;
					height: 150rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.item{
						width:211rpx;
						height:59rpx;
						line-height: 59rpx;
						text-align: center;
						border:1rpx solid rgba(217,217,217,1);
						border-radius:12rpx;
						color: #FF792C;
						font-weight: 500;
						font-size: 24rpx;
						margin-bottom: 30rpx;
					}
					.item.active{
						border:1rpx solid #FF792C;
					}
				}
			}
			.show_list{
				width: 100%;
				background-color: #FFFFFF;
				margin-top: 30rpx;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					.top_name{
						box-sizing: border-box;
						padding:  0 17rpx;
						display: flex;
						align-items: center;
						image{
							border-radius: 50%;
							
						}
						text{
							font-size: 22rpx;
							color: #969696;
						}
					}
					.title{
						color: #666666;
						font-size: 22rpx;
						// font-weight: 500;
						box-sizing: border-box;
						padding-left: 70rpx;
						margin: 15rpx 0;
					}
					.text{
						box-sizing: border-box;
						padding: 0 24rpx;
						font-weight: 500;
						font-size: 26rpx;
						color: #3C3C3C;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2; //行数
						-webkit-box-orient: vertical;
						margin-bottom: 20rpx;
					}
					.piv_lis{
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 30rpx;
						image{
							width: 340rpx;
							height: 271rpx;
						}
					}
				}
			}
			
		}
	}
</style>
