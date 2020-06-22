<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 账单明细 -->
		<view class="show_list">
			<view class="null_box" v-if="isNull">
				暂无数据
			</view>
			<view class="item"
			v-for="(item,index) in showList"
			:key='index'
			>
				<view class="left_name">
					<view class="name">
						{{item.storeName}}
					</view>
					<view class="date">
						{{item.month}}月{{item.day}}日{{item.time}}
					</view>
				</view>
				<view class="right_price">
					<view class="addPrice">
						+{{item.addPrice}}
					</view>
					<view class="syNum">
						余额 {{item.syNum}}
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				showList: [
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					},
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					},
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					},
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					},
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					},
					{
						storeName: '成都美妆店',
						month: 4,
						day: 13,
						time:'16:22',
						addPrice: 2.01,
						syNum: 99.01, //剩余金额
					}
				],
			}
		},
		computed:{
			// 是否有账单数据
			isNull(){
				if(this.showList.length == 0){
					return true
				}
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			
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
			.show_list{
				width: 100%;
				.null_box{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					color: #999;
				}
				.item{
					width: 100%;
					box-sizing: border-box;
					padding: 30rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #ddd;
					.left_name{
						.name{
							font-size:30rpx;
							font-weight:500;
							color:rgba(51,51,51,1);
							margin-bottom: 20rpx;
						}
						.date{
							font-size:26rpx;
							font-weight:500;
							color:rgba(139,139,139,1);
						}
					}
					.right_price{
						.addPrice{
							font-size:33rpx;
							font-weight:bold;
							color:rgba(255,121,44,1);
							margin-bottom: 20rpx;
						}
						.syNum{
							font-size:26rpx;
							font-weight:500;
							color:rgba(139,139,139,1);
						}
					}
				}
			}
		}
	}
</style>
